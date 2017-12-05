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

validPassphrase('./day4.txt');
