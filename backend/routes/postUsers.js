const express = require('express');
const router = express.Router();
const userControllers = require("../controllers/userControllers.js")

//@route GET & POST - /
router.route("/").post(userControllers.createNewUser);
router.route("/:id").get(userControllers.getUserById)
    
module.exports= router;