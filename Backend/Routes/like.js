const fs = require('fs');
const express = require('express');
const { stringify } = require('querystring');
const { parse } = require('path');
const routerlike = express.Router()

const likePath = '../Model/likes.json';


//Create a like
routerlike.post('/', (req, res) => {
    fs.readFile(likePath, "utf8", (err, data) => {
    let parsedData = JSON.parse(data)
    const newLikeId = parsedData.length;
    req.body.likeId = newLikeId
    parsedData.push(req.body)
    fs.writeFile(likePath, JSON.stringify(parsedData),(e) => {
        res.status(200).send(JSON.stringify(parsedData));
    });
    })
      
});

/*
//Delete likes
routerlike.delete(':/id', (req,res) => {
    fs.readFile(likePath, "utf8", (err, data) => {
        let parsedData = JSON.parse(data)
        const userId = req.params["id"];
        delete parsedData[userId];
        parsedData  = parsedData.filter(function(x) { return x !== null });
        fs.writeFile(dataPath, JSON.stringify(parsedData), () => {
            res.status(200).send(`like id:${userId} removed`);
        });
    },
    true);
});
*/



module.exports = routerlike;
