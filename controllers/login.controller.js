const userModel = require('../models/users.model')
const jwt = require('jsonwebtoken')
require('dotenv').config()
exports.login = async (req, res)=>{
    try {
        let infoUser = req.body
        let user = await userModel.findOne({email: infoUser.email})

        if (user) {
            let clave = infoUser.password
            if (user.password == clave) {
                let payload = {
                    id: user._id,
                    roll: user.roll,
                    nombre: `${user.nombre} ${user.apellido}`
                }
                let SECRET_KEY_JWT= process.env.SECRET_KEY_JWT
                let token = jwt.sign(payload, SECRET_KEY_JWT, {expiresIn:"1h"})
                res.status(200).json({token:token, id:user._id})
                


            }else{
                res.status(400).send({msj:"Credenciales invalidas"})
            }
        }else{
            res.status(400).send({msj:"Credenciales invalidas"})
        }


    } catch (error) {
        console.log(error.message);
        res.status(500).send({error: "Ha ocurrido algo comunicate con el admin"})
        
    }
}