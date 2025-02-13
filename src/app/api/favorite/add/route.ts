import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose/dbConnect';
import Favorite from '@/lib/mongoose/models/FavoriteSchema';
import User from '@/lib/mongoose/models/UserSchema';
import { auth } from '@/auth';
import { IFavoriteItem } from '@/types/favorite';

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { item: newItem }: { item: IFavoriteItem } = await req.json();
    const { _id: _unused, ...item } = newItem;

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    let favorite = await Favorite.findOne({ userId: user._id });
    if (!favorite) {
      favorite = new Favorite({
        userId: user._id,
        items: [item],
      });
    } else {
      favorite.items.push(item);
    }

    await favorite.save();

    return NextResponse.json(
      { message: 'Item added to favorite', items: favorite.items },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
