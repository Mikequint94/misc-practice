function streamProcessing(file) {
  let fs = require("fs");
  const text = fs.readFileSync(file, "utf-8");
  var regex = new RegExp('!\.');
  let splitText = text.split(regex); // but wouldnt work for double !!
  console.log(splitText);
}

// streamProcessing('./day9.txt');
streamProcessing('./day9-test.txt');
