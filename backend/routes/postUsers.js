const express = require('express');
const router = express.Router();
const userControllers = require("../controllers/userControllers.js")

//@route GET & POST - /
router.route("/").post(userControllers.createNewUser);
// router.route("/").get(userControllers.getUserById)
router.route("/login").post(userControllers.getUserById)
    
module.exports= router;