import { promises as fs } from "fs";

class ProductManager {

    idAdd = 1;
    #products = [];
    path = ``;

    constructor() {
        this.#products = [];
        this.path = "./src/products.json"
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

export default ProductManager;