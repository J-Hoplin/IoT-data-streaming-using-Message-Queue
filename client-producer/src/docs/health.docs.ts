export const healthCheck = {
  "/ping": {
    get: {
      summary: "Ping pong!",
      tags: ["Health"],
      responses: {
        200: {
          description: "OK",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  msg: {
                    type: "string",
                    example: "pong",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
