import express from "express";
import productRouter from './routes/productRouter.js'
import cartRouter from './routes/cartRouter.js';
import { dirname } from 'path';
import { errorHandler } from "./middlewares/errorHandler.js";
import { fileURLToPath } from "url";


const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(__dirname + 'public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.use(errorHandler);

const PORT = 8080;


app.listen(PORT, ()=>console.log('Server ok on port ' + PORT));
