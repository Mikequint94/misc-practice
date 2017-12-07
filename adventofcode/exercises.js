// add to total if number is next to same number in long string
function captcha(num) {
    let result = 0;
	num = num.split("");
	console.log(num);
  let i;
    for (i = 0; i <= num.length; i++) {
        if (num[i] === (num[i+1] || num[0])) {
            result = result + parseInt(num[i]);
        }
    }
    return result;
}
// add to total if number half way around string is same
function captchaAround(num) {
  let result = 0;
	num = num.split("");
	console.log(num);
  let i;
    for (i = 0; i < num.length; i++) {
        if (num[i] === num[(i+num.length/2)% num.length]) {
            result = result + parseInt(num[i]);
        }
    }
    return result;
}
function checkSum(spreadsheet) {
  let rows = spreadsheet.split("x");
  let result = 0;
  rows.forEach(row => {
	let diff = Math.max(...row.split(/\s+/)) - Math.min(...row.split(/\s+/));
  // console.log(diff);
	result = result + diff;
  });
  return result;
}
function spiralMemory(number) {
  let total = 1;
  let i = 0;
  while (total < number) {
    total = total + 1 + 8*i;
    i++;
  }
  return [i, total];
}
//got number of spirals out from center, then worked way around.
function spiralMemoryBorder(number) {
  let x = 0;
  let y = 0;
  let matrix = {};
  matrix[x + "," + y] = 1;
  let value = 1;
  while(value <= number) {
    if ((x!==y || x >= 0) && Math.abs(x) <= Math.abs(y)) {
      x += y >= 0 ? 1: -1;
    } else {
      y += x >= 0 ? -1: 1;
    }
    value = getValue(matrix, x, y);
    matrix[x + "," + y] = value;
  }
  console.log(value);
}
function getValue(matrix, x, y) {
  let sum = 0;
  for (let i = x-1; i<= x+1; i++) {
    for (let j = y-1; j<= y+1; j++) {
      if (matrix[i + "," + j]) {
        sum += matrix[i + "," + j];
      }
    }
  }
  return sum;
}
// spiralMemoryBorder(368078);

function validPassphrase(file) {
  let fs = require("fs");
  const text = fs.readFileSync(file, "utf-8");
  let lines = text.split("\n");
  let count = 0;
  lines.forEach((line) => {
    let words = line.split(" ");
    let set = new Set(words);
    // console.log(set.size, words.length);
    if (set.size === words.length) {
      count++;
    }
  });
  console.log(count);
}
function validPassphraseAnagram(file) {
  let fs = require("fs");
  const text = fs.readFileSync(file, "utf-8");
  let lines = text.split("\n");
  let count = 0;
  lines.forEach((line) => {
    let words = line.split(" ");
    words = words.map(word => word.split("").sort().join(""));
    // console.log(words);
    let set = new Set(words);
    // console.log(set.size, words.length);
    if (set.size === words.length) {
      count++;
    }
  });
  console.log(count);
}

// validPassphraseAnagram('./day4.txt');

function jumpAround(file) {
  let fs = require("fs");
  let jumps = fs.readFileSync(file, "utf-8").split("\n").map(jump => parseInt(jump));
  jumps.pop();
  let pointer = 0;
  let steps = 0;
  while (pointer >= 0 && pointer < jumps.length) {
    steps++;
    let oldpointer = pointer;
    pointer += jumps[pointer];
    if (jumps[oldpointer] >= 3) {
      jumps[oldpointer] -= 1;
    } else {
      jumps[oldpointer]++;
    }
  }
  console.log(steps);
}
// jumpAround('./day5.txt');

Array.prototype.hashCode = function() {
    let hash = 0
    for (let i = 0; i < this.length; i++) {
        hash = (hash/.723429988134 - i/3.21+((i*this[i]-13.2)*9)/1.3+ (this[i]*2.2 - 3.5) * ((i+13)/4 + 32)/11 - (this[i]*(i-11)/2.3)) + (hash*3.2-i*11);
    }
    return hash;
};

// console.log([1,2,3].hashCode());
function memoryReallocation(file){
  let fs = require('fs');
  let banks = fs.readFileSync(file, "utf-8").trim().split("\t").map(el => parseInt(el));
  // let banks2 = banks.slice(0);
  const history = new Set();
  // history.add(banks.hashCode())
  let rounds = 0;
  // console.log(history);
  while (!history.has(banks.hashCode()) || rounds === 1) {
    rounds++;
    history.add(banks.hashCode());
    // banks = banks.slice(0);
    let currentMax = (Math.max(...banks));
    let currentIndex = banks.indexOf(currentMax);
    banks[currentIndex] = 0;
    // console.log(history);
    for (let i=1; i <= currentMax; i++) {
      banks[(currentIndex + i) % 16]++;
    }
    // console.log(history);
    // console.log(history.has(banks));
  }
  console.log( rounds);
}

memoryReallocation('day6.txt');
