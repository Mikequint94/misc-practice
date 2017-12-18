function hexEd(file) {
  let fs = require("fs");
  const text = fs.readFileSync(file, "utf-8");
  let directions = text.split(",");
  console.log(directions);
  let up = 0;
  let upmax = 0;
  let right = 0;
  let rightmax = 0;
  directions.forEach(direction => {
    if (direction.includes('n')) {
      up +=1;
    }
    if (direction.includes('e')) {
      right +=1;
    }
    if (direction.includes('s')) {
      up -=1;
    }
    if (direction.includes('w')) {
      right -=1;
    }
    if (Math.abs(up) > Math.abs(upmax)) {
      upmax = up;
    }
    if (Math.abs(right) > Math.abs(rightmax)ad) {
      rightmax = right;
    }
  });
  console.log(up, right);
  console.log(upmax, rightmax);
}

hexEd('./day11.txt');
