import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';

import User from '../model/userSchema.js';
import {jwtSecret} from './enviroment.js'

passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        // Buscar al usuario en la base de datos
        const user = await User.findOne({ username });
  
        if (!user) {
          return done(null, false, { message: 'Credenciales inválidas' });
        }
  
        // Comparar la contraseña ingresada con la contraseña almacenada en la base de datos
        const isMatch = await bcrypt.compare(password, user.password);
  
        if (!isMatch) {
          return done(null, false, { message: 'Credenciales inválidas' });
        }
  
        // Usuario autenticado correctamente
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );
  
  // Configuración de la estrategia JWT de Passport
  
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
  };
  
  passport.use(
    new JwtStrategy(jwtOptions, async (payload, done) => {
      try {
        // Buscar al usuario en la base de datos utilizando el ID del payload
        const user = await User.findById(payload.sub);
  
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    })
  );
  
  // Serialización y deserialización de Passport
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

// const strategy = new JwtStrategy(jwtOptions, async (payload, done) => {
//   try {
//     const user = await User.findById(payload.sub);

//     if (user) {
//       return done(null, user);
//     } else {
//       return done(null, false);
//     }
//   } catch (error) {
//     return done(error, false);
//   }
// });

// passport.use(strategy);

// export const authenticate = (req, res, next) => {
//   passport.authenticate('jwt', { session: false }, (err, user) => {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return res.status(401).json({ message: 'No autorizado' });
//     }
//     req.user = user;
//     next();
//   })(req, res, next);
// };

// export const hashPassword = async (password) => {
//   const saltRounds = 10;
//   const salt = await bcrypt.genSalt(saltRounds);
//   const hashedPassword = await bcrypt.hash(password, salt);
//   return hashedPassword;
// };

// export const comparePasswords = async (password, hashedPassword) => {
//   const isMatch = await bcrypt.compare(password, hashedPassword);
//   return isMatch;
// };
