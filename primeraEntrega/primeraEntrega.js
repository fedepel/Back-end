class ProductManager {

    products = [];
    idAuto = 1;

    getProducts() {
        return this.products;
    }

    addProduct(product) {

        this.products.push(
            {
            ...product,
            id: this.idAuto,
            title: "producto prueba",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "Sin imagen",
            stock: 25
            }
        );

        this.idAuto = this.idAuto + 1;
    }
}

const productManager = new ProductManager();

productManager.addProduct();
productManager.addProduct();

console.log(productManager);