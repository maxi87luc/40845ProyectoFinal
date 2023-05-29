import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

import {hash, hashSync, compareSync} from 'bcrypt'

import {users} from '../routes/signin.js'




//passport login -----------------------------------------------------------


passport.use('login', new Strategy((username, password, done) => {

    const user = users.getByUserName(username)
        .then((user)=>{            
            if(!user){
                done(null, false)
                return
            } 
            if(compareSync(password, user.password)){
                done(null, user);
                return;
            }
            done(null, false);
        })

    
}))

//passport signup -------------------------------------------------
passport.use('signup', new JwtStrategy({
    usernameField: 'username',
    passwordField: 'password'
    },
    (username, password, done) => {
    
    const existentUser = users.getByUserName(username)
        .then(user=>{
            if (user) {
                done(new Error('User already exists'));
                return;
                }
        });
   


    const user = { username, password: hashSync(password, 10) };
   
    

    done(null, user);
}))

passport.serializeUser(function(user, done) {
    done(null, user.username);
  });
  
  passport.deserializeUser( (username, done)=> {
    
    const fullUser = users.getByUserName(username)
        .then(fullUser=>{
            const user = {
                username: fullUser.username,
                password: fullUser.password
            }
            
            
            done(null, user);
        })  
        
  });
  