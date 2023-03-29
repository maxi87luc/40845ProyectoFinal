import  mongoose from 'mongoose' ;

const { Schema, model } = mongoose;

const sessionUserSchema = new Schema({

  
  username: { type: String, required: true },
  
  password: { type: String, required: true },
  
  
});

const SessionUser = model('sessionUser', sessionUserSchema);

export default SessionUser;