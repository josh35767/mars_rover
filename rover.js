var myRover = {
  label: "Rover One",
  position: [0,0],
  direction: 'N'
};
var roverTwo = {
  label: "Rover Two",
  position: [10,10],
  direction: 'S'
};


var obstacles = {
  position: [ [3, 5], [7, 2], [9, 8] ]
};

var objectCollided = false;
var roverCollided = false;

function isCollided(rover, obstacle) {
  for (var i = 0; i < obstacles.position.length; i++) {
    if (rover.position[0] === obstacle.position[i][0] && rover.position[1] === obstacle.position[i][1]) {
      objectCollided = true;
      alert("Obstacle at (" + obstacle.position[i][0] + "," + obstacle.position[i][1] + ")");
      return;
    }
    else {
      objectCollided = false;
    }
  }
}

function roverCollision(rover, otherRover) {
    if (rover.position[0] === otherRover.position[0] && rover.position[1] === otherRover.position[1]) {
      roverCollided = true;
      alert(otherRover.label + " at (" + otherRover.position[0] + "," + otherRover.position[1] + ")");
      return;
    }
    else {
      roverCollided = false;
    }
}

function wrapAround(rover) {
  switch(rover.position[0]) {
    case 11:
      rover.position[0] = 0;
      break;
    case -1:
      rover.position[0] = 10;
      break;
  }
  switch(rover.position[1]) {
    case 11:
      rover.position[1] = 0;
      break;
    case -1:
      rover.position[1] = 10;
      break;
    }
}

function goForward(rover){
  switch(rover.direction) {
    case 'N':
      rover.position[1]++;
      wrapAround(rover);
      break;
    case 'E':
      rover.position[0]++;
      wrapAround(rover);
      break;
    case 'S':
      rover.position[1]--;
      wrapAround(rover);
      break;
    case 'W':
      rover.position[0]--;
      wrapAround(rover);
      break;
  }
}

function goBackward(rover) {
  switch(rover.direction) {
    case 'N':
      rover.position[1]--;
      wrapAround(rover);
      break;
    case 'E':
      rover.position[0]--;
      wrapAround(rover);
      break;
    case 'S':
      rover.position[1]++;
      wrapAround(rover);
      break;
    case 'W':
      rover.position[0]++;
      wrapAround(rover);
      break;
  }
}


function turnLeft(rover) {
  switch(rover.direction) {
    case 'N':
      rover.direction = "W";
      break;
    case 'E':
      rover.direction = "N";
      break;
    case 'S':
      rover.direction = "E";
      break;
    case 'W':
      rover.direction = "S";
      break;
  }
}

function turnRight(rover) {
  switch(rover.direction) {
    case 'N':
      rover.direction = "E";
      break;
    case 'E':
      rover.direction = "S";
      break;
    case 'S':
      rover.direction = "W";
      break;
    case 'W':
      rover.direction = "N";
      break;
  }
}

function moveRover(rover, otherRover) {
  var command =  prompt("Please give a command or series of commands. 'f' to go forward, 'b' to go back, 'l' to turn left, 'r' to turn right. Example: 'fflffrb'. Type 'exit' to go back to the selection promt.");
  var directions = command.split("");

  for (var i = 0; i < directions.length; i++) {
    switch(directions[i]) {
      case 'f':
        goForward(rover);
        isCollided(rover, obstacles);
        roverCollision(rover, otherRover);
        if (objectCollided === true || roverCollided === true) {
          goBackward(rover);
        }
        break;
      case 'b':
        goBackward(rover);
        isCollided(rover, obstacles);
        roverCollision(rover, otherRover);
        if (objectCollided === true || roverCollided === true) {
          goForward(rover);
        }
        break;
      case 'l':
        turnLeft(rover);
        break;
      case 'r':
        turnRight(rover);
        break;
    }
    if (objectCollided === true || roverCollided === true) {
      break;
    }
  }
    alert(rover.label + " Position: [" + rover.position[0] + ", " + rover.position[1] + "] The Rover is facing " + rover.direction);
  if (command === "exit") {
    selectRover();
  }
  else {
    moveRover(rover, otherRover);
  }
}


function selectRover() {
  alert(myRover.label + " Position: [" + myRover.position[0] + ", " + myRover.position[1] + "]");
  alert(roverTwo.label + " Position: [" + roverTwo.position[0] + ", " + roverTwo.position[1] + "]");
  var selection = prompt("To select Rover One, type 'one'. To select Rover Two, type 'two'.");
    switch(selection){
      case 'one':
        alert("You are now controlling " + myRover.label);
        moveRover(myRover, roverTwo);
        break;
      case 'two':
        alert("You are now controlling " + roverTwo.label);
        moveRover(roverTwo, myRover);
        break;
    }

}

selectRover();
