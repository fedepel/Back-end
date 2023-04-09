import express from "express";
import prodRouter from "./router/products.routes.js";
import ProductManager from "./controllers/ProductManager.js";
import cartRouter from "./router/cart.routes.js";
import { engine } from "express-handlebars";
import { Server } from 'socket.io';
import { resolve } from "path";
import { isObject } from "util";


//EXPRESS
const app = express();
const PORT = 8080
const pm = new ProductManager()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", prodRouter);
app.use("/api/cart", cartRouter);

const httpServer = app.listen(PORT, () => {
    console.log(`Server listening on port ${httpServer.address().port}`);
});

//ARCHIVOS ESTATICOS
const staticPath = resolve('src/public');
app.use('/', express.static(staticPath));

//HANDLEBARS
const viewsPath = resolve('src/views');

app.engine('handlebars', engine({
    layoutsDir: `${viewsPath}/layouts`,
    defaultLayout: `${viewsPath}/layouts/main.handlebars`,
}));
app.set('view engine', 'handlebars');
app.set('views', viewsPath);

app.get("/", (req, res) => {
    let allProducts;

    (async () => {
        try {
            allProducts = await pm.readProducts();
        } catch (err) {
            return res.status(404).json({
                error: `Error ${err}`
            });
        }
        let data = {
            allProducts,
        };
        return res.render(`home`, data);
    })();
})

app.get("/realtimeproducts", (req, res) => {
        return res.render(`realTimeProducts`);
})

//WEBSOCKET
const socketServer = new Server(httpServer)

socketServer.on('connection', socket => {
    console.log('New client online.');

    let allProducts
    (async () => {
        try {
            allProducts = await pm.readProducts();
        } catch (err) {
            return res.status(404).json({
                error: `Error ${err}`
            });
        }
        let data = allProducts;
        socket.emit('allProducts', data)
    })();
    
})