function digPlumb(file) {
  let fs = require("fs");
  const text = fs.readFileSync(file, "utf-8");
  let lines = text.split("\n");
  
  console.log(lines);
}

digPlumb('./day12.txt');
