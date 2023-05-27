import "reflect-metadata";
import { Container } from "inversify";
import { ProductsController } from "./controllers/products.controller";
import { ProductsRepo } from "./repo/products.repo";
import { ProductsService } from "./service/products.service";

const container = new Container();

container.bind<ProductsService>(ProductsService).toSelf();
container.bind<ProductsRepo>(ProductsRepo).toSelf();
container.bind<ProductsController>(ProductsController).toSelf();

export default container;
