const express = require('express')
const app = express()
const cors= require("cors")
app.use(cors())
app.use(express.json())

require('dotenv').config()
let PORT = process.env.PORT
const router = require("./routes/router.js")
app.use('/api', router)

const connectDB=require('./config/db.js')
connectDB()



app.listen(PORT || 4000, ()=>{
    console.log(`Server running on port: ${PORT}`);
})
