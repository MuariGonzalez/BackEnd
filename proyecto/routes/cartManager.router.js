const express = require("express");
const router = express.Router();
const CartManager = require("../CartManager");
const cartManager = new CartManager("./cart.json");

router.post("/", async (req, res) => {
    try {
        const nuevoCarrito = await cartManager.crearCarrito();
        res.json(nuevoCarrito);
    } catch (error) {
        console.error("Error al crear un nuevo carrito");
        res.status(500).json({error: "Error interno del servidor"});
    }
});

router.get("/:cid", async (req, res) => {
    const cartId = parseInt(req.params.cid);
    try {
        const carrito = await cartManager.getCarritoById(cartId);
        res.json(carrito.products)
    } catch (error) {
        console.error("Error al obtener el carrito");
        res.status(500).json({error: "Error interno del servidor"});
    }
});

router.post("/:cid/product/:pid", async (req, res) =>{
    const cartId = parseInt(req.params.cid);
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
        const actualizarCarrito = await cartManager.agregarProductoAlCarrito(cartId, productId, quantity);
        res.json(actualizarCarrito.products);
    } catch (error) {
        console.error("Erroe al agregar producto al carrito");
        res.status(500).json({error : "Error interno del servidor"});
    }
});

module.exports = router;