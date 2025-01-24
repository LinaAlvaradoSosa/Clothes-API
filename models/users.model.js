const mongoose = require('mongoose')

const userModel = mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    apellido:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    telefono:{
        type: Number,
        required: true,
        default: 0
    },
    direccion:{
        type:String,
        required: false,
    },
    ciudad:{
        type:String,
        required: false
    },
    dob:{
        type:String,
        required:false
    },
    roll:{
        type:String,
        required:true,
        default:"User"
    },
    imagen:{
        type:String,
        required:false,
        default:"https://static.vecteezy.com/system/resources/previews/010/260/479/non_2x/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg"
    },
    favoritos:{
        type:Array,
        required:true,
        default:""
    }
},{
    versioKey: false,
    timestamps:true
}
)

module.exports=mongoose.model('user', userModel)

/*
{
    "nombre":"Diego",
    "apellido":"Delgado",
    "email":"diegoal.delgado@gmail.com",
    "password":"asdfasdf1*",
    "telefono":"3125302489",
    "roll":"SuperAdmin"
}
    */