const fs = require('fs');
const path = require('path');

const _file='../../../utils/products.json'

class productsHandler {
  constructor(_file){
    this.ruta = path.resolve(__dirname, _file);
  }
  async save(product) {
      
    const products = await this.getAll();

    if(products.length===0){
      product.id=1
    } else {
      product.id = products[products.length-1].id+1
    }
    
    products.push(product)
    
    let newData = JSON.stringify(products)
    
    await this.writeFile(newData)
    
  }
  async getAll() {
    try{
      
      let products = JSON.parse(await fs.promises.readFile(`${this.ruta}`, 'utf-8'))
      
      return products

    } catch (err){console.log('ERROR AL LEER EN GETALL ' + err)}
  }
  
  async getById(id) {
      const products = await this.getAll();
      const product = products.find(element=> element.id===Number(id))
      if(product===undefined){
        console.log(null)
      } else {
        return product
      }
  }
 
  async deleteById(id){
    
    const products = await this.getAll(_file);
    const objectToDelete = products.find((element) => element.id===Number(id))
    let index = products.indexOf(objectToDelete)
    products.splice(index,1)
    await this.writeFile(products)
    

  }
  async writeFile(data){
    let adecuateData = JSON.stringify(data, null, 2)
    try {
      await fs.promises.writeFile(`${this.ruta}`, adecuateData, 'utf-8')
 
    } catch (err) {
      console.log('error al escribir' + err)
      }
      }
    }

module.exports = new productsHandler(_file)