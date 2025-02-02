import dbConnect from '@/lib/mongoose/dbConnect';
import Product from '@/lib/mongoose/models/ItemSchema';
import { MongooseError } from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '6', 10);
    const skip = parseInt(searchParams.get('skip') || '0', 10);

    const products = await Product.find().skip(skip).limit(limit);
    const totalCount = await Product.countDocuments();

    return NextResponse.json({
      products,
      hasMore: skip + limit < totalCount,
    });
  } catch (err) {
    if (err instanceof MongooseError) {
      return NextResponse.json({ message: err.message });
    }
    return NextResponse.json({ message: 'Something went wrong.' });
  }
}
