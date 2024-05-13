const socketClient = io();


socketClient.on('saludoDesdeBack', (message)=>{
    console.log(message);

    socketClient.emit('respuestaDesdeFront', 'Muchas gracias')
})


const form = document.getElementById('form')
const inputName = document.getElementById('name')
const inputPrice = document.getElementById('price')
const inputDescription = document.getElementById('description')

const inputImagen = document.getElementById('imagen')

const inputCode = document.getElementById('code')

const inputStock = document.getElementById('stock')

const inputCategory = document.getElementById('category')

const products = document.getElementById('products')

form.onsubmit = (e) => {
    e.preventDefault();
    const name = inputName.value;
    const price = inputPrice.value;
    const description = inputDescription.value;
    const imagen = inputImagen.value;
    const code = inputCode.value;
    const stock = inputStock.value;
    const category = inputCategory.value;

    const product = {
        name,
        price,
        description,
        imagen,
        code,
        stock,
        category,
    };
    socketClient.emit('newProduct', product);
}

socketClient.on('products', (arrayProducts)=>{
    let infoProducts = '';
    arrayProducts.map((prod)=>{
        infoProducts += `${prod.name} - $${prod.price} - ${prod.description} - ${prod.imagen} - ${prod.code} - ${prod.stock} - ${prod.category}</br>`
    })
    products.innerHTML = infoProducts
})

socketClient.on('message', (message)=>{
    console.log(message);
})