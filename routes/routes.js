let products = require("../components/products/index.js");
let carts = require("../components/carts/index.js");

module.exports = (app) => {
    
    products(app);
    carts(app)

    app.get("/", (req, res)=>{
        res.render('layouts/general');
    });
}

