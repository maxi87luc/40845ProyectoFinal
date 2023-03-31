import twilio from 'twilio';

const accountSid = 'ACf28fcba15e474e9b8b941f2b80067999';
const authToken = '0371b275008a6a7d411f9d1221bc488b';
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