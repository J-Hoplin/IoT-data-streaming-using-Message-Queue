export const publishRequest = {
  "/publish": {
    post: {
      summary: "Publish request",
      tags: ["Producer"],
      requestBody: {
        description: "Specify severity and message to body",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                severity: {
                  type: "string",
                  example: "info",
                },
                message: {
                  type: "string",
                  example: "message",
                },
                exchangeName: {
                  type: "string",
                  example: "exchange name"
                },
                exchangeType: {
                  type: "string",
                  exmaple: "direct",
                  enum: ["direct", "fanout", "topic", "header", "x-consistent-hash"]
                }
              },
              required: ["severity", "message", "exchangeName", "exchangeType"],
            },
          },
        },
      },
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
                    example: "ok",
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
