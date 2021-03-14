var express = require('express');
var router = express.Router();

const fs = require('fs')
require('path').dirname(require.main.filename)

router.get('/', function(req, res, next) {
  fs.readFile("db/tasks.json", 'utf8', (err, jsonString)=>{
    let newTasks = JSON.parse(jsonString).filter(obj => obj.deleted != true)
    res.send(JSON.stringify(newTasks));
  })

});

router.post('/create', function(req, res, next) {
  let newTaks =  req.body;
  fs.readFile("db/tasks.json", 'utf8', (err, jsonString)=>{
    let tasks =JSON.parse(jsonString)
    newTaks.deleted = false;
    tasks.push(newTaks);
    jsonString = JSON.stringify(tasks);
    fs.writeFileSync("db/tasks.json",jsonString,"utf-8");
    res.send(newTaks);
  })

});

router.post('/update', function(req, res, next) {
  let newTaks =  req.body;
  fs.readFile("db/tasks.json", 'utf8', (err, jsonString)=>{
    let tasks = JSON.parse(jsonString).filter(obj => obj.Id != newTaks.Id)
    tasks.push(newTaks);
    jsonString = JSON.stringify(tasks);
    fs.writeFileSync("db/tasks.json",jsonString,"utf-8");
    res.send(jsonString);
  })

});

router.post('/delete', function(req, res, next) {
  let id =  req.body.Id;
  fs.readFile("db/tasks.json", 'utf8', (err, jsonString)=>{
    let tasks =JSON.parse(jsonString)
    let task = tasks.find(obj=> obj.Id== id)
    if(task){
      task.deleted = true;
      jsonString = JSON.stringify(tasks);
      fs.writeFileSync("db/tasks.json",jsonString,"utf-8");
      let newTasks = JSON.parse(jsonString).filter(obj => obj.deleted != true)
      res.send(JSON.stringify(newTasks));
    }
    else
      res.send(500);

  })

});

module.exports = router;
