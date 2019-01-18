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

console.log(canEscape(escapeMap));

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
} // HELPS

// console.log(howManyPathsToEscape(escapeMap));

function islandCounter(array) {

}

// console.log(islandCounter(escapeMap));
