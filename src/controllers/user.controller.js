import { generateToken } from "../middlewares/jwt.js";
import * as services from "../services/user.services.js";

export const registerResponse = (req, res, next) => {
  try {
    res.json({
      msg: 'Register OK',
      session: req.session
    })
  } catch (error) {
    next(error);
  }
};

export const loginResponse = async (req, res, next) => {
  //req.session.passport.user
  try {
    let id = null;
    if(req.session.passport && req.session.passport.user) id = req.session.passport.user;
    const user = await services.getUserById(id);
    if(!user) res.status(401).json({ msg: 'Error de autenticacion' });
    const { first_name, last_name, email, age, role } = user;
    res.json({
      msg: 'LOGIN OK!',
      user: {
        first_name,
        last_name,
        email,
        age,
        role
      }
    })
  } catch (error) {
    next(error);
  }
};

export const githubResponse = async(req, res, next) => {
  try {
    // console.log(req.user);
    const { first_name, last_name, email, role } = req.user;
    res.json({
      msg: 'LOGIN CON GITHUB OK!',
      user: {
        first_name,
        last_name,
        email,
        role
      }
    })
    } catch (error) {
    next(error)
  }
}

export const loginJwt = async(req,res,next)=>{
  try {
    const user = await services.login(req.body);
    if(!user) res.json({msg: 'Invalid credentials'});
    const token = generateToken(user);
    res.header('Authorization', token).json({ msg: 'Login OK', token })
  } catch (error) {
    next(error)
  }
}










// import UserDao from "../daos/mongoDb/user.dao.js";
// import {UserModel} from '../daos/mongoDb/models/user.model.js';
// import * as services from "../services/user.services.js";
// const userDao = new UserDao(UserModel);

// export const registerResponse = (req, res, next)=>{
//     try {
//         res.json({
//             msg: 'Register OK',
//             session: req.session    // --> passport.user: id mongo
//         })
//     } catch (error) {
//         next(error);
//     }
// };

// export const loginResponse = async(req, res, next)=>{
//     try {
//         const user = await userDao.getById(req.session.passport.user);
//         const { first_name, last_name, email, age, role } = user;
//         res.json({
//             msg: 'Login OK',
//             session: req.session,
//             userData: {
//                 first_name,
//                 last_name,
//                 email,
//                 age,
//                 role
//             }
//         })
//     } catch (error) {
//         next(error);
//     }
// }

// export const githubResponse = async(req, res, next)=>{
//     try {
//         const { first_name, last_name, email, isGithub } = req.user;
//         res.json({
//             msg: 'Register/Login Github OK',
//             session: req.session,
//             userData: {
//                 first_name,
//                 last_name,
//                 email,
//                 isGithub
//             }
//         })
//     } catch (error) {
//         next(error);
//     }

// export const login = async(req, res) => {
//     try {
//         const { email, password } = req.body;
//         console.log(email, password)
//         const user = await userDao.login(email, password);
//         console.log(user)
//         if(!user) res.status(401).json({ msg: 'No estas autorizado' });
//                     //res.redirect('/views/error-login)
//         else {
//             req.session.email = email;
//             req.session.password = password;
//             res.redirect('/realtimeproducts');
//             console.log(user);
//         }
//     } catch (error) {
//         throw new Error(error)
//     }
// };

// export const register = async (req, res)=>{
//     try {
//         console.log(req.body)
//         const { email, password } = req.body;
//         if(email === 'adminCoder@coder.com' && password === 'adminCoder123'){
//            const user =  await userDao.register({
//                 ...req.body,
//                 role: 'admin'
//             });
//             if (!user) res.status(401).json({ msg: 'user exist!' });
//             else res.redirect('/views/login')
//         } else {
//             const user = await userDao.register(req.body);
//             if (!user) res.status(401).json({ msg: 'user exist!' });
//             else res.redirect('/views/login')
//         }
//     } catch (error) {
//         throw new Error(error)
//     }
// }

// export const visit = (req, res) => {
//     req.session.info && req.session.info.contador++;
//     res.json({ msg: `${req.session.info.username} ha visitado el sitio ${req.session.info.contador} veces` })
// };

// export const infoSession = (req, res) => {
//     res.json({
//         session: req.session,
//         sessionId: req.sessionID,
//         cookies: req.cookies
//     })
// };

// export const logout = (req, res) => {
//     req.session.destroy();
//     res.send('session destroy')
// };
// };

