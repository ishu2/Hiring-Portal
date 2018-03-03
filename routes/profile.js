var route = require('express').Router();
var ensure = require('./../auth/authutils');

route.get('/', (req, res) => {
    res.render("profile", {
        role: req.user.role,
        name: req.user.name,
        email: req.user.email
    });
});

module.exports = route;