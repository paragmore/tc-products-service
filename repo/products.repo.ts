import { injectable } from "inversify";
import {
  CreateCategoryRequestI,
  CreateProductRequestI,
  ProductI,
  ProductsFilterByI,
  SortI,
} from "../types/types";
import { ProductModel } from "../models/product.model";
import { MongooseError, SortOrder, Types } from "mongoose";
import { CategoryModel } from "../models/category.model";
import { ApiError } from "../utils/ApiHelper";

@injectable()
export class ProductsRepo {
  constructor() {}
  async getStoreProductBySlug(storeId: Types.ObjectId, slug: string) {
    const product = await ProductModel.findOne({ storeId, slug });
    return product;
  }
  async createProduct(product: ProductI) {
    const {
      storeId,
      name,
      description,
      sellsPrice,
      purchasePrice,
      category,
      variants,
      heroImage,
      images,
      quantity,
      discounts,
      hsnCode,
      taxIncluded,
      unit,
      purchaseUnit,
      gstPercentage,
      deliveryTime,
      slug,
      isInventory,
      inventoryProducts,
      lowStock,
    } = product;

    const createdProduct = await ProductModel.create({
      storeId,
      name,
      description,
      sellsPrice,
      purchasePrice,
      category,
      variants,
      heroImage,
      images,
      quantity,
      discounts,
      hsnCode,
      taxIncluded,
      unit,
      purchaseUnit,
      gstPercentage,
      deliveryTime,
      slug,
      isInventory,
      inventoryProducts,
      lowStock,
    });

    return createdProduct;
  }

  async updateProduct(id: Types.ObjectId, product: ProductI) {
    const {
      name,
      description,
      sellsPrice,
      purchasePrice,
      category,
      variants,
      heroImage,
      images,
      quantity,
      discounts,
      hsnCode,
      taxIncluded,
      unit,
      purchaseUnit,
      gstPercentage,
      deliveryTime,
      isInventory,
      inventoryProducts,
      lowStock,
    } = product;

    const updatedProduct = await ProductModel.findByIdAndUpdate(id, {
      name,
      description,
      sellsPrice,
      purchasePrice,
      category,
      variants,
      heroImage,
      images,
      quantity,
      discounts,
      hsnCode,
      taxIncluded,
      unit,
      purchaseUnit,
      gstPercentage,
      deliveryTime,
      isInventory,
      inventoryProducts,
      lowStock,
    });

    return updatedProduct;
  }

  async createCategory(category: CreateCategoryRequestI) {
    const { storeId, name, description, slug } = category;
    try {
      const createdCategory = await CategoryModel.create({
        storeId,
        name,
        description,
        slug,
      });

      return createdCategory;
    } catch (error) {
      const mongooseError = error as MongooseError;
      console.log(mongooseError);
      console.log(mongooseError.name);

      if (mongooseError.message.includes("duplicate key")) {
        return new ApiError("Category with same name already exists", 400);
      }
      return new ApiError(mongooseError.message, 500);
    }
  }

  async getStoreProductById(storeId: string, productId: string) {
    try {
      const product = await ProductModel.findOne({ storeId, _id: productId });
      return product;
    } catch (error) {
      const mongooseError = error as MongooseError;
      console.log(mongooseError.name);
      if (mongooseError.name === "CastError") {
        return new ApiError("Please pass valid product id", 400);
      }
      return new ApiError(mongooseError.message, 500);
    }
  }

  async getStoreCategoryById(storeId: string, categoryId: string) {
    try {
      const category = await CategoryModel.findOne({
        storeId,
        _id: categoryId,
      });
      return category;
    } catch (error) {
      const mongooseError = error as MongooseError;
      console.log(mongooseError.name);
      if (mongooseError.name === "CastError") {
        return new ApiError("Please pass valid category id", 400);
      }
      return new ApiError(mongooseError.message, 500);
    }
  }

  async getAllStoreProducts(
    storeId: string,
    page: number,
    pageSize: number,
    sort?: SortI,
    filterBy?: ProductsFilterByI
  ) {
    let sortBy: { [key: string]: SortOrder };
    if (!sort?.sortBy) {
      sortBy = { _id: -1 };
    } else {
      sortBy = { [sort.sortBy]: sort.sortOrder ? sort.sortOrder : "asc" };
    }
    console.log(sortBy);
    const skipCount = (page - 1) * pageSize;
    let query = ProductModel.find().where({ storeId });
    let countQuery = ProductModel.find().where({ storeId });
    if (filterBy?.category && filterBy?.category?.length > 0) {
      query.where({ category: { $in: filterBy?.category } });
      countQuery.where({ category: { $in: filterBy?.category } });
    }

    const products = await query
      .sort(sortBy)
      .skip(skipCount)
      .limit(pageSize)
      .exec();

    const totalCount = await countQuery.countDocuments().exec();

    return { products, totalCount };
  }

  async getAllStoreCategories(
    storeId: string,
    page: number,
    pageSize: number,
    sort?: SortI
  ) {
    let sortBy: { [key: string]: SortOrder };
    if (!sort?.sortBy) {
      sortBy = { _id: -1 };
    } else {
      sortBy = { [sort.sortBy]: sort.sortOrder ? sort.sortOrder : "asc" };
    }
    console.log(sortBy);
    const skipCount = (page - 1) * pageSize;
    let query = CategoryModel.find().where({ storeId });
    let countQuery = CategoryModel.find().where({ storeId });
    const categories = await query
      .sort(sortBy)
      .skip(skipCount)
      .limit(pageSize)
      .exec();

    const totalCount = await countQuery.countDocuments().exec();

    return { categories, totalCount };
  }
}
