var express = require('express');
var router = express.Router();
var app = express();


// testing function
router.get('/', function(req, res, next) {
    res.json('YUP!');
    res.status(200);
});

module.exports = router;