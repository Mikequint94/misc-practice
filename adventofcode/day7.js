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

// recursiveCircus('./day7.txt');
function recursiveCircus2(file) {
  let fs = require("fs");
  const text = fs.readFileSync(file, "utf-8");
  let lines = text.split("\n");
  let tops = [];
  let allNames = [];
  let weights = new Map;

  lines.map(line => {
    let names = line.split(" (");
    if (names[0]) {
      weights.set(names[0], names[1].split(")")[0]);
    }
  });
  lines.map(line => {
    tops = [];
    let names = line.split(" (");
    if (names[0] === 'inwmb') {
    //   let name= names[0];
    // }
    let topHalf = line.split("-> ");
    if (topHalf[1]) {
      tops.push(...topHalf[1].split(", "));
      console.log(tops);
    }
    // console.log(weights[names[0]], weights[tops[0]]);
    // console.log(names[0], tops);
    let leftside = parseInt(weights.get(names[0]));
    let rightside = 0;
    tops.forEach(top => {
      rightside += parseInt(weights.get(top));
    });
    if (rightside > 0) {
      console.log(leftside + rightside);
    }
  }
  });
  // tops.forEach(top => {
  //   // console.log(top);
  //   let index = allNames.indexOf(top);
  //   // console.log(index);
  //   allNames.splice(index,1);
  // });
  // console.log(weights);
}
recursiveCircus2('./day7.txt');
// wrong approach.  i need to use recursion
