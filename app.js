//jshint esverion 6
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { request } = require("http");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const query = req.body.cityName;
    const apiKey = "924dbef7ac4da8a43e74a4b58c5bb7ca";
    const unit = "metric";
    const url =  "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = "http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
            res.write("<p>The Weather is currently "+ weatherDescription+"</p>" );
            res.write("<h1>The Temperature in "+query+" is " + temp + " degrees Celcius </h1>");
            res.write('<img src='+icon+'>');
            res.send();
        })
    });
})


    


app.listen(process.env.PORT || 3000,function(){
    console.log("Port Started at 3000");
});
