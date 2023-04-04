import { promises as fs } from "fs";

class ProductManager {

    path = ``;

    constructor() {
        this.path = "./src/dataBase/products.json"
    }

    readProducts = async () => {
        try {
            let result = await fs.readFile(this.path, "utf-8")
            return JSON.parse(result)
        } catch (e) {
            await fs.writeFile(this.path, "[]")
            return console.log('File not found. New empty file created.');
        }
    }

    addProduct = async (prod) => {
        try {
            let allData = await this.readProducts();
            prod.id = allData.length + 1;
            allData.push(prod)
            await fs.writeFile(this.path, JSON.stringify(allData))
            return 'Product added.';
        } catch (e) {
            await fs.writeFile(this.path, "[]")
            return console.log('File not found. New empty file created.');
        }
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
        let result = await this.readProducts()
        return result.find((product) => product.id === id)
    }

    getProductByid = async (id) => {
        let result = await this.exist(id)
        return result
    }

    updateProduct = async (id, product) => {
        await this.deleteProductById(id)
        let prodOld = await this.readProducts()
        let prodMod = [{ ...product, id }, ...prodOld]
        let prodModSorted = prodMod.sort((a, b) => a.id < b.id)
        await fs.writeFile(this.path, JSON.stringify(prodModSorted))
        return 'Product updated.'
    }

    deleteProductById = async (id) => {
        let result = await this.readProducts();
        let existingProduct = result.some(prod => prod.id === id);
        if (existingProduct) {
            let productsFiltered = result.filter(products => products.id != id)
            await fs.writeFile(this.path, JSON.stringify(productsFiltered))
            return 'Product deleted.'
        }
        return 'Product to be eliminated does not exist.';
    }
}

export default ProductManager;
