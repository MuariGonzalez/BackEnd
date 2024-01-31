const express = require ("express")
const router = express.Router();

const ProductManager = require("../ProductManager.js");
const productManager = ProductManager ("./products.json")

router.get("/", async (req, res)=> {
    try {
        const limit = req.query.limit;
        const productos = await productManager.getProducts();
        if (limit){
            res.json(productos.slice(0, limit));
        } else {
            res.json(productos);
        }
    } catch (error) {
        console.error("Error al obtener productos")
        res.status(500).json({
            error: "Error interno del servidor"
        })
    }
});

router.get("/:pid" , async (req, res)=> {
    const id = req.params.pid;

    try {
        const producto = await productManager.getProductById(parseInt(id));
        if (!producto) {
            return res.json({
                error: "Producto no encontrado"
            });
        }

        res.json(producto);
    } catch (error) {
        console.error("Error al obtener producto");
        res.status(500).json({
            error: "Error interno del servidor"
        });
        
    }
});

router.post("/", async (req, res) => {
    const nuevoProducto = req.body;

    try {
        await productManager.addProduct(nuevoProducto);
        res.status(201).json({
            message: "Producto agregado"
        });
    } catch (error) {
        console.error("Error al agregar producto");
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});

router.put("/:pid", async (req, res) =>{
    const id = req.params.pid;
    const productoActualizado = req.bady;

    try {
        await productManager.updateProduct(parseInt(id), productoActualizado);
        res.json({
            message: "Producto actualizado"
        });
    } catch (error) {
        console.error("Error al actualizar el producto")
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});

router.delete("/:pid", async (req,res) => {
    const id = req.params.pid;

    try {
        await productManager.deleteProduct(parseInt(id));
        res.json({
            message: "Producto eliminado exitosamente"
        });
    } catch (error) {
        console.error("Error al eliminar el producto");
        res.status(500).json({
            error: "Error interno del servidor"
        });
        
    }
});

module.exports = router;
