import { Router } from "express";
import { __dirname } from "../path.js";
import CartController from "../controllers/cart.controllers.js";
import { checkAuth } from "../middlewares/authJwt.js";
import { checkAdmin } from "../middlewares/checkAdmin.js";

const controller = new CartController();

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Gestión del carrito de compras
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Obtiene todos los carritos
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de carritos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   products:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         productId:
 *                           type: string
 *                         quantity:
 *                           type: integer
 */
router.get("/", [checkAuth, checkAdmin], controller.getAll);

/**
 * @swagger
 * /cart/{id}:
 *   get:
 *     summary: Obtiene un carrito por ID
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del carrito
 *     responses:
 *       200:
 *         description: Detalles del carrito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productId:
 *                         type: string
 *                       quantity:
 *                         type: integer
 *       404:
 *         description: Carrito no encontrado
 */
router.get("/:id", [checkAuth], controller.getById);

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Crea un nuevo carrito
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Carrito creado exitosamente
 */
router.post("/", [checkAuth, checkAdmin], controller.create);

/**
 * @swagger
 * /cart/{id}:
 *   put:
 *     summary: Actualiza un carrito existente
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del carrito
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *     responses:
 *       200:
 *         description: Carrito actualizado exitosamente
 *       404:
 *         description: Carrito no encontrado
 */
router.put("/:id", [checkAuth, checkAdmin], controller.update);

/**
 * @swagger
 * /cart/{id}:
 *   delete:
 *     summary: Elimina un carrito
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del carrito
 *     responses:
 *       200:
 *         description: Carrito eliminado exitosamente
 *       404:
 *         description: Carrito no encontrado
 */
router.delete("/:id", [checkAuth, checkAdmin], controller.delete);

/**
 * @swagger
 * /cart/products/{idProd}:
 *   post:
 *     summary: Agrega un producto al carrito
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idProd
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Producto agregado al carrito
 */
router.post("/products/:idProd", [checkAuth], controller.addProdToCart);

/**
 * @swagger
 * /cart/{idCart}/products/{idProd}:
 *   delete:
 *     summary: Elimina un producto del carrito
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idCart
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del carrito
 *       - in: path
 *         name: idProd
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado del carrito
 *       404:
 *         description: Carrito o producto no encontrado
 */
router.delete("/:idCart/products/:idProd", [checkAuth], controller.removeProdToCart);

/**
 * @swagger
 * /cart/{idCart}/products/{idProd}:
 *   put:
 *     summary: Actualiza la cantidad de un producto en el carrito
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idCart
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del carrito
 *       - in: path
 *         name: idProd
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cantidad actualizada exitosamente
 *       404:
 *         description: Carrito o producto no encontrado
 */
router.put("/:idCart/products/:idProd", [checkAuth], controller.updateProdQuantityToCart);

/**
 * @swagger
 * /cart/clear/{idCart}:
 *   delete:
 *     summary: Limpia el carrito
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idCart
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del carrito
 *     responses:
 *       200:
 *         description: Carrito limpiado exitosamente
 *       404:
 *         description: Carrito no encontrado
 */
router.delete("/clear/:idCart", [checkAuth], controller.clearCart);

export default router; 