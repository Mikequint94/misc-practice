const calculate = (string) => {
   let chars = string.split("");
   let operators = [];
   let numbers = [];
   let currentNumber = [];
   let isNum = true;
   chars.forEach((ch) => {
     if (currentNumber.length > 0 && ["+","-","*","/"].includes(ch)) {
       isNum = false;
       numbers.push(currentNumber.join(""));
       currentNumber = [];
     }
     if (isNum) {
       currentNumber.push(ch);
     } else {
       operators.push(ch);
       isNum = true;
     }
   });
   numbers.push(currentNumber.join(""));
   currentNumber = [];
   let sum = 0;
   let num1;
   let num2;
  operators.forEach((operator, index) => {
     if (operator === "*") {
      numbers[index] = parseInt(numbers[index]) * parseInt(numbers[index+1]);
      numbers.splice(index+1, 1);
      operators.splice(index,1);
    } else if (operator === "/") {
      numbers[index] = parseInt(numbers[index]) / parseInt(numbers[index+1]);
      numbers.splice(index+1, 1);
      operators.splice(index,1);
    }
  });
  operators.forEach((operator, index) => {
    if (operator === "+") {
      numbers[index+1] = parseInt(numbers[index]) + parseInt(numbers[index+1]);
    } else if (operator === "-") {
      numbers[index + 1] = parseInt(numbers[index]) - parseInt(numbers[index+1]);
    }
  });
   console.log(numbers.pop());
};

calculate("3/3+-2--12/6+3+2*2");
