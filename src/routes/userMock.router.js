import * as userController from "../controllers/userMock.controller.js";
import { Router } from "express";
const router = Router();

router.post('/mockingproducts', userController.createUser);
router.get('/userMock', userController.getUsers)

export default router;