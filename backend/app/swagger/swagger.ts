import userRoute from './userRoute.json';
import customerRoute from './customerRoutes.json';
import restaurantRoute from './restaurantRoutes.json';

const swaggerDocument = {
    openapi: "3.0.0",
    info: {
      title: "Express API Documentation",
      version: "1.0.0",
      description: "API documentation for the Express project",
      contact: {
        email: "iamakr.dev@gmail.com",
        },
    },
    servers: [
        {
        url: "http://localhost:4000/api",
        description: "Development server",
        },
    ],
    paths: {
        ...userRoute,
        ...customerRoute,
        ...restaurantRoute
    },
};
  
  export default swaggerDocument;
  