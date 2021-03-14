var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index' , {recycle:true, readPath:'/deletedTasks' , createPath:'', updatePath:'',deletePath:"/deletedTasks/delete", recoverPath:"/deletedTasks/recover" } );
});

module.exports = router;
