import mongoose from 'mongoose';

const connection: { isConnected?: number } = {};

export default async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI!);
    console.log(db.connections[0].readyState);

    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error);
  }
}
