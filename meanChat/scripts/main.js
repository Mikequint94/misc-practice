  
  // dont kill thmb video if multiple people - cant replicate problem in local
  // group chat adds to everyone - hard
  // emoji keyboard - hard
    let socket = io();
    let videoOut = document.getElementById("vid-box");
    let vidThumb = document.getElementById("vid-thumb");
    let selfVisible = false;

    function login(username) {
      let phone = window.phone = PHONE({
          number        : username || "Anonymous", // listen on username line else Anonymous
          publish_key   : 'pub-c-76391d4d-2a6b-439e-af52-759abb173a04',
          subscribe_key : 'sub-c-e64c6e00-6bd4-11ea-a7c4-5e95b827fd71',
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
    // function makeCall(username){
    //   if (username !== user) {
    //     if (!window.phone) alert("You must login first!");
    //     else phone.dial(username);
    //     return false;
    //   } else {
    //     alert("You can't call yourself lol");
    //   }
    // }
    function end(){
      console.log("hanging up");
      ctrl.hangup();
    }

    let chatBox = document.getElementById('chat');
    let msgBox = document.getElementById('messages');
    let onlineUsers = document.getElementById('users');
    let numUsers = document.getElementById('numUsers');
    let startGameButton = document.getElementById('start-game');
    let input = document.getElementById('m');
    let user = null;
    let typing = new Set();
    let numPlayers = 0;

    const colorInput = document.getElementById('colorPick');
    colorInput.addEventListener('change', updateColor);

    const startGame = () => {
      if (numPlayers < 2) {
        alert("you need more than 1 player to play. sry :p")
        return;
      }
      socket.emit('start new game');
      socket.emit('next turn');
    }

    function updateColor() {
      socket.emit('colorChange', {user, color: this.value});
    }

    function isTyping() {
      if (input.value.length > 0 && user) {
        socket.emit('typing', user);
      } else if (user){
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
        document.getElementById('title').className = "hidden2";
        document.getElementById('button').innerHTML = "Send";
        user = input.value;
        input.value = '';
      }
      return false;
    }

    socket.on('chat message', function(msgObj){
      let msg = msgObj.msg;
      let newMsg = document.createElement("li");
      let txt = document.createTextNode(msg);
      newMsg.appendChild(txt);
      if (msgObj.color === "#000000") {
        newMsg.style=`background: ${msgObj.color}; color: white`;
      } else {
        newMsg.style=`background: ${msgObj.color}`;
      }
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
      // console.log(usernames);
      if (user) {
        document.getElementById('colorDiv').className="";
        colorInput.value = usernames.color[user];
      }
      numPlayers = usernames.users.length;
      numUsers.innerHTML = `Current Users: ${numPlayers}`;
      startGameButton.innerHTML = `Start game with ${numPlayers} player(s)`;
      onlineUsers.innerHTML = "";
      usernames.users.map((username)=> {
          let newUser = document.createElement("li");
          // newUser.onclick = () => {
          //   makeCall(username);
          // };
          let userNode = document.createTextNode(username);
          newUser.appendChild(userNode);
          if (usernames.color[username] === "#000000") {
            newUser.style=`background: ${usernames.color[username]}; color: white`;
          } else {
            newUser.style=`background: ${usernames.color[username]}`;
          }
          onlineUsers.append(newUser);
      });
    });
    socket.on('typing', function(msgObj){
      let msg = msgObj.msg;
      let sliced = msg.slice(0,-10);
      sliced = sliced.replace(/[_#.-\s]/g,'0');
      if (!typing.has(sliced) && user && user.replace(/[_#.-\s]/g,'0') !== sliced) {
        typing.add(sliced);
        let newMsg = document.createElement("li");
        newMsg.id = `user${sliced}`;
        let txt = document.createTextNode(msg);
        newMsg.appendChild(txt);
        if (msgObj.color === "#000000") {
          newMsg.style=`background: ${msgObj.color}; color: white`;
        } else {
          newMsg.style=`background: ${msgObj.color}`;
        }
        msgBox.append(newMsg);
        const audio = document.querySelector(`audio[data-key="typing"]`);
        if(!audio) return;
        audio.currentTime = 0;
        audio.play();
      }
    });
    socket.on('stoptyping', function(msg){
      msg = msg.replace(/[_#.-\s]/g,'0');
      if (typing.has(msg)) {
        typing.delete(msg);
        let els = document.querySelectorAll(`#user${msg}`);
        els.forEach(el => msgBox.removeChild(el));
      }
    });
