import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "MERN Backend API",
    description: "Auto-generated Swagger docs using swagger-autogen",
  },
  servers: [
    {
      url: "http://localhost:4000",
      description: "Local server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./server.js"]; // entry file

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc)
  .then(() => {
    console.log("✅ Swagger docs generated");
  });