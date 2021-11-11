const productsHandler = require('../handlers/productsHandlers.js')
const path = require('path')

class productsController{
    
    // async productsTemplate(req, res){
  
    //     try {            
    //         res.sendFile(path.join(__dirname, '../../../views/layouts/productsTemplate.ejs'));
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    async getAll(req, res, next){
  
        try {
            let data = await productsHandler.getAll();
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
    async getID(req, res, next){

        try {
            let midata = await productsHandler.getById(req.params.id);
            res.json(midata);
        } catch (error) {
            next(error);
        }
    }
    async postNewProduct(req, res, next){
         
      try {
            let products = await productsHandler.getAll();
            delete req.body.userRol
            let  productToAdd = req.body;
            products.push(productToAdd)
            await productsHandler.writeFile(products);
        } catch (error) {
            next(error);
        }
    }
    async updateProduct(req, res, next){

        try {
            let products = await productsHandler.getAll();
            let  updatedProduct = req.body; 
            
            delete req.body.userRole
                       
            let indexProductToUpdate = products.indexOf(products.find(product=>
                req.body.id===product.id))

            
            products[indexProductToUpdate]=updatedProduct
            await productsHandler.writeFile(products);
        } catch (error) {
            next(error);
        }
    }
    async deleteID(req, res, next){

        try {
            await productsHandler.deleteById(req.params.id);
            
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new productsController()