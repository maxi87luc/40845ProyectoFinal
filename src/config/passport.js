import passport from 'passport'
import { Strategy } from 'passport-local'
import {hash, hashSync, compareSync} from 'bcrypt'
import UsersdaoMongoDb  from '../daos/users/UsersDaoMongoDb.js'
import SessionUser from '../model/sessionUserSchema.js'

const sessionUsers = new UsersdaoMongoDb({name: "sessionUsers", model: SessionUser})

//passport login -----------------------------------------------------------


passport.use('login', new Strategy((username, password, done) => {
    const user = sessionUsers.getByUserName({username: username})
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
passport.use('signup', new Strategy({
    usernameField: 'username',
    passwordField: 'password'
    },
    (username, password, done) => {
    
    const existentUser = sessionUsers.getByUserName({username: username})
        .then(user=>{
            if (user) {
                done(new Error('User already exists'));
                return;
                }
        });
   


    const user = { username, password: hashSync(password, 10) };
    console.log({ user });
    sessionUsers.save(user);

    done(null, user);
}))

passport.serializeUser(function(user, done) {
    done(null, user.username);
  });
  
  passport.deserializeUser(function(username, done) {
    const user = sessionUsers.findOne({username: username});
    done(null, user);
  });
  