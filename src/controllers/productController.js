const modelController = require('../model/jsonDatabase');
let db = require('../database/models');
const { Op } = require("sequelize");
const productController = {
    cart : (req,res)=>{
        res.render('products/cart');
    },

    detail : (req,res)=>{

        let productId = req.params.id;
        db.Product.findByPk(productId,{
            include : ['images','category','state','detail','size']
        })
        .then(product => {
            
           return res.render('products/productDetail',{product})
        })
    },

    search : (req,res)=>{
        let search = req.query.searchbar;
        
        db.Product.findAll({
            where: {
                name: { [Op.like] : '%' + search + '%' }
            },
            include : ['images' ]
        }).then(products => {
            res.render('products/index',{products})
        })

    },

    create : (req,res)=>{
        res.render('products/agregarProducto');
    },

    store:(req,res)=>{
        const newProduct={
            autor:req.body.autor,
            nombre:req.body.nombre,
            categoria:req.body.categoria,
            precio:req.body.precio,
            descripcion:req.body.descripcion,
            estado:req.body.estado,
            img:req.file.filename

        }
        productModel.create(newProduct)
        console.log('cree un nuevo producto')
        res.redirect('/')
    },
    
    edit : (req,res)=>{
        let productaux=productModel.find(req.params.id)
        res.render('products/editarProducto',{productaux});
    },
    update:(req,res)=>{
        let productToUpdate = productModel.find(req.params.id)
        
        let newProduct = {

            id:productToUpdate.id,
            autor:req.body.autor,
            nombre:req.body.nombre,
            categoria:req.body.categoria,
            precio:req.body.precio,
            descripcion:req.body.descripcion,
            estado:req.body.estado,
            img:productToUpdate.img

        }
        if (newProduct.estado == ""){
            console.log(productToUpdate.estado)
            newProduct.estado = productToUpdate.estado
        }


        if (newProduct.categoria == ""){
            newProduct.categoria = productToUpdate.categoria
        }
        productModel.update(newProduct)
        res.redirect("/");
        
        

    },
    eliminar: function(req,res){
        productModel.delete(req.params.id);
        res.redirect("/");
    }
}

module.exports = productController;