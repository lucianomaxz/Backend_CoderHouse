import express from "express";
import ProductManager from "./productManager/ProductManager.js";

import { products } from '../products.js'
const app = express();


const PORT = 8080;

app.get('/products',(req, res) => {

try {
    try {

        const { limit } = req.query;

        if (limit){
            const newProducts = products.slice(0, limit);
            res.status(200).json(newProducts);
        }else res.status(200).json(products);

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
} catch (error) {
    
}


    
});

//params
app.get('/products/:id',(req, res) => {
    const { id } = req.params;
    const prod = products.find(p => p.id === id);
    if(!prod) res.json({msg: 'Product not found'})
    else res.json(prod);    
});



app.listen(PORT, ()=>console.log('Server ok on port ' + PORT));
