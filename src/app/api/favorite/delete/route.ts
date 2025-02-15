import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose/dbConnect';
import Favorite from '@/lib/mongoose/models/FavoriteSchema';
import User from '@/lib/mongoose/models/UserSchema';
import { auth } from '@/auth';
import { IFavoriteItem } from '@/types/favorite';

export async function DELETE(req: NextRequest) {
  await dbConnect();

  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = req.nextUrl;
    const itemId = searchParams.get('itemId');

    if (!itemId) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const favorite = await Favorite.findOne({ userId: user._id });
    const exists = favorite.items.some(
      (favItem: IFavoriteItem) => favItem.itemId.toString() === itemId.toString()
    );

    if (exists) {
      favorite.items = favorite.items.filter(
        (favItem: IFavoriteItem) => favItem.itemId.toString() !== itemId.toString()
      );
    }

    await favorite.save();

    return NextResponse.json(
      { message: 'Item deleted from favorite', items: favorite.items },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
