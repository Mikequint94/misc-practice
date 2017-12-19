function fireWall(file) {
  let fs = require("fs");
  const text = fs.readFileSync(file, "utf-8");
  let lines = text.split("\n");
  lines.splice(-1);
  let wall = new Map();
  lines.forEach(line => {
    line = line.split(": ");
    wall.set(parseInt(line[0]), parseInt(line[1]));
  });
  let allKeys = Array.from(wall.keys());
  let delay = 0;
  let finished = false;
  while (!finished) {
    let hit = 0;
    allKeys.forEach(key => {
      let scanner = (key+delay) % ((wall.get(key) - 1) * 2);
      if (scanner === 0) {
        hit += 1;
      }
    });
    // console.log(severity);
    if (hit === 0) {
      finished = true;
    }
    delay++;
  }
  console.log(delay-1);

}

fireWall('./day13.txt');
