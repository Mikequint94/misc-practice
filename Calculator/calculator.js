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
     if  (isNum) {
       currentNumber.push(ch);
     } else if (["*","/"].includes(ch)) {
       operators.push(ch);
       isNum = true;
     } else {
       operators.push(ch);
       isNum = true;
     }
   });
   numbers.push(currentNumber.join(""));
   currentNumber = [];
   console.log(numbers, operators);
   let sum = 0;
   let num1 = parseInt(numbers.shift());
   let num2;
   let operator;

   while (operators.length > 0) {
     num2 = parseInt(numbers.shift());
     operator = operators.shift();
    if (operator === "+") {
      num1 = num1 + num2;
    } else if (operator === "-") {
      num1 = num1 - num2;
    } else if (operator === "*") {
      num1 = num1 * num2;
    } else{
      num1 = num1 / num2;
    }
   }
   console.log(num1);
};

calculate("3+3+-2--12+3+2*2");
