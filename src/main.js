import express from 'express';
import config from './config/main.config.js';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import listRoutes from 'express-route-list';
import http from 'http';
import { appRouter } from './routes/main.routes.js';
import { errorHandler } from './middleware/error.middleware.js';


// setup application
const app = express();
const server = http.createServer(app);

// setup middleware
app.use( express.urlencoded( { extended: true } ) );
app.use( express.json() );
app.use( morgan( 'dev' ) );
app.use( compression() );
app.use( cors() );
app.use( helmet() );

// setup routes
app.use( '/api/v1', appRouter );

// setup error handlers
app.use( errorHandler );


// connect to database
config.connectToDatabase();

// list routes
//listRoutes(app);

// start server
server.listen(config.server.port, () => console.info(`Application sarted on port ${config.server.port} 🚀 `));