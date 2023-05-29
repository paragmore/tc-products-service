import { injectable } from "inversify";
import {
  CreateProductRequestI,
  ProductsFilterByI,
  SortI,
} from "../types/types";
import { ProductModel } from "../models/product.model";
import { SortOrder, Types } from "mongoose";

@injectable()
export class ProductsRepo {
  constructor() {}
  async getStoreProductBySlug(storeId: Types.ObjectId, slug: string) {
    const product = await ProductModel.findOne({ storeId, slug });
    return product;
  }
  async createProduct(product: CreateProductRequestI) {
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
    });

    return createdProduct;
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
}
