var express = require('express'),
path=require('path'),
search=require('./routes/search.js'),
home = require('./routes/home.js')
fs = require('fs'),
url = require('url');

var app = express();
var port = process.env.PORT || 1337;

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  //app.use(app.router);
  app.use(express.static((path.join(__dirname, 'public'))));

});


var file = 'public/json/hotel.json';
var file2 ='public/json/hotel_array.json';
var file3 ='public/json/city_my.json';
var file4 ='public/json/agent.json';
var file5 ='public/json/agent_array.json';
fs.readFile(file, 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }
 
  hotel = JSON.parse(data);
 
});
fs.readFile(file2, 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }
 
  hotel_array = JSON.parse(data);
 
});
fs.readFile(file3, 'utf8', function (err, data) {
    if (err) {
        console.log('Error: ' + err);
        return;
    }

    city = JSON.parse(data);

});
fs.readFile(file4, 'utf8', function (err, data) {
    if (err) {
        console.log('Error: ' + err);
        return;
    }

    agent = JSON.parse(data);

});
fs.readFile(file5, 'utf8', function (err, data) {
    if (err) {
        console.log('Error: ' + err);
        return;
    }

    agent_array = JSON.parse(data);

});


app.get('/',home.index);
app.get('/hotel?', search.findhotel);
app.get('/agent?', search.findagent);

app.get('/search/:target', home.search_page );


app.get('/agent.json', home.see);
app.get('/agent_array.json',home.see);
app.get('/hotel.json',home.see);
app.get('/hotel_array.json',home.see);
app.get('/city_my.json',home.see);



app.listen(port, function(){
        console.log('listening to port ' + port);
});