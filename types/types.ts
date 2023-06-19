import { Document, Schema, SortOrder, Types } from "mongoose";

interface VariantPropertiesI {
  [key: string]: string;
}

interface VariantI {
  properties: VariantPropertiesI;
  stockQuantity: number;
  sellsPrice?: number;
  skuId?: number;
  discounts?: DiscountI[];
  imageUrls?: string[];
}

interface UnitI {
  quantity?: number;
  name: string;
  conversion?: number;
}
interface DiscountI {
  type: "percentage" | "amount";
  code: string;
  minType: "orderQuantity" | "orderValue";
  value: number;
  minimum?: number;
  maxDiscount?: number;
}

interface ProductI {
  storeId: Types.ObjectId;
  name: string;
  description?: string;
  sellsPrice: number;
  purchasePrice?: number;
  category?: Types.ObjectId[];
  variants?: VariantI[];
  heroImage?: string;
  images?: string[];
  slug: string;
  quantity: number;
  discounts?: DiscountI[];
  hsnCode?: string;
  taxIncluded?: boolean;
  unit: UnitI;
  purchaseUnit?: UnitI;
  gstPercentage?: number;
  deliveryTime?: string;
  isInventory?: boolean;
  inventoryProducts?: InventoryProductI[];
  lowStock?: number;
  isService?: boolean;
  isDeleted?: boolean;
}

export interface InventoryProductI {
  productId: Types.ObjectId;
  amountConsumed: number;
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
  slug?: string;
}

export interface CreateCategoryRequestI extends CategoryI {}

export interface UpdateProductRequestI {
  productId: Types.ObjectId;
  name: string;
  description?: string;
  sellsPrice: number;
  purchasePrice?: number;
  category: Types.ObjectId[];
  variants?: VariantI[];
  heroImage?: string;
  images?: string[];
  quantity: number;
  discounts?: DiscountI[];
  hsnCode?: string;
  taxIncluded?: boolean;
  unit: string;
  purchaseUnitName?: string;
  purchaseUnitConversion?: number;
  gstPercentage?: number;
  deliveryTime?: string;
  isInventory?: boolean;
  inventoryProducts?: InventoryProductI[];
  lowStock?: number;
}
export interface CreateProductRequestI {
  storeId: Types.ObjectId;
  name: string;
  description?: string;
  sellsPrice: number;
  purchasePrice?: number;
  category: Types.ObjectId[];
  variants?: VariantI[];
  heroImage?: string;
  images?: string[];
  quantity: number;
  discounts?: DiscountI[];
  hsnCode?: string;
  taxIncluded?: boolean;
  unit: string;
  purchaseUnitName?: string;
  purchaseUnitConversion?: number;
  gstPercentage?: number;
  deliveryTime?: string;
  isInventory?: boolean;
  inventoryProducts?: InventoryProductI[];
  lowStock?: number;
  isService: boolean;
}

export interface ProductsFilterByI {
  category?: string[];
  minSellsPrice?: number;
  maxSellsPrice?: number;
  minPurchasePrice?: number;
  maxPurchasePrice?: number;
  minQuantity?: number;
  maxQuantity?: number;
  itemType?: ItemTypeEnum;
}

export interface ProductsFilterByQueryI {
  category?: string;
  minSellsPrice?: number;
  maxSellsPrice?: number;
  minPurchasePrice?: number;
  maxPurchasePrice?: number;
  minQuantity?: number;
  maxQuantity?: number;
  itemType?: ItemTypeEnum;
}

export enum ItemTypeEnum {
  PRODUCT = "Product",
  SERVICE = "Service",
}

export interface SortI {
  sortBy: string | undefined;
  sortOrder: SortOrder | undefined;
}
export interface GetProductsQueryParamsI
  extends ProductsFilterByQueryI,
    PaginationQueryParamsI {}

export interface GetCategoriesQueryParamsI extends PaginationQueryParamsI {}

export interface PaginationQueryParamsI {
  pageSize?: string;
  page?: string;
  sortBy?: string;
  sortOrder?: SortOrder;
}

export interface DeleteProductsRequestI {
  storeId: string;
  productIds: string[];
}
