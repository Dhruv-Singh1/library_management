const express = require('express');
const router = express.Router();
const postControllers = require("../controllers/bookControllers.js")

//@route GET & POST - /
router
    .route("/")
    .get(postControllers.getAllBooks)
    .post(postControllers.createNewBook);

 router.route("/:id").get(postControllers.getBookById);

module.exports= router;