var express    = require('express');        
var app        = express();                 
var bodyParser = require('body-parser');
var dogNames = require('dog-names');
var api = require('./dogs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 8080;

var router = express.Router();  

/*var dogsKeys = (Object.keys(dogs));
for(var i = 0; i < dogsKeys.length; i++){
	var keyArray = dogs[dogsKeys[i]];
	for(var j = 0; j < keyArray.length; j++){
		keyArray[j].name = dogNames.allRandom();
	}
}*/

router.get('/', function(req, res) {  
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
				//console.log(dog);
				res.status(404);
				res.send({ error: 'No such breed' });
				if(!dog){
					console.log("Breed Error")
				}
				return;
			}
			if(req.query.age){
				dog = api.getDogByAge(req.query.age);
				//console.log(dog);
				res.status(404);
				res.send({ error: 'No such age' });
				if(!dog){
					console.log("Age Error")
				}
				return;
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

app.listen(port);
console.log('Magic happens on port ' + port);

