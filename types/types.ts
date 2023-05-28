import { Document, Schema, Types } from "mongoose";

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

export interface CreateProductRequestI extends ProductI {}

export interface GetProductsQueryParamsI {
    pageSize?: string;
    page?: string;
    sortingPattern?: string;
    sC?: string;
  }
  
