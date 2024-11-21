const swaggerAutogen = require("swagger-autogen")();

const doc = {
    Info: {
        title: "Users Api",
        description: "Users Api"
    },
    host: "localhost:8080",
    schemes: ["https"]
};

const outputFile = "./swagger.json";
const endpointFile = ["./routes/index.js"];

// this will generate swagger.json
swaggerAutogen(outputFile, endpointFile, doc);
