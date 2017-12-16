const input = [70,66,255,2,48,0,54,48,80,141,244,254,160,108,1,41];

let list = [];
for (let i =0; i< 256; i++) {
  list.push(i);
}
let currentPosition = 0;
let skipSize = 0;

input.forEach(length => {
  
});
// console.log(list);

let test = [0,1,2,3,4,5];

function reverse(segment) {
  for (let i=0; i<= segment.length/2; i++) {
    let a =segment[i];
    segment[i] = segment[segment.length-1 - i];
    segment[segment.length - 1 - i] = a;
  }
  return segment;
}
let segment = test.splice(2,2);
console.log(reverse(segment));
