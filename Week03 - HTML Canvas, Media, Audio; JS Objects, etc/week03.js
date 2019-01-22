var canvas = document.getElementById("pong"); // grab the id of our canvas
var ctx = canvas.getContext("2d");            // state it will be a 2d canvas

canvas.height = 500; // canvas height will be 500px
canvas.width = 800;  // canvas width will be 500px

var keys = []; // a convenient way to handle which key has been pressed (See to bottom of program for more information)

// PADDLE OBJECT BEGIN
function Paddle(x, y, w, h, color, up, down) {
  this.x = x;          // top left x position
  this.y = y;          // top left y position
  this.w = w;          // width of paddle (rectangle)
  this.h = h;          // height of paddle (rectangle)
  this.color = color;  // rectangle color - string - Ex. "lightblue"
  this.up = up;        // ASCII index for up key (for more info on how this works: https://css-tricks.com/snippets/javascript/javascript-keycodes/)
  this.down = down;    // ASCII index for down key
  this.score = 0;

  // Draws the paddle on the screen when called
  this.createPaddle = function() {
    ctx.beginPath();                               // begin drawing paddle
    ctx.fillStyle = this.color;                    // set color of the paddle
    ctx.fillRect(this.x, this.y, this.w, this.h);  // set x position, y position, width, and height of the paddle
    ctx.fill();                                    // draw the paddle
  }

  // handles all user input (moves paddle)
  this.handleInput = function() {
    if (keys[this.up]) {
      this.y-=4; // move up (computer graphics renders graphs upside down, therefore going up is subtracting from y)
    }
    if (keys[this.down]) {
      this.y+=4; // move down
    }
    this.checkBoundaries();
  }

  // determine if we are leaving the canvas or not
  this.checkBoundaries = function() {
    // first, determine what the bottom left, bottom right, and top right positions of the rectangle are
    // this.x and this.y only tell us where the top left of the rectangle is!
    let blX = this.x;           // bottom left x position
    let blY = this.y + this.h;  // bottom left y position
    let brX = this.x + this.w;  // bottom right x position
    let brY = this.y + this.h;  // bottom right y position
    let trX = this.x + this.w;  // top right x position
    let trY = this.y;           // top right y position

    if (blY >= canvas.height) { // create a barrier at the top of the canvas
      this.y = canvas.height - this.h;
    }
    if (this.y < 0) {    // create a barrier at the bottom of the canvas
      this.y = 0;
    }
  }
}
// PADDLE OBJECT END

// BALL OBJECT BEGIN
function Ball(x, y, radius, startAngle, endAngle, color) {
  this.x = x;                   // center x position
  this.y = y;                   // center y position
  this.xDirection = 1;          // direction the ball will go and speed of ball
  this.yDirection = 1;          // direction the ball will go and speed of ball
  this.radius = radius;         // ball's radius
  this.startAngle = startAngle; // trig angle to start
  this.endAngle = endAngle;     // trig angle to end
  this.color = color;           // ball's color
  this.player_one = player_one; // first player's paddle
  this.player_two = player_two; // second player's paddle

  this.createBall = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
    ctx.fill();
  }

  this.update = function() {
    var score_update = this.checkBoundaries();
    this.x += this.xDirection;
    this.y += this.yDirection;

    return score_update;
  }

  this.checkBoundaries = function() {
    var leftX = this.x - this.radius;   // left canvas boundary
    var rightX = this.x + this.radius;  // right canvas boundary
    var topY = this.y - this.radius;    // top canvas boundary
    var bottomY = this.y + this.radius; // bottom canvas boundary

    if (bottomY >= canvas.height) {
        this.yDirection *= -1;
        return "";
    }
    if (rightX >= canvas.width) {
      this.xDirection *= -1;
      return "one";
    }
    if (leftX <= 0) {
      this.xDirection *= -1;
      return "two";
    }
    if (topY <= 0) {
      this.yDirection *= -1;
      return "";
    }
  }

  this.checkPaddleCollision = function(player, tlX, tlY, height, width) {

  }
}
// BALL OBJECT END

// SCORE BOARD OBJECT BEGIN
function ScoreBoard() {
  this.player_one_score = 0;
  this.player_two_score = 0;

  this.update = function(team) {
    if (team === "one") {
      this.player_one_score++;
    } else if (team === "two") {
      this.player_two_score++;
    }
  }

  this.display = function() {
     ctx.fillStyle = "black";
     ctx.font = "20px Arial";
     ctx.fillText("   Player One: " + this.player_one_score + "                                                                                             Player Two: " + this.player_two_score, 0, 50);
  }
}
// SCORE BOARD OBJECT END

// instance of paddle for first player
let player_one = new Paddle(50, canvas.height / 2, 15, 50, "lightblue", 87, 83);
// instance of paddle for second player
let player_two = new Paddle(canvas.width - 50, canvas.height / 2, 15, 50, "blue", 38, 40);
// instance of ball
let ball = new Ball(250, 250, 10, 0, 2 * Math.PI, player_one, player_two);
// instance of scoreboard
let scoreboard = new ScoreBoard();
// used to play and pause music (could be an object of itself)
let isPlaying = true;
// used to stop game
let isRunning = true;
// this is where everything is called:
// - clear the canvas
// - update the paddle and ball positions
// - draw the paddle and ball on the screen
function update() {
     // a continuous loop to play the game
     requestAnimationFrame(update);

   isRunning = true;
     // delete all previous drawings, otherwise the objects will smeer across the canvas
     ctx.clearRect(0, 0, canvas.width, canvas.height);

     // handle all user input first (so the drawings do not show delayed movement)
     player_one.handleInput();
     player_two.handleInput();
     var score_update = ball.update();

     ball.checkPaddleCollision("one", player_one.x, player_one.y, player_one.w, player_one.h);
     ball.checkPaddleCollision("two", player_two.x, player_two.y, player_two.w, player_two.h);

     scoreboard.update(score_update);
     scoreboard.display();

     // draw the paddles on the screen
     player_one.createPaddle();
     player_two.createPaddle();
     ball.createBall();

     if (keys[32] && isPlaying) {
       document.getElementById("background_music").pause();
     } else if (keys[32] && !isPlaying) {
       document.getElementById("background_music").play();
     }
}

update();

// Look for any keys being pressed and set their position in the keys array to true (SEE COMMENT BLOCK AT BOTTOM)
document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;

    // if the up or down arrow is pressed
    if (keys[38] || keys[40]) {
      e.preventDefault(); // prevent default actions (i.e. scrolling on the page)
    }
});

// Look for any keys that have been released and set their position in the keys array to false (SEE COMMENT BLOCK AT BOTTOM)
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});

/*
- User presses the 'w' key
- document.body.addEventListener sees that the 'w' key has been pressed
- the 'w' key's ASCII value (e.keyCode) is 87, so keys[87] will be set to true (keys[87 = true])
- the paddle object handleInput method checks if keys[this.up] is true. So if we set this.up to 87, then it
  had just been set to true on the previous step!
- the paddle's position is updated
*/
