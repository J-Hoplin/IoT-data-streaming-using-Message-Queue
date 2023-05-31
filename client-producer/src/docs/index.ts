import swaggerJsDoc from "swagger-jsdoc";
import { healthCheck } from "./health.docs";
import { publishRequest } from "./publish.docs";

const option: swaggerJsDoc.Options = {
  definition: {
    info: {
      title: "Rabbit MQ DHT-11 producer local API",
      version: "1.0.0",
      description: "Rabbit MQ DHT-11 producer local API",
      contact: {
        name: "Hoplin",
        email: "jhoplin7259@gmail.com",
        url: "https://github.com/J-hoplin1",
      },
    },
    openapi: "3.0.0",
    servers: [
      {
        url: `http://127.0.0.1:${process.env.PORT || 4500}`,
      },
    ],
    tags: [
      {
        name: "Health",
        description: "Health check API",
      },
      {
        name: "Producer",
        description: "Producer API",
      },
    ],
    paths: {
      ...healthCheck,
      ...publishRequest,
    },
  },

  apis: [],
};

const spec = swaggerJsDoc(option);

export { spec };
