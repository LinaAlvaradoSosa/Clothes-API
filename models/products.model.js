const mongoose = require('mongoose')

const productModel = mongoose.Schema({
    prenda:{
        type: String,
        required: true
    },
    tipo:{
        type: String,
        required: false
    },
    precio:{
        type: Number,
        required: true
    },
    estado:{
        type: String,
        required: true
    },
    marca:{
        type: String,
        required: false
    },
    imagen:{
        type: Array,
        required: true
    },
    descripcion:{
        type: String,
        required: true
    },
    talla:{
        type:String,
        required:false
    }, 
    owner:{
        type:String,
        required:true,
        default:"asd"
    }
    
})
module.exports = mongoose.model('product', productModel)

/*
{
    "prenda":"zapatos",
    "tipo":"deportivos",
    "precio":15000,
    "estado":"medio",
    "marca":"vans",
    "imagen":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMYkAb9CQ0y4Kr593LUL0rySsYbazwaWAbtQ&s",
    "descripcion":"Tenis talla 32 vans color negro"
    "talla":39    
}
    */