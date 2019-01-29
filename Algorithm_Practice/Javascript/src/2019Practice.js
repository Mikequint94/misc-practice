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

//Make it harder:  How many paths are there?
function howManyPathsToEscape(array) {
  console.log(array);
  let endPos = [array[0].length - 1, array.length - 1];
  let count = 0;
  function pathFinder(map, currentPos) {
    if (currentPos[0] === endPos[0] && currentPos[1] === endPos[1]) {
      count++;
      console.log(count);
      return true;
    }
    if (currentPos[0] >= 0 && currentPos[0] < map[0].length && currentPos[1] >= 0 && currentPos[1] < map.length && map[currentPos[0]][currentPos[1]] === 0) {
      map[currentPos[0]][currentPos[1]] += 1;
      // console.log(map);
      return pathFinder(map, [currentPos[0] -1, currentPos[1]]) + pathFinder(map, [currentPos[0] + 1, currentPos[1]]) + pathFinder(map, [currentPos[0], currentPos[1] - 1]) + pathFinder(map, [currentPos[0], currentPos[1] + 1]);
    }
    return 0;
  }
  pathFinder(array, [0,0]);
  return count;
} // HELPS - but maybe too hard?

// console.log(howManyPathsToEscape(escapeMap));

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
let sampleRoot = new BSTNode(3);
sampleRoot.insert(11);
sampleRoot.insert(5);
sampleRoot.insert(2);
sampleRoot.insert(1);
sampleRoot.insert(31);
sampleRoot.insert(21);

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
console.log(levelOrderSumBFS([sampleRoot]));

//Do telephone numbers Problem later
//https://leetcode.com/problems/letter-combinations-of-a-phone-number/
function telephoneNumbers() {
  
}




