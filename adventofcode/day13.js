function fireWall(file) {
  let fs = require("fs");
  const text = fs.readFileSync(file, "utf-8");
  let lines = text.split("\n");
}

fireWall('./day13-test.txt');
