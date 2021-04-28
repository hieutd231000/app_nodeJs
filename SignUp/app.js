const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(express.static("public")); // Use static file css in nodejs
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
});

app.post('/',(req,res)=>{
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const email = req.body.email;
    console.log(firstName, lastName, email);
    const bool = Boolean(firstName=='' || lastName=='' || email=='');
    if(!bool){
        res.sendFile(__dirname+"/success.html");
    }else{
        res.sendFile(__dirname+"/failure.html");
    }
});

// Go back signup.html when fail to sign up
app.post('/failure',(req,res)=>{
    res.redirect('/');
});

app.listen(process.env.PORT || 3000,()=>{
    console.log("Serve is running on port 3000");
})

