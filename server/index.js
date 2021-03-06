var express = require('express');
var bodyParser = require('body-parser');
var compress = require('compression');
var path = require('path');
var app = express();
var PORT = process.env.PORT || 5000;

var environment = process.env.NODE_ENV;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(compress());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

switch (environment) {
    case 'build':
        console.log('** BUILD **');
        app.use(express.static('./build/'));
        app.use('/*', express.static('./build/index.html'));
        break;
    default:
        console.log('** DEV **');
        app.use(express.static('./'));
        app.use(express.static('./client'));
        app.use('/*', express.static('./client/index.html'));
        break;
}


app.listen(PORT, function() {
    console.log('app running at port', PORT);
});
