const route = require('express').Router();
const models = require('./../models/models').models;
const password = require('../utils/password');
const secret = require('./../secret.json');

route.get('/', (req, res) => {
    res.render("signup-landing-page", {});
});

route.get('/student', (req, res) => {
    res.render("signup", {role: 'student'});
});

route.get('/company', (req, res) => {
    res.render("signup", {role: 'company'});
});

route.get('/admin', (req, res) => {
    res.render("signup", {role: 'admin', isAdmin: true});
});