
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const userRoutes = require('./routes/user.routes');
const waitlistRoutes = require('./routes/waitlist.routes');
const logger = require('./utils/logger');
const sequelize = require('./config/database');
const { swaggerDocs, swaggerUi } = require('./swagger');



const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT,PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(morgan('combined'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/auth', userRoutes);
app.use('/api/waitlist', waitlistRoutes);


sequelize.sync().then(() => {
    logger.info('Connected to the database');
}).catch(error => logger.error('Database connection error:', error));

module.exports = app;
