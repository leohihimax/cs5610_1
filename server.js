var express = require("express");
var mongojs = require("mongojs");
var app = express();
var bodyParser = require('body-parser');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


var mongodbConnectionString = process.env.OPENSHIFT_MONGODB_DB_URL + "applications";

if(typeof process.env.OPENSHIFT_MONGODB_DB_URL == "undefined"){
    mongodbConnectionString = "applications";
}

var db = mongojs("mongodbConnectionString", ["serviceClients"]);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP ||"127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000; 

app.get("/env", function(req, res){
    res.json(process.env);
});


app.get("/serviceClients", function (req, res) {
   
    db.serviceClients.find(function (err, docs) {
        res.json(docs);
    });

});

app.get("/serviceClients/:id", function (req, res) {
   
    db.serviceClients.findOne({_id : mongojs.ObjectId(req.params.id)},function(err,doc){
        res.json(doc);
    });

});

app.post("/serviceClients", function (req, res) {
    var svc = req.body;
    db.serviceClients.insert(svc, function (err, doc) {
        res.json(doc);
    });
});

app.delete("/serviceClients/:id", function (req, res) {
    var id = req.params.id;
    db.serviceClients.remove({ _id : mongojs.ObjectId(id) }, function (err, doc) {
        res.json(doc);
    });
});
app.put("/serviceClients/:id", function (req, res) {
    
    db.serviceClients.update({_id : mongojs.ObjectId(req.body._id)}, 
        {$set: {name : req.body.name}}, 
        function(err,doc){
            res.json(doc);
        });

});



app.listen(port, ipaddress);