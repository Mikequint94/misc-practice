*Bubble Sort - maybe quick sort too? merge sort?*
  __Bubble Sort__ steps through list, swaps adjacent elements if needed, keeps iterating through list
  until no more swaps are needed, then its done. O(n^2)
  `function bubbleSort(array) {
    let swapped = true;
    while (swapped) {
      swapped = false;
      for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i+1]) {
          let temp = array[i];
          array[i] = array[i+1];
          array[i+1] = temp;
          swapped = true;
        }
      }
    }
    return array;
  }`
  __Quick Sort__ divides array into two with smaller and larger elements, then
  recursively sorts O(n*log(n)) avg.  worst O(n^2)
  `function quickSort(array) {
    if (array.length < 2) {
      return array;
    }
    let lesser = [];
    let greater = [];
    let first = array.shift();
    for (let i = 0; i < array.length; i++) {
      if (array[i] < first) {
        lesser.push(array[i]);
      } else {
        greater.push(array[i]);
      }
    }
    return quickSort(lesser).concat(first).concat(quickSort(greater));
  }`
  __Merge Sort__ divides array into single element and merges together in sorted way.
  O(n*log(n)) worst case.
  `function mergeSort(array) {
    if (array.length < 2) {return array; }
    let leftSorted = mergeSort(array.slice(0, Math.floor(array.length / 2)));
    let rightSorted = mergeSort(array.slice(Math.floor(array.length / 2)));
    return merge(leftSorted, rightSorted);
  }

  function merge(left, right) {
    let sorted = [];
    while (left.length > 0 && right.length > 0) {
      if (left[0] < right[0]) {
        sorted.push(left.shift());
      } else {
        sorted.push(right.shift());
      }
    }
    return sorted.concat(left, right);
  }`

*create a node/JS Module*
  make new folder.  do an npm init.  then in index.js file include
  `exports.printMsg = () => {
  console.log("This is a message from the demo package");
  }`
*All about Sets and Maps*
  `let animals = new Set();`
  `animals.add('pig');` can add things but will only hold unique values
  `animals.size` is like length
  `animals.delete('pig');`
  `animals.has('elephant')` true or false
  `animals.forEach(animal => console.log(animal))`
  `animals.clear()` clears all
  You can initialize a set with an array, and it will deconstruct into elements

  `let things = new Map();` can also initialize with array of 2 element arrays
  `things.set(key, value);`
  `things.size`
  `things.has(key)` true or false
  `things.get(key)` returns value
  `things.delete(key)`
  `things.forEach((value, key) => console.log(key, value))`
*Array sorting*
array.sort() converts everything to string and sorts, also mutates array
array.sort((a, b) => a-b) is better for number sort.
`band.sort((a, b) => {
  return a.genre > b.genre
  })` will sort band genre's alphabetically (use > for strings)

*CSS Dynamics into window size (media query, responsiveness, etc)*
`document.getElementById('square').className += " red"` to add a class.
`@media screen and (max-width: 1140px) {
  font-size: 10px;
}`
Never use absolute pixel widths or positioning.  Everything relative to screen size.
Always do Mobile First design.
can do width: 100% to fit your spot. or 80vw to be a percentage of the total viewport width.

*CSS Hierarchy*
Most specific or last declared will win if all is equal.
1. !important (`!important`) next to a property. - don't use!
2. inline styling (`style = "color: orange;"`)- not DRY, overwrites classes, etc.
3. id (`#cat`) - better to use class because should only be 1 ID per page. Don't allow for reuse
4. class (`.dog`)
5. element (`<p>`)

*inline styling*
<h1 style="color:blue;">This is a Blue Heading</h1>
element.style.color = "blue"; To change one property
element.style = "color: blue;" //overwrites other props

*Event triggering, delegation, bubbling, event into store function, associate event with specific event*
`let button = document.querySelector("button");
 function once() {
   console.log("Done.");
   button.removeEventListener("click", once);
 }
button.addEventListener("click", once);` will happen once then remove cause same fn name
to get more info about event, do `function(event) {console.log(event)}` as fn.
parent nodes will get triggered when children nodes are, but most specific trigger happens first,
can do `event.stopPropagation()` inside fn to stop bubbling up
can put one listener on a parent and use event.target.whatever to get into specifics of which was clicked
`event.preventDefault();` prevents default action browser would take
