var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    authorizationController = require('../controllers/authorization.js');

router.route('/')
      .post(authorizationController.makeToken);

module.exports = router;
