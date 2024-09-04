import mongoose from 'mongoose';

const MONGODBURI = process.env.MONGODBURI;
console.log('env var db:', MONGODBURI);
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
      .connect(MONGODBURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((mongoose) => {
        console.log('Connected to Database');
        cached.conn = mongoose;
        return mongoose;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }
  cached.promise = await cached.promise;
  return cached.conn;
}

export default startDb;
