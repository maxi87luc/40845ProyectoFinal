import {messages, io} from '../index.js'



export const chat = async (req, res)=>{  
    const mensajes = await messages.getAll();

    res.render('chat')
}
    
