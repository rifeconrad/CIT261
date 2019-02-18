// create an object that will be transformed into JSON
var Person = {
  name: "Conrad",
  age: 25,
  birthplace: "Palm Springs, CA",
  major: "Software Engineering"
};

// where we will turn the object into JSON
function testJSON() {

  // what does the object look like (as text) prior to JSON conversion?
  document.getElementById("PREJSON").innerHTML = "Created a Person Object<br><br>Pre-JSON: " + Person;

  // what does the object look like (as text) after JSON conversion?
  var personJSON = JSON.stringify(Person);
  document.getElementById("JSONSTRINGIFIED").innerHTML = "JSON Stringified: " + personJSON;

  // what does the object look like (as text) after we convert back to an object?
  var personParsed = JSON.parse(personJSON);
  document.getElementById("JSONPARSED").innerHTML = "JSON Parsed: " + personParsed;
}

// clears the HTML document for further testing
function clearHTML() {
  document.getElementById("PREJSON").innerHTML = "";
  document.getElementById("JSONSTRINGIFIED").innerHTML = "";
  document.getElementById("JSONPARSED").innerHTML = "";
}

// where we will test the DOM
function testDOM() {
  // find three of our four divs set-up for the DOM tests!
  var line_one = document.getElementById("DOM_Test_One");
  var line_two = document.getElementById("DOM_Test_Two");
  var line_three = document.getElementById("DOM_Test_Three");

  // turn the text in the first line red!
  line_one.style.color = "red";
  // double the size of the text on the second line!
  line_two.style.fontSize = "200%";
  // change the text on the third line!
  line_three.innerHTML = "where'd line three go?";
  // have the page listen for any key presses (calls showWorkingListener)
  document.addEventListener("mousedown", showWorkingListener);
}

// called when a key is pressed
function showWorkingListener() {
  // find the forth div set-up for the DOM tests
  var line_four = document.getElementById("DOM_Test_Four");

  // make the text 5x bigger than the other text!
  // and change the text to verify it is working
  line_four.style.fontSize = "500%";
  line_four.innerHTML = "IT WORKED!!!";
}
