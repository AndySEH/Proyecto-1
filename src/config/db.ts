import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const db_connect = process.env.DB_CONNECT;
    if (!db_connect) {
      throw new Error('No conexión a la base de datos');
    }
    await mongoose.connect(db_connect);
    console.log('Base de datos conectada');
  } catch (error) {
    console.error('Error conectando la base de datos:', error);
    process.exit(1); 
  }
};

export default connectDB;
