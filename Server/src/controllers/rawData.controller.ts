// src/controllers/rawData.controller.ts
import { Request, Response } from 'express';
import { fetchAllTables } from '../services/rawData.service';

export const getAllTables = async (req: Request, res: Response) => {
  try {
    const tables = await fetchAllTables();
    res.status(200).json(tables);
  } catch (error) {
    console.error('❌ Controller Error:', error);
    res.status(500).json({ error: 'Failed to fetch tables' });
  }
};
