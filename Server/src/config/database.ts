// import mongoose from 'mongoose';
// import Logger from './logger';

// import dotenv from 'dotenv';

// class Database {
//   private DATABASE: string;
//   private logger;

//   constructor() {
//     this.DATABASE =
//       process.env.NODE_ENV === 'test'
//         ? process.env.DATABASE_TEST
//         : process.env.DATABASE;

//     this.logger = Logger.logger;
//   }

//   public initializeDatabase = async (): Promise<void> => {
//     try {
//       await mongoose.connect(this.DATABASE, {
//         useFindAndModify: false,
//         useCreateIndex: true,
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//       });
//       this.logger.info('Connected to the database.');
//     } catch (error) {
//       this.logger.error('Could not connect to the database.', error);
//     }
//   };
// }


// export default Database;

import mongoose from 'mongoose';
import Logger from './logger';
import dotenv from 'dotenv';

dotenv.config(); // make sure this is loaded before using process.env

class Database {
  private DATABASE: string;
  private logger;

  constructor() {
    this.DATABASE =process.env.DATABASE as string

    this.logger = Logger.logger;
  }

  public initializeDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(this.DATABASE, {
      dbName: 'Chatbot'
    });
    this.logger.info('Connected to MongoDB Atlas.');
  } catch (error) {
    this.logger.error('Could not connect to MongoDB Atlas.', error);
  }
};
}

export default Database;
