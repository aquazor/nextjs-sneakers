import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose/dbConnect';
import User from '@/lib/mongoose/models/UserSchema';
import { auth } from '@/auth';
import Favorite from '@/lib/mongoose/models/FavoriteSchema';
import { IFavoriteItem } from '@/types/favorite';

export async function PUT(req: NextRequest) {
  try {
    const { items }: { items: IFavoriteItem[] } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ message: 'Favorite is empty' }, { status: 400 });
    }

    await dbConnect();

    const session = await auth();
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    let favorite = await Favorite.findOne({ userId: user._id });

    if (!favorite) {
      favorite = new Favorite({ userId: user._id, items });
    } else {
      favorite.items = items;
    }

    await favorite.save();

    const { searchParams } = req.nextUrl;
    const sortParam = searchParams.getAll('sort');
    const sort: [string, 'asc' | 'desc'][] = [];

    sortParam.forEach((item) => {
      const [field, order] = item.split(':');
      if (field && (order === 'asc' || order === 'desc')) {
        sort.push([field, order]);
      }
    });

    const sortedItems: IFavoriteItem[] = [...favorite.items];

    if (sort.length > 0) {
      sortedItems.sort((a, b) => {
        for (const [field, order] of sort) {
          if (field in a && field in b) {
            const key = field as keyof IFavoriteItem;

            if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
          }
        }
        return 0;
      });
    }

    return NextResponse.json({ items: sortedItems }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
