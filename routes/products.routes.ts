import "reflect-metadata";
import { FastifyInstance } from "fastify";
import { ProductsController } from "../controllers/products.controller";
import container from "../inversify.config";
import { ApiHelper } from "../utils/ApiHelper";
import {
  CreateCategoryRequestI,
  CreateProductRequestI,
  DeleteProductsRequestI,
  GetCategoriesQueryParamsI,
  GetProductsQueryParamsI,
  UpdateProductRequestI,
} from "../types/types";

export default async (app: FastifyInstance) => {
  const productsController =
    container.resolve<ProductsController>(ProductsController);

  // ApiHelper.get<{}, {}, {}>(
  //   app,
  //   "/",
  //   productsController.createProduct.bind(productsController)
  // );

  ApiHelper.put<UpdateProductRequestI, {}, {}, {}>(
    app,
    "/update",
    productsController.updateProduct.bind(productsController)
  );

  ApiHelper.post<CreateProductRequestI, {}, {}, {}>(
    app,
    "/create",
    productsController.createProduct.bind(productsController)
  );

  ApiHelper.post<CreateCategoryRequestI, {}, {}, {}>(
    app,
    "/category/create",
    productsController.createCategory.bind(productsController)
  );

  ApiHelper.get<GetCategoriesQueryParamsI, { storeId: string }, {}>(
    app,
    "/category/:storeId",
    productsController.getAllStoreCategories.bind(productsController)
  );

  ApiHelper.get<GetProductsQueryParamsI, { storeId: string }, {}>(
    app,
    "/:storeId",
    productsController.getAllStoreProducts.bind(productsController)
  );

  ApiHelper.get<{}, { storeId: string; productId: string }, {}>(
    app,
    "/:storeId/:productId",
    productsController.getStoreProductById.bind(productsController)
  );

  ApiHelper.get<{}, { storeId: string; categoryId: string }, {}>(
    app,
    "/category/:storeId/:categoryId",
    productsController.getStoreCategoryById.bind(productsController)
  );

  ApiHelper.post<DeleteProductsRequestI, {}, {}, {}>(
    app,
    "/delete",
    productsController.softDeleteProducts.bind(productsController)
  );
};
