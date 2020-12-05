const fs = require('fs');
const express = require('express');
const { stringify } = require('querystring');
const { parse } = require('path');
const router = express.Router()

//https://nodejs.dev/learn/get-http-request-body-data-using-nodejs
//På ovenstående link om nodejs er der en masse relavante ting at læse om til rapportskrivning. 


const dataPath = '../Model/users.json';


//CREATE user
router.post('/', (req, res) => {
    //her skal bruger-input tages fra req-body
    //her skal hentes database array
    fs.readFile(dataPath, "utf8", (err, data) => {
    let parsedData = JSON.parse(data)
    const newUserId = parsedData.length;
    // add the new user
    req.body.id = newUserId 
    parsedData.push(req.body)
    fs.writeFile(dataPath, JSON.stringify(parsedData),(e) => {
        res.status(200).send('new user added');
    });
    })
      
});

//GET user by id
router.get('/:id', (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
        let parsedData = JSON.parse(data)
        const userId = req.params["id"];
        userByIdArray = parsedData[userId];
        res.send(parsedData[userId]);
    });
}); 

// DELETE user by id 
router.delete('/:id', (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
        let parsedData = JSON.parse(data)
        const userId = req.params["id"];
        delete parsedData[userId];
        //Element in array will be null when delete. 
        //I use the filter function to remove the element from the array
        parsedData  = parsedData.filter(function(x) { return x !== null });
        fs.writeFile(dataPath, JSON.stringify(parsedData), () => {
            res.status(200).send(`users id:${userId} removed`);
        });
    },
    true);
});

//POST log in
router.post('/login', (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
        const userArray = JSON.parse(data);
        for (let i=0; i < userArray.length; i++) {
            //Checking if input data matches data in users.json
        if (req.body.username2 === userArray[i].username && req.body.password2 === userArray[i].password1) {
                
                let signedIn = userArray[i];
                
                res.status(200).json(signedIn);
                return
                
            }
        }
        res.status(400).send("fejl");   
    },
    true);
});    

//POST log out
router.post('/logout', (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
                res.status(200).json("Logged out succesfully");
                return
            },
    true);
});    


// UPDATE user by id
router.patch('/:id', (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
        let parsedData = JSON.parse(data)
        const userId = req.params["id"];
        parsedData[userId] = req.body;
        fs.writeFile(dataPath, JSON.stringify(parsedData), () => {
            res.status(200).send(`users id:${userId} updated`);
        });
    },
    true);
});


//(Might be able to delete this)
//GET all users
router.get('/:id', (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
        const userArray = JSON.parse(data);
        res.send(userArray);
    }
    ,true);
});




module.exports = router;