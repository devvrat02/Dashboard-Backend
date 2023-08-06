var express = require('express');
const v1ApiController = require('./apis');

var router = express.Router();

router.use('/v1', v1ApiController);

module.exports = router;