import twilio from 'twilio';
import {accountSid, authToken} from '../config/enviroment.js'

const client = twilio(accountSid, authToken);

export const enviarMensajeWhatsapp = (phone, cart) => {
    
    console.log("ws")
    console.log(phone)
    const user = cart.name
    client.messages
        .create({
            from: 'whatsapp:+14155238886', // Número de teléfono de Twilio en formato whatsapp:
            body: `Nuevo pedido de ${user}`, // El mensaje que se enviará
            to: `whatsapp:+5492346695615` // El número de teléfono del destinatario en formato whatsapp:
        })
        .then(message => console.log(message))
        .catch(error => console.log(error));
}