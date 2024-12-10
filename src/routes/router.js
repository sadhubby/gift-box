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
    const error = req.query.error || null;
    res.render('login', { layout: 'login', error });
});

router.post("/check-gift", (req,res) =>{
    
    const { name } = req.body;
    const gift = giftsData.find(g => g.name == name);

    if(gift){
        req.session.name = name;
        res.redirect(`/gift-box/${encodeURIComponent(name)}`);
    }
    else{
        res.redirect('/login');
    }
})

router.get("/gift-box/:name", (req,res) =>{
    const { name } = req.params;
    try{
    if (req.session.name !== name) {
        return res.redirect(`/login?error=Access%20denied`);
    }
    res.render("giftbox", {name});
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

    if(!name || !person || person.name !== name){
        return res.status(403).json({error: "Access denied"});
    }
    res.json({
        name,
        message: person.message,
        greeting: person.greeting
    });
});

module.exports = router;