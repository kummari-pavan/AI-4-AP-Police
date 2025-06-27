import express, { IRouter } from 'express';
import userRoute from './user.route';
import { RawDataRoute } from './rawData.route'; // ✅ Correct
import swaggerDocs from '../swaggers/openapi.json';
import swaggerUi from 'swagger-ui-express';

const router = express.Router();

/**
 * Function contains Application routes
 * @returns router
 */
const routes = (): IRouter => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });

  router.use('/users', new userRoute().getRoutes());
  router.use('/rawData', new RawDataRoute().getRoutes());

  return router;
};

export default routes;
