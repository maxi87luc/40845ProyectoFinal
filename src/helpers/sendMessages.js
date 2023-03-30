import twilio from 'twilio';

const accountSid = 'ACf28fcba15e474e9b8b941f2b80067999';
const authToken = '8fb2135d5ec12f64a7bec3b6b64f7760';
const client = twilio(accountSid, authToken);

export const enviarMensajeWhatsapp = (phone) => {
    client.messages
        .create({
            from: 'whatsapp:+14155238886', // Número de teléfono de Twilio en formato whatsapp:
            body: 'Nuevo usuario', // El mensaje que se enviará
            to: `whatsapp:+${phone}` // El número de teléfono del destinatario en formato whatsapp:
        })
        .then(message => console.log(message))
        .catch(error => console.log(error));
}