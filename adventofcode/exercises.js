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

}

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
    // console.log(pointer);
    // console.log(jumps);
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
jumpAround('./day5.txt');
