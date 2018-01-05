var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3000;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  let user = null;
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', user + " : " + msg);
  });
  
  socket.on('set user', function(msg){
    console.log('user: ' + msg);
    user = msg;
    io.emit('chat message', user + " has joined the chat!");
  });
  
  socket.on('typing', function(user){
    console.log("USER", user);
    io.emit('typing', user + " is typing");
  });
  
  socket.on('stoptyping', function(user){
    io.emit('stoptyping', user + " is typing");
  });
  
  socket.on('disconnect', function(){
    if (user) {
      io.emit('chat message', user + " has left the chat!");
    }
  });
});

http.listen(port, function(){
  console.log(`listening on ${port}`);
});