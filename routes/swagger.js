const router = require('express').Router();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "API - Altec",
        version: "1.0.0",
        description:
          "Um teste realizado pela Altec em Node.js",
        license: {
          name: "MIT",
          url: "https://choosealicense.com/licenses/mit/"
        },
        contact: {
          name: "Daniel Luna",
          url: "https://github.com/daniellunsc",
          email: "danlunasc@gmail.com"
        }
      },
    },
    apis: ["./routes/city.js"]
  };
const specs = swaggerJsdoc(options);
router.use("/", swaggerUi.serve);
router.get(
  "/",
  swaggerUi.setup(specs, {
    explorer: true
  })
);

module.exports = router;