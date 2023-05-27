import "reflect-metadata";
import { FastifyInstance } from "fastify";
import { ProductsController } from "../controllers/products.controller";
import container from "../inversify.config";
import { ApiHelper } from "../utils/ApiHelper";

export default async (app: FastifyInstance) => {
  const productsController =
    container.resolve<ProductsController>(ProductsController);

  ApiHelper.get<{}, {}, {}>(
    app,
    "/",
    productsController.productsController.bind(productsController)
  );
};
