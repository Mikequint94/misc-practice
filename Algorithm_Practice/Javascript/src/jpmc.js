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


