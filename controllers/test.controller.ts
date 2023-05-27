import { inject, injectable } from "inversify";
import { ProductsService } from "../service/products.service";
import { ApiHelper, ApiHelperHandler, IReply } from "../utils/ApiHelper";

@injectable()
export class ProductsController {
  constructor(
    @inject(ProductsService) private productsService: ProductsService
  ) {}
  productsController: ApiHelperHandler<{}, {}, {}, {}, IReply> = async (
    request,
    reply
  ) => {
    return ApiHelper.success(reply, { hello: "world" });
  };
}
