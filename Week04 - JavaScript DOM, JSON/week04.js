var Person = {
  name: "Conrad",
  age: 25,
  birthplace: "Palm Springs, CA",
  major: "Software Engineering"
};

function testJSON() {
  document.getElementById("PREJSON").innerHTML = "Created a Person Object<br><br>Pre-JSON: " + Person;

  var personJSON = JSON.stringify(Person);
  document.getElementById("JSONSTRINGIFIED").innerHTML = "JSON Stringified: " + personJSON;

  var personParsed = JSON.parse(personJSON);
  document.getElementById("JSONPARSED").innerHTML = "JSON Parsed: " + personParsed;
}

function clearHTML() {
  document.getElementById("PREJSON").innerHTML = "";
  document.getElementById("JSONSTRINGIFIED").innerHTML = "";
  document.getElementById("JSONPARSED").innerHTML = "";
}

function testDOM() {
  var line_one = document.getElementById("DOM_Test_One");
  var line_two = document.getElementById("DOM_Test_Two");
  var line_three = document.getElementById("DOM_Test_Three");

  line_one.style.color = "red";
  line_two.style.fontSize = "200%";
  line_three.innerHTML = "where'd line three go?";

  document.addEventListener("keydown", showWorkingListener);
}

function showWorkingListener() {
  var line_four = document.getElementById("DOM_Test_Four");

  line_four.style.fontSize = "500%";
  line_four.innerHTML = "IT WORKED!!!";
}
