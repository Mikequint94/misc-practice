//actually all learned at JPMC interview

var theFinalCountDown = [1, 2, 3, 4, 5];

//original. Prints undefined 5 times.
// for (var i = 0; i < theFinalCountDown.length; i++) {
//    setTimeout(function() {
//      console.log(theFinalCountDown[i]);
//    }, 1000);
// }


//easy ES6 fix.  Change var to let;
// for (let i = 0; i < theFinalCountDown.length; i++) {
//    setTimeout(function() {
//      console.log(theFinalCountDown[i]);
//    }, 1000);
// }


//OG fix using closure.  Need parentheses.  and to call it with i.
for (var i = 0; i < theFinalCountDown.length; i++) {
  (function(j) {
    setTimeout(function() {
        console.log(theFinalCountDown[j]);
      }, 1000);
    })(i);
}

//also learned if you do
function hello () {
  var a = b = 4
}
hello();

// console.log(a);  a will be undefined.
// console.log(b);  b will be 4 because it is set on global scope.
