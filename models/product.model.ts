import mongoose, { Schema } from "mongoose";
const discountSchema = new Schema({
  volumeThreshold: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
});

const variantSchema = new Schema({
  properties: {
    type: Map,
    of: String,
    required: true,
  },
  stockQuantity: {
    type: Number,
    required: true,
  },
  sellsPrice: {
    type: Number,
  },
  skuId: {
    type: Number,
  },
  imageUrls: {
    type: [String],
    default: [],
  },
  discounts: [discountSchema],
});

const inventoryProductSchema = new Schema({
  productId: { type: [Schema.Types.ObjectId], ref: "Product", required: true },
  amountConsumed: {
    type: Number,
    required: true,
  },
});

const unitSchema = new Schema({
  quantity: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  conversion: {
    type: Number,
  },
});

const productSchema = new Schema({
  storeId: {
    type: Schema.Types.ObjectId,
    ref: "Store",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  sellsPrice: {
    type: Number,
    required: true,
  },
  purchasePrice: {
    type: Number,
  },
  category: {
    type: [Schema.Types.ObjectId],
    ref: "Category",
    required: true,
  },
  variants: [variantSchema], // Array of variants
  heroImage: {
    type: String,
  },
  images: {
    type: [String],
    default: [],
  },
  slug: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  discounts: [discountSchema], // Array of discounts
  hsnCode: {
    type: String,
  },
  taxIncluded: {
    type: Boolean,
  },
  unit: { type: unitSchema, required: true },
  purchaseUnit: { type: unitSchema },
  gstPercentage: {
    type: Number,
  },
  deliveryTime: {
    type: String,
  },
  isInventory: {
    type: Boolean,
  },
  inventoryProducts: [inventoryProductSchema],
});

export const ProductModel = mongoose.model("Product", productSchema);
