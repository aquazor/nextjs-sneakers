import { NextResponse } from 'next/server';
import { MongooseError } from 'mongoose';
import { IProduct } from '@/types/product';
import dbConnect from '@/lib/mongoose/dbConnect';
import Product from '@/lib/mongoose/models/ItemSchema';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ itemId: string }> }
) {
  await dbConnect();

  try {
    const { itemId } = await params;

    const item: IProduct | null = await Product.findById(itemId);

    if (!item) {
      return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ item });
  } catch (err) {
    console.log(err);

    if (err instanceof MongooseError) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
