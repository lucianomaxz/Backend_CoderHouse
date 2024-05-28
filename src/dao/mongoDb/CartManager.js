import Cart from '../models/Cart.js';

class MongoCartManager {
  async createCart(cartData) {
    const cart = new Cart(cartData);
    await cart.save();
    return cart;
  }

  async getAllCarts() {
    try {
      const carts = await this.db.collection('carts').find().toArray();
      return carts;
    } catch (error) {
      throw new Error('Unable to fetch carts from MongoDB');
    }
  }
  async createCart() {
    try {
      const cart = {
        _id: uuidv4(),
        products: []
      };
      await this.db.collection('carts').insertOne(cart);
      return cart;
    } catch (error) {
      throw new Error('Unable to create cart in MongoDB');
    }
  }

  async getCartById(id) {
    try {
      const cart = await this.db.collection('carts').findOne({ _id: id });
      return cart;
    } catch (error) {
      throw new Error('Unable to fetch cart from MongoDB');
    }
  }

  async saveProductToCart(idCart, idProduct) {
    try {
      const cart = await this.getCartById(idCart);
      if (!cart) throw new Error('Cart not found');
      
      const product = {
        id: idProduct,
        quantity: 1
      };

      await this.db.collection('carts').updateOne(
        { _id: idCart },
        { $push: { products: product } }
      );

      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default MongoCartManager;
