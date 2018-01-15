let app = require('express')();
let express = require("express");
app.use("/css",express.static(__dirname + "/css"));
let http = require('http').Server(app);
let io = require('socket.io')(http);

let port = process.env.PORT || 3000;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
let people = {};

io.on('connection', function(socket){
  io.emit('all users', Object.values(people));
  let user = null;
  socket.on('chat message', function(msg){
    io.emit('chat message', user + " : " + msg);
  });

  socket.on('set user', function(msg){
    user = msg;
    people[socket.id] = user;
    io.emit('all users', Object.values(people));
    io.emit('chat message', user + " has joined the chat!");
  });

  socket.on('typing', function(typer){
    io.emit('typing', typer + " is typing");
  });

  socket.on('stoptyping', function(typer){
    io.emit('stoptyping', typer);
  });

  socket.on('disconnect', function(){
    delete people[socket.id];
    io.emit('all users', Object.values(people));
    if (user) {
      io.emit('chat message', user + " has left the chat!");
    }
  });
});

http.listen(port);
