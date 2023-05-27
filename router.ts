import { FastifyInstance } from "fastify";
import productsRoutes from "./routes/products.routes";
export default async (app: FastifyInstance) => {
  app.register(productsRoutes, { prefix: "/products" });
};
