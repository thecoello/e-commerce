import express = require('express');
import ProductsControllers = require('../Controller Implements/productsImplements');
const router =  express.Router();


/**************************
Create product
**************************/
router.post('/product/register',ProductsControllers.Create);

/**************************
Get product
**************************/
router.get('/products',ProductsControllers.Get)

/**************************
Get all the products public product
**************************/
router.get('/allproducts',ProductsControllers.GetPublic)

/**************************
Get products by category
**************************/
router.get('/product/category/',ProductsControllers.GetPublicByCategory)

/**************************
Update product
 **************************/
router.put('/product/update',ProductsControllers.Update);

/**************************
Delete product
 **************************/
router.delete('/product/delete',ProductsControllers.Delete);


export = router;