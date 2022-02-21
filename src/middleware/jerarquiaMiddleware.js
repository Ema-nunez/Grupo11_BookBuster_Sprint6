function jerarquiaMiddleware(req,res,next){
    console.log(req.session);
    if(req.session.userLoged.categoria == 'administrador '){
        next();
    }else{
        return res.redirect('/')
    }
}

module.exports = jerarquiaMiddleware;