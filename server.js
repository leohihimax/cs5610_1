var express = require("express");
var mongojs = require("mongojs");
var app = express();

var mongodbConnectionString = process.env.OPENSHIFT_MONGODB_DB_URL + "applications";

if(typeof process.env.OPENSHIFT_MONGODB_DB_URL == "undefined"){
    mongodbConnectionString = "applications";
}

var db = mongojs("mongodbConnectionString", ["serviceClients"]);

ipaddress = process.env.OPENSHIFT_NODEJS_IP ||"127.0.0.1";
port      = process.env.OPENSHIFT_NODEJS_PORT || 3000; 

app.get("/env", function(req, res){
    res.json(process.env);
});


app.listen(port, ipaddress);