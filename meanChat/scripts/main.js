  // change colors of chat background
  // dont kill thmb video if multiple people
  // group chat adds to everyone
  // if dot in name, fix
  // emoji keyboard
    let socket = io();
    let videoOut = document.getElementById("vid-box");
    let vidThumb = document.getElementById("vid-thumb");
    let selfVisible = false;

    function login(username) {
      let phone = window.phone = PHONE({
          number        : username || "Anonymous", // listen on username line else Anonymous
          publish_key   : 'pub-c-b2400040-4d8f-489f-8732-10e7d84881ce',
          subscribe_key : 'sub-c-315c4f36-f6a8-11e7-acf8-26f7716e5467',
          ssl : (('https:' == document.location.protocol) ? true : false)
      });
      let ctrl = window.ctrl = CONTROLLER(phone);
      ctrl.ready(function(){
        console.log("logged in", username);
      });
      ctrl.receive(function(session){
        console.log(session);
        if (!selfVisible) {
          selfVisible = true;
          ctrl.addLocalStream(vidThumb);
        }
          session.connected(function(sesh) {
            chatBox.className="vid";
            let hangupButton = document.createElement('button');
            hangupButton.innerHTML = 'Hang Up';
            hangupButton.onclick = () => end.apply(hangupButton);
            hangupButton.className = "show";
            hangupButton.id = sesh.number;
            videoOut.append(hangupButton);

            videoOut.appendChild(sesh.video);
          });
          session.ended(function(sesh) {
            ctrl.getVideoElement(sesh.number).remove();
            console.log(sesh);
            vidThumb.innerHTML='';
            document.getElementById(`${sesh.number}`).remove();
            chatBox.className="no-vid";
            selfVisible = false;
          });
      });
      return false; 	// So the form does not submit.
    }
    function makeCall(username){
      if (username !== user) {
        if (!window.phone) alert("You must login first!");
        else phone.dial(username);
        return false;
      } else {
        alert("You can't call yourself lol");
      }
    }
    function end(){
      console.log("hanging up");
      ctrl.hangup();
    }

    let chatBox = document.getElementById('chat');
    let msgBox = document.getElementById('messages');
    let onlineUsers = document.getElementById('users');
    let numUsers = document.getElementById('numUsers');
    let input = document.getElementById('m');
    let user = null;
    let typing = new Set();

    function isTyping() {
      if (input.value.length > 0 && user) {
        socket.emit('typing', user);
      } else {
        socket.emit('stoptyping', user);
      }
    }

    function sendMessage() {
      if (user && input.value.length > 0) {
      socket.emit('chat message', input.value);
      socket.emit('stoptyping', user);
      input.value = '';
      } else if (input.value.length > 0){
        login(input.value);
        socket.emit('set user', input.value);
        document.getElementById('title').innerHTML = "";
        document.getElementById('button').innerHTML = "Send";
        user = input.value;
        input.value = '';
      }
      return false;
    }

    $(function () {
      // $('form').submit(function(){
      //   if (user && input.value.length > 0) {
      //   socket.emit('chat message', input.value);
      //   socket.emit('stoptyping', user);
      //   input.value = '';
      // } else if (input.value.length > 0){
      //   login(input.value);
      //   socket.emit('set user', input.value);
      //   document.getElementById('title').innerHTML = "";
      //   document.getElementById('button').innerHTML = "Send";
      //   user = input.value;
      //   input.value = '';
      // }
      // return false;
      // });
      socket.on('chat message', function(msg){
        let newMsg = document.createElement("li");
        let txt = document.createTextNode(msg);
        newMsg.appendChild(txt);
        msgBox.append(newMsg);
        chatBox.scrollTo(0, msgBox.scrollHeight);
        let sliced = msg.slice(msg.length-16, msg.length);
        let audio;
        if (sliced === "joined the chat!") {
          audio = document.querySelector(`audio[data-key="join"]`);
        } else if (sliced === "s left the chat!") {
          audio = document.querySelector(`audio[data-key="leave"]`);
        } else {
          audio = document.querySelector(`audio[data-key="chat"]`);
        }
        if(!audio) return;
        audio.currentTime = 0;
        audio.play();
      });
      socket.on('all users', function(usernames){
        numUsers.innerHTML = `Current Users: ${usernames.length}`;
        onlineUsers.innerHTML = "";
        usernames.map((username)=> {
            let newUser = document.createElement("li");
            newUser.onclick = () => {
              makeCall(username);
            };
            let userNode = document.createTextNode(username + "  🎥");
            newUser.appendChild(userNode);
            onlineUsers.append(newUser);
        });
      });
      socket.on('typing', function(msg){
        let sliced = msg.slice(0,-10);
        if (!typing.has(sliced) && user !== sliced) {
          typing.add(sliced);
          let newMsg = document.createElement("li");
          newMsg.id = `user-${sliced}`;
          let txt = document.createTextNode(msg);
          newMsg.appendChild(txt);
          msgBox.append(newMsg);
          const audio = document.querySelector(`audio[data-key="typing"]`);
          if(!audio) return;
          audio.currentTime = 0;
          audio.play();
        }
      });
      socket.on('stoptyping', function(msg){
        if (typing.has(msg)) {
          typing.delete(msg);
          let els = document.querySelectorAll(`#user-${msg}`);
          els.forEach(el => msgBox.removeChild(el));
        }
      });
    });
