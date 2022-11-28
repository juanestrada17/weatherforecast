const express = require("express");
const https = require("https");

const app = express();

app.use(express.urlencoded({extended: true}));
app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res){
  const query = req.body.cityName
  const apiKey = "a5a2585e7d009baf8f56f9787ac93e10"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + " &appid=" + apiKey
  https.get(url, function(response){
    console.log(response);

    response.on("data", function(data){
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const descri = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      console.log (weatherData)
      const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p> The weather is currently " + descri + "</p>")
      res.write("<h1>The Temperature in " + query +  " is " + temp + " degress Celcius.</h1>")
      res.write("<img src=" + imgURL + ">")
      res.send()
  })
  })

})




app.listen(3000)
