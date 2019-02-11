function Fruit(color, size, texture, isTasty, isRipe) {
  this.color = color;     // string : "red"
  this.size = size;       // string : "5in" or integer : "5"
  this.texture = texture; // string : "rough" or "smooth"
  this.isTasty = isTasty; // boolean : true, false
  this.isRipe = isRipe;   // boolean : true, false
  this.secret_variable = 25;

  this.displayFacts = function() {
    console.log(this.color + " " + this.size);
  }
}

var Banana = new Fruit("yellow", "5in", "smooth", true, true);
var Apple = new Fruit("red", "3in", "smooth", false, true);
var Grape = new Fruit("purple", "0.5in", "smooth", true, true);

function call_it()
{
  Banana.displayFacts();

  Apple.displayFacts();

  Grape.displayFacts();
}
