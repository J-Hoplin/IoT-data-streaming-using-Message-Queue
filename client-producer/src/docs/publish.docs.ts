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
                  enum: ["info", "warn", "error"],
                },
                message: {
                  type: "string",
                  example: "message",
                },
              },
              required: ["severity", "message"],
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
