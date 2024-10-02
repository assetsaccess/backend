// js/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Assets Access Backend API',
            version: '1.0.0',
            description: 'Base API documentation',
        },
        servers: [{ url: 'http://localhost:3000' }, { url: 'https://backend.assetsaccess.xyz' }],
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = { swaggerDocs, swaggerUi };
