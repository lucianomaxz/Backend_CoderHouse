import express from "express";
import morgan from 'morgan';
import productRouter from './routes/productRouter.js'
import cartRouter from './routes/cartRouter.js';
import { dirname } from 'path';
import { errorHandler } from "./middlewares/errorHandler.js";
import { fileURLToPath } from "url";
import { Server } from 'socket.io'
import handlebars from "express-handlebars";
import { initMongoDB } from './db/database.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import userRouter from './routes/user.router.js';
import viewsRouter from './routes/views.router.js';
import MongoStore from 'connect-mongo';
import 'dotenv/config';


const storeConfig = {
  store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      crypto: { secret: process.env.SECRET_KEY },
      ttl: 180,
  }),
  secret: process.env.SECRET_KEY,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 180000 }
};


const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));


app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session(storeConfig));
app.use(morgan('dev'));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");


app.get('/realtimeproducts', (req, res)=>{
    res.render('websocket')
  })


app.use('/api/products', productRouter);
app.use('/carts', cartRouter);

app.use(errorHandler);

initMongoDB();


app.use('/users', userRouter);
app.use('/views', viewsRouter);


const PORT = 8080;

const httpServer = app.listen(8080, () => {
    console.log("Escuchando al puerto 8080");
  });

  const socketServer = new Server(httpServer);


  const products = [];

socketServer.on('connection', (socket)=>{
  console.log(`Usuario conectado: ${socket.id}`);

  socket.on('disconnect', ()=>{
    console.log('Usuario desconectado');
  })

  socket.emit('saludoDesdeBack', 'Bienvenido a websockets')

  socket.on('respuestaDesdeFront', (message)=>{
    console.log(message);
  })

  socket.on('newProduct', (prod)=>{
    products.push(prod);
    socketServer.emit('products', products);
  })

  app.post('/', (req, res)=>{
    const { message } = req.body;
    socketServer.emit('message', message);
    res.send('se envió mensaje al socket del cliente')
  })

})