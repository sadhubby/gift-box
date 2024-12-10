const express = require ('express');
const Router = require('express');
const mongoose = require('mongoose');
const session = require ('express-session');

const Gifts = require("../models/gifts");
const giftsData = require('../scripts/sampleData/giftsData');

const router = Router();
router.use(express.urlencoded({extended: true}));
router.use(express.json());
const app = express();
app.use(express.static('public'));


router.get('/login', (req,res) => {
    res.render('login', {layout: 'login'});
});

router.post("/check-gift", (req,res) =>{
    console.log(req.body);
    const { name } = req.body;
    const gift = giftsData.find(g => g.name == name);

    if(gift){
        req.session.name = name;
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

router.get('/api/letter', async (req, res) => {
    const name= req.session.name;
    const person = await Gifts.findOne({
        name
    });

    if(name){
        res.json({
            name,
            message: person.message
        });
    }
    else{
        res.status(400).json({error: "Name not found in session"});
    }
    
});

module.exports = router;