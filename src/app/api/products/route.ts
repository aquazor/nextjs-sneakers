import { MongooseError } from 'mongoose';
import { NextResponse } from 'next/server';
import { MAX_PRICE, MIN_PRICE } from '@/lib/store/filters/constants';
import dbConnect from '@/lib/mongoose/dbConnect';
import Product, { IProduct } from '@/lib/mongoose/models/ItemSchema';

export async function GET(req: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '8', 10);
    const skip = parseInt(searchParams.get('skip') || '0', 10);

    const brandsParam = searchParams.get('brands');
    const brands = brandsParam ? brandsParam.split(',') : [];

    const sizesParam = searchParams.get('sizes');
    const sizes = sizesParam ? sizesParam.split(',') : [];

    const minPrice = parseInt(searchParams.get('minPrice') || MIN_PRICE.toString(), 10);
    const maxPrice = parseInt(searchParams.get('maxPrice') || MAX_PRICE.toString(), 10);

    const query: Record<string, unknown> = {};

    // Filter by brand name in product title
    if (brands.length > 0) {
      query.name = {
        $regex: brands.map((brand) => `(${brand})`).join('|'), // Create regex pattern
        $options: 'i', // Case-insensitive search
      };
    }

    // Filter by available sizes (only sizes where count > 0)
    if (sizes.length > 0) {
      query.sizes = {
        $elemMatch: {
          value: { $in: sizes },
          count: { $gt: 0 },
        },
      };
    }

    // Filter by price range
    query.price = { $gte: minPrice, $lte: maxPrice };

    const products: IProduct[] = await Product.find(query).skip(skip).limit(limit);
    const totalCount = await Product.countDocuments(query);

    return NextResponse.json({
      products,
      hasMore: skip + limit < totalCount,
    });
  } catch (err) {
    if (err instanceof MongooseError) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Something went wrong.' }, { status: 500 });
  }
}
