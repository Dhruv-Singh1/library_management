const express = require("express");
const router = express.Router();
const borrowControllers = require("../controllers/borrowControllers.js");

//@route GET & POST - /
router.route("/:id").get(borrowControllers.sendbooks)
router.route("/").get(borrowControllers.sendAllIssued);
router.route("/borrow").post(borrowControllers.borrowBook);
router.post("/return",borrowControllers.returnBook);
router.post("/renew",borrowControllers.renewBook);
router.route("/fines/:id").get(borrowControllers.sendFines)


module.exports= router;