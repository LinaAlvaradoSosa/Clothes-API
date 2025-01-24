const userModel = require("../models/users.model")
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.getusers=async(req,res)=>{
    try {
        let roll = req.usuario.roll     
        if (roll == "SuperAdmin") {
            let data = await userModel.find()
            res.status(200).json(data)
        }else{
            res.status(500).send({error: "Roll no es el correcto"})
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({error:"Ha ocurrido un error comunicate con el admin"})
        
    }
}
exports.getOneuser=async(req,res)=>{
    try {
        let id = req.params.id
        let user = await userModel.findOne({_id:id})
        res.status(200).json(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({error:"Ha ocurrido un error comunicate con el admin"})
    }
}
exports.addUser=async(req,res)=>{
    try {
    let regexEmail = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/
    let email = req.body.email
    
    if (regexEmail.test(email)) {
        let exist = await userModel.findOne({email: email})
        if (!exist) {
            let user = req.body
            let newUser = new userModel(user)
            await newUser.save()
            res.status(200).json(newUser)
        } else {
            res.status(400).send({msj:"Correo ya existe"})
        }
    } else {
        res.status(400).send({error:"Correo Invalido"})
    }
    } catch (error) {
    console.log(error.message);
    res.status(500).send({error:"ha ocurrido un error comunicate con el admin"})
    }
}
exports.deleteUser=async(req,res)=>{
    try {
        let id = await req.params.id
        if (id.length == 24) {
            let user = await userModel.findById({_id: id})
            if (user) {
                let deleteduser= await userModel.findOneAndDelete({_id:id})
                console.log("Usuario eliminado correctamente");
                res.status(200).json(deleteduser)
            }else{
                console.log("Usuario no encontrado");
                res.status(400).send({error:"Usuario no encontrado"})
            }
        }else{
            res.status(400).send({msj:"Id no contiene los caracteres sufucientes"})
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({error:"ha ocurrido un error comunicate con el admin"})
    }
}
exports.updateUser=async(req,res)=>{
    try {
        let id = await req.params.id
        let body = req.body
        if (id.length == 24) {
            console.log(body);
            
            let user = await userModel.findById(id)
            if (user){
                Object.assign(user, body)
                await userModel.findOneAndUpdate({_id:id}, user)
                res.send()
            }
        }else{
            console.log(error.message); 
            res.status(400).send({msj:"Id no contiene los caracteres sufucientes"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({error:"Ha ocurrido un error, comunicate con el admin"})
    }
}

exports.validar = async (req, res)=> {
    try {
        let id=req.params.id
        console.log(id)
        let token = req.body.token
        console.log(token);
        let SECRET_KEY_JWT = process.env.SECRET_KEY_JWT
        if (token){
            console.log(token)
            console.log("Hi")
            
            jwt.verify(token, SECRET_KEY_JWT,(error, decoded)=>{
                console.log(decoded);
                
                if (error) {
                    res.status(401).send({error:"Token invalido"})
                }
                if(decoded.id==id){
                    res.send(true)
                }else{
                    res.send(false)
                }
            })
        } else {
            res.status(400).send({error:"Token no proporcionado"})
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send({error:error})
    }
}