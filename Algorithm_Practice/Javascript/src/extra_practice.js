
function fibonacci(n) {
  let cache = {1: 1, 2: 2};
  if (n < 3) {
    console.log(cache[n]);
  } else {
    for (let i=3; i <=n; i++) {
      cache[i] = cache[i-1] + cache[i-2];
    }
    console.log(cache[n]);
  }
}

// fibonacci(20)

function MergeMeetings(meetings) {
  let sortedMeetings = meetings.sort((a,b) => a[0] - b[0]);

  for (let i = 0; i < (meetings.length - 1); i++){
    if (sortedMeetings[i+1][0] <= sortedMeetings[i][1]){
      sortedMeetings[i+1][0] = Math.min(sortedMeetings[i+1][0], sortedMeetings[i][0]);
      sortedMeetings[i+1][1] = Math.max(sortedMeetings[i+1][1], sortedMeetings[i][1]);
      sortedMeetings[i] = null;
    }
  }
  console.log(sortedMeetings.filter(el => el !== null));
}


// MergeMeetings([[0,2],[1,5],[10,11],[12,13],[5,6]]);

// Given a list of integers, find the highest product you can get from three of the integers.
// gonna want the top 3 positives and top 2 negs.  if top 2 negs product is greater than lower 2 positives, use them.
function productThreeInts(array) {
  array = array.sort((a,b) => {return a - b;});
  let n = array.length;
  let highestPos = array[n-1]*array[n-2]*array[n-3];
  let highestusingNegs = array[0]*array[1]*array[n-1];
  console.log(Math.max(highestPos, highestusingNegs));
}

// productThreeInts([3,11,5,2,6,-50,-7,-14,5,10]);

// You have a list of integers, and for each index you want to find the product of every integer except the integer at that index.

function productsExceptMe(array){
  let productsBefore = 1;
  let results = [];
  array.forEach((el, idx) => {
    results[idx] = productsBefore;
    productsBefore *= el;
  });
  let productsAfter = 1;
  for (let i = array.length -1; i >= 0; i--) {
    let el =  array[i];
    results[i] *= productsAfter;
    productsAfter *= el;
  }
  console.log(results);
  // SECOND WAY TO DO IT. which is better?
  let results2 = [];
  let sum = 1;
  array.map(el => {
    sum *= el;
  });
  for (let i = 0; i<array.length; i++) {
    results2.push(sum/array[i]);
  }
  console.log(results2);
}

productsExceptMe([3,1,2,1,-3,-5]);

function uniqueEntries(array) {
  let entries = new Set();
  let results = [];

  array.forEach((el) => {
    if (!entries.has(el)) {
      results.push(el);
      entries.add(el);
    }
  });
  console.log(results);
}

// uniqueEntries([2,3,52,234,23,23,3,"3","df"]);

function uniqueEntries2(array) {
  let entries = new Set(array);
  console.log([...entries]);
} // you can spread a set into an array.
// uniqueEntries2([2,3,52,234,23,23,3,"3","df"]);
