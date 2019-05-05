var express = require('express');
var Router = express.Router();

Router.all('/', (req, res, next) => {
    console.log(req.session.userData);
    if (req.session.userData) {
        res.send({
            ret: true,
            data: req.session.userData
        });
    } else {
        res.send({
            ret: false,
            data: {}
        })
    }
    next();
});

module.exports = Router;