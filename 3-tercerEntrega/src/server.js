import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();

app.use(express.urlencoded({ extended: true }));

const PORT = 8080

const pm = new ProductManager
const readProducts = pm.readProducts()

app.get('/products', async (req, res) => {
    let limit = parseInt(req.query.limit);

    if (!limit) return res.send(await readProducts)

    let allProducts = await readProducts;
    let productLimit = allProducts.slice(0, limit);

    res.send(productLimit)
});

app.get('/products/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    let allProducts = await readProducts;
    let productById = allProducts.find(product => product.id === id);
    if(productById === undefined) return res.send("Product not found")
    res.send(productById)
});

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${server.address().port}`);
});
