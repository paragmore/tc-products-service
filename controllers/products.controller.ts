import { inject, injectable } from "inversify";
import { ProductsService } from "../service/products.service";
import {
  ApiError,
  ApiHelper,
  ApiHelperHandler,
  IReply,
} from "../utils/ApiHelper";
import {
  CreateCategoryRequestI,
  CreateProductRequestI,
  GetProductsQueryParamsI,
} from "../types/types";
import { isValidObjectId } from "mongoose";

@injectable()
export class ProductsController {
  constructor(
    @inject(ProductsService) private productsService: ProductsService
  ) {}
  createProduct: ApiHelperHandler<CreateProductRequestI, {}, {}, {}, IReply> =
    async (request, reply) => {
      const { body } = request;
      if (
        !body ||
        !body.storeId ||
        !body.name ||
        !body.sellsPrice ||
        !body.category ||
        !body.quantity ||
        !body.unit
      ) {
        return ApiHelper.missingParameters(reply);
      }

      const isValidStoreId = isValidObjectId(body.storeId);
      if (!isValidStoreId) {
        return ApiHelper.callFailed(reply, "Please pass valid storeId", 400);
      }

      const isValidCategory = isValidObjectId(body.category);
      if (!isValidCategory) {
        return ApiHelper.callFailed(reply, "Please pass valid categoryId", 400);
      }
      try {
        const response = await this.productsService.createProduct(body);
        return ApiHelper.success(reply, response);
      } catch (error) {
        //@ts-ignore
        return ApiHelper.callFailed(reply, error.message, 500);
      }
    };

  createCategory: ApiHelperHandler<CreateCategoryRequestI, {}, {}, {}, IReply> =
    async (request, reply) => {
      const { body } = request;
      if (!body || !body.storeId || !body.name || !body.description) {
        return ApiHelper.missingParameters(reply);
      }
      const isValidStoreId = isValidObjectId(body.storeId);
      if (!isValidStoreId) {
        return ApiHelper.callFailed(reply, "Please pass valid storeId", 400);
      }
      try {
        const response = await this.productsService.createCategory(body);
        return ApiHelper.success(reply, response);
      } catch (error) {
        //@ts-ignore
        return ApiHelper.callFailed(reply, error.message, 500);
      }
    };

  getAllStoreProducts: ApiHelperHandler<
    {},
    GetProductsQueryParamsI,
    {},
    { storeId: string },
    IReply
  > = async (request, reply) => {
    const { query, params } = request;
    const pageSize = (query.pageSize && parseInt(query.pageSize)) || 10;
    const page = (query.page && parseInt(query.page)) || 1;
    const nextPage = page + 1;
    const previousPage = page - 1;
    const {
      sortBy,
      sortOrder,
      category,
      maxPurchasePrice,
      maxQuantity,
      maxSellsPrice,
      minPurchasePrice,
      minQuantity,
      minSellsPrice,
    } = query;

    const filterCategories = category ? category.split(",") : [];
    const filterBy = {
      maxPurchasePrice,
      maxQuantity,
      maxSellsPrice,
      minPurchasePrice,
      minQuantity,
      minSellsPrice,
      category: filterCategories,
    };
    const productsResponse = await this.productsService.getAllStoreProducts(
      params.storeId,
      page,
      pageSize,
      {
        sortBy,
        sortOrder,
      },
      filterBy
    );
    if (productsResponse instanceof ApiError) {
      ApiHelper.callFailed(
        reply,
        productsResponse.message,
        productsResponse.code
      );
      return;
    }
    const response = {
      products: productsResponse.products,
      pagination: {
        pageSize,
        page,
        nextPage,
        previousPage,
        totalPages: Math.ceil(productsResponse.totalCount / pageSize),
        totalResults: productsResponse.totalCount,
      },
    };
    ApiHelper.success(reply, response);
  };

  getStoreCategoryById: ApiHelperHandler<
    {},
    {},
    {},
    { storeId: string; categoryId: string },
    IReply
  > = async (request, reply) => {
    const { params } = request;
    const { categoryId, storeId } = params;
    const isValidStoreId = isValidObjectId(storeId);
    if (!isValidStoreId) {
      return ApiHelper.callFailed(reply, "Please pass valid storeId", 400);
    }

    const isValidCategoryId = isValidObjectId(categoryId);
    if (!isValidCategoryId) {
      return ApiHelper.callFailed(reply, "Please pass valid categoryId", 400);
    }
    const categoryResponse = await this.productsService.getStoreCategoryById(
      storeId,
      categoryId
    );
    if (!categoryResponse) {
      return ApiHelper.success(
        reply,
        "Category with the given id not found in the store"
      );
    }
    if (categoryResponse instanceof ApiError) {
      return ApiHelper.callFailed(
        reply,
        categoryResponse.message,
        categoryResponse.code
      );
    }
    ApiHelper.success(reply, categoryResponse);
  };

  getStoreProductById: ApiHelperHandler<
    {},
    {},
    {},
    { storeId: string; productId: string },
    IReply
  > = async (request, reply) => {
    const { params } = request;
    const { productId, storeId } = params;
    const isValidStoreId = isValidObjectId(storeId);
    if (!isValidStoreId) {
      return ApiHelper.callFailed(reply, "Please pass valid storeId", 400);
    }

    const isValidProductId = isValidObjectId(productId);
    if (!isValidProductId) {
      return ApiHelper.callFailed(reply, "Please pass valid productId", 400);
    }
    const productsResponse = await this.productsService.getStoreProductById(
      storeId,
      productId
    );
    if (!productsResponse) {
      return ApiHelper.success(
        reply,
        "Product with the given id not found in the store"
      );
    }
    if (productsResponse instanceof ApiError) {
      return ApiHelper.callFailed(
        reply,
        productsResponse.message,
        productsResponse.code
      );
    }
    ApiHelper.success(reply, productsResponse);
  };
}
