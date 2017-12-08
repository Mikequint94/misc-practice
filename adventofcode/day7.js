function recursiveCircus(file) {
  let fs = require("fs");
  const text = fs.readFileSync(file, "utf-8");
  let lines = text.split("\n");
  let tops = [];
  let allNames = [];
  lines.map(line => {
    let topHalf = line.split("-> ");
    if (topHalf[1]) {
      tops.push(...topHalf[1].split(", "));
    }
    let names = line.split(" (");
    if (names[0]) {
      allNames.push(names[0]);
    }
  });
  tops.forEach(top => {
    // console.log(top);
    let index = allNames.indexOf(top);
    // console.log(index);
    allNames.splice(index,1);
  });
  console.log(allNames);
}

recursiveCircus('./day7.txt');
