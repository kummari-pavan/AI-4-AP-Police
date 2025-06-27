// src/routes/rawData.route.ts
import express, { Router } from 'express';
import { getAllTables } from '../controllers/rawData.controller';

export class RawDataRoute {
  private router: Router;

  constructor() {
    this.router = express.Router();
    this.routes();
  }

  private routes(): void {
    this.router.get('/', getAllTables); // Hit /api/v1/rawData
  }

  public getRoutes(): Router {
    return this.router;
  }
}
