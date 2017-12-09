function registerInstructions(file) {
  let fs = require("fs");
  const text = fs.readFileSync(file, "utf-8");
  let lines = text.split("\n");
  lines.splice(-1,1);
  let dictionary = new Map;

  let max;
  let newval;
  lines.forEach(line => {
    line = line.split(" if ");
    let statement = line[1].split(" ");
    if (!dictionary.has(statement[0])) {
      dictionary.set(statement[0], 0);
    }
    let command = line[0].split(" ");
    if (!dictionary.has(command[0])) {
      dictionary.set(command[0], 0);
    }
    let ifStatement = eval(`if ( ${dictionary.get(statement[0])} ${statement[1]} ${statement[2]}) {
      if ("inc" == "${command[1]}") {
        newval = parseInt(dictionary.get(command[0])) + parseInt(command[2]);
        dictionary.set(command[0], newval);
      } else {
        newval = parseInt(dictionary.get(command[0])) - parseInt(command[2]);
        dictionary.set(command[0], newval);
      }
      if (!max || max < newval) {
        max = newval;
      }
    }`);
    // console.log(statement);
  });
  console.log(max);
}

registerInstructions('./day8.txt');
