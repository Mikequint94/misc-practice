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
  let finished = false;
  // let chunk = parseInt(number.toString().split("").splice(-3).join(""));
  let chunks = number.toLocaleString().split(",");
  console.log(chunks);
  number = Math.floor(number/1000);
  while (!finished) {
    console.log(chunk, number);
    if (chunk < 20) {
      // console.log(chunk, number);
      englishNumber += firstNineteen[chunk - 1] || "";
      chunk = parseInt(number.toString().split("").splice(-3).join(""));
      if (number === 0) {
        finished = true;
      }
      number = Math.floor(number/1000);
    } else if (chunk < 100) {
      englishNumber += tensPlace[Math.floor(chunk / 10) - 2];
      chunk = chunk % 10;
    } else if (chunk < 1000) {
      englishNumber += firstNineteen[Math.floor(chunk /100) - 1] + "Hundred";
      chunk = chunk % 100;
    } else if (number < 10000) {
      englishNumber += firstNineteen[Math.floor(number / 1000) - 1] + "Thousand";
      number = number % 1000;
    } else if (number < 100000) {
      englishNumber += tensPlace[Math.floor(number / 10000) - 2] || firstNineteen[Math.floor(number/1000) - 1] + "Thousand";
      number = number >= 20000 ? number % 10000 : number % 1000;
    } else if (number < 1000000) {
        englishNumber += firstNineteen[Math.floor(number /100000) - 1] + "Hundred";
        number = number % 100000;
    } else if (number < 10000000) {
        englishNumber += firstNineteen[Math.floor(number /1000000) - 1] + "Million";
        number = number % 1000000;
    } else if (number < 100000000) {
        englishNumber += tensPlace[Math.floor(number /10000000) - 2] || firstNineteen[Math.floor(number/1000000) - 1] + "Million";
        number = number >= 20000000 ? number % 10000000 : number % 1000000;
    } else if (number < 1000000000) {
        englishNumber += firstNineteen[Math.floor(number /100000000) - 1] + "Hundred";
        number = number % 100000000;
    }
  }
  
  
  console.log(englishNumber+"Dollars");
}

// textDollar(3);
// textDollar(87);
// textDollar(423);
// textDollar(1000);
// textDollar(9999);
// textDollar(99999);
// textDollar(123456);
// textDollar(1234567);
textDollar(123456789);
// textDollar(12345);