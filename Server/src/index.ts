import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import Database from './config/database';
import ErrorHandler from './middlewares/error.middleware';
import Logger from './config/logger';
import morgan from 'morgan';
import { connectToRabbitMQ } from './utils/rabbitMq';
import rateLimit from 'express-rate-limit';

//initialzing RabbitMQ Connection
connectToRabbitMQ();

class App {
  public app: Application;
  public host: string | number;
  public port: string | number;
  public api_version: string | number;
  public env: boolean;
  private db = new Database();
  private logStream = Logger.logStream;
  private logger = Logger.logger;
  public errorHandler = new ErrorHandler();

  constructor() {
    this.app = express();
    this.host = process.env.APP_HOST;
    this.port = process.env.APP_PORT;
    this.api_version = process.env.API_VERSION;
    this.initializeMiddleWares();
    this.initializeRoutes();
    this.initializeErrorHandlers();
    this.initializeDatabase();
    this.startApp();
  }

  public initializeMiddleWares(): void {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(morgan('combined', { stream: this.logStream }));

    this.app.use(
      rateLimit({
        max:6,
        windowMs:120*1000,
        message:"Try Again after some time",
        standardHeaders:true,
        legacyHeaders:false
      })
    )
  }

  public initializeDatabase(): void {
    this.db.initializeDatabase();
  }

  public initializeRoutes(): void {
    this.app.use(`/api/${this.api_version}`, routes());
  }

  public initializeErrorHandlers(): void {
    this.app.use(this.errorHandler.appErrorHandler);
    this.app.use(this.errorHandler.genericErrorHandler);
    this.app.use(this.errorHandler.notFound);
  }
  
  
  public startApp(): void {
    this.app.listen(this.port, () => {
      this.logger.info(
        `Server started at ${this.host}:${this.port}/api/${this.api_version}/`
      );
    });
  }

  public getApp(): Application {
    return this.app;
  }
 

}


const app = new App();
export default app;
