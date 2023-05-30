import mongoose, { Schema } from "mongoose";
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  storeId: {
    type: Schema.Types.ObjectId,
    ref: "Store",
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

export const CategoryModel = mongoose.model("Category", categorySchema);
