//Given a 2D map, can the robber make an escape path from top left corner to bottom right?
const escapeMap = [[0,0,0,1,0],
                   [1,1,0,0,0],
                   [0,0,0,1,0],
                   [0,0,0,0,0],
                   [1,1,0,1,0]];

function canEscape(array) {
  let endPos = [array[0].length - 1, array.length - 1];
  function pathFinder(map, currentPos) {
    if (currentPos[0] === endPos[0] && currentPos[1] === endPos[1]) {
      return true;
    }
    if (currentPos[0] >= 0 && currentPos[0] < map[0].length && currentPos[1] >= 0 && currentPos[1] < map.length && map[currentPos[0]][currentPos[1]] === 0) {
      map[currentPos[0]][currentPos[1]] = 1;
      return pathFinder(map, [currentPos[0] -1, currentPos[1]]) || pathFinder(map, [currentPos[0] + 1, currentPos[1]]) || pathFinder(map, [currentPos[0], currentPos[1] - 1]) ||pathFinder(map, [currentPos[0], currentPos[1] + 1]);
    }
    return false;
  }
  return pathFinder(array, [0,0]);
}

// console.log(canEscape(escapeMap));

//Make it harder:  How many paths are there?
function howManyPathsToEscape(array) {
  let endPos = [array[0].length - 1, array.length - 1];
  let count = 0;
  function pathFinder(map, currentPos) {
    if (currentPos[0] === endPos[0] && currentPos[1] === endPos[1]) {
      return 1;
    }
    if (currentPos[0] >= 0 && currentPos[0] < map[0].length && currentPos[1] >= 0 && currentPos[1] < map.length && map[currentPos[0]][currentPos[1]] === 0) {
      map[currentPos[0]][currentPos[1]] = 1;
      return pathFinder(map, [currentPos[0] -1, currentPos[1]]) + pathFinder(map, [currentPos[0] + 1, currentPos[1]]) + pathFinder(map, [currentPos[0], currentPos[1] - 1]) + pathFinder(map, [currentPos[0], currentPos[1] + 1]);
    }
    return 0;
  }
  return pathFinder(array, [0,0]);
}

console.log(howManyPathsToEscape(escapeMap));
