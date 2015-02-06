var express = require('express');

var app = express();
var bodyParser = require('body-parser');

//mongoose
var mongoose = require('mongoose');
var dbConfig = require('./lib/db.js');
mongoose.connect(dbConfig.url);

//setup handlebars and view engine
var handlebars = require('express-handlebars')
.create({defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function(req, res){
    res.render('index',{});
});

var search = require('./lib/search.js');
app.post('/', function(req, res){
    search.displayResults(req, res);
});

app.listen(app.get('port'), '0.0.0.0', function(){
    console.log('Express started on http://0.0.0.0:' +
    app.get('port') + '; press Ctrl+C to terminate');
});
