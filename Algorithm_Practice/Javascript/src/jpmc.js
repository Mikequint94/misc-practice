//JPMC Coding Assessment

function maxRangeSum(input) {
  input = input.split(" ").slice(1);
  let maxGain = 0;
  let currentSum = 0;
  input.forEach(gain => {
    currentSum += parseInt(gain);
    if (currentSum < 0) {
      currentSum = 0;
    }
    if (currentSum > maxGain) {
      maxGain = currentSum;
    }
  });
  console.log(maxGain);
}

// Text Dollar Problem - function can be called directly or through standard input

// Stdin processing
let encoding = 'utf-8';
let data = "";
if (process.stdin.isTTY) {
   data = process.argv[2] || '';
  process.stdout.write(textDollar(data));
} else {
  process.stdin.setEncoding(encoding);
  process.stdin.on('readable', function() {
    var chunk;
    while (chunk = process.stdin.read()) {
      data += chunk;
    }
  });
  process.stdin.on('end', function () {
    data = data.replace(/\n$/, '');
    data.split("\n").forEach(number => {
      process.stdout.write(textDollar(number));
    });
  });
}

function textDollar(number) {
  number = parseInt(number); //make sure input is a number
  let englishNumber = "";
  let firstNineteen = "One Two Three Four Five Six Seven Eight Nine Ten Eleven Twelve Thirteen Fourteen Fifteen Sixteen Seventeen Eighteen Nineteen".split(" ");
  let tensPlace  = "Twenty Thirty Forty Fifty Sixty Seventy Eighty Ninety".split(" ");
  let chunks = number.toLocaleString().split(",");
  let endings = ["Dollars", "Thousand", "Million", "Billion", "Trillion"].slice(0,chunks.length);
  let chunk = parseInt(chunks.shift());
  while (endings.length > 0) {
    if (chunk < 20) {
      englishNumber += firstNineteen[chunk - 1] || "";
      englishNumber += endings.pop();
      chunk = parseInt(chunks.shift());
    } else if (chunk < 100) {
      englishNumber += tensPlace[Math.floor(chunk / 10) - 2];
      chunk = chunk % 10;
    } else if (chunk < 1000) {
      englishNumber += firstNineteen[Math.floor(chunk /100) - 1] + "Hundred";
      chunk = chunk % 100;
    }
  }
  return englishNumber + "\n";
}