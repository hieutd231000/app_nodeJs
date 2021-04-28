const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});
app.get('/bmicalculator',(req,res)=>{
    res.sendFile(__dirname+"/bmiCalculator.html");
});

app.post('/',(req,res)=>{
    var num1 = parseFloat(req.body.num1);
    var num2 = parseFloat(req.body.num2);
    var sum = num1 + num2;
    res.send("The result of calculation: " + sum);
});
app.post('/bmicalculator',(req,res)=>{
    var weight = Number(req.body.weight);
    var height = Number(req.body.height);
    var bmi = weight / (height*height);
    res.send("Your BMI is: " + bmi);
});


app.listen(3200,()=>{
    console.log("Server started on port 3200");
});