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
	shuffle(tmp);
	var res;
	tmp.forEach(function(dog){
		if(dog.breed === breed){
			res = dog;
			return res;
		}
	});
	console.log(res);
	return res;
}

exports.maleNameRandom = function(){
	return dogNames.maleRandom();
}

exports.femaleNameRandom = function(){
	return dogNames.femaleRandom();
}

exports.nameRandom = function(){
	return dogNames.allRandom();
}


function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}