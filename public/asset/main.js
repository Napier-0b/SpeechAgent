"use strict";

var poyo = "Hi I am poyo.";
var vingt = 20;

function add(x, y) {
	console.log(x + y);
}

function multiply(x, y) {
	return x * y;
}

function calcfunc(a, b, callback) {
	callback(a, b);
}

calcfunc(3, vingt, add);
console.log(multiply(3, 5));
console.log(calcfunc(3, 5, multiply));

const arr1 = [1, 3, 4, 6, 8];
arr1.forEach((elem) => console.log(elem + vingt));

console.log("-----");

class Vehicle {
	static askColorPattern() {
		return "Red, Blue, Green, White";
		/*車両インスタンスを生成する前にしか聞けない、なぜなら生産された車はもう塗られている*/
	}
	constructor(loadedFuel, colorChoice = "Red", fuelConsOfTheVehicle = 1) {
		this.fuel = loadedFuel;
		this.fuelConsRate = fuelConsOfTheVehicle;
		this.bodyColor = colorChoice;
	}
	move(distance) {
		this.fuel = this.fuel - distance * this.fuelConsRate;
		console.log(`${distance}走行し、残燃料は${this.fuel}`);
	}
}

class Plane extends Vehicle {
	/* クラスの継承 */
	constructor(loadedFuel, colorChoice) {
		const fuelConsOfTheVehicle = 3;
		super(loadedFuel, colorChoice, fuelConsOfTheVehicle);
	}
}

const Car1 = new Vehicle(60, "White");
const Jet1 = new Plane(100, "Blue");

Car1.move(10);
Jet1.move(30);
console.log(Car1.bodyColor);
console.log(Jet1.bodyColor);
console.log(Vehicle.askColorPattern());