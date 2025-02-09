import { MongooseError } from 'mongoose';
import { NextResponse } from 'next/server';
import { LIMIT_STR, MIN_PRICE_STR, MAX_PRICE_STR } from '@/constants';
import dbConnect from '@/lib/mongoose/dbConnect';
import Product, { IProduct } from '@/lib/mongoose/models/ItemSchema';

export async function GET(req: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);

    const limit = parseInt(searchParams.get('limit') || LIMIT_STR, 10);
    const skip = parseInt(searchParams.get('skip') || '0', 10);

    const searchTerm = searchParams.get('searchTerm') || '';

    const brandsParam = searchParams.get('brands');
    const brands = brandsParam ? brandsParam.split(',') : [];

    const sizesParam = searchParams.get('sizes');
    const sizes = sizesParam ? sizesParam.split(',') : [];

    const minPrice = Number(searchParams.get('minPrice') || MIN_PRICE_STR);
    const maxPrice = Number(searchParams.get('maxPrice') || MAX_PRICE_STR);

    const query: Record<string, unknown> = {};

    // Filter by search term in product name
    if (searchTerm.length > 0) {
      query.name = {
        $regex: searchTerm.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, '\\$&'),
        $options: 'i',
      };
    }

    // Filter by brand name in product title
    if (brands.length > 0) {
      query.name = {
        $regex: brands.map((brand) => `(${brand})`).join('|'),
        $options: 'i',
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

    // Process the sort options
    const sortParam = searchParams.getAll('sort');
    const sort: [string, 'asc' | 'desc'][] = [];

    sortParam.forEach((item) => {
      const [field, order] = item.split(':');
      if (field && order) {
        const sortOrder: 'asc' | 'desc' = order === 'desc' ? 'desc' : 'asc';
        sort.push([field, sortOrder]);
      }
    });

    const items: IProduct[] = await Product.find(query)
      .skip(skip)
      .limit(limit)
      .sort(sort);
    const totalCount = await Product.countDocuments(query);

    return NextResponse.json({
      items,
      hasMore: skip + limit < totalCount,
    });
  } catch (err) {
    console.log(err);
    if (err instanceof MongooseError) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Something went wrong.' }, { status: 500 });
  }
}
