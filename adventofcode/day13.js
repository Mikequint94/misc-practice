function fireWall(file) {
  let fs = require("fs");
  const text = fs.readFileSync(file, "utf-8");
  let lines = text.split("\n");
  lines.splice(-1);
  let wall = new Map();
  lines.forEach(line => {
    line = line.split(": ");
    wall.set(line[0], parseInt(line[1]));
  });
  let severity = 0;

Array.from(wall.keys()).forEach(key => {
  let scanner = key % ((wall.get(key) - 1) * 2);
  console.log(scanner, wall.get(key));
  if (scanner === 0) {
    severity += key * wall.get(key);
  }
});
console.log(severity);

}

fireWall('./day13.txt');
