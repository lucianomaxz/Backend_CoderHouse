import Product from '../models/Product.js';

class MongoProductManager {
  async createProduct(productData) {
    const product = new Product(productData);
    await product.save();
    return product;
  }

  async getProducts() {
    return Product.find();
  }


  
    async getAll() {
      try {
        return await Product.find({});
      } catch (error) {
        throw new Error(error)
      }
    }
  
    async getById(id) {
      try {
        return await Product.findById(id);
      } catch (error) {
        throw new Error(error)
      }
    }
  
    async create(obj) {
      try {
        return Product.create(obj);
      } catch (error) {
        throw new Error(error)
      }
    }
  
    async update(id, obj) {
      try {
        return await Product.findByIdAndUpdate(id, obj, { new: true });
      } catch (error) {
        throw new Error(error)
      }
    }
  
    async delete(id) {
      try {
        return await Product.findByIdAndDelete(id);
      } catch (error) {
        throw new Error(error)
      }
    }
  
}

export default MongoProductManager;
