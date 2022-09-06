import express, { Express, Request, Response, Application } from 'express';
import * as dotenv from 'dotenv';
import routes from './routes';
import * as db from './models';
import { errors } from 'celebrate';
import environmentConfig from './constants/environment.constant';
import helmet from 'helmet';
import morgan from 'morgan';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import { default as swaggerDocument } from './swagger/swagger.json';
import swaggerUi from 'swagger-ui-express';
// import throttle from 'express-throttle';

dotenv.config();
export class App {
  private app: Application = express();

  constructor() {
    this.app.use(helmet());
    this.app.use(ExpressMongoSanitize());
    this.app.use(express.json());
    this.app.use(morgan('tiny'));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use((request, response, next) => {
      response.header('Access-Control-Allow-Origin', '*');
      response.header('Access-Control-Allow-Headers', '*');
      response.header('Access-Control-Allow-Methods', '*');
      next();
    });
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    this.app.use(routes);
    this.app.use(errors());
  }
  public async listen() {
    await db.sequelize.sync({ force: false });
    this.app.listen(environmentConfig.PORT, () => {
      console.log(`Server running on ${environmentConfig.PORT}`);
    });
    return this.app;
  }
}
