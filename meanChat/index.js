var app = require('express')();
var express = require("express");
app.use("/css",express.static(__dirname + "/css"));
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3000;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log(io.engine.clientsCount/2);
  let user = null;
  socket.on('chat message', function(msg){
    io.emit('chat message', user + " : " + msg);
  });

  socket.on('set user', function(msg){
    user = msg;
    io.emit('chat message', user + " has joined the chat!");
    io.emit('new user', user);
  });

  socket.on('typing', function(typer){
    io.emit('typing', typer + " is typing");
  });

  socket.on('stoptyping', function(typer){
    io.emit('stoptyping', typer);
  });

  socket.on('disconnect', function(){
    if (user) {
      io.emit('chat message', user + " has left the chat!");
    }
  });
});

http.listen(port);
