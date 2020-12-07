//Downloading all packages for the server:
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require("cors");

//Defining the port for the localhost server
const PORT = 3000

//Using express, body-parser and cors
const app = express();
app
.use(bodyParser.json())
.use(bodyParser.urlencoded({ extended: true }))
.use(cors());

//Paths from routes
const userRoute = require('../Routes/users.js');
const userRoutelike = require('../Routes/like.js');
const userRoutematch = require('../Routes/match.js');

//Message to check if server is running on all routes:
app
.get('/', (req, res) => {
    res.send('The API server is up and running')
})
.get('/users', (req,res) => {
    res.send('The /users route is up and running - data will be sent through here')
})
.get('/likes', (req,res) => {
    res.send('The /likes route is up and running - data will be sent through here')
})
.get('/matches', (req,res) => {
    res.send('The /matches route is up and running - data will be sent through here')
});

//Using my routes 
app
.use('/users', userRoute)
.use('/likes', userRoutelike)
.use('/matches', userRoutematch)

//Running the server
app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`)
})



