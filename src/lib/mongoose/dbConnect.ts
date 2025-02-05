import mongoose from 'mongoose';

const connection: { isConnected?: number } = {};

export default async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  try {
    console.log('connecting to mongoDB');
    const db = await mongoose.connect(process.env.MONGO_URI!);
    console.log('connected to mongoDB');

    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log('mongoDB connections error:', error);
  }
}
