import { Types } from "mongoose";

interface VariantProperties {
    [key: string]: string;
  }
  
  interface Variant {
    properties: VariantProperties;
    stockQuantity: number;
  }
  
  interface Unit {
    quantity: number;
    name: string;
    conversion?: number;
  }
  
  interface Discount {
    volumeThreshold: number;
    discountPercentage: number;
  }
  
  interface Product {
    storeId: Types.ObjectId;
    name: string;
    description?: string;
    sellsPrice: number;
    purchasePrice?: number;
    category: string;
    variants: Variant[];
    heroImage?: string;
    images: string[];
    slug: string;
    quantity: number;
    discounts: Discount[];
    hsnCode?: string;
    taxIncluded?: boolean;
    unit: Unit;
    purchaseUnit: Unit;
    gstPercentage?: number;
    deliveryTime?: string;
  }