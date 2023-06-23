import mongoose, { Schema } from "mongoose";

const saccodeSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export const SaccodeModel = mongoose.model("Saccode", saccodeSchema);
