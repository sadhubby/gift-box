const express = require ('express');
const server = express();
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const path = require('path');

const connectDB = require('./src/scripts/connectDB');
const populateDB = require('./src/scripts/populateDB.js');

require('dotenv').config();

const router = require("./src/routes/router.js");
server.use(router);

server.use(express.static(path.join(__dirname, 'public')));
server.set('view engine', 'hbs');
server.use(bodyParser.urlencoded({extended: true}));

server.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions:{
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));

async function connectToDB(){
    try{
        await connectDB();
        populateDB();
    }
    catch(error){
        console.error("Server failed to start", error);
    }
}

const port = process.env.PORT || 3000;

server.listen(port, async function(){
    await connectToDB();
    console.log(`Server running on: http://localhost:${port}`);
})