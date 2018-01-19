var theFinalCountDown = [1, 2, 3, 4, 5];

function printCount (count) {
  setTimeout(() => {console.log(count);}, 1000);
}

for (var i = 0; i < theFinalCountDown.length; i++) {
   let count = theFinalCountDown[i];
   setTimeout(() => {console.log(count);},  count*1000);
}
