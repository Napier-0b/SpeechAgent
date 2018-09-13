"use strict";

var poyo = "Hi I am poyo.";
var vingt = 20;

function add(x,y){
	console.log(x+y);
}

function multiply(x,y){
	return x*y;
}

function calcfunc(a,b,callback){
	callback(a,b);
}

calcfunc(3,vingt,add);
console.log(multiply(3,5));
console.log(calcfunc(3,5,multiply));