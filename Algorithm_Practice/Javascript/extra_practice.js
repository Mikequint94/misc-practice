function fibonacci(n) {
  if (n < 3) {
    console.log(cache[n])
  } else {
    for (let i=3; i <=n; i++) {
      cache[i] = cache[i-1] + cache[i-2]
    }
    console.log(cache[n])
  }
}

// fibonacci(20)

function merge_meetings(meetings) {
  // meetings = meetings.sort()
  let sorted_meetings = meetings.sort(function(a,b){return a[0] > b[0]});

  for (let i = 0; i < (meetings.length - 1); i++){
    if (sorted_meetings[i+1][0] <= sorted_meetings[i][1]){
      sorted_meetings[i+1][0] = Math.min(sorted_meetings[i+1][0], sorted_meetings[i][0]);
      sorted_meetings[i+1][1] = Math.max(sorted_meetings[i+1][1], sorted_meetings[i][1]);
      sorted_meetings[i] = null;
    }
  }
  console.log(sorted_meetings.filter(el => el !== null))
}


// merge_meetings([[0,2],[1,5],[10,11],[12,13],[5,6]])

// Given a list of integers, find the highest product you can get from three of the integers.

// gonna want the top 3 positives and top 2 negs.  if top 2 negs product is greater than lower 2 positives, use them.

function product_3_ints(array) {
  let positives = []
  let negatives = []
  array.forEach(function(el){
    if (el > 0) {
      if (positives.length < 3) {
        positives.push(el)
      } else {
        positives.sort()
        let lowest = positives.shift()
        positives.push(Math.max(lowest, el))
      }
    } else {
      if (negatives.length < 2) {
        negatives.push(el)
      } else {
        negatives.sort()
        let lowest = negatives.shift()
        negatives.push(Math.max(lowest, el))
      }
    }
  })
  positives = positives.sort()
  if (negatives[0]*negatives[1] > positives[0]*positives[1]) {
    console.log(negatives[0]*negatives[1]*positives[2])
  } else {
    console.log(positives.reduce((a,b) => a*b))
  }
}

// product_3_ints([3,5,2,6,-5,-7,-4,5])

// You have a list of integers, and for each index you want to find the product of every integer except the integer at that index.

function products_except_me(array){
  let products_before = 1;
  let results = [];
  array.forEach(function(el, idx){
    results[idx] = products_before;
    products_before *= el
  })
  let products_after = 1;
  for (let i = array.length -1; i >= 0; i--) {
    let el =  array[i];
    results[i] *= products_after
    products_after *= el
  }


  console.log(results)
}

products_except_me([3,1,2,1,-3,-5])
