import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose/dbConnect';
import Cart from '@/lib/mongoose/models/CartSchema';
import User from '@/lib/mongoose/models/UserSchema';
import { auth } from '@/auth';
import { ICartItem } from '@/types/cart';

export async function DELETE(req: NextRequest) {
  await dbConnect();

  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = req.nextUrl;
    const itemId = searchParams.get('itemId');
    const code = searchParams.get('code');

    if (!itemId || !code) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const cart = await Cart.findOne({ userId: user._id });

    const itemIndex = cart.items.findIndex(
      (cartItem: ICartItem) =>
        cartItem.itemId.toString() === itemId.toString() && cartItem.size.code === code
    );

    if (itemIndex > -1) {
      if (cart.items[itemIndex].count > 1) {
        cart.items[itemIndex].count -= 1;
      } else {
        cart.items = cart.items.filter(
          (cartItem: ICartItem) =>
            !(
              cartItem.itemId.toString() === itemId.toString() &&
              cartItem.size.code === code
            )
        );
      }
    }

    await cart.save();

    return NextResponse.json(
      { message: 'Item removed from cart', items: cart.items },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
