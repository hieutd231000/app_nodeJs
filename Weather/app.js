const express = require("express");
const bodyParser = require("body-parser");
const https = require('https');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});
app.post("/",(req,res)=>{
    var city = req.body.cityname;
    https.get("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=808308392e4695855c487bab1fd99841&units=metric",(respone)=>{
        console.log(respone.statusCode);
        respone.on("data",(data)=>{
            const weatherData = JSON.parse(data); // covert json to javascript object
            const tempC = weatherData.main.temp;
            const weatherDes = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            
            res.write("<p>The weather is currently " + weatherDes + "</p>");
            res.write("<h1>The temperature in " +city+ " is " + tempC + "C</h1>");
            res.write("<img src="+imgUrl+">");
            res.send();
        });
    });
});
app.listen(3000,()=>{
    console.log("Serve start on port 3000");
});
