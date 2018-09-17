"use strict";

let poyo = "Hi I am poyo.";
let vingt = 20;

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

let arr1 = [1, 3, 4, 6, 8];
arr1.forEach((elem) => console.log(elem + vingt));

console.log("-----");

class Vehicle {
	static askColorsAvailable() {
		return "Red, Blue, Green, White";
		//車両インスタンスを生成する前にしか聞けない、なぜなら生産された車はもう塗られているから
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
	// クラスの継承 
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
console.log(Vehicle.askColorsAvailable());

const anObjectOfPromise = new Promise((resolve, reject) => {
	resolve("piyo");
})

anObjectOfPromise.then(someData => {
	console.log(someData); //anObjectOfPromiseがfulfilledのとき、「与えられた引数をconsoleに出力する」という関数を実行する
});

const match = arr1.find((elem) => { return elem % 2 === 0; }); //arr1の要素が順にfind内の無名関数に渡され、要素が2の倍数の時にtrueがfind()に返る。そしてその時の要素がmatchに代入される

console.log(`arr1の要素${arr1}の中で最初の2の倍数は${match}`);

const Car2 = Object.assign({}, Car1);
Car2.bodyColor = "Red";
console.log(Car1.bodyColor);
console.log(Car2.bodyColor);

arr1 = arr1.filter((elem) => { return elem % 2 === 0; });
console.log(arr1);