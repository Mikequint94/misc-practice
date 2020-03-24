let express = require("express");
let app = express();
app.use("/css",express.static(__dirname + "/css"));
app.use("/assets",express.static(__dirname + "/assets"));
app.use("/scripts",express.static(__dirname + "/scripts"));
let http = require('http').Server(app);
let io = require('socket.io')(http);

let port = process.env.PORT || 3000;

app.get('/', function(req, res){
  if (req.headers['x-forwarded-proto'] != 'https' && process.env.NODE_ENV === 'production') {
    res.redirect('https://'+req.hostname+req.url);
  } else {
    res.sendFile(__dirname + '/index.html');
  }
});

let people = {};
let playerCards = {}; // ex. {'mike': 13, 'chy': 12}
let colors = {};
let currentPlayer = '';
let currentPlayerIdx = -1;
let allColors = ['#6EEB83', '#911CFF', '#E4FF1A', '#E8AA14', '#FF5714', '#EA6ED7', '#99FF14' ];
function getRandomColor() {
  if (allColors.length > 0) {
    return allColors.splice(Math.floor(Math.random()*allColors.length), 1);
  } else {
    allColors = ['#6EEB83', '#911CFF', '#E4FF1A', '#E8AA14', '#FF5714', '#EA6ED7', '#99FF14' ];
    return ['#6EEA8D'];
  }
}

let deck = [];
const createDeck = () => {
  const suits = ['♥', '♠', '♣', '♦'];
  const values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];

  for (let suit in suits) {
    for (let value in values) {
      deck.push(`${values[value]} ${suits[suit]}`);
    }
  }
};
const stackShuffle = () => {
  let count = deck.length;
  while(count) {
      deck.push(deck.splice(Math.floor(Math.random() * count), 1)[0]);
      count -= 1;
  }
};

io.on('connection', function(socket){
  io.emit('all users', {users: Object.values(people), color: colors});
  let user = null;

  socket.on('chat message', function(chatMsg){
    io.emit('chat message', {msg: user + " : " + chatMsg, color: colors[user]});
  });

  socket.on('set user', function(msg){
    user = msg;
    people[socket.id] = user;
    colors[user] = getRandomColor();
    io.emit('all users', {users: Object.values(people), color: colors});
    io.emit('chat message', {msg: user + " has joined the chat!", color: colors[user] });
  });

  socket.on('typing', function(typer){
    io.emit('typing', {msg: typer + " is typing", color: colors[typer]});
  });

  socket.on('stoptyping', function(typer){
    io.emit('stoptyping', typer);
  });

  socket.on('start new game', function(){
    createDeck();
    stackShuffle();
    Object.keys(colors).forEach((user) => {
      playerCards[user] = 13;
    })
    io.emit('start new round', deck, colors, playerCards);
    io.emit('chat message', {msg: '~~~ ' + user + " has started a new game! ~~~", color: 'white' });
  });
  socket.on('pick from deck', function(){
    io.emit('pick from deck');
  });
  socket.on('flip card', function(targetId, selection){
    io.emit('flip card', targetId, selection);
  });
  socket.on('discard card', function(){
    io.emit('discard card');
  });
  socket.on('start new round', function(){
    deck = [];
    createDeck();
    stackShuffle();
    currentPlayer = '';
    currentPlayerIdx = 0;
    io.emit('start new round', deck, colors, playerCards);
  });
  socket.on('win round', function(user){
    playerCards[user] -= 1;
    if (playerCards[user] === 0) {
      io.emit('win game', user);
    } else {
      io.emit('win round', user);
    }
  });
  socket.on('pick from discard', function(){
    io.emit('pick from discard');
  });
  socket.on('next turn', function(startingUser){
    const players = Object.keys(colors);
    currentPlayerIdx = (currentPlayerIdx + 1) % players.length;
    if (startingUser) {
      currentPlayerIdx = players.indexOf(startingUser);
    }
    currentPlayer = players[currentPlayerIdx];
    io.emit('next turn', currentPlayer);
  });

  socket.on('colorChange', function(userColor){
    colors[userColor.user] = userColor.color;
    io.emit('all users', {users: Object.values(people), color: colors});
    io.emit('change board color', colors);
  });

  socket.on('disconnect', function(){
    delete people[socket.id];
    io.emit('all users', {users: Object.values(people), color: colors});
    if (user) {
      io.emit('chat message', {msg: user + " has left the chat.", color: colors[user] });
    }
  });
});

http.listen(port);
