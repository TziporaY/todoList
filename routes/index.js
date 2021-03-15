var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index' ,{recycle:false, readPath:'/tasks' , createPath:'/tasks/create', updatePath:'/tasks/update', deletePath:"/tasks/delete" , recoverPath:""});
});

module.exports = router;
