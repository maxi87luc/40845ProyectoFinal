import twilio from 'twilio';

import {accountSid, authToken} from '../config/enviroment.js'

const client = twilio(accountSid, authToken);

export const enviarSMS = (phone) => {
  
    
    client.messages
        .create({
            from: '+14155238886', // Número de teléfono de Twilio en formato whatsapp:
            body: `Tu pedido ha sido procesado exitosamente`, // El mensaje que se enviará
            to: `${phone}` // El número de teléfono del destinatario en formato whatsapp:
        })
        .then(message => console.log(message))
        .catch(error => console.log(error));
}