function fireWall(file) {
  let fs = require("fs");
  const text = fs.readFileSync(file, "utf-8");
  let lines = text.split("\n");
  lines.splice(-1);
  let wall = new Map();
  lines.forEach(line => {
    line = line.split(": ");
    wall.set(line[0],line[1]);
  });

Array.from(wall.keys()).forEach(key => {
  console.log(key);
});

}

fireWall('./day13-test.txt');
