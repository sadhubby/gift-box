const mongoose = require('mongoose');
const connectDB = require('../scripts/connectDB');

const Gifts = require("../models/gifts.js");
const sampleGifts = require ("../scripts/sampleData/giftsData.js");

async function dropDB(){
    try{
        await mongoose.connection.dropDatabase();
        console.log("Database dropped successfully");
    }
    catch(error){
        console.error("Error dropping database", error);
    }
}

async function populateDB(){
    try{
        //take this out after being sure of all the things na.
        await dropDB();
        for(const giftsData of sampleGifts){
            const gifts = new Gifts(giftsData);
            await gifts.save();
            console.log("Database populated");
        }
    }
    catch(error){
        console.error("Error populating DB", error);
    }
}

module.exports = populateDB;