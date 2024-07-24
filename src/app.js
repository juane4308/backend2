import homeRoute from "./routes/home.routers.js"
import realTimeProducts from "./routes/realtimeproducts.router.js"
import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import viewsRouters from "./routes/viewsRuoters.route.js";
import { Server } from "socket.io";
import productManager from "./class/productManager.js"

const app = express();
const productManager = new productManager(__dirname + "/bbdd/products.json");
const PORT = 8080 || 3000

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:tru}))
app.use(express.static(__dirname + "/public"))
app.use("/api/product", producsRoute)
app.use("/appi/carts", cartsRoute)
app.use("/home", homeRoute)
app.use("realtimeproducts", realTimeProducts)
app.use("/", viewsRouters);


const httpServer = app.listen(PORT, ()=>{
    console.log("listo el server http");
})

//const io = new Server(httpServer);

//io.on("connection", (socket)=>{
    console.log("nueva conexion")
//})

export const socketServer = new Server(httpServer)

socketServer.on("connection", async (socket)=>{
    console.log("nuev.disp.conect. Id: ${socket.id}")
    const productsList = await productManager.getAllProducts()
    socket.emit("home", productsList)
    socket.emit("realTime", productsList)
    socket.on("nuevo-producto", async(producto)=>{
        await productManager.addProduct(producto)
        socket.emit("realtime", productsList)
    })
})


