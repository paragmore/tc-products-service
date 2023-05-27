import { inject, injectable } from "inversify";
import { ProductsRepo } from "../repo/products.repo";

@injectable()
export class ProductsService {
  constructor(@inject(ProductsRepo) private productsRepo: ProductsRepo) {}
}
