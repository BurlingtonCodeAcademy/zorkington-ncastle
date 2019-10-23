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

// game items
let sign = {
  id: 'sign',
  message: `The sign says:\n"Welcome to Burlington Code Academy! Come on up to the third floor.\nIf the door is locked, use the code 12345."\n`,
  read: function() {
    console.log(this.message);
  }
}

// room objects
let main = new Room('main', '182 Main Street', [sign], `182 Main St.\nYou are standing on Main Street between Church and South Winooski.\nThere is a door here. A keypad sits on the handle.\nOn the door is a handwritten sign.\n>_`);

let foyer = new Room('foyer', 'Foyer', ['News Paper'], 'You enter a foyer at the bottom of a flight of stairs.\n To your right is a stand holding Seven Days newspapers\n', true);

let classroom = new Room('classroom', 'Classroom', ['pencil', 'stapler', 'laptop'], 'You enter the classroom. It is filled with students working hard on code.\n');

let muddyWaters = new Room('muddyWaters', 'Muddy Waters', ['Burlington Free Press'], 'You are standing in Muddy Waters.\n');


// valid room transitions (state machine)
let roomTransitions = {
  main: {canChangeTo: [foyer, muddyWaters]},
  foyer: {canChangeTo: [classroom, main]},
  classroom: {canChangeTo: [foyer]}
}

// game state object literal
let gameState = {
  currentRoom: main,
  playerStatus: 'Healthy',
  playerInventory: [],
}

let answer = '';

async function start() {
  playing = true;
  while(playing) {
    answer = await ask(gameState.currentRoom.message);
    await processInput(answer);
    console.log('----next----');
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

async function processInput(input) {
  let room = gameState.currentRoom.id;
  if(input.includes('quit')) { playing = false };
  switch(room) {
    // player is standing on main street
    case 'main':
      if (input.includes('read') && input.includes('sign')) {
        sign.read();
      }
      else if (input.includes('go inside') && foyer.locked) {
        console.log(`You try to go into the foyer, but the door is locked.`);
      } 
      else if (input.includes('go inside')) {
        gameState.currentRoom.enterRoom(foyer);
      } 
      else if(input.includes('enter code') || input.includes('unlock door')) {
        await unlockDoor(foyer);
        console.log(`The door unlocked.`);
      } 
      else {
        console.log(`I don't know how to ${input}`);
      }
      break;
  }
  
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

async function unlockDoor(room) {
  if(room.id === 'foyer') {
    let code = await ask(`You enter a code: `);
    while(code !== '12345') {
      code = await ask(`BZZZT! Try again: `);
    }
    foyer.locked = false;
  }
}

start();