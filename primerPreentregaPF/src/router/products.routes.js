import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const prodRouter = Router()
const pm = new ProductManager

prodRouter.get('/', async (req, res) => {
    let limit = parseInt(req.query.limit);

    if (!limit) return res.send(await pm.readProducts())

    let allProducts = await pm.readProducts();
    let productLimit = allProducts.slice(0, limit);

    res.send(productLimit)
});

prodRouter.get('/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    let allProducts = await pm.readProducts();
    let productById = allProducts.find(product => product.id === id);
    if(productById === undefined) return res.send("Product not found")
    res.send(productById)
});

prodRouter.post('/', async (req, res) => {
    let newProd = req.body;
    res.send(await pm.addProduct(newProd))
});

prodRouter.put('/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    let updateProd = req.body;
    res.send(await pm.updateProduct(id, updateProd))
});

prodRouter.delete('/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    res.send(await pm.deleteProductById(id))
});

export default prodRouter;
