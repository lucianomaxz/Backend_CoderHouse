import { Router } from "express";
const router = Router();
// import {
//   login,
//   logout,
//   visit,
//   infoSession,
//   register,
// } from "../controllers/user.controller.js";
import { validateLogin } from "../middlewares/validateLogin.js";

import passport from "passport";
import { isAuth } from "../middlewares/isAuth.js";
import { checkAuth } from "../middlewares/jwt.js";
import { checkAdmin } from "../middlewares/checkAdmin.js";

import UserController from '../controllers/user.controller.js';
const controller = new UserController();

// router.post("/register", passport.authenticate('register'), registerResponse);
// router.post('/register', register)

// router.post('/login', passport.authenticate('login'), loginResponse);

/* ------------------------------------ - ----------------------------------- */


//!  BOTON: | INICIAR SESION CON GITHUB |
router.get('/register-github', passport.authenticate('github', { scope: [ 'user:email' ] }));

//router.get('/profile', passport.authenticate('github', { scope: [ 'user:email' ] }), githubResponse)


router.post('/register', controller.register);

router.post('/login', controller.login);

router.get('/profile', checkAuth, controller.profile);
// router.get('/api/session/', passport.authenticate('github', { scope: [ 'user:email' ] }), githubResponse)

// router.get('/profile', passport.authenticate( 'github' , {
//     failureRedirect: '/login', 
//     successRedirect: '/profile-github', 
//     passReqToCallback: true
// }));

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) res.send(err);
        res.redirect('/login'); 
      });
});



// router.post("/login", login);
// router.post('/login', loginJwt);
// router.get("/info", validateLogin, infoSession);

router.get('/private', checkAuth, (req, res)=>res.json({ user: req.user }));

router.get('/', checkAdmin, controller.checkUsersLastConnection);

// router.get("/secret-endpoint", validateLogin, visit);
// router.post("/logout", logout);

export default router;