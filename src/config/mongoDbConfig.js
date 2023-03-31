import mongoose from 'mongoose';
import {mongoUri} from './enviroment.js'

let isConnected = false;



const connectToDb = async () => {
  if (!isConnected) {
    console.log('Nueva conexión');
    await mongoose.connect(mongoUri);
    isConnected = true;
    return;
  }

  console.log('Conexión existente');
  return;
};

export default connectToDb;
