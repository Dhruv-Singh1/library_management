const express = require("express");
const router = express.Router();
const borrowControllers = require("../controllers/borrowControllers.js");

//@route GET & POST - /
router.route("/borrow").post(borrowControllers.borrowBook);
router.post("/return",borrowControllers.returnBook);
module.exports= router;