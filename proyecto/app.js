const express = require("express");
const app = express();
const PUERTO = 8080;

const ProductManager = require("./ProductManager.js")

const productManager = new ProductManager("../productos.json")

app.get("/api/products", async (req , res) => {
    try {
        const limit = req.query.limit;
        const productos = await productManager.getProducts();

        if (limit){
            res.json(productos.slice(0,limit));
        } else {
            res.json(productos); 
        }
    } catch (error) {
        console.log("Error al obtner los productos", error)
    }
    
})

app.get ("api/products/:pid", async (req, res) => {
    let id = req.params.pid;

    try {
        const producto = await productManager.getProductsById(parseInt(id));

        if(!producto){
            res.json({
                error: "producto no encontrado"
            });
        } else {
             res.json(producto);
        }
    } catch (error) {
        console.log("Error al buscar el id", error)
    }
})
app.listen(PUERTO);