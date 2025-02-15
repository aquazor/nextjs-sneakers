import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose/dbConnect';
import Cart from '@/lib/mongoose/models/CartSchema';
import User from '@/lib/mongoose/models/UserSchema';
import { auth } from '@/auth';
import { ICartItem } from '@/types/cart';

export async function PUT(req: NextRequest) {
  try {
    const { items }: { items: ICartItem[] } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ message: 'Cart is empty' }, { status: 400 });
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

    let cart = await Cart.findOne({ userId: user._id });

    if (!cart) {
      cart = new Cart({ userId: user._id, items });
    } else {
      cart.items = items;
    }

    await cart.save();

    return NextResponse.json({ items: cart.items }, { status: 200 });
  } catch (error) {
    console.error('Error updating cart:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
