
import nodemailer from 'nodemailer'
import {mymail, mailService, mailPassword} from '../config/enviroment.js'

console.log(mymail, mailPassword)
const transporter = nodemailer.createTransport({
    service: mailService,
    auth: {
        user: mymail,
        pass: mailPassword
    }
});

export const enviarCorreo = (user) => {
    const mailOptions = {
      from: mymail,
      to: user.username,
      subject: 'Nuevo usuario',
      text: `
        Nuevo Usuario
        email: ${user.username}
        nombre: ${user.name}
        direccion: ${user.address}
        edad: ${user.age}
        phone: ${user.phone}
        
      `
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Correo electrónico enviado: ${info.response}`);
      }
    });
  };