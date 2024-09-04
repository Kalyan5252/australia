import mongoose from 'mongoose';

const MONGODBURI = process.env.MONGODBURI;
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function startDb() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODBURI)
      .then(() => console.log('Connected to Database'))
      .catch((err) => console.log(err));
  }
  cached.promise = await cached.promise;
  return cached.conn;
}

export default startDb;
