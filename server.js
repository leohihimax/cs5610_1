var express = require("express");
var app = express();


ipaddress = process.env.OPENSHIFT_NODEJS_IP ||"127.0.0.1";
port      = process.env.OPENSHIFT_NODEJS_PORT || 3000; 

app.get("/hello", function(req, res){
    res.send("hello world");
});


app.listen(port, ipaddress);