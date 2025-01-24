const productModel = require("../models/products.model");
const usersModel = require("../models/users.model");
exports.getProducts=async(req,res)=>{
    try {
        let prenda = req.params.prenda
        if (prenda) {
            let dataproducts = await productModel.find({prenda:{$regex:prenda, $options: 'i'}});
            res.status(200).json(dataproducts)
        }else{
            let dataproducts = await productModel.find(); 
            res.status(200).json(dataproducts);
        }   
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Ha ocurrido algo inesperado, comuncate con el admin" });
    }
}
exports.getOneProduct=async(req,res)=>{
    try {
        let id = req.params.id;
        if (id.length == 24) {
            let product = await productModel.findOne({_id:id})
            if (product) {
                res.status(200).json(product)  
            }else{
                res.status(400).send({ error: "No se encuentra el producto" });
            }
        }else{
            res.status(400).send({ error: "ID incorrecto" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Ha ocurrido algo inesperado, comuncate con el admin" });
    }
}
exports.addProduct=async(req,res)=>{
    try {
        let product = req.body
        let ownerid = req.usuario.id
        let roll = req.usuario.roll
        
        if (roll == ("user")|| ("SuperAdmin")) {

            product.owner = ownerid
            let newProduct = new productModel(product);
            await newProduct.save();
            res.status(201).json(newProduct);
        }else{
            res.status(500).send({error: "Roll no es el correcto"})
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: "Ha ocurrido algo inesperado, comuncate con el admin" });
    }
}
exports.deleteProduct=async(req,res)=>{
    try {
        let id = req.params.id
        if (id.length == 24) {
            let product = await productModel.findById(id)
            if (product) {
                let deletedProduct = await productModel.findOneAndDelete({ _id: id });
                res.status(200).json(deletedProduct);
            }else{
                res.send({ error: "No se encuentra ningun producto" });
            }
        }else{
            res.send({error: "No se encuentra ningun producto"})
        }   
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: "Ha ocurrido algo inesperado, comuncate con el admin" });
    }
}
exports.updateProduct=async(req,res)=>{
    try {
        let id = await req.params.id
        let body = req.body
        if (id.length==24) {
            let product = await productModel.findById(id)
            if (product) {
                Object.assign(product, body)
                await productModel.findOneAndUpdate({_id:id}, {product})
                res.status(200).send("producto modificado")
            } else {
                res.status(400).send("no se encontro producto")
            }
        }else{
            res.status(400).send({msj:"Id no contiene los caracteres sufucientes"})
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({error:"Ha ocurrido un error, comunicate con el admin"})
    }
}
exports.getProductByOwner=async(req, res)=>{
    try {
        let ownerid = req.params.id
        if (ownerid.length==24) {
            let owner = await productModel.find({owner:ownerid})
            res.json(owner)
        }else{
            res.status(400).send({error:"ID incorrecto" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({error:"Ha ocurrido un error, comunicate con el admin"})
    }
    
}

exports.getProductByCategory=async(req, res)=>{
    try {
        let categoria = req.params.Category
        console.log(categoria);
        let products = await productModel.find({tipo:categoria})
        res.json(products)

    } catch (error) {
        console.log(error.message);
        res.status(500).send({error:"Ha ocurrido un error, comunicate con el admin"})
    }
}
