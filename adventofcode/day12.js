function digPlumb(file) {
  let fs = require("fs");
  const text = fs.readFileSync(file, "utf-8");
  let lines = text.split("\n");
  lines.splice(lines.length-1, 1);
  allGroups = new Set('0');
  dictionary = new Map;
  lines.forEach(line => {
    let splitLine = line.split(" <-> ");
    let program = splitLine[0];
    let groups = splitLine[1];
      dictionary.set(program, groups.split(", "));
  });
    let newAdds = dictionary.get('0');
    newAdds.forEach(child => {
      addChildren(child);
    });
    console.log(allGroups);
    console.log(dictionary);
}
function addChildren(child) {
    allGroups.add(child);
    // console.log(allGroups);
    let newAdds = dictionary.get(child);
    dictionary.delete(child);
    if (newAdds) {
    newAdds.forEach(group => {
      if (!allGroups.has(group)) {
        addChildren(group);
      }
    });
  }
}
digPlumb('./day12-test.txt');
