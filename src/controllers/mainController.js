const jsonDB = require('../model/jsonDatabase');
const productModel = jsonDB('products')
const mainController = {
    index : (req,res)=>{

        const finalizados = productModel.findAllByField("Finalizado")
        const enEmision = productModel.findAllByField("En Curso")
        
        res.render('products/index', {finalizados, enEmision})
    }
}

module.exports = mainController;