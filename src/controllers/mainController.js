let db = require('../database/models');
const mainController = {
    index :(req,res)=>{
        
        db.Product.findAll({
            include : [
                {association : "images"}
            ]
        }).then(products =>{
            console.log(products[0].images[0].name)
            return res.render('products/index',{products})
        })
    }
}

module.exports = mainController;