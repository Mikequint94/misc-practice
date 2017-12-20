(function () {
if(typeof Algorithms === "undefined") {
  window.Algorithms = {};
}

// Write a method, digital_root(num).
// It should sum the digits of a positive integer.
// If it is greater than or equal to 10, sum the digits of the resulting number.
// Keep repeating until there is only one digit in the result, called the "digital root".
// Do not use string conversion within your method.
Algorithms.digitalRoot = function (number) {
  if (number < 10) {
    return number;
  } else {
    let newNumber = Math.floor(number / 10) + number % 10;
    return Algorithms.digitalRoot(newNumber)
  }
};

// Write a function that takes a message and an increment amount and outputs the same letters shifted by that amount in the alphabet.
// Assume lowercase and no punctuation.
// Preserve spaces.
Algorithms.caesarCipher = function (string, shift) {
  let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  let splitString = string.split("");
  splitString.map((ch, idx) => {
    let newChar = alphabet[(alphabet.indexOf(ch) + shift) % 26];
    splitString[idx] = newChar;
  });
  return splitString.join("");
};

// Write a function that takes two strings and returns the lenght of the longest common substring.
Algorithms.commonSubstrings = function (stringOne, stringTwo) {
  let cache = new Array(stringOne.length);
  for (let i=0; i < stringOne.length; i++){
    cache[i] = [];
  }
  let longest = [""];

  stringOne.split("").forEach((el1, idx1) => {
    stringTwo.split("").forEach((el2, idx2) => {
      if (el1 === el2) {
        if (idx1 > 0 && idx2 > 0){
          cache[idx1][idx2] = cache[idx1-1][idx2-1] + 1;
          if (cache[idx1][idx2] > longest.length) {
            longest = stringOne.split("").slice((idx1 - cache[idx1][idx2] + 1), cache[idx1][idx2] + 1);
          }
        } else {
          cache[idx1][idx2] = 1;
          // console.log(el1,el2)
          if (longest.length < 2) {
            longest = [el1];
          }
        }
      } else {
        cache[idx1][idx2] = 0;
      }
    });
  });
  return longest.length;
};

// Write a function that takes an array of integers and returns their sum.
// Use recursion.
Algorithms.sumRec = function (numbers) {
  if (numbers.length === 1) {
    return numbers[0];
  } else {
    return numbers.shift() + Algorithms.sumRec(numbers);
  }

};

// Write a function which returns the first n elements from the fibonnacci sequence, given n.
Algorithms.fibs = function (number) {
  let cache = {1: [0], 2: [0,1], 3: [0,1,1]};
  if (number < 4) {
    return cache[number];
  } else {
    for (let i = 4; i <= number; i++) {
      cache[i] = cache[i - 1];
      cache[i].push((cache[i-1][i-2] + cache[i-1][i-3]));
    }
  }
  return cache[number];

};

// Write a function that takes a string and returns true if it's a palindrome, false if it's not.
// Your solution should take less time and memory than rebuilding the string backward and comparing the two.
Algorithms.isPalindrome = function (string) {
  string = string.split("");
  let j = string.length-1;
  for (let i = 0; i < j; i++) {
    if (string[i] !== string[j]){
      return false;
    }
    j -= 1;
  }
  return true;
};

// Implement the Folding Cipher.
// It folds the alphabet in half and uses the adjacent letter.
// a <=> z, b <=> y, c <=> x, m <=> n.
Algorithms.foldingCipher = function (string) {
  let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  string = string.split("");
  string.map((el, idx) => {
    let newChar = alphabet[25 - alphabet.indexOf(el)];
    string[idx] = newChar;
  });
  return string.join("");
};

// Write a method that finds all the unique substrings for a word.
Algorithms.uniqSubs = function (string) {
  let results = [];
  for (let i = 0; i < string.length; i++) {
    for (let j = i+1; j < string.length + 1; j++) {
      if (!results.includes(string.substring(i,j))) {
        results.push(string.substring(i,j));
      }
    }
  }
  return results;
};


// Given an array of integers (positive and negative) find the largest contiguous subsum (sum of a subarray).
// You can solve this trivially in O(n**2) time by considering all subarrays.
// Try to solve it in O(n) time with O(1) memory.
Algorithms.lcs = function (array) {
  let largest = 0;
  let currentSum = 0;
  array.forEach((el) => {
    currentSum += el;
    if (currentSum < 0) {
      currentSum = 0;
    }
    if (currentSum > largest) {
      largest = currentSum;
    }
  });
  return largest;
};

// Write a function that takes a year (four digit integer) and returns an array with the 10 closest subsequent years that meet the following condition:
// the first two digits summed with the last two digits are equal to the middle two digits.
Algorithms.sillyYears = function (number) {
  let result = [];
  let year = number + 1;
  while (result.length < 10) {
    let firstTwo = Math.floor(year/100);
    let lastTwo = year % 100;
    let middleTwo = Math.floor(year/10) % 100;
    if (firstTwo + lastTwo === middleTwo) {
      result.push(year);
    }
    year += 1;
  }
  return result;
};

// Given an array of integers, return all pairs that sum up to a specified value k.
// List the pairs in [min, max] order.
// Time complexity: O(n).
// Return an array.
Algorithms.pairSum = function (array, k) {
  let hash = new Map;
  let results = [];
  array.forEach((el) => {
    hash[el] = true;
  });
  array.forEach((el) => {
    if (hash[(k-el)] === true){
      hash[el] = false;
      if (el < k - el){
        results.push([el, k-el]);
      } else {
        results.push([k - el, el]);
      }
    }
  });
  return results;
};

// Given a matrix of integers and coordinates of a rectangular region within the matrix.
// Find the sum of numbers falling inside the rectangle.
// Time complexity: O(number of rows * number of columns).
Algorithms.matrixRegionSum = function (matrix, topLeftCoords, bottomRightCoords) {
  let sum = 0;
  for (let i = topLeftCoords[0]; i <= bottomRightCoords[0]; i++) {
    for (let j = topLeftCoords[1]; j <= bottomRightCoords[1]; j++) {
      sum = sum + matrix[j][i];
    }
  }
  return sum;
};
})();
