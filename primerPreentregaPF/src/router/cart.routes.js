import { Router } from "express";
import CartManager from "../controllers/CartManager.js";

const cartRouter = Router();
const carts = new CartManager;

cartRouter.post("/", async (req, res) => {
    res.send(await carts.addCarts())
})

cartRouter.get("/", async (req, res) => {
    res.send(await carts.readCarts())
})

cartRouter.get("/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    let allCarts = await carts.readCarts();
    let cartById = allCarts.find(cart => cart.id === id);
    if(cartById === undefined) return res.send("Cart not found");
    res.send(cartById)
})

cartRouter.post('/:cid/products/:pid', async (req, res) => {
    let cartId = parseInt(req.params.cid);
    let prodId = parseInt(req.params.pid);
    res.send( await carts.addProductInCart(cartId, prodId))
})

export default cartRouter;
