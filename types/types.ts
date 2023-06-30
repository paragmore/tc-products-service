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
  margin?: number;
  asPerMargin: boolean;
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
  margin?: number;
  asPerMargin: boolean;
}
export interface CreateProductRequestI {
  storeId: Types.ObjectId;
  name: string;
  description?: string;
  sellsPrice: number;
  purchasePrice?: number;
  category?: Types.ObjectId[];
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
  margin?: number;
  asPerMargin: boolean;
}

export interface BulkProductUploadSingleRequestI {
  name: string;
  description?: string;
  sellsPrice: number;
  purchasePrice?: number;
  category?: Types.ObjectId[];
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
  margin?: number;
  asPerMargin: boolean;
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

export interface GetCategoriesQueryParamsI
  extends PaginationQueryParamsI,
    CategoriesFilterByI {}

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

export interface DeleteCategoriesRequestI {
  storeId: string;
  categoryIds: string[];
}

export interface BulkProductsUploadRequestI {
  storeId: Types.ObjectId;
  products: BulkProductUploadSingleRequestI[];
}

export interface HSNCodesFilterByQueryI {
  search: string;
}

export interface HSNCodesFilterByI {
  search: string;
}

export interface CategoriesFilterByI {
  search: string;
}
export interface GetHSNCodesQueryParamsI
  extends HSNCodesFilterByQueryI,
    PaginationQueryParamsI {}

export interface GetHSNCodesParams {
  type: ItemTypeEnum;
}

export enum AccountListsTypeEnum {
  INCOME = "Income",
  EXPENSE = "Expense",
  COST_OF_GOODS_SOLD = "Cost of goods sold",
}

export enum IncomeAccountTypeEnum {
  DISCOUNT = "Discount",
  GENERAL_INCOME = "General Income",
  INTEREST_INCOME = "Interest Income",
  LATE_FEE_INCOME = "Late Fee Income",
  OTHER_CHARGES = "Other Charges",
  SALES = "Sales",
  SHIPPING_CHARGE = "Shipping Charge",
}

export enum CostOfGoodsSoldAccountTypeEnum {
  COST_OF_GOODS_SOLD = "Cost of Goods Sold",
  LABOUR = "Labour",
  JOB_COSTING = "Job Consting",
  MATERIALS = "Materials",
  SUBCONTRACTOR = "Subcontractor",
}

export enum ExpenseAccountTypeEnum {
  ADVERTISING_AND_MARKETING = "Advertising And Marketing",
  AUTOMOBILE_EXPENSE = "Automobile Expense",
  BAD_DEBT = "Bad Debt",
  BANK_FEES_AND_CHARGES = "Bank Fees And Charges",
  CONSULTANT_EXPENSE = "Consultant Expense",
  CONTRACT_ASSETS = "Contract Assets",
  CREDIT_CARD_CHARGES = "Credit Card Charges",
  DEPRECIATION_AND_AMORTISATION = "Depreciation And Amortisation",
  DEPRECIATION_EXPENSE = "Depreciation Expense",
  IT_AND_INTERNET_EXPENSES = "IT And Internet Expenses",
  JANITORIAL_EXPENSES = "Janitorial Expenses",
  LODGING = "Lodging",
  MEALS_AND_ENTERTAINMENT = "Meals And Entertainment",
  MERCHANDISE = "Merchandise",
  OFFICE_SUPPLIES = "Office Supplies",
  OTHER_EXPENSES = "Other Expenses",
  POSTAGE = "Postage",
  PRINTING_AND_STATIONERY = "Printing And Stationery",
  RAW_MATERIALS_AND_CONSUMABLES = "Raw Materials And Consumables",
  RENT_EXPENSE = "Rent Expense",
  REPAIRS_AND_MAINTENANCE = "Repairs And Maintenance",
  SALARIES_AND_EMPLOYEE_WAGES = "Salaries and Employee Wages",
  TELEPHONE_EXPENSE = "Telephone Expense",
  TRANSPORTATION_EXPENSE = "Transportation Expense",
  TRAVEL_EXPENSE = "Travel Expense",
  UNCATEGORIZED = "Uncategorized",
}
