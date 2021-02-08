import express = require('express');
const router =  express.Router();
import UserControllers = require('../Controller Implements/UserImplements');


/**************************
Create user
**************************/
router.post('/user/register',UserControllers.Create);

/**************************
Get user
**************************/
router.get('/user',UserControllers.Get)

/**************************
Update user
 **************************
router.put('/user/update',UserControllers.Update);

/**************************
Delete user
 **************************
router.delete('/user/delete',UserControllers.Delete);

/**************************
 Logging user
 **************************
router.post('/login',UserControllers.Login)*/

export = router;