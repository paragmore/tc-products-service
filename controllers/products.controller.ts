import { inject, injectable } from "inversify";
import { ProductsService } from "../service/products.service";
import {
  ApiError,
  ApiHelper,
  ApiHelperHandler,
  IReply,
} from "../utils/ApiHelper";
import { CreateProductRequestI, GetProductsQueryParamsI } from "../types/types";

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

      try {
        const response = await this.productsService.createProduct(body);
        return ApiHelper.success(reply, response);
      } catch (error) {
        //@ts-ignore
        return ApiHelper.callFailed(reply, error.message, 500);
      }
    };

  createCategory: ApiHelperHandler<CreateProductRequestI, {}, {}, {}, IReply> =
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

      try {
        const response = await this.productsService.createProduct(body);
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
}
