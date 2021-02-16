import express = require('express');
import purchaseControllers = require('../Controller Implements/purchaseImplements');
const router =  express.Router();


/**************************
Create purchase
**************************/
router.post('/purchase/register',purchaseControllers.Create);

/**************************
Get all the purchasets
**************************/
router.get('/purchases',purchaseControllers.Get)

/**************************
Get all the purchases by client
**************************/
router.get('/purchasesclient',purchaseControllers.GetOne)

/**************************
Get all the products public product
**************************/
router.get('/purchasebill',purchaseControllers.GetBill)

/**************************
Update product
 **************************/
router.put('/purchase/update',purchaseControllers.Update);

/**************************
Delete product
 **************************/
router.delete('/purchase/delete',purchaseControllers.Delete);


export = router;