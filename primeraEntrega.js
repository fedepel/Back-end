class productManager {

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

        this.idAuto = this.idAuto++;
    }
}

