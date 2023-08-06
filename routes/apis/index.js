'use strict'
const express = require('express');
const { auth } = require('../../middleware/auth');
const router = express.Router();
const userController= require('../../controller/users')

// router.use('/user',auth,userController)
router.use('/user',userController)

router.get("/ping", (_req, res, next) => {
    res.send("version 1");
});


module.exports = router;
