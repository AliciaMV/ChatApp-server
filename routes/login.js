var express = require('express');
var router = express.Router();

const usersData = require('../public/data/users.js');


router.post('/', (req, res) => {
    console.log('>> POST /login', req.body);

    const { email, password } = req.body;  
    let username;

    if( 
        usersData.users[email] && usersData.users[email].password === password
    ) {
        username = usersData.users[email].username;
        res.status(200).json(username);
    } else {
        res.status(401).json('failed').end();
    }
});

module.exports = router; 