import { Router } from "express";
import { UserModel } from "../daos/mongodb/models/user.model.js"  // Importar el modelo de usuario
const router = Router();

import passport from "passport";
import { checkAuth } from "../middlewares/jwt.js";
import { checkAdmin } from "../middlewares/checkAdmin.js";

import UserController from '../controllers/user.controller.js';
const controller = new UserController();



//!  BOTON: | INICIAR SESION CON GITHUB |
router.get('/register-github', passport.authenticate('github', { scope: [ 'user:email' ] }));


router.post('/register', controller.register);

router.post('/login', controller.login);

router.get('/profile', checkAuth, controller.profile);

// Endpoint para obtener todos los usuarios 
router.get('/', async (req, res) => {
  try {
    
    const users = await UserModel.find().select('first_name email role');
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
});
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) res.send(err);
        res.redirect('/login'); 
      });
});



router.get('/private', checkAuth, (req, res)=>res.json({ user: req.user }));

router.get('/', checkAdmin, controller.checkUsersLastConnection);


export default router;