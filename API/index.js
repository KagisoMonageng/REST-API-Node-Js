const express = require('express');
//const mongoose = require('mongoose');
var cors = require('cors');


const routes = require("./routes/routes");
//require('dotenv').config();

const app = express();
//const mongoString = process.env.DATABASE_URL;

//Connect to the database

app.use(cors());
app.use(express.json());
app.listen(8080,() => {console.log('Server running on port 8080');});
app.use('/api', routes)


// mongoose.connect(mongoString);
// const db = mongoose.connection;

// db.on('error', err => console.log('error: ' + err.message));

// db.once('connected', () => {
//     console.log('Connectedd to the database')});

