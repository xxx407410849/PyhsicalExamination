var express = require('express');
var Router = express.Router();

Router.all('/', (req, res, next) => {
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