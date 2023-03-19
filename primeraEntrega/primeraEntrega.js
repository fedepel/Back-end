class ProductManager {
    
    constructor() {
        this.products = [];
    }

    idAdd = 1

    addProduct(title, description, price, thumbnail, code, stock) {

        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].code === code) {
                console.log(`The code ${code} already exists`);
                break;
            }
        }

        const newProduct = {
            title, 
            description, 
            price, 
            thumbnail, 
            code, 
            stock
        }

        if (!Object.values(newProduct).includes(undefined)) {
            this.products.push(
                {
                    id: this.idAdd, 
                    ...newProduct,
                }
                );
                this.idAdd++
        } else {
            console.log("All parameters are required")
        }

    }

    getProducts() {
        return this.products;
    }

    exist(id) {
        return this.products.find((product) => product.id === id)
    }

    getProductById(id) {
        !this.exist(id) ? console.log('Product not found') : console.log(this.exist(id))
    }

}

const productos = new ProductManager

productos.addProduct('titulo1', 'descripcion1', 200, 'imagen1', 'abcd1', 25)
productos.addProduct('titulo2', 'descripcion2', 220, 'imagen2', 'abcd1', 6)

console.log(productos.getProducts())
productos.getProductById(1)
productos.getProductById(3)
