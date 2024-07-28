import { Router } from "express";
import * as controller from "../controllers/product.controllers.js";
import { checkAuth } from "../middlewares/jwt.js";

const router = Router();

router.get("/", [checkAuth], controller.getAll);

router.get("/:id", [checkAuth], controller.getById);

router.post("/", [checkAuth], controller.create);

router.put("/:id", [checkAuth], controller.update);

router.delete("/:id", [checkAuth], controller.remove);

export default router;