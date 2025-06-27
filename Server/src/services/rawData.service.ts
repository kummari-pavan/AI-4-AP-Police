// src/services/rawData.service.ts
import { connectToOracle } from '../config/db';

export const fetchAllTables = async (): Promise<any[]> => {
  const connection = await connectToOracle();
  try {
    const result = await connection.execute(
      `SELECT * FROM M_POLICE_UNITS`
    );
    return result.rows as any[];
  } finally {
    await connection.close();
  }
};
