import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose/dbConnect';
import Cart from '@/lib/mongoose/models/CartSchema';
import User from '@/lib/mongoose/models/UserSchema';
import { auth } from '@/auth';
import { ICartItem } from '@/types/cart';

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { item: newItem }: { item: ICartItem } = await req.json();
    const { _id: _unused, ...item } = newItem;

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    let cart = await Cart.findOne({ userId: user._id });
    if (!cart) {
      cart = new Cart({
        userId: user._id,
        items: [item],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (cartItem: ICartItem) =>
          cartItem.itemId.toString() === item.itemId.toString() &&
          cartItem.size.code === item.size.code
      );

      if (itemIndex > -1) {
        if (cart.items[itemIndex].count <= cart.items[itemIndex].maxCount) {
          cart.items[itemIndex].count += 1;
        }
      } else {
        cart.items.push(item);
      }
    }

    await cart.save();

    return NextResponse.json(
      { message: 'Item added to cart', items: cart.items },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
