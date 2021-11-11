let { Router } = require("express");
let router = new Router();
let cartsController = require("./controllers/cartsController.js")


module.exports = (app) =>{
    app.use('/', router);
    // app.post("/api/carrito/:id/productos", cartsController.verifyCartExistance); // verifys for cart existance, if so, 2 ways can be taken at cartsController.

    app.post("/api/carrito", cartsController.createCart)
    app.delete("/api/carrito/:id", cartsController.deleteCart)     
    app.get("/api/carrito/:id/productos", cartsController.getAllProductsFromCart);             // ver un cart
    app.post("/api/carrito/:id/productos", cartsController.addToCart);
    // app.delete("api/carrito/:id/productos/:id_prod", cartsController.deleteProdFromCart)
    
    // app.get("/api/carritoTemplate", cartsController.productsTemplate);
}