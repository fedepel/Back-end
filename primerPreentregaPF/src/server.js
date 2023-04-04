import express from "express";
import prodRouter from "./router/products.routes.js";
import cartRouter from "./router/cart.routes.js";

const app = express();
const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", prodRouter);
app.use("/api/cart", cartRouter);

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${server.address().port}`);
});
