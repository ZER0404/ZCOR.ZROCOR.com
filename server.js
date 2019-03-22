const app = require('./server/Config/express');
const path = require('path');
const express = require('express');

// //Serve only the static files form the dist directory
// app.use(express.static(__dirname + '/dist/zero404'));
app.use(express.static(__dirname + '/dist/zero404'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/zero404/index.html'));
});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
