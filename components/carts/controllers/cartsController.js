const cartsHandler = require('../handlers/cartsHandlers.js')
const productsHandlers = require('../../products/handlers/productsHandlers.js')

class cartsController {

        async createCart(req, res){

            let newCart = {"id": req.headers.host, "timeStamp": Date.now(), "products":[]}
            await cartsHandler.saveCart(newCart)
            res.send(`${newCart.id}-${newCart.timeStamp}`)
        }
        async getAllCarts(req, res){
            let carts = await cartsHandler.getAllCarts()
            res.json(carts)
        }

        async deleteCart(req, res){
            let carts = await cartsHandler.getAllCarts();
            const cartToDelete = carts.find( cart => {
                cart.id===req.headers.host && cart.timeStamp === Number(req.body.timeStamp)
                })
            let index = products.indexOf(cartToDelete)
            carts.splice(index,1)
            await cartsHandler.writeCarts(carts)
            res.json(carts)
        }
        async getAllProductsFromCart(req, res){
            
            let carts = await cartsHandler.getAllCarts();
            let cart = carts.find( cart => 
                cart.timeStamp==Number(req.params.id)
            );
             
            res.json(cart.products)
            return cart.products
        }

        async addToCart(req, res){
            
            let carts = await cartsHandler.getAllCarts();
            let cart = carts.find( cart => 
                cart.timeStamp==Number(req.params.id)
            );
            
            let productToAdd = await productsHandlers.getById(req.params.id_prod)
            console.log(carts)
            console.log(productToAdd)
        }

        async deleteProductFromCart(req, res){
            let carts = await cartsHandler.getAllCarts()
            console.log(carts)
            
            let cartToDeleteProduct = carts.find(cart=>
                cart.timeStamp===Number(req.params.id))
            let indexCart = carts.indexOf(cartToDeleteProduct)
            
            cartToDeleteProduct.products.forEach(product=>
                {if(product.id===req.params.id_prod){
                    cartToDeleteProduct.products.indexOf(product)
                    cartToDeleteProduct.products.splice(indexProd,1)}
                
                })
            carts[indexCart] = await productsHandlers.getById(req.params.id_prod)
            await cartsHandler.writeCarts(carts)
            console.log(carts)
        }
        }
module.exports = new cartsController()