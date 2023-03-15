class ProductManager {
    
    constructor() {
        this.products = [];
    }

    idAdd = 1

    addProduct(title, description, price, thumbnail, code, stock) {
        this.products.push(
            { 
                id: this.idAdd++, 
                title, 
                description, 
                price, 
                thumbnail, 
                code, 
                stock
            });
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        if(!this.products.find((product) => product.id === id)) {
            console.log('Producto no encontrado')
        } else {
            console.log('Existe')
        }
    }
}

const productos = new ProductManager

productos.addProduct('titulo1', 'descripcion1', 200, 'imagen1', 'abcd1', 25)
productos.addProduct('titulo2', 'descripcion2', 220, 'imagen2', 'abcd2', 20)

console.log(productos.getProducts())
productos.getProductById(1)
productos.getProductById(3)
