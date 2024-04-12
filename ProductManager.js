class ProductManager {

    products;

    constructor() {
        this.products = []
    }

    addProduct(title,description,price,thumbnail,code,stock) {
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
            }else{
                console.log("es un duplicado");
            }

        }

    }

    getProducts() {
        return this.products;
    }

    idGenerator(){
        return this.products.length + 1;
    }

    getProductById(id){
       return this.products.find(product => product.id === id) ? this.products[id] : "Not Found";
    }

    isNotDuplicate(code){
        if(this.products.find(product => product.code === code) !== undefined){
            return false;
        }else{
            return true;

        }
        
    }
}

const product1 = new ProductManager();
console.log(product1.getProducts());

product1.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25);

console.log(product1.getProducts());

product1.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25);

console.log(product1.getProductById(22));
