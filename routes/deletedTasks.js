var express = require('express');
var router = express.Router();


const fs = require('fs')
require('path').dirname(require.main.filename)

/* Jason's list not deleted, becomes a list and sends to a user */ 

router.get('/', function(req, res, next) {
    fs.readFile("db/tasks.json", 'utf8', (err, jsonString)=>{
        let newTasks = JSON.parse(jsonString).filter(obj => obj.deleted == true)
        res.send(JSON.stringify(newTasks));
    })

});




/*Complete deletion from the server*/

router.post('/delete', function(req, res, next) {
    let id =  req.body.Id;
    fs.readFile("db/tasks.json", 'utf8', (err, jsonString)=>{
        let tasks =JSON.parse(jsonString)
        let allTasks =  tasks.filter(obj =>  obj.Id != id)
        jsonString = JSON.stringify(allTasks);
        fs.writeFileSync("db/tasks.json",jsonString,"utf-8");
        let newTasks = JSON.parse(jsonString).filter(obj => obj.deleted == true)
        res.send(JSON.stringify(newTasks));

    })

});

module.exports = router;
