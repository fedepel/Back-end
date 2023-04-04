import { promises as fs } from "fs";
import ProductManager from "./ProductManager.js";

const pm = new ProductManager

class CartManager {

    path = ``;

    constructor() {
        this.path = "./src/dataBase/carts.json"
    }

    readCarts = async () => {
        try {
            let result = await fs.readFile(this.path, "utf-8")
            return JSON.parse(result)
        } catch (e) {
            await fs.writeFile(this.path, "[]")
            return console.log('File not found. New empty file created.');
        }
    }

    addCarts = async (cart) => {
        try {
            let allCarts = await this.readCarts();
            let id = allCarts.length + 1;
            let cartsConcat = [{id: id, products: []}, ...allCarts];
            await fs.writeFile(this.path, JSON.stringify(cartsConcat));
            return 'Cart added.'
        } catch (e) {
            await fs.writeFile(this.path, "[]")
            return console.log('File not found. New empty file created.');
        }
    }

    exist = async (cid) => {
        let carts = await this.readCarts()
        return carts.find((cart) => cart.id === cid)
    }

    getCartByid = async (cid) => {
        let result = await this.exist(cid)
        return result
    }

    addProductInCart = async (cartId, productId) => {
        let cartById = await this.exist(cartId);
        if(cartById === undefined) return "Cart not found.";
        
        let prodById = await pm.exist(productId);
        if(prodById === undefined) return "Product not found.";
        
        let allCarts = await this.readCarts();
        let cartFilter = allCarts.filter(cart => cart.id != cartId);

        if(cartById.products.some(prod => prod.id === productId)){
            let productInCart = cartById.products.find(prod => prod.id === productId)
            productInCart.quantity++
            let cartConcat = [cartById, ...cartFilter]
            await fs.writeFile(this.path, JSON.stringify(cartConcat));
            return "Selected product increased."
        }

        let cartConcat = [{id: cartId, products: [{id: productId, quantity: 1}]}, ...cartFilter];
        await fs.writeFile(this.path, JSON.stringify(cartConcat));
        return "Product was succesfully added to cart."
    }

}

export default CartManager;
