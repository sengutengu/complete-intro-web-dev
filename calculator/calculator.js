const operators = ["+", "−", "×", "÷"];

var equation = {
  operandA: null,
  operator: null,
};

var usedOperation = false;
var usedDecimalPoint = false;

document.querySelector(".buttons").addEventListener("click", function () {
  // to avoid space between buttons registering as input
  if (event.target.tagName == "BUTTON") {
    var output = document.querySelector(".output");
    var current_value = output.innerText;

    if (event.target.innerText == "C") {
      resetOutput(output);
    } else if (event.target.innerText == "=") {
      evaluateEquation(output, current_value, equation);
    } else if (event.target.innerText == ".") {
      if (usedDecimalPoint == true) {
        alert("Can't use more than one decimal point per evaluation");
      } else {
        appendToOutput(output, current_value);
        usedDecimalPoint = true;
      }
    } else if (operators.includes(event.target.innerText)) {
      // else if we pressed an operator button
      if (usedOperation == true) {
        alert("Can't use more than one operator per evaluation");
      } else if (endsWithAny(operators, current_value)) {
        alert("Can't use consecutive operators");
      } else {
        equation = grabOperandAndOperator(current_value, event);
        appendToOutput(output, current_value);
        usedOperation = true;
        usedDecimalPoint = false;
      }
    } else if (current_value == "0") {
      replaceOutput(output);
    } else {
      appendToOutput(output, current_value);
    }
  }
});

function resetOutput(output) {
  output.innerText = "0";
  usedOperation = false;
}

function replaceOutput(output) {
  output.innerText = event.target.innerText;
}

function appendToOutput(output, current_value) {
  output.innerText = `${current_value}${event.target.innerText}`;
}

function grabOperandAndOperator(current_value, event) {
  return {
    operandA: current_value,
    operator: event.target.innerText,
  };
}

function evaluateEquation(output, current_value, equation) {
  if (usedOperation == false) {
    output.innerText = current_value;
  } else if (equation.operator == "+") {
    b = output.innerText.split("+")[1];
    output.innerText = parseFloat(equation.operandA) + parseFloat(b);
  } else if (equation.operator == "−") {
    b = output.innerText.split("−")[1];
    output.innerText = equation.operandA - b;
  } else if (equation.operator == "×") {
    b = output.innerText.split("×")[1];
    output.innerText = equation.operandA * b;
  } else if (equation.operator == "÷") {
    b = output.innerText.split("÷")[1];
    output.innerText = equation.operandA / b;
  }

  // evaluating equation should reset operator status
  usedOperation = false;
}

// https://stackoverflow.com/questions/45069514/check-if-string-ends-with-any-of-multiple-characters
function endsWithAny(suffixes, string) {
  for (let suffix of suffixes) {
    if (string.endsWith(suffix)) return true;
  }
  return false;
}
