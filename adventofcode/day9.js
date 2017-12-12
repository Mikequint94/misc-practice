function streamProcessing(file) {
  let fs = require("fs");
  const text = fs.readFileSync(file, "utf-8");
  var regex = new RegExp('!\.');
  let splitText = text.split(regex); //remove canceled characters

  splitText = splitText.filter(n => n);
  splitText = splitText.join("");

  var brackets = new RegExp('<\.+>');
  splitText = splitText.split(brackets); //remove garbafe
  splitText = splitText.join(""); //remove garbafe
  console.log(splitText);
}

// streamProcessing('./day9.txt');
streamProcessing('./day9-test.txt');
