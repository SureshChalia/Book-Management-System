const express = require("express")
const router = express.Router()
const {auth} = require('../Middlewares/auth')

const {
  login,
  signUp,
  signUpForAdmin
} = require("../Controllers/Auth");
const {
  getAllAuthors
} = require("../Controllers/authorController")

router.post("/login", login);

router.post("/signup", signUp);

router.post("/signup-admin", signUpForAdmin);
router.get("/all-authors",auth, getAllAuthors);




module.exports = router