import { inject, injectable } from "inversify";
import { ProductsRepo } from "../repo/products.repo";
import {
  CreateCategoryRequestI,
  CreateProductRequestI,
  ProductsFilterByI,
  SortI,
} from "../types/types";
import slugify from "slugify";
import { ApiError } from "../utils/ApiHelper";

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
    return await this.productsRepo.createProduct({ ...product, slug });
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
    sort?: SortI
  ) {
    try {
      const response = await this.productsRepo.getAllStoreCategories(
        storeId,
        page,
        pageSize,
        sort
      );
      return response;
    } catch (error) {
      console.log("getAllStoreCategories service", error);
      return new ApiError("Something went wrong, Please try again", 500);
    }
  }
}
