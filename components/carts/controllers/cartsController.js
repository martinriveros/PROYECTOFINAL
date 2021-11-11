const cartsHandler = require('../handlers/cartsHandlers.js')
const productsHandlers = require('../../products/handlers/productsHandlers.js')

class cartsController {

        async createCart(req, res){

            let newCart = {"id": req.headers.host, "timeStamp": Date.now(), "products":[]}
            await cartsHandler.saveCart(newCart)
            res.send(`${newCart.id}-${newCart.timeStamp}`)
        }

        async deleteCart(req, res){
            let carts = await cartsHandler.getAllCarts();
            console.log(carts)
            const cartToDelete = carts.find( cart => {
                cart.id===req.headers.host && cart.timeStamp === Number(req.body.timeStamp)
                })
            let index = products.indexOf(cartToDelete)
            carts.splice(index,1)
            console.log(carts)
            await cartsHandler.writeCarts(carts)
            res.send(carts)
        }
        async getAllProductsFromCart(req, res){
            let carts = await cartsHandler.getAllCarts();
            console.log(carts)
            
            // let cart = carts.find( cart => {

            //     cart.products.forEach(product=>
            //         if)
            //     cart.timeStamp===Number(req.body.timeStamp)
                // console.log( cart.timeStamp)
                // console.log( Number(req.body.timeStamp))
                // })

        }
        async addToCart(req, res){
            let carts = await cartsHandler.getAllCarts();
            let productToAdd = await productsHandlers.getById(req.params.id)
            console.log(carts)
            console.log(productToAdd)


        }



    // async verifyCartExistance(req, res){
        
    //     let allCarts = await cartsHandler.getAllCarts();
    //     let productToAdd = await productsHandler.getById(req.params.id)

    //     for (let cart of allCarts){
       
    //         if  (cart.id===req.headers.host && cart.timeStamp === Number(req.body.timeStamp))
    //             {
    //             for (let product of cart.products){
    //                 if(productToAdd.id===Number(product.id)){
    //                     break
    //                 }else{
    //                     cart.products.push(productToAdd)
    //                     break   
    //                 }
                    
    //         }         
            
            
    //         } else {
    //             allCarts.push({id: req.headers.host, timeStamp: Number(req.body.timeStamp), products:[productToAdd]})
    //             break          
    //         }}
            
    //         await cartsHandler.saveCart(allCarts)
    //         return req.headers.host
       
    // }

    async getAllCarts(req, res, next){
        try {
            let data = await cartsHandler.getAll();
            res.json(data);
        } catch (error) {
            next(error);
        }}}

module.exports = new cartsController()