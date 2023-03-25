const fs = require('fs').promises;

class ProductManager {

    idAdd = 1;
    #products = [];
    path = ``;

    constructor() {
        this.#products = [];
        this.path = "./products.json"
    }

    addProduct = async (prod) => {

        this.#products.push(
            {
                id: this.idAdd++,
                ...prod,
            }
        );

        await fs.writeFile(this.path, JSON.stringify(this.#products))
    }

    readProducts = async () => {
        let result = await fs.readFile(this.path, "utf-8")
        return JSON.parse(result)
    }

    getProducts = async () => {
        try {
            let productFile = await this.readProducts()
            return console.log(productFile)
        } catch (e) {
            await fs.writeFile(this.path, "[]")
            return console.log('File not found. New empty file created.');
        }
    }

    exist = async (id) => {
        let result3 = await this.readProducts()
        return result3.find((product) => product.id === id)
    }

    getProductByid = async (id) => {
        let result4 = await this.exist(id)
        !result4 ? console.log('Product not found') : console.log(result4)
    }

    deleteProductById = async (id) => {
        let result5 = await this.readProducts();
        let productFilter = result5.filter(products => products.id != id)
        await fs.writeFile(this.path, JSON.stringify(productFilter))
    }

    updateProduct = async ({ id, ...product }) => {
        await this.deleteProductById(id);
        let prodOld = await this.readProducts();
        let prodMod = [{ id, ...product }, ...prodOld];
        await fs.writeFile(this.path, JSON.stringify(prodMod))
    }
}

const pm = new ProductManager

const main = async () => {

    await pm.addProduct({title: 'titulo1', description: 'descripcion1', price: 200, thumbnail: 'imagen1', code: 'abc1', stock: 25})
    await pm.addProduct({title: 'titulo2', description: 'descripcion2', price: 250, thumbnail: 'imagen2', code: 'abc2', stock: 20})
    await pm.addProduct({title: 'titulo3', description: 'descripcion3', price: 350, thumbnail: 'imagen3', code: 'abc3', stock: 10})
    await pm.addProduct({title: 'titulo4', description: 'descripcion4', price: 150, thumbnail: 'imagen4', code: 'abc4', stock: 15})
    await pm.addProduct({title: 'titulo5', description: 'descripcion5', price: 300, thumbnail: 'imagen5', code: 'abc5', stock: 12})
    await pm.addProduct({title: 'titulo6', description: 'descripcion6', price: 280, thumbnail: 'imagen6', code: 'abc6', stock: 35})
    await pm.addProduct({title: 'titulo7', description: 'descripcion7', price: 220, thumbnail: 'imagen7', code: 'abc7', stock: 18})
    await pm.addProduct({title: 'titulo8', description: 'descripcion8', price: 120, thumbnail: 'imagen8', code: 'abc8', stock: 11})
    await pm.addProduct({title: 'titulo9', description: 'descripcion9', price: 100, thumbnail: 'imagen9', code: 'abc9', stock: 36})
    await pm.addProduct({title: 'titulo10', description: 'descripcion10', price: 170, thumbnail: 'imagen10', code: 'abc10', stock: 5})


    await pm.getProducts()
    
}

main();