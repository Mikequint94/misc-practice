function windowPatterns(file) {
  let fs = require("fs");
  const text = fs.readFileSync(file, "utf-8");
  let lines = text.split("\n");
  // lines.splice(-1);
  console.log(lines);
}

windowPatterns("./test.txt")