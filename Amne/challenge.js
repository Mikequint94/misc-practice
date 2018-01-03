function windowPatterns(file) {
  let fs = require("fs");
  const text = fs.readFileSync(file, "utf-8");
  let lines = text.split("\n");
  let numDays = parseInt(lines[0].split(" ")[0]);
  let windowSize = parseInt(lines[0].split(" ")[1]);
  let prices = lines[1].split(" ").map(Number);
  console.log(prices, windowSize, numDays);
  
  let output = [];
  for (let i = 0; i < numDays - windowSize + 1; i++) {
    let pattern = 0;
    for (let j = 0; j < windowSize - 1; j++) {
      if (prices[i + j] < prices[i + j + 1]) {
        pattern += 1;
      } else if (prices[i + j] > prices[i + j + 1]) {
        pattern -= 1;
      }
    }
    output.push(pattern);
  }
  console.log(output);
}

windowPatterns("./test.txt")