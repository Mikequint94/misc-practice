let app = require('express')();
let express = require("express");
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
let colors = {};
const allColors = ['#6EEB83', '#911CFF', '#E4FF1A', '#E8AA14', '#FF5714', '#EA6ED7', '#99FF14' ];
function getRandomColor() {
  if (allColors.length > 0) {
    return allColors.splice(Math.floor(Math.random()*allColors.length), 1);
  } else {
    return ['#6EEA8D'];
  }
}

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

  socket.on('colorChange', function(userColor){
    colors[userColor.user] = userColor.color;
    io.emit('all users', {users: Object.values(people), color: colors});
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
