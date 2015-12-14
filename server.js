var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('registrationlist', ['registrationlist']);
var bodyParser = require('body-parser');


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/registrationlist', function (req, res) {
	console.log("I received a GET request")

db.registrationlist.find(function (err, docs){
	console.log(docs);
	res.json(docs);

});
});

app.post('/registrationlist', function (req, res) {
console.log(req.body);

db.registrationlist.insert(req.body, function (err, doc) {
res.json(doc);

})

});

app.delete('/registrationlist/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	db.registrationlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
	res.json(doc);
})
});


app.get('/registrationlist/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.registrationlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
	res.json(doc);
});
});

app.put('/registrationlist/:id', function (req, res) {
	var id = req.params.id;
	console.log(req.body.name);
	db.registrationlist.findAndModify({query: {_id: mongojs.ObjectID(id)},
	update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number, course: req.body.course}},
	new: true}, function (err,doc) {
	res.json(doc);
	});


});

app.listen(3000);
