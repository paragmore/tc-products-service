import { injectable } from "inversify";
import { CreateProductRequestI } from "../types/types";
import { ProductModel } from "../models/product.model";
import { Types } from "mongoose";

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
    sortingPattern: string,
    sC?: string
  ) {
    const skipCount = (page - 1) * pageSize;
    return await ProductModel.find({storeId}).skip(skipCount).limit(pageSize).exec();
  }
}
