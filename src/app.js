import express from "express";
import ProductRouter from "./router/product.routes.js";
import CartRouter from "./router/carts.routes.js";
import { engine } from "express-handlebars";
import * as path from "path";
import __dirname from "./utils.js";
import ProductManager from "./controllers/ProductManager.js";
import http from "http";
import { Server } from "socket.io";
import viewsRouter from './router/views.routes.js';

const product = new ProductManager();

const app = express();
const httpServer = http.createServer(app)
const io = new Server(httpServer)

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

app.use("/", express.static(__dirname + "/public"))

app.use("/", viewsRouter)

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on("disconnected", () => {
        console.log("a user disconnected");
    })

    socket.on("message", (msg) => {
        io.emit("message", msg);
    })
})

app.use("/api/products", ProductRouter)
app.use("/api/cart", CartRouter)

httpServer.listen(8080, () => {
    console.log(`Server Connection`);
  });