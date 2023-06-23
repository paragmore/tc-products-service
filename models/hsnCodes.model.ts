import mongoose, { Schema } from "mongoose";

const hsncodeSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export const HsncodeModel = mongoose.model("Hsncode", hsncodeSchema);
