const express = require("express");
const router = express.Router();

// Router é a mesma coisa que o app
router.get("/articles",(req,res) => {
    res.send("articles")
});

module.exports = router;