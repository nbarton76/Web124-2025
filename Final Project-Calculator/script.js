// Function to perform addition using a for loop
function addNumbers(num) {
  let result = "";
  for (let i = 1; i <= 10; i++) {
    result += `${num} + ${i} = ${num + i}<br>`;
  }
  document.getElementById("addition").innerHTML = "<strong>Addition:</strong><br>" + result;
}

// Function to perform subtraction using a while loop
function subtractNumbers(num) {
  let result = "";
  let i = 1;
  while (i <= 10) {
    result += `${num} - ${i} = ${num - i}<br>`;
    i++;
  }
  document.getElementById("subtraction").innerHTML = "<strong>Subtraction:</strong><br>" + result;
}

// Function to perform multiplication using a do...while loop
function multiplyNumbers(num) {
  let result = "";
  let i = 1;
  do {
    result += `${num} × ${i} = ${num * i}<br>`;
    i++;
  } while (i <= 10);
  document.getElementById("multiplication").innerHTML = "<strong>Multiplication:</strong><br>" + result;
}

// Function to perform division using any loop (for loop here)
function divideNumbers(num) {
  let result = "";
  for (let i = 1; i <= 10; i++) {
    let division = (num / i).toFixed(2);
    result += `${num} ÷ ${i} = ${division}<br>`;
  }
  document.getElementById("division").innerHTML = "<strong>Division:</strong><br>" + result;
}

// Master function to run all four
function runAll() {
  let numInput = document.getElementById("num").value;
  let num = parseFloat(numInput);

  // Basic input validation
  if (isNaN(num)) {
    alert("Please enter a valid number!");
    return;
  }

  addNumbers(num);
  subtractNumbers(num);
  multiplyNumbers(num);
  divideNumbers(num);
}

// Attach dynamic event listener
document.getElementById("calcBtn").addEventListener("click", runAll);
