var local = 0;
var session = 0;

function localStorageTest() {
  if (typeof(Storage) !== "undefined") {
    local = Number(localStorage.getItem("local")) + 1;
    document.getElementById("local").innerHTML = local;
    localStorage.setItem("local", local);
  } else {
    document.getElementById("local").innerHTML = "Browser does not allow local storage.";
  }
}

function sessionStorageTest() {
  if (typeof(Storage) !== "undefined") {
  session = Number(sessionStorage.getItem("session")) + 1;
  document.getElementById("session").innerHTML = session;
  sessionStorage.setItem("session", session);
  } else {
    document.getElementById("local").innerHTML = "Browser does not allow session storage.";
  }
}

var degrees = 0;
function rotate(type) {
  if (type == "right") {
    degrees+=22.5;
  } else {
    degrees-=22.5;
  }

  var rotation = "rotate(" + degrees + "deg)";
  document.getElementById("transformation").style.transform = rotation;
}

var y = 0;
function translaty(type) {
  if (type == "up") {
    y-=10;
  } else {
    y+=10;
  }

  var translation = "translateY(" + y + "px)";
  document.getElementById("transformation").style.transform = translation;
}

var value = 1;
function scale(type) {
  if (type == "bigger") {
    value+=0.1;
  } else {
    value-=0.1;
  }

  var scaling = "scale(" + value + ", " + value + ")"
  document.getElementById("transformation").style.transform = scaling;
}
