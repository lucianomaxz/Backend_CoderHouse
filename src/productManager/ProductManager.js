import fs from "fs";
import {v4 as uuidv4 } from 'uuid';


export default class ProductManager {

    
    products;

    constructor(path) {
        this.path = path;
        this.products = [];
    }

    async addProduct(title,description,price,thumbnail,code,stock) {
        try {
            if (!this.isNotDuplicate(code) & !title || !description || !price || !thumbnail || !code || !stock){
                console.log("Please fill all the fields");
            }else{
                if(this.isNotDuplicate(code)){
                    const newProduct = {
                        id: uuidv4(),
                        title: title,
                        descrption: description,
                        price: price,
                        thumbnail: thumbnail,
                        code: code,
                        stock: stock,
                    }
                    this.products.push(newProduct);
                    await fs.promises.writeFile(this.path, JSON.stringify(this.products));
                    return newProduct;
                }else{
                    console.log("es un duplicado");
                }
    
            }
        } catch (e) {

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


    // idGenerator(){
    //     return this.products.length + 1;
    // }

    getProductById = async(productId) =>{
        const products = await this.getProducts();
        const product = products.find(product => product.id === productId);
        return product || "not found";
    }

    isNotDuplicate(code){
        if(this.products.find(product => product.code === code) !== undefined){
            return false;
        }else{
            return true;

        }
        
    }


    // updateProduct = async(id, nombrePosicion, newValue) => {
    //     const products = await this.getProducts();
    //     const index = products.findIndex(p => p.id === id);

            
    //     const product = products[index];
    //     product[nombrePosicion] = newValue;

    //     await fs.promises.writeFile(this.path, JSON.stringify(products));

    // }

    updateProduct = async(id, nombrePosicion, newValue) => {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === id);
        
        products[index][nombrePosicion] = newValue;

        await fs.promises.writeFile(this.path, JSON.stringify(products));

    }

    async updateProducts (obj,id){
        try {
            const products = await this.getProducts();
            const product = this.getProductById(id);
            if(!product) return "Product not found"
            product = {...product, ...obj};
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return product;
        } catch (error) {
            console.log(error);
        }
        
    }

    async deleteProduct(id){
        const products = await this.getProducts();
        const product = products.filter(p => p.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(product));
    }
}

//  

// test();
