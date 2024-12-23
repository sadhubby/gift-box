const express = require ('express');
const server = express();
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const path = require('path');
const session = require('express-session');

//get values from .env
require('dotenv').config();

//router file
const router = require("./src/routes/router.js");

//scripts
const connectDB = require('./src/scripts/connectDB');
const populateDB = require('./src/scripts/populateDB.js');
const isAuthenticated = require('./src/scripts/authentication.js');

//use all in public
server.use(express.static(path.join(__dirname, 'public')));

//encoding
server.use(express.urlencoded({extended: true}));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//view engine, will view hbs files
server.set('view engine', 'hbs');
server.use(bodyParser.urlencoded({extended: true}));
server.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions:{
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));

//session
server.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {httpOnly: true, maxAge: 1209600000}
}))

//server will use the router js
server.use(router);

server.use((req, res, next) =>{
    const publicRoutes = ['/login', '/css/login.css'];
    if(publicRoutes.includes(req.path) || req.session.isAuthenticated){
        return next();
    }
    res.redirect('/login');
})

server.use((req, res, next) => {
    const isAuthenticated = !!req.session.isAuthenticated; // Check session authentication
    res.locals.isAuthenticated = isAuthenticated;         // Pass to views
    next();
});


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