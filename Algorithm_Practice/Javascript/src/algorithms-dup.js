function digitalRoot (number) {
  if (number < 10) {
    return number;
  } else {
    return digitalRoot(Math.floor(number/10) + number % 10);
  }
}
// console.log(digitalRoot(123));
function caesarCipher (string, shift) {
  let alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  let result = [];
  string.split("").map((ch, idx) => {
    result.push(alphabet[(alphabet.indexOf(ch)+shift)%26]);
  });
  console.log(result.join(''));
}
// caesarCipher("helloworld", 34);
function commonSubstrings(str1, str2) {
  let cache = new Array(str1.length);
    for (let i =0; i <str1.length; i++) {
      cache[i] = [];
    }
  let longest = [''];

  str1.split('').forEach((el1, idx1) => {
    str2.split('').forEach((el2, idx2) => {
      if (el1 === el2) {
        if (idx1>0 && idx2 > 0) {
          cache[idx1][idx2] = cache[idx1-1][idx2-1] +1;
          if (cache[idx1][idx2] > longest.length) {
            longest = str1.split("").slice(idx1 - cache[idx1][idx2]+ 1,idx1 +1);
          }
        } else {
          cache[idx1][idx2] = 1;
          if (longest.length < 2) {
            longest = [el1];
          }
        }
      } else {
        cache[idx1][idx2] = 0;
      }
    });
  });
  return longest.join('');
}
// console.log(commonSubstrings("okay I dont get itsy", "so its this is it?"));

function sumRec(numbers) {
  if (numbers.length === 1) {
    return numbers[0];
  }
  return numbers.shift() + sumRec(numbers);
}
// console.log(sumRec([2,4,6,1,2,0,3]));

function fibs(number) {
  let cache = {1: [0], 2: [0,1], 3: [0,1,1]};
  if (number < 4) {
    return cache[number];
  } else {
    for (let i = 4; i <= number; i++) {
      cache[i] = Array.from(cache[i-1]);
      cache[i].push(cache[i][i-2] + cache[i][i-3]);
    }
    return cache[number];
  }
}
// console.log(fibs(23));

function isPalindrome(string) {
  let splitString = string.split('');
  let idx = 0;
  while (idx < Math.floor(splitString.length / 2)) {
    if (splitString[idx] !== splitString[splitString.length -1 - idx]) {
      return false;
    }
    idx++;
  }
  return true;
}
// console.log(isPalindrome("racsdxcar"));

function foldingCipher(string) {
  let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  let result = [];
  string.split('').map((ch, idx) => {
    result.push(alphabet[25 - alphabet.indexOf(ch)]);
  });
  return result.join('');
}
// console.log(foldingCipher("azbchelloworld"));

function uniqueSubs(string) {
  let results = new Set();
  for (let i = 0; i < string.length; i++) {
    for (let j = i+1; j<= string.length; j++) {
      results.add(string.slice(i,j));
    }
  }
  return results;
}
// console.log(uniqueSubs("hello"));
function lcs(array) {
  let largestSum = 0;
  let currentSum = 0;
  array.forEach(el => {
    currentSum+= el;
    if (currentSum > largestSum) {
        largestSum = currentSum;
    }
    if (currentSum < 0) {
      currentSum = 0;
    }
  });
  return largestSum;
}
// console.log(lcs([1,2,3,4,-5,4,5,-10,2,3,4]));

function sillyYears(year) {
  let results = [];
  while (results.length < 10) {
    year++;
    let firstTwo = Math.floor(year/100);
    let lastTwo = year % 100;
    let middleTwo = Math.floor(year/10) % 100;
    if (firstTwo + lastTwo === middleTwo) {
      results.push(year);
    }
  }
  return results;
}

// console.log(sillyYears(2018));

function pairSum(array, k) {
  let map = new Map();
  let pairs = [];
  array.forEach(el => map.set(el, map.get(el) + 1 || 1));
  array.forEach(el => {
    if (map.get(k - el)) {
      if (k - el === el && map.get(k-el) > 1) {
        pairs.push([Math.min(el, k-el), Math.max(el, k-el)]);
      } else if (k - el !== el){
        pairs.push([Math.min(el, k-el), Math.max(el, k-el)]);
      }
      map.delete(el);
    }
  });
  return pairs;
}
// console.log(pairSum([1,3,32,3,4,5], 6));

function matrixRegionSum(matrix, topLeftCoords, bottomRightCoords) {
  let sum = 0;
  for (let x = topLeftCoords[0]; x <= bottomRightCoords[0]; x++) {
    for (let y = topLeftCoords[1]; y <= bottomRightCoords[1]; y++) {
      sum += matrix[x][y];
    }
  }
  return sum;
}

// console.log(matrixRegionSum([[2,3,4,5],[4,3,2,1],[3,3,3,3],[1,1,1,3]], [0,2],[2,2]));
