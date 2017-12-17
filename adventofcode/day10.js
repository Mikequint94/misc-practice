// const input = [70,66,255,2,48,0,54,48,80,141,244,254,160,108,1,41];
const input = [3, 4, 1, 5];

let list = [];
for (let i =0; i< 5; i++) {
  list.push(i);
}
let currentPosition = 0;
let skipSize = 0;

console.log(list, currentPosition);
input.forEach(length => {
  if (currentPosition + length >= list.length) {
    let reversable1 = list.splice(currentPosition, list.length - currentPosition);
    let reversable2 = list.splice(0, length - reversable1.length);
    let reversed = reverse(reversable1.concat(reversable2));
    // console.log(reverse(reversed));
    let endreversed = reversed.splice(0, reversable1.length);
    list = reversed.concat(list.slice(0, length - (list.length - currentPosition))).concat(endreversed);
  } else {
    let reversable = list.splice(currentPosition,length);
    reversable = reverse(reversable);
    list = list.slice(0, currentPosition).concat(reversable).concat(list.slice(currentPosition));
  }
  currentPosition = (currentPosition + length + skipSize) % list.length;
  skipSize += 1;
  console.log(list, currentPosition);
});
console.log(list.slice(0,1)*list.slice(1,2));
// let test = [0,1,2,3];

function reverse(segment) {
  for (let i=0; i< segment.length/2; i++) {
    let a =segment[i];
    segment[i] = segment[segment.length-1 - i];
    segment[segment.length - 1 - i] = a;
  }
  return segment;
}
// let segment = test.splice(1,3);
// let testtt = reverse(test);
// console.log(test.slice(0,1).concat(reversed).concat(test.slice(1)));
// console.log(testtt);
