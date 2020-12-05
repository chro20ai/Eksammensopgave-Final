const fs = require('fs');
const express = require('express');
const router = require('./users');
const routermatch = express.Router()

const matchPath = '../Model/match.json';
const likesPath = '../Model/likes.json';

//CREATE match
routermatch.post('/', (req, res) => {
    let content;
     fs.readFile(matchPath, "utf8", (err, data) => {
     let parsedData = JSON.parse(data);
     const newMatchId = parsedData.length;
     req.body.MatchId = newMatchId
     parsedData.push(req.body)
     fs.writeFile(matchPath, JSON.stringify(parsedData),(e) => {
         content = parsedData
     });
     //I need to delete the likes in likes.json to check for new matches
     //I could only make it use by deleting one like
     
     
        fs.readFile(likesPath, "utf8", (err, data) => {
         let parsedData = JSON.parse(data);
             for(var i=0; i < parsedData.length; i++){
 
             //Find the likes in likes.json from the new match
             if(req.body.id1 == parsedData[i].id || req.body.id1 == parsedData[i].loggedIn){
                 if(req.body.id2 == parsedData[i].id || req.body.id2 == parsedData[i].loggedIn){
                     if (i > -1) {
                         //Splice the user from likes.json
                         parsedData.splice(i);
                         fs.writeFile(likesPath, JSON.stringify(parsedData),(e) => {
                         });
                       }
                 }
             }
             
         }
     })
     res.status(200).send(JSON.stringify(content));
     
     })
       
 });

//GET matches
routermatch.get('/showmatches/', (req, res) => {
    fs.readFile(matchPath, "utf8", (err, data) => {
        let parsedData = JSON.parse(data);
        res.send(parsedData);
    }
    ,true);
}); 

//Delete matches
routermatch.delete('/deletematch/:id', (req, res) => {
    fs.readFile(matchPath, "utf8", (err, data) => {
        // add the new user
        let parsedData = JSON.parse(data)
        const userId = req.params["id"];
        delete parsedData[userId];
//filtermetoden sørger for, at y ikke må være lig nul
        parsedData = parsedData.filter(function(y) {return y !== null});

        fs.writeFile(matchPath, JSON.stringify(parsedData), () => {
            res.status(200).send(`users id:${userId} removed`);
        });
    },
    true);
    
});


module.exports = routermatch;