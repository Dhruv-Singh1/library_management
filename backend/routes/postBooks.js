const express = require('express');
const router = express.Router();
const postControllers = require("../controllers/bookControllers.js")

//@route GET & POST - /
router
    .route("/")
    .get(postControllers.getAllBooks)
    .post(postControllers.createNewBook);

 router.route("/:id").get(postControllers.getBookById);
router.route("/title/:title").get(postControllers.getBookByTitle);

module.exports= router;