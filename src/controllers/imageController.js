let db = require('../database/models');
const { Op } = require("sequelize");

const imageController = {
    create : (id,image)=>{
        db.Image.create({
            name : image,
            products_id :id,
        }).then(()=>{
            console.log("cargue las imagenes")
        })
    }
}

module.exports = imageController