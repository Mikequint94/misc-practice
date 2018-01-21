*Bubble Sort*
*create a node/JS Module*
*basic CSS Syntax*
*All about Sets and Maps*
*Array sorting*
*CSS Dynamics into window size (media query, responsiveness, etc)*
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
