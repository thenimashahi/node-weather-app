//requiring dependencies
require('dotenv').config({path:"./config/.env"});
const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
var request = require('request');

//importing handlebars into the app
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//load static resources
app.use(express.static("public"));

//body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

//home route
app.get('/', (req, res) => {
    res.render('index');

});

//post route
app.post('/', (req, res) =>{
    

  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.WEATHER_API_KEY}`

  request(url, function (error, response, body) {
    let weather = JSON.parse(body);
    if(error){
     
    } else {

        let temperature = weather.main.temp;
        res.render('index', {temp: temperature, city: city})
    }

  })

});



//Opening the server

app.listen(process.env.PORT, ()=>
{
        console.log(`Web application is up and running. `);
});