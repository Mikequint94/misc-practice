function streamProcessing(file) {
  let fs = require("fs");
  const text = fs.readFileSync(file, "utf-8");
  let splitText = text.split("!"); // but wouldnt work for double !!
  console.log(splitText);
}
streamProcessing('./day9.txt');
