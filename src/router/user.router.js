const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const apiCallsController = require('../controller/apiCalls.controller');


router.post('/addUser', userController.add);
router.put('/updateUser', userController.update);
router.get('/callCount', apiCallsController.getAPICallCount);


module.exports = router;