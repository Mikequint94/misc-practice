string = '18 19 20 15 15 15 12 13 15 18 19 20 15 15 15 12 13 15 18 19 20 15 15 15 12 13 15 18 19 20 15 15 15 12 13 15 18 19 20 15 15 15 12 13 15 18 19 20 15 15 15 12 13 15 18 19 20 15 15 15 12 13 15 18 19 20 15 15 15 12 13 15 18 19 20 15 15 15 12 13 15 18 19 20 15 15 15 12 13 15 18 19 20 15 15 15 12 13 15 18 19 20 15 15 15 12 13 15 18 19 20 15 15 15 12 13 15 18 19 20 15 15 15 12 13 15 18 19 20 15 15 15 12 13 15 18 19 20 15 15 15 12 13 15 18 19 20 15 15 15 12 13 15 18 19 20 15 15 15 12 13 15 18 19 20 15'
k = 26;


function increasingSubsequence(houseValues, k){
  houseValues = houseValues.split(' ');
  var diffArray = houseValues.map((elem, idx, arr)=>{
    if(arr[idx - 1] === undefined){
      return 0;
    } else if(elem > arr[idx - 1]){
      return 1;
    } else if(elem < arr[idx - 1]){
      return -1;
    } else if(elem === arr[idx - 1]){
      return 0;
    }
  });

  for(var i = 1; i <= houseValues.length - k + 1; i++){
    countIncreasing(diffArray.slice(i, i + k - 1))
  }
}

function countIncreasing(arr){
  var posCounter = 0;
  var negCounter = 0;
  for(var i = 1; i < arr.length; i++){
    if(arr[i-1] > 0 && arr[i] > 0){
      arr[i-1]++;
      arr.splice(i, 1);
    }
    if(arr[i - 1] < 0 && arr[i] < 0){
      arr[i-1]--;
      arr.splice(i, 1);
    }
  }
  arr.forEach(elem => {
    if(elem > 0){
      posCounter+= euler(elem);
    } else if(elem < 0){
      negCounter+= euler(Math.abs(elem));
    }
  });
  console.log(posCounter - negCounter);
  console.log(arr);

}

function euler(num){
  return (1 + num) * num / 2
}

increasingSubsequence(string, k)
