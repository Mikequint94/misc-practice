function streamProcessing(file) {
  let fs = require("fs");
  const text = fs.readFileSync(file, "utf-8");
  let regex = new RegExp('!\.');
  let splitText = text.split(regex); //remove canceled characters

  splitText = splitText.filter(n => n);
  splitText = splitText.join("");

  let brackets = new RegExp('<(.*?)>');
  splitText = splitText.split(brackets); //filter out garbage
  let noGarbage = ""; // join only non-garbage back in
  for (let i = 1; i <= splitText.length; i++) {
    if (i%2 === 1) {
      noGarbage += splitText[i - 1];
    }
  }
  console.log(noGarbage);
  // get points
  let points = 0;
  let nestLevel = 0;
  for (let i = 0; i < noGarbage.length; i++) {
    if (noGarbage[i] === "{") {
      nestLevel +=1;
      points += nestLevel;
    }
    if (noGarbage[i] === "}") {
      nestLevel -=1;
    }
  }
  console.log(points, nestLevel);
}

// streamProcessing('./day9.txt');
streamProcessing('./day9.txt');
