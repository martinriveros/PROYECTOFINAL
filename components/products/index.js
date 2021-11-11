let { Router } = require("express");
let router = new Router();
let productsController = require("./controllers/productsController.js")


module.exports = (app) =>{
    app.use('/', router);
    app.get("/api/productos", productsController.getAll);
    app.get("/api/productos/:id", productsController.getID);
    app.post("/api/productos", verifyRole, productsController.postNewProduct);
    app.put("/api/productos/:id", verifyRole, productsController.updateProduct);
    app.delete("/api/productos/:id", verifyRole, productsController.deleteID);

    // app.get("/api/productsTemplate", productsController.productsTemplate);
}

function verifyRole(req, res, next){
  req.body.userRole == "admin" ? next() : res.send('NO SE PUEDE REALIZAR LA OPERACION - NO ADMIN')
  next()
}