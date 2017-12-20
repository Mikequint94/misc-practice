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

// maxRangeSum("10 7 -3 -10 4 2 8 -2 4 -5 -6");


function textDollar(number) {
  let englishNumber = "";
  let firstNineteen = "One Two Three Four Five Six Seven Eight Nine Ten Eleven Twelve Thirteen Fourteen Fifteen Sixteen Seventeen Eighteen Nineteen".split(" ");
  let tensPlace  = "Twenty Thirty Forty Fifty Sixty Seventy Eighty Ninety".split(" ");
  let chunks = number.toLocaleString().split(",");
  let endings = ["Dollars", "Thousand", "Million"].slice(0,chunks.length);
  let chunk = parseInt(chunks.shift());
  while (endings.length > 0) {
    console.log(endings);
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
  console.log(englishNumber);
}

textDollar(1111321);