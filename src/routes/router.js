const express = require ('express');
const Router = require('express');
const mongoose = require('mongoose');
const session = require ('express-session');

const Gifts = require("../models/gifts");
const giftsData = require('../scripts/sampleData/giftsData');

const router = Router();
router.use(express.json());
const app = express();
app.use(express.static('public'));


router.get('/login', (req,res) => {
    res.render('login', {layout: 'login'});
});

router.post("/check-gift", (req,res) =>{
    const { name } = req.body;
    const gift = giftsData.find(g => g.name);

    if(gift){
        res.redirect('/gift-box');
    }
    else{
        res.redirect('/login');
    }
})

router.get("/gift-box", (req,res) =>{
    try{
    res.render("giftbox");
    }
    catch (error) {
        console.error("Error displaying", error);
        res.status(500).send('Error');
    }
});

router.get('/api/letter', (req, res) => {

    res.json({
        name: "Evan",
        message: `\n\nWelcome to Stardew Valley!\n\n
        We hope you enjoy your stay in this cozy little town.\n\n
        Best regards,\nMayor Lewis`
    });
});

module.exports = router;