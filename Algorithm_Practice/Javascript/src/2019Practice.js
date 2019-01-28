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
console.log(addTwoLists(listHead, listHead2));