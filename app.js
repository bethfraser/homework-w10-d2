var express = require('express');
var app = express();
var expressLayouts = require('express-ejs-layouts');
var http = require('http');

// App settings

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(expressLayouts); //telling it to use a piece of middleware
app.use(express.static('public'));

// Routes

app.get('/weather', function(req, res) {
  res.render('weather');
});

app.get('/weather/:city', function(request, response){
  http.get('http://api.openweathermap.org/data/2.5/weather?q='+ request.params.city + '&APPID=1f8ba05ce1c3731b7d4f20eceddd4782&units=metric', function(res){
      var body = "";
      res.on('data', function(d){
        body += d;
      });
      res.on('end', function(){
        var weather = JSON.parse(body);
        response.send(weather);
      });
  });
});



// Set up host


app.listen('3000', function(){
  console.log("Connected at 3000");
});