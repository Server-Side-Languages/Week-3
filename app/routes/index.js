const express = require("express");
const router = express.Router();
const developerRoutes = require("./developerRoutes")
const genreRoutes = require("./genreRoutes")

router.get("/", (req,res)=>{
    res.status(200).json({success: true, message:`${req.method} - Request made`});
});

router.use("/developers", developerRoutes);
router.use("/genre", genreRoutes);


module.exports = router;