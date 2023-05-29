import mongoose from 'mongoose';
import {mongoURL} from './enviroment.js'

let isConnected = false;



const connectToDb = async () => {
  if (!isConnected) {
    console.log('Nueva conexión');
    await mongoose.connect(mongoURL);
    isConnected = true;
    return;
  }

  console.log('Conexión existente');
  return;
};

export default connectToDb;
