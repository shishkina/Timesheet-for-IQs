var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser');

var userController = require('../controllers/user.js');



    router.route('/')
          .get(userController.getUsers)
          .post(userController.createUser);

    router.route('/:id')
          .get(userController.getUser);



module.exports = router;
