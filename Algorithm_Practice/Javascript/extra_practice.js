
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
  // meetings = meetings.sort()
  let SortedMeetings = meetings.sort((a,b) => {return a[0] > b[0];});

  for (let i = 0; i < (meetings.length - 1); i++){
    if (SortedMeetings[i+1][0] <= SortedMeetings[i][1]){
      SortedMeetings[i+1][0] = Math.min(SortedMeetings[i+1][0], SortedMeetings[i][0]);
      SortedMeetings[i+1][1] = Math.max(SortedMeetings[i+1][1], SortedMeetings[i][1]);
      SortedMeetings[i] = null;
    }
  }
  console.log(SortedMeetings.filter(el => el !== null));
}


// MergeMeetings([[0,2],[1,5],[10,11],[12,13],[5,6]])

// Given a list of integers, find the highest product you can get from three of the integers.

// gonna want the top 3 positives and top 2 negs.  if top 2 negs product is greater than lower 2 positives, use them.

function Product3Ints(array) {
  let positives = [];
  let negatives = [];
  array.forEach(function(el){
    if (el > 0) {
      if (positives.length < 3) {
        positives.push(el);
      } else {
        positives.sort();
        let lowest = positives.shift();
        positives.push(Math.max(lowest, el));
      }
    } else {
      if (negatives.length < 2) {
        negatives.push(el);
      } else {
        negatives.sort();
        let lowest = negatives.shift();
        negatives.push(Math.max(lowest, el));
      }
    }
  });
  positives = positives.sort();
  if (negatives[0]*negatives[1] > positives[0]*positives[1]) {
    console.log(negatives[0]*negatives[1]*positives[2]);
  } else {
    console.log(positives.reduce((a,b) => a*b));
  }
}

// product_3_ints([3,5,2,6,-5,-7,-4,5])

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
  return results;
}

uniqueEntries([2,3,52,234,23,23,3,"3","df"]);
