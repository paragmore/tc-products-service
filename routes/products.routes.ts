import "reflect-metadata";
import { FastifyInstance } from "fastify";
import { ProductsController } from "../controllers/products.controller";
import container from "../inversify.config";
import { ApiHelper } from "../utils/ApiHelper";
import { CreateProductRequestI, GetProductsQueryParamsI } from "../types/types";

export default async (app: FastifyInstance) => {
  const productsController =
    container.resolve<ProductsController>(ProductsController);

  // ApiHelper.get<{}, {}, {}>(
  //   app,
  //   "/",
  //   productsController.createProduct.bind(productsController)
  // );

  ApiHelper.post<CreateProductRequestI, {}, {}, {}>(
    app,
    "/create",
    productsController.createProduct.bind(productsController)
  );

  ApiHelper.get<GetProductsQueryParamsI, { storeId: string }, {}>(
    app,
    "/:storeId",
    productsController.getAllStoreProducts.bind(productsController)
  );
};
