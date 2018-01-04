function windowPatterns(file) {
  console.time("test1");
  let fs = require("fs");
  const text = fs.readFileSync(file, "utf-8");
  let lines = text.split("\n");
  let numDays = parseInt(lines[0].split(" ")[0]);
  let windowSize = parseInt(lines[0].split(" ")[1]);
  let prices = lines[1].split(" ").map(Number);

  let simpleArray = prices.map((price, idx, arr)=>{
    if(!arr[idx - 1]){
      return 0;
    } else if(price > arr[idx - 1]){
      return 1;
    } else if(price < arr[idx - 1]){
      return -1;
    } else if(price === arr[idx - 1]){
      return 0;
    }
  });
  for (let i = 0; i < numDays - windowSize + 1; i++) {
    let pattern = 0;
    let condensed = condenseArray(simpleArray.slice(i+1, i+windowSize));
    condensed.forEach(el => {
      if (el > 0) {
        pattern += ((el + 1) * (el/2));
      } else if (el < 0) {
        pattern += ((el - 1) * (el/-2));
      }
    });
    console.log(pattern);
  }
  console.timeEnd("test1");
}
function condenseArray(array) {
  let i = 1;
  while (i < array.length) {
    if (array[i-1] >= 0 &&  array[i] >= 0) {
      array[i] += array[i-1];
      array.splice(i-1,1);
    } else if (array[i-1] <= 0 &&  array[i] <= 0) {
      array[i] += array[i-1];
      array.splice(i-1,1);
    } else {
      i++;
    }
  }
  return array;
}

windowPatterns('./test-big.txt');
