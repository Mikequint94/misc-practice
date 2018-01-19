//Using JS to filter a JSON object based off of the criteria ID, Birth month,
// and last purchase of a user please write a basic loop to filter out the JSON data understatement.
  //Ex: If the person was born a certain month have they bought an object within the year?
const customers = [
  { "month": "august", "id": 1, "last_purchase": new Date(2017,2,3)},
  { "month": "september", "id": 2, "last_purchase": new Date(2017,4,5)},
  { "month": "april", "id": 3, "last_purchase": new Date(2017,10,2)},
  { "month": "september", "id": 4, "last_purchase": new Date(2017,2,22)}
];

function filterCustomers() {
  let filtered = customers.filter((customer) => (
    customer.month === "september" && customer.last_purchase > new Date(2017,3,3)
  ));
  console.log(filtered.map((el) => el.id));
}
// filterCustomers();
//to get todays date, today = new Date().  One year ago = today.setFullYear(today.getFullYear() - 1)
// maybe JSON.parse() to get into JS object or array
// Given the HTML and CSS add an event to the div using JS – a quick event

function modifyText() {
  let t2 = document.getElementById("t2");
    t2.firstChild.nodeValue = "three";
}

// let el = document.getElementById("outside"); // or querySelector(".class")
// el.addEventListener("click", modifyText);
//also keydown, mouseover, etc.

// If provided a set of functions why would this code break or why it didn’t work?
// It was centered around asynchronous code and he would call a certain variable
// If this was returned in a promise, how would you do it?

// fetch("/messages")
//     .then(function(info) {
//       info.json().then(data => console.log(data));
//     });
//
// Why is JPMC hiring?  What problems are they currently facing?
// What do you like about working there?
// How was your transition from Hack Reactor to JPMC?
// Is there mentoring available?
// What kind of projects can I expect to work on?
// Insight on contract position and how it differs or can lead to full time?

// interview

var siteData = {
    users: [
        {
            id: 68237946,
            birthMonth: 5,
            vip: "true"
        },
        {
            id: 23949894,
            birthMonth: 2,
            vip: "false"
        },
        {
            id: 65524624,
            birthMonth: 11,
            vip: "false"
        },
        {
            id: 16728547,
            birthMonth: 9,
            vip: "true"
        },
    ]
};
//Returns an array of all eligible user ids
//Eligibility rules:
// 1) User was born in the current month
// 2) User has vip account status
function findEligibleUsers(data, currentMonth) {

    let filteredUsers = data.users.filter((user) => (
        user.birthMonth === currentMonth && user.vip === "true"
    ));
    console.log(filteredUsers);
}

// findEligibleUsers(siteData, 9);

//HTML

// <body>
//     ...
//     <div class="button important" id="activateButton"> Activate your account </div>
// </body>

//CSS

// div .button {
//     font-size: 9px;
//     padding: 5px;
//     color: #0b97c4;
// }

//JS

// let activateButton = document.getElementById('activateButton');
// activateButton.addEventListener('click', submitActivation);'





// function getVIPsFromServer() {
//  fetch("https://email-web-api.herokuapp.com/api/emails");
// }

function isUserVIP(userId) {
    fetch("http://email-web-api.herokuapp.com/api/emails")
        .then(data => data.json())
        .then(data => {
          Object.values(data).forEach(user => {
            if (user.to === userId) {
              console.log(user);
            }
          });
        });
}
var userID = "mjq8@cornell.edu";
isUserVIP(userID);


// function getVIPsFromServer() { /* Asynchronous method which retrieves list of VIPs. Do not implement this method */ }
//
//  function isUserVIP(userId) {
//      getVIPsFromServer()
//          .then((vipList) => {
//            if (vipList.indexOf(userId) !== -1) {
//              return true;
//            }
//            return false;
//          })//INSERTCODEHERE
//  }
//
//  var userId = "55555555"
//
//  if(isUserVIP(userId)) {
//      $('.userBadge').addClass('vip');
//  }
