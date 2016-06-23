var dogNames = require('dog-names');

var breeds = require('./breed.json');
var ages = require('./age.json');

exports.getRandDog = function(){
	var tmp1 = Object.keys(breeds);
	var tmp = breeds[tmp1[Math.floor(Math.random() * tmp1.length)]];
	return tmp[Math.floor(Math.random() * tmp.length)];
}

exports.getDogByBreed = function(breed){
	try {
		return breeds[breed][Math.floor(Math.random() * breeds[breed].length)];
	} catch(err) {
		return false;
	}
};

exports.getDogByAge = function(age){
	return ages[age][Math.floor(Math.random() * ages[age].length)];
}

exports.getDogByAgeAndBreed = function(age, breed){
	var tmp = ages[age];
	tmp.forEach(function(dog){
		if(dog.breed === breed){
			tmp = dog;
			return;
		}
	});
	return tmp;
}
