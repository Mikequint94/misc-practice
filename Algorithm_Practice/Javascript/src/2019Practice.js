const BSTNode = require('./practiceHelper');

//Given a 2D map, can the robber make an escape path from top left corner to bottom right?
const escapeMap = [[0,0,0,1,0],
                   [1,1,0,0,0],
                   [0,1,0,1,0],
                   [0,1,0,0,1],
                   [1,1,1,1,0]];

function canEscape(array) {
  let endPos = [array[0].length - 1, array.length - 1];
  function pathFinder(currentPos) {
    if (currentPos[0] === endPos[0] && currentPos[1] === endPos[1]) {
      return true;
    }
    if (currentPos[0] >= 0 && currentPos[0] < array[0].length && currentPos[1] >= 0 && currentPos[1] < array.length && array[currentPos[0]][currentPos[1]] === 0) {
      array[currentPos[0]][currentPos[1]] = 1;
      return pathFinder([currentPos[0] -1, currentPos[1]]) || pathFinder([currentPos[0] + 1, currentPos[1]]) || pathFinder([currentPos[0], currentPos[1] - 1]) ||pathFinder([currentPos[0], currentPos[1] + 1]);
    }
    return false;
  }
  return pathFinder([0,0]);
}
// console.log(canEscape(escapeMap));


function islandCounter(array) {
  let count = 0;
  for (let i = 0; i< array[0].length; i++) {
    for (let j=0; j< array.length; j++) {
      if (array[j][i] === 1) {
        count++;
        explore(i, j);
      }
    }
  }
  function explore(row, column) {
    if (row < 0 || column < 0 || row >= array[0].length || column >= array.length || array[column][row] === 0) {
      return;
    } else {
      array[column][row] = 0;
      explore(row+1, column);
      explore(row-1, column);
      explore(row, column+1);
      explore(row, column-1);
    }
  }
  return count;
}

// console.log(islandCounter(escapeMap));
class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

function reverseLinkedList(head) {
  let prevNode = null;
  let currentNode = head;
  let nextNode = head.next;
  currentNode.next = null;
  while (nextNode) {
    prevNode = currentNode;
    currentNode = nextNode;
    nextNode = nextNode.next;
    currentNode.next = prevNode;
  }
  return currentNode;
}
let listHead = new Node(4, new Node(6, new Node(1, new Node(2, new Node(6)))));
let listHead2 = new Node(1, new Node(9, new Node(9)));
// console.log(reverseLinkedList(listHead));

function findMiddleNode(head) {
  let slowPointer = head;
  let fastPointer = head;
  while (fastPointer.next && fastPointer.next.next) {
    slowPointer = slowPointer.next;
    fastPointer = fastPointer.next.next;
  }
  return slowPointer;
}
// console.log(findMiddleNode(listHead));
function addTwoLists(h1, h2) {
  let sentinel = new Node(-1);
  let current = sentinel;
  let nextCarryOver = 0;
  while (h1 || h2 || nextCarryOver) {
    let newVal = (h1.data || 0) + (h2.data || 0) + nextCarryOver;
    nextCarryOver = Math.floor(newVal / 10);
    newVal = newVal % 10;
    current.next = new Node(newVal);
    current = current.next;
    h1 = h1.next || 0;
    h2 = h2.next || 0;
  }
  return sentinel.next;
}
// console.log(addTwoLists(listHead, listHead2));

function maxDepthBST(root) {
  if (root === null) return 0;
  let left = maxDepthBST(root.left);
  let right = maxDepthBST(root.right);
  return 1 + Math.max(left,right);
}
// console.log(maxDepthBST(sampleRoot));
let list = [];
function treeInOrder(root) {
  if (root === null) return;
  treeInOrder(root.left);
  list.push(root.data);
  treeInOrder(root.right);
  return list;
}
// console.log(treeInOrder(sampleRoot));
function breadthFirstSearch(root) {
  let queue = [root];
  while (queue.length) {
    let first = queue.shift();
    list.push(first.data);
    if (first.left) queue.push(first.left);
    if (first.right) queue.push(first.right);
    }
  return list;
}
// console.log(breadthFirstSearch(sampleRoot));
function maxPathSum(root) {
  if (root === null) return 0;
  let left = maxPathSum(root.left);
  let right = maxPathSum(root.right);

  return root.data + Math.max(left, right);
}
// console.log(maxPathSum(sampleRoot));

// find All the combinations of an array of elements. 1, 12, 123, 13, 2, 3, 23.
// loop with recursion starts at idz + 1
//O(n!) time complexity
function combination(arr, combo, idx) {
  if (!arr[idx]) {
    return;
  }

  for (let i = idx; i < arr.length; i++) {
    let next = combo.concat(arr[i]);
    console.log(next);
    combination(arr, next, i + 1);
  }
}
// combination([1,2,3,4], [], 0);

