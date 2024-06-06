import mongoose from 'mongoose';

const connectionString = 'mongodb://127.0.0.1:27017/Practica_Integradora_1';

export const initMongoDB = async() => {
  try {
    await mongoose.connect(connectionString);
    console.log('Conectado a la base de datos de MongoDB');
  } catch (error) {
    console.log(`ERROR => ${error}`);
  }
}