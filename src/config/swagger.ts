import swaggerJsdoc from "swagger-jsdoc";

const options : swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Simple Blog API",
            version: "1.0.0",
            description: "A minimal CRUD API for users and blogs",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local Server",
            }
        ],
        security: [{
            bearerAuth: []
        }]
    },
    apis: ["./src/routes/*.ts"],
}

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;