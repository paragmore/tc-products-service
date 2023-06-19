import mongoose, { Schema } from "mongoose";
const discountSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  minType: {
    type: String,
    required: true,
  },
  minimum: {
    type: Number,
  },
  value: {
    type: Number,
    required: true,
  },
  maxDiscount: {
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
    required: function () {
      return !(this as any).isService;
    },
  },
  lowStock: {
    type: Number,
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
  isService: {
    type: Schema.Types.Boolean,
  },
  isDeleted: {
    type: Schema.Types.Boolean,
  },
});

export const ProductModel = mongoose.model("Product", productSchema);
