import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose/dbConnect';
import User from '@/lib/mongoose/models/UserSchema';

export async function POST(req: NextRequest) {
  try {
    const { user } = await req.json();

    if (!user || !user.email) {
      return NextResponse.json(
        { message: 'Invalid request. User data is required' },
        { status: 400 }
      );
    }

    await dbConnect();

    const userExists = await User.findOne({ email: user.email });
    if (userExists) {
      return NextResponse.json({ message: 'User already registered' }, { status: 200 });
    }

    await User.create(user);

    return NextResponse.json(
      { message: 'User registered successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.log('Error registering user:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
