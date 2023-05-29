import passport from 'passport'

import jwt from 'jsonwebtoken';


import User from '../model/userSchema.js';
import {jwtSecret} from '../config/enviroment.js'


export const login = (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
      try {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(401).json({ message: info.message });
        }
  
        // Iniciar sesión en Express Session
        req.login(user, async (err) => {
          if (err) {
            return next(err);
          }
  
          // Generar un token JWT con la información del usuario
          const token = jwt.sign({ sub: user._id }, jwtSecret);
          
        
        res.redirect('../')
        
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  }

