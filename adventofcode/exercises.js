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
function checkSumDivide(spreadsheet) {
  let rows = spreadsheet.split("x");
  let result = 0;
  rows.forEach(row => { 
     let sum;
	   let nums = row.split(/\s+/);
     for (let i=0; i < nums.length - 1; i++) {
       for (let j = i + 1; j < nums.length; j++) {
         if (nums[i] % nums[j] === 0) {
           sum = nums[i] / nums[j];
         } else {
           if (nums[j] % nums[i] === 0) {
             sum = nums[j] / nums[i];
           }
         }
       }
     }
     // console.log(result);
	result = result + sum;
  });
  return result;
}