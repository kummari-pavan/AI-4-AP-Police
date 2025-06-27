// src/config/db.ts
import oracledb from 'oracledb';

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

export const connectToOracle = async () => {
  try {
    const connection = await oracledb.getConnection({
      user: 'cctns_data',
      password: 'cctnsdata25',
      connectString: '10.63.226.89:1521/testdb',
    });
    return connection;
  } catch (error) {
    console.error('❌ Oracle connection error:', error);
    throw error;
  }
};
