var express    = require('express');        
var app        = express();                 
var bodyParser = require('body-parser');
var dogNames = require('dog-names');
var api = require('./dogs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var address = process.env.OPENSHIFT_NODEJS_IP;
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

if (typeof address === "undefined") {
	address = "127.0.0.1";
}

var router = express.Router();  

router.get('/', function(req, res) {  
	res.send("ayy lmao aup");
});

router.use(function(req, res, next) {
    console.log(req.query);
    next(); 
});

router.route('/dog/image')
	.get(function(req, res) {
		var dog;
		if(req.query.age && req.query.breed){
			dog.getDogByAgeAndBreed(req.query.age, req.query.breed);
			if(!dog){
				res.status(404);
				res.send({ error: 'No such age or breed' });
				return;
			}
		} else {
			if(req.query.breed){
				dog = api.getDogByBreed(req.query.breed);
				if(!dog){
					res.status(404);
					res.send({ error: 'No such breed' });
					console.log("Breed Error");
					return;
				}
			}
			if(req.query.age){
				dog = api.getDogByAge(req.query.age);
				if(!dog){
					res.status(404);
					res.send({ error: 'No such age' });
					console.log("Age Error")
					return;
				}
			}
		}
		if(req.query.raw){
			dog = api.getRandDog();
			if(req.query.raw === 'src')
				res.send(dog.url);
			if(req.query.raw === 'html')
				res.send('<img src="' + dog.url + '">');
		}
		if(!dog){
			dog = api.getRandDog();
		}
		if(req.query.name){
			dog.name = dogNames.allRandom();
		}
		res.json(dog);
	})

router.route('/dog/name')
	.get(function(req,res) {
		var dogName;
		if(req.query.gender){
			switch(req.query.gender){
				case "male":
					dogName = dogNames.maleRandom();
					break;
				case "female":
					dogName = dogNames.femaleRandom();
					break;
				case "all":
					dogName = dogNames.allRandom();
				default:
					res.status(404);
					res.send({ error: 'No such gender' });
					console.log("Name Error");
					return;
			}
		} else {
			dogName = dogNames.allRandom();
		}
		res.send(dogName);
	})

app.use('/api', router);

app.listen(port, address, function(){
	 console.log('%s: Node server started on %s:%d ...', Date(Date.now() ), address, port);
});
console.log('Magic happens on port ' + port);

