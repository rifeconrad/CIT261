function testAJAX() {

  //---------------------------------------
  // DOES NOT WORK W/ CHROME
  //---------------------------------------

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("test").innerHTML = this.responseText;
    }
  };

  xhttp.open("GET", "data.txt", true);
  xhttp.send();
};