//loop with recursion always starts at 0
//O(n!) time complexity
function permutations(arr, perm, freq) {
  if (perm.length === arr.length) {
    console.log(perm);
    return;
  }
  for (let i = 0; i < arr.length; i++) {
    if (freq[i]) {
      freq[i] -= 1;
      permutations(arr, perm.concat(arr[i]), freq);
      freq[i] += 1; // backtracking: set state, try it out, then set it back.
    }
  }
}
// permutations([1,2,3,4], [], [1,1,1,1]);

let permsList = [];
//all the permutations of a string where letters can be capital or lowercase
function stringPerms(string, perm, i) {
  if (perm.length === string.length) {
    permsList.push(perm);
    return;
  }
  if (!parseInt(string[i])) { // if its a letter.  Could also say if > 'A' && < 'z'
    stringPerms(string, perm + string[i].toUpperCase(), i+1);
    stringPerms(string, perm + string[i].toLowerCase(), i+1);
  } else {
    stringPerms(string, perm + string[i], i+1);
  }
  return permsList;
}
// console.log(stringPerms('a1b2', '', 0));

//sum up all of the nodes in each level of a tree
//DFS
let levelOrderSumDFSList = [];
function levelOrderSumDFS(root, level) {
  if (root === null) return;
  levelOrderSumDFS(root.left, level + 1);
  levelOrderSumDFS(root.right, level + 1);
  if (levelOrderSumDFSList[level]) {
    levelOrderSumDFSList[level] += root.data;
  } else {
    levelOrderSumDFSList[level] = root.data;
  }
  return levelOrderSumDFSList;
}
// console.log(levelOrderSumDFS(sampleRoot, 0));
//sum up all of the nodes in each level of a tree
//BFS
let levelOrderSumBFSList = [];
function levelOrderSumBFS(queue) {
    if (!queue.length) return;
    let childQueue = [];
    let count = 0;
    while (queue.length) {
      let first = queue.shift();
      count += first.data;
      if (first.left) childQueue.push(first.left);
      if (first.right) childQueue.push(first.right);
    }
    levelOrderSumBFSList.push(count);
    queue = childQueue;
  levelOrderSumBFS(queue);
  return levelOrderSumBFSList;
}
// console.log(levelOrderSumBFS([sampleRoot]));

//Do telephone numbers Problem later
//https://leetcode.com/problems/letter-combinations-of-a-phone-number/
function telephoneNumbers(digits) {
  const digitMapper = {
        '2': ['a','b','c'],
        '3': ['d','e','f'],
        '4': ['g','h','i'],
        '5': ['j','k','l'],
        '6': ['m','n','o'],
        '7': ['p','q','r','s'],
        '8': ['t','u','v'],
        '9': ['w','x','y','z']
    }
    const results = [];
    if (!digits) {return results;}
    var recurseCombo = function(remainingDigits, combo) {
        if (combo.length === digits.length) {
            results.push(combo);
            return;
        }
        let first = remainingDigits[0];
        digitMapper[first].forEach(letter => {
            recurseCombo(remainingDigits.slice(1), combo + letter);
        })
    }
    recurseCombo(digits, '');
    return results;
}
// console.log(telephoneNumbers("6543"));
let result = [];
let sampleRoot = new BSTNode(4);
sampleRoot.insert(2);
sampleRoot.insert(3);
sampleRoot.insert(1);
sampleRoot.insert(6);
sampleRoot.insert(5);
sampleRoot.insert(7);
// sampleRoot.insert(21);
function rootToLeafsPathSum(root, currentSum) {
  if (root === null) {
    return;
  }
  currentSum += root.data;
  currentSum *= 10;

  rootToLeafsPathSum(root.left, currentSum);
  rootToLeafsPathSum(root.right, currentSum);
  if (!root.right && !root.left) {
    result.push(currentSum/10);
  }
  return result.reduce((acc, el) => acc + el);
}
// console.log(rootToLeafsPathSum(sampleRoot, 0));
// console.log(421+423+465+467);

//amazon testID 23280666301694
//consider edge cases and think about time complexity

//TODO
//find Nth prime most efficiently
function findNthPrime(n) {
  let bigN = n * 50;
  let primes = Array(bigN).fill(true);
  for (let j = 2; j < bigN; j+= 2) {
    primes[j] = false;
  }
  for (let i = 2; i < Math.sqrt(bigN); i++) {
    if (primes[i]) {
      for (let j = Math.pow(i,2); j < bigN; j+= 2*i) {
        primes[j] = false;
      }
    }
  }
  let count = 1;
  for (let i = 2; i < bigN; i++) {
    if (primes[i]) {
      primes[i] = count++;
    }
  }
  console.log(primes.indexOf(n));
}

findNthPrime(10001);

//2 3 5 7 11 13 17
//card underline question
// Write an interpreter to evaluate strings of nonsense math notation, respecting order of operations indicated by (possibly nested) parentheses.
