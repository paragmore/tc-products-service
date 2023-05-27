import mongoose from "mongoose";
import { ConnectionOptions } from "tls";

export const connectMongoDB = () => {
    console.log('hereee')
  if (!process.env.MONGODB_URI) {
    console.log("MONGODB_URI not present");
    return;
  }
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectionOptions)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));
};
