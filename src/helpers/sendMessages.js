import twilio from 'twilio';

const accountSid = 'ACf28fcba15e474e9b8b941f2b80067999';
const authToken = '0371b275008a6a7d411f9d1221bc488b';
const client = twilio(accountSid, authToken);

export const enviarMensajeWhatsapp = (phone, cart) => {
    console.log("ws")
    console.log(phone)
    const user = cart.name
    client.messages
        .create({
            from: 'whatsapp:+14155238886', // Número de teléfono de Twilio en formato whatsapp:
            body: `Nuevo pedido de ${user}`, // El mensaje que se enviará
            to: `whatsapp:+542346695615` // El número de teléfono del destinatario en formato whatsapp:
        })
        .then(message => console.log(message))
        .catch(error => console.log(error));
}