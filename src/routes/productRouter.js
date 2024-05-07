import { Router } from "express";
const router = Router();

import { __dirname } from "../path.js";

import ProductManager from "../managers/productManager/ProductManager.js";

const productManager = new ProductManager(`${__dirname}/db/products.json`);
// const productManager = new ProductManager('./products.json');

import { productValidator } from "../middlewares/productValidator.js";


router.get('/', async (req, res, next) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts();
        if (limit){
        const newProducts = products.slice(0, limit);
        res.status(200).json(newProducts);
        }else res.status(200).json(products);
    } catch (error) {
        next(error);
    }
});

router.post('/',productValidator, async (req, res) => {
    try {
        // console.log(req.body);
        const product = await productManager.addProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
})


router.get('/:id',async (req,res) => {
    try {
        const { id } = req.params;
        const product = await productManager.getProductById(id);
        if(!product) res.status(404).json({msg: 'Product not found'})
        else res.status(200).json(product);
    } catch (error) {
        next(error);
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const productUpdate = await productManager.updateProducts(req.body, id);
        if(!productUpdate) res.status(404).json({msg: 'Error updating product'});
        res.status(200).json(productUpdate);
    } catch (error) {
        next(error);
    }
})


router.delete('/:id', async function (req, res) {
    try {
        const { id } = req.params;
        const deleteProduct = await productManager.deleteProduct(id);
        if(!deleteProduct) res.status(404).json({msg: 'Error deleting product'});
        else res.status(200).json({msg: `user id: ${id} deleted successfully`});
    } catch (error) {
        next(error);
    }
});


export default router;