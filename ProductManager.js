const fs = require('fs');

class ProductManager {

    
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
                        id: this.idGenerator(),
                        title: title,
                        descrption: description,
                        price: price,
                        thumbnail: thumbnail,
                        code: code,
                        stock: stock,
                    }
                    this.products.push(newProduct);
                    await fs.promises.writeFile(this.path, JSON.stringify(this.products));
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


    idGenerator(){
        return this.products.length + 1;
    }

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


    updateProduct = async(id, nombrePosicion, newValue) => {
        const products = await this.getProducts();
        const index = products.findIndex(p => p.id === id);

            
        const product = products[index];
        product[nombrePosicion] = newValue;

        await fs.promises.writeFile(this.path, JSON.stringify(products));

    }

    async deleteProduct(id){
        const products = await this.getProducts();
        const product = products.filter(p => p.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(product));
    }
}

const productos = new ProductManager("./productos.json");


const test = async () => {
    console.log(await productos.getProducts());
    await productos.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25);
    await productos.addProduct("2p2roducto prueba2","2Este es un producto prueba2",2200,"2Sin imagen","2abc123",25);
    console.log(await productos.getProducts());
    console.log(await productos.getProductById(1));
    console.log(await productos.getProductById(188));
    await productos.updateProduct(1,"stock","aaaa");
    console.log(await productos.getProducts());
    await productos.deleteProduct(1);
}

test();
