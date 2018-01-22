*Bubble Sort - maybe quick sort too?*
*create a node/JS Module*
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
  })` will sort band genre's alphabetically

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
