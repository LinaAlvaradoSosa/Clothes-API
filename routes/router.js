const express = require('express')
const router = express.Router()
const { tokenverification } = require('../middleware/jwt')
//**** Ruta de los productos
const productsController = require('../controllers/products.controller')
router.get('/products/:prenda?', productsController.getProducts)
router.get('/product/:id', productsController.getOneProduct)
router.post('/addproduct',tokenverification, productsController.addProduct)
router.delete('/deleteproduct/:id',tokenverification,productsController.deleteProduct)
router.put('/updateproduct', tokenverification,productsController.updateProduct)
router.get('/myproducts/:id',productsController.getProductByOwner)
router.get('/productbyCategory/:Category',productsController.getProductByCategory)

//********* Ruta de los usuarios
const userController = require('../controllers/users.controller')
router.get('/users' ,userController.getusers)
router.get('/user/:id', userController.getOneuser)
router.post('/adduser', userController.addUser)
router.delete('/deleteuser/:id', tokenverification,userController.deleteUser)
router.put('/updateuser/:id', tokenverification,userController.updateUser)
router.post('/validar/:id', userController.validar)


//********* Inicio de sesion
const loginController = require('../controllers/login.controller')
router.post('/validacion', loginController.login)



module.exports = router