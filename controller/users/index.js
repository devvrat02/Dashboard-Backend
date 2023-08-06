'use strict'

const express = require('express');
const router = express.Router();
const user = require("../../services/users");


router.post("/register", user.register)
router.post("/auth", user.auth)
router.post("/login", user.login)
router.post("/edit", user.edit)
router.get("/get", user.get)

module.exports = router;

