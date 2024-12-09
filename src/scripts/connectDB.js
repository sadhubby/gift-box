const mongoose = require ('mongoose');
require('dotenv').config;

const mongoURI = process.env.MONGODB_URI;

async function connectToMongo(dbName = process.env.DB_NAME){
    try{
        await mongoose.connect(mongoURI, {dbName});
        console.log(`Connected to database: '${dbName}`);
    }
    catch(error){
        console.log('Error connecting to Mongo DB', error);
    }
}

function handler(){
    console.log("Database: closing connection");
    mongoose.disconnect().then(() =>{
        process.exit();
    }).catch(error => {
        console.error("Error disconnecting from database");
        process.exit(1);
    })
}

process.on("SIGINT", handler);
process.on("SIGTERM", handler);
process.on("SIGQUIT", handler);

module.exports = connectToMongo;
