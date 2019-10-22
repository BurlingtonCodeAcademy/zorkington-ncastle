// Zorkington project done during part time js course
// second time coding; alone rather than w partner
// 10/17/19

// boilerplate readline code to ask for input from console
const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

let playing = false;


// init game function initializes all of the rooms
function initGame() {
  // create all of the rooms
}


// room class
class Room {
  constructor(id = 'room', name = 'Room', inventory = [], message = 'you are standing in a room', locked = false) {
    this.name = name;
    this.inventory = inventory;
    this.id = id;
    this.message = message;
    this.locked = locked;
  }

  // validation function that determines if a room can be entered from another room
  enterRoom(newRoom) {
    let validTransitions = roomTransitions[gameState.currentRoom.id].canChangeTo;
    if (validTransitions.includes(newRoom)) {
      gameState.currentRoom = newRoom;
    } else {
      console.log(`You can't go from ${gameState.currentRoom.name} to ${newRoom.name}`);
    }
  }
}

/** basic game objects **/

// room objects
let main = new Room('main', '182 Main Street', ['sign'], `182 Main St.\nYou are standing on Main Street between Church and South Winooski.\nThere is a door here. A keypad sits on the handle.\nOn the door is a handwritten sign.\n>_`);

let foyer = new Room('foyer', 'Foyer', ['News Paper'], 'You enter a foyer at the bottom of a flight of stairs.\n To your right is a stand holding Seven Days newspapers', true);

let classroom = new Room('classroom', 'Classroom', ['pencil', 'stapler', 'laptop'], 'You enter the classroom. It is filled with students working hard on code');

let muddyWaters = new Room('muddyWaters', 'Muddy Waters', ['Burlington Free Press'], 'You are standing in Muddy Waters');


// valid room transitions (state machine)
let roomTransitions = {
  main: {canChangeTo: [foyer]},
  foyer: {canChangeTo: [classroom, main]},
  classroom: {canChangeTo: [foyer]}
}

// game state object literal
let gameState = {
  currentRoom: main,
}

let answer = '';

async function start() {
  playing = true;
  while(playing) {
    answer = await ask(gameState.currentRoom.message);
    processInput(answer);
    playing = false;
  }

  // testing
  console.log(roomTransitions);
  console.log(gameState);

  main.enterRoom(foyer);
  // console.log(gameState);
  main.enterRoom(foyer);

  console.log(gameState);

  process.exit();
}

function processInput(input) {
  
  // main street options
    // read door sign
    // pick up sign
    // enter foyer
    // unlock door
    
  // foyer options
    // go upstairs
    // go outside
    // pick up news paper / items
    // drop news paper / items

  // top of stairs options
    // go in classroom
    // go in bathroom

  // classroom options
    // sit down
    
  // bathroom options
    // use bathroom
    // steal roll of toilet paper
  
  // muddy waters options

  // mr mikes options
}

start();