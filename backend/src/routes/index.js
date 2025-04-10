import productRoutes from "./products/index.js";

const routes = [...productRoutes];

export default function loadRoutes(app) {
  routes.forEach((route) => {
    app[route.method](route.path, route.handler);
  });
}
