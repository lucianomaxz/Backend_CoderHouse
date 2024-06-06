import fs from "fs";
import {v4 as uuidv4 } from 'uuid';


export default class ProductManager {

    
    products;

    constructor(path) {
        this.path = path;
        this.products = [];
    }

    async addProduct(obj) {
        try {
            if ((!this.isNotDuplicate(obj.code)) & (!obj.title || !obj.description || !obj.price || !obj.thumbnail || !obj.code || !obj.stock || !obj.category)){
                console.log("Please fill all the fields");
            }else{
                if(this.isNotDuplicate(obj.code)){
                    const newProduct = {
                        id: uuidv4(),
                        title: obj.title,
                        descrption: obj.description,
                        price: obj.price,
                        thumbnail: obj.thumbnail,
                        code: obj.code,
                        stock: obj.stock,
                        category: obj.category
                    }
                    this.products.push(newProduct);
                    await fs.promises.writeFile(this.path, JSON.stringify(this.products));
                    return newProduct;
                }else{
                    console.log("es un duplicado");
                }
    
            }
        } catch (e) {
            console.log(e);
        }
        

    }

    async getProducts(){
        try{
            if(fs.existsSync(this.path)){
                const products = await fs.promises.readFile(this.path,'utf8');
                return JSON.parse(products);
            } else return [];
        } catch(error){
            console.log(error);
        }
    }

    getProductById = async(productId) =>{
        const products = await this.getProducts();
        const product = products.find(product => product.id === productId);
        return product || null;
    }

    isNotDuplicate(code){
        if(this.products.find(product => product.code === code) !== undefined){
            return false;
        }else{
            return true;

        }
        
    }


    async updateProducts (obj,id){
        try {
            const products = await this.getProducts();
            let product = await this.getProductById(id);
            if(!product) return null
            product = {...product, ...obj};
            const newProducts = products.filter(p => p.id !== id);
            newProducts.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(newProducts));

            return product;
        } catch (error) {
            console.log(error);
        }
        
    }

    async deleteProduct(id){
        try {
            const products = await this.getProducts();
            if (products.length > 0) {
                const product = await this.getProductById(id);
                if(product){
                    const newProducts = products.filter(p => p.id !== id);
                    await fs.promises.writeFile(this.path, JSON.stringify(newProducts));
                    return product;
                }
            }else null;
            
        } catch (error) {
            console.error(error);
        }

    }
}

