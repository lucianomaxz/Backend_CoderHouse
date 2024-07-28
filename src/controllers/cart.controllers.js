import Controllers from "./class.controller.js";
import CartService from '../services/cart.services.js';
import { createResponse } from "../utils.js";
const cartService = new CartService();

export default class CartController extends Controllers{
  constructor(){
    super(cartService)
  }
  addProdToCart = async (req, res, next) => {
    try {
      // const { idCart } = req.params;
      // console.log(req.user)
      const { cart } = req.user;
      const { idProd } = req.params;
      const newProdToUserCart = await this.service.addProdToCart(
        cart,
        idProd,
      );
      if (!newProdToUserCart) createResponse(res, 404, { msg: "Error add product to cart" });
      else createResponse(res, 200, newProdToUserCart);
    } catch (error) {
      next(error);
    }
  };

  removeProdToCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const { idProd } = req.params;
      const delProdToUserCart = await this.service.removeProdToCart(
        idCart,
        idProd,
      );
      if (!delProdToUserCart) createResponse(res, 404, { msg: "cart or prod not existant" });
      else createResponse(res, 200, {msg: `product ${idProd} deleted to cart`});
    } catch (error) {
      next(error);
    }
  };

  updateProdQuantityToCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const { idProd } = req.params;
      const { quantity } = req.body;
      const  updateProdQuantity = await this.service.updateProdQuantityToCart(
        idCart,
        idProd,
        quantity
      );
      if (!updateProdQuantity) createResponse(res, 404, { msg: "cart or prod not existant" });
      else createResponse(res, 200, updateProdQuantity);
    } catch (error) {
      next(error);
    }
  };

  clearCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const clearCart = await this.service.clearCart(
        idCart,
      );
      if (!clearCart) createResponse(res, 404, { msg: "Error clear cart" });
      else createResponse(res, 200, clearCart);
    } catch (error) {
      next(error);
    }
  };

}





  
  


// import * as service from '../services/cart.services.js'

// export const getAll = async (req, res, next) => {
//     try {
//       const response = await service.getAll();
//       res.status(200).json(response);
//     } catch (error) {
//       next(error.message);
//     }
//   };
  
//   export const getById = async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const response = await service.getById(id);
//       if (!response) res.status(404).json({ msg: "Cart Not found!" });
//       else res.status(200).json(response);
//     } catch (error) {
//       next(error.message);
//     }
//   };
  
//   export const create = async (req, res, next) => {
//     try {
//       const newCart = await service.create();
//       if (!newCart) res.status(404).json({ msg: "Error create cart!" });
//       else res.status(200).json(newCart);
//     } catch (error) {
//       next(error.message);
//     }
//   };
  
//   export const update = async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const cartUpd = await service.update(id, req.body);
//       if (!cartUpd) res.status(404).json({ msg: "Error update cart!" });
//       else res.status(200).json(cartUpd);
//     } catch (error) {
//       next(error.message);
//     }
//   };
  
//   export const remove = async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const cartDel = await service.remove(id);
//       if (!cartDel) res.status(404).json({ msg: "Error delete cart!" });
//       else res.status(200).json({ msg: `Cart id: ${id} deleted` });
//     } catch (error) {
//       next(error.message);
//     }
//   };

// export const addProdToCart = async (req, res, next) => {
//     try {
//       //const { idCart } = req.params;
//       const { cart } = req.user;
//       const { idProd } = req.params;
//       const newProdToUserCart = await service.addProdToCart(
//         cart,
//         idProd,
//       );
//       if (!newProdToUserCart) res.json({ msg: "Product | Cart not exist" });
//       else res.json(newProdToUserCart);
//     } catch (error) {
//       next(error.message);
//     }
//   };

//   export const removeProdToCart = async (req, res, next) => {
//     try {
//       const { idCart } = req.params;
//       const { idProd } = req.params;
//       const delProdToUserCart = await service.removeProdToCart(
//         idCart,
//         idProd,
//       );
//       if (!delProdToUserCart) res.json({ msg: "Product | Cart not exist" });
//       else res.json({msg: `product ${idProd} deleted to cart`});
//     } catch (error) {
//       next(error.message);
//     }
//   };

//   export const updateProdQuantityToCart = async (req, res, next) => {
//     try {
//       const { idCart } = req.params;
//       const { idProd } = req.params;
//       const { quantity } = req.body;
//       const  updateProdQuantity = await service.updateProdQuantityToCart(
//         idCart,
//         idProd,
//         quantity
//       );
//       if (!updateProdQuantity) res.json({ msg: "Error update product quantity to cart" });
//       else res.json(updateProdQuantity);
//     } catch (error) {
//       next(error.message);
//     }
//   };

//   export const clearCart = async (req, res, next) => {
//     try {
//       const { idCart } = req.params;
//       const clearCart = await service.clearCart(
//         idCart,
//       );
//       if (!clearCart) res.json({ msg: "Error clear cart" });
//       else res.json(clearCart);
//     } catch (error) {
//       next(error.message);
//     }
//   };

  
  