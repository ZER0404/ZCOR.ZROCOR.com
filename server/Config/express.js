// require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('../Helpers/error-handler');
const helmet = require('helmet');
const passport=require('passport');
const path = require('path');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(passport.initialize());

// api routes
app.use('/auth', require('../Controllers/authController/auth.controller'));
// app.get('/*', function(req,res) {
    

// global error handler
app.use(errorHandler);
// //Serve only the static files form the dist directory
// app.use(express.static(__dirname + '../../dist/zero404'));

// app.get('/*', function(req,res) {
    
// res.sendFile(path.join(__dirname+'../../dist/zero404/index.html'));
// });


module.exports= app;