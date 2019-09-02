var materials = [
	"Hydrogen",
	"Oxygen",
	"Helium",
	"Radium",
	"Lithium",
	"Beryllium",
	"Poo",
	"Wee"
];

let arrayLength = materials.map(material => material.length);

document.getElementById("arrayPrint").innerHTML = arrayLength;
