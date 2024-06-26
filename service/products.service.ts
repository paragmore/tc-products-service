import { inject, injectable } from "inversify";
import { ProductsRepo } from "../repo/products.repo";
import {
  BulkProductUploadSingleRequestI,
  CategoriesFilterByI,
  CostOfGoodsSoldAccountTypeEnum,
  CreateCategoryRequestI,
  CreateProductRequestI,
  HSNCodesFilterByI,
  IncomeAccountTypeEnum,
  ItemTypeEnum,
  ProductsFilterByI,
  SortI,
  UnitI,
  UpdateProductRequestI,
} from "../types/types";
import slugify from "slugify";
import { ApiError } from "../utils/ApiHelper";
import { Types } from "mongoose";

@injectable()
export class ProductsService {
  constructor(@inject(ProductsRepo) private productsRepo: ProductsRepo) {}

  async createProduct(product: CreateProductRequestI) {
    const { name, storeId } = product;
    //convert the name to a unique slug
    let slug = slugify(name, { lower: true });
    const productWithSameSlug = await this.productsRepo.getStoreProductBySlug(
      storeId,
      slug
    );
    if (productWithSameSlug) {
      //append timestamp to make it unique
      slug = `${slug}-${new Date().getTime()}`;
    }
    let purchaseUnit: UnitI | undefined =
      product.purchaseUnitName && product.purchaseUnitConversion
        ? {
            name: product.purchaseUnitName,
            conversion: product.purchaseUnitConversion,
          }
        : undefined;
    return await this.productsRepo.createProduct({
      ...product,
      slug,
      unit: { name: product.unit },
      purchaseUnit,
    });
  }

  async updateProduct(product: UpdateProductRequestI) {
    let purchaseUnit: UnitI | undefined =
      product.purchaseUnitName && product.purchaseUnitConversion
        ? {
            name: product.purchaseUnitName,
            conversion: product.purchaseUnitConversion,
          }
        : undefined;
    return await this.productsRepo.updateProduct(product.productId, {
      ...product,
      unit: { name: product.unit },
      purchaseUnit,
      storeId: new Types.ObjectId(),
      slug: "",
    });
  }

  async createCategory(category: CreateCategoryRequestI) {
    const { name } = category;
    //convert the name to a unique slug
    let slug = slugify(name, { lower: true });
    return await this.productsRepo.createCategory({ ...category, slug });
  }

  async getStoreProductById(storeId: string, productId: string) {
    try {
      const response = await this.productsRepo.getStoreProductById(
        storeId,
        productId
      );
      return response;
    } catch (error) {
      console.log("getAllStoreProducts service", error);
      return new ApiError("Something went wrong, Please try again", 500);
    }
  }

  async getStoreCategoryById(storeId: string, categoryId: string) {
    try {
      const response = await this.productsRepo.getStoreCategoryById(
        storeId,
        categoryId
      );
      return response;
    } catch (error) {
      console.log("getStoreCategoryById service", error);
      return new ApiError("Something went wrong, Please try again", 500);
    }
  }

  async getAllStoreProducts(
    storeId: string,
    page: number,
    pageSize: number,
    sort?: SortI,
    filterBy?: ProductsFilterByI
  ) {
    try {
      const response = await this.productsRepo.getAllStoreProducts(
        storeId,
        page,
        pageSize,
        sort,
        filterBy
      );
      return response;
    } catch (error) {
      console.log("getAllStoreProducts service", error);
      return new ApiError("Something went wrong, Please try again", 500);
    }
  }

  async getAllStoreCategories(
    storeId: string,
    page: number,
    pageSize: number,
    sort?: SortI,
    filterBy?: CategoriesFilterByI
  ) {
    try {
      const response = await this.productsRepo.getAllStoreCategories(
        storeId,
        page,
        pageSize,
        sort,
        filterBy
      );
      return response;
    } catch (error) {
      console.log("getAllStoreCategories service", error);
      return new ApiError("Something went wrong, Please try again", 500);
    }
  }

  async bulkProductsUpload(
    storeId: Types.ObjectId,
    products: BulkProductUploadSingleRequestI[]
  ) {
    const uploadPromises: any[] = [];
    products.map(async (product) => {
      uploadPromises.push(
        this.createProduct({
          ...product,
          storeId,
          account: {
            sales: IncomeAccountTypeEnum.SALES,
            purchase: CostOfGoodsSoldAccountTypeEnum.COST_OF_GOODS_SOLD,
          },
        })
      );
    });

    return await Promise.all(uploadPromises);
  }

  async softDeleteProducts(storeId: string, productIds: string[]) {
    try {
      const response = await this.productsRepo.softDeleteProducts(
        storeId,
        productIds
      );
      return response;
    } catch (error) {
      console.log("softDeleteProducts service", error);
      return new ApiError("Something went wrong, Please try again", 500);
    }
  }

  async softDeleteCategories(storeId: string, categoryIds: string[]) {
    try {
      const response = await this.productsRepo.softDeleteCategories(
        storeId,
        categoryIds
      );
      return response;
    } catch (error) {
      console.log("softDeleteCategories service", error);
      return new ApiError("Something went wrong, Please try again", 500);
    }
  }

  async getHSNCodes(
    type: ItemTypeEnum,
    page: number,
    pageSize: number,
    sort?: SortI,
    filterBy?: HSNCodesFilterByI
  ) {
    try {
      if (type === ItemTypeEnum.PRODUCT) {
        return await this.productsRepo.getHSNCodes(
          page,
          pageSize,
          sort,
          filterBy
        );
      }
      if (type === ItemTypeEnum.SERVICE) {
        return await this.productsRepo.getSACCodes(
          page,
          pageSize,
          sort,
          filterBy
        );
      }
      return new ApiError("Party Type not found", 500);
    } catch (error) {
      console.log("getAllStoreParties service", error);
      return new ApiError("Something went wrong, Please try again", 500);
    }
  }
}
