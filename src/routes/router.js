const express = require ('express');
const Router = require('express');
const mongoose = require('mongoose');
const session = require ('express-session');

const Gifts = require("../models/gifts");

const router = Router();
router.use(express.json());
const app = express();
app.use(express.static('public'));


router.get("/", (req,res) =>{
    try{
    res.render("giftbox");
    }
    catch (error) {
        console.error("Error displaying", error);
        res.status(500).send('Error');
    }
});

module.exports = router;