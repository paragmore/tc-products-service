import { Document, Schema, SortOrder, Types } from "mongoose";

interface VariantPropertiesI {
  [key: string]: string;
}

interface VariantI {
  properties: VariantPropertiesI;
  stockQuantity: number;
}

interface UnitI {
  quantity: number;
  name: string;
  conversion?: number;
}

interface DiscountI {
  volumeThreshold: number;
  discountPercentage: number;
}

interface ProductI {
  storeId: Types.ObjectId;
  name: string;
  description?: string;
  sellsPrice: number;
  purchasePrice?: number;
  category: string;
  variants: VariantI[];
  heroImage?: string;
  images: string[];
  slug: string;
  quantity: number;
  discounts: DiscountI[];
  hsnCode?: string;
  taxIncluded?: boolean;
  unit: UnitI;
  purchaseUnit?: UnitI;
  gstPercentage?: number;
  deliveryTime?: string;
}

interface ProductDocument extends Document, ProductI {}

export {
  VariantPropertiesI,
  VariantI,
  UnitI,
  DiscountI,
  ProductI,
  ProductDocument,
};

export interface CategoryI {
  name: string;
  description: string;
  storeId: Types.ObjectId;
}

export interface CreateCategoryRequestI extends CategoryI {}

export interface CreateProductRequestI extends ProductI {}

export interface ProductsFilterByI {
  category?: string[];
  minSellsPrice?: number;
  maxSellsPrice?: number;
  minPurchasePrice?: number;
  maxPurchasePrice?: number;
  minQuantity?: number;
  maxQuantity?: number;
}

export interface ProductsFilterByQueryI {
  category?: string;
  minSellsPrice?: number;
  maxSellsPrice?: number;
  minPurchasePrice?: number;
  maxPurchasePrice?: number;
  minQuantity?: number;
  maxQuantity?: number;
}

export interface SortI {
  sortBy: string | undefined;
  sortOrder: SortOrder | undefined;
}
export interface GetProductsQueryParamsI extends ProductsFilterByQueryI {
  pageSize?: string;
  page?: string;
  sortBy?: string;
  sortOrder?: SortOrder;
}
