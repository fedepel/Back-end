const fs = require('fs').promises;

class ProductManager {

    idAdd = 1;
    #products = [];
    path = ``;

    constructor() {
        this.#products = [];
        this.path = "./products.json"
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {

        const newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.#products.push(
            {
                id: this.idAdd++,
                ...newProduct,
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

    await pm.getProducts()

    await pm.addProduct('titulo1', 'descripcion1', 200, 'imagen1', 'abcd1', 25)
    await pm.addProduct('titulo2', 'descripcion2', 100, 'imagen2', 'abcd2', 20)
    await pm.addProduct('titulo3', 'descripcion3', 150, 'imagen3', 'abcd3', 22)
    
    await pm.getProducts()

    await pm.getProductByid(3)
    await pm.getProductByid(4)
    
    await pm.updateProduct(
    {
        id: 3,
        title: 'titulo3',
        description: 'descripcion3',
        price: 250,
        thumbnail: 'imagen3',
        code: 'abcd3',
        stock: 22
    }
    )

    await pm.getProductByid(3)

    await pm.deleteProductById(2)

    await pm.getProductByid(2)
}

main();