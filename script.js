// import { calculate } from "./calculator.js";

// TODO: Faire la manipulation du DOM dans ce fichier


let form = document.querySelector("form");
let buttons = form.querySelectorAll("button");
let inputElement = document.querySelector("#input");
let userInput = form.elements["userInput"];
let percentageSign = "%";
let minusSign = "-";
let equalsSign = "=";
let plusMinusSign = "+/-";
let resetButton = document.querySelector('button.secondary');
let result;


userInput.setAttribute('placeholder', '0');
resetButton.setAttribute('type', 'reset');


function cleanExpression(expression) {
  return expression
    .replace(/÷/g, "/")
    .replace(/×/g, "*")
    .replace(/x/g, "*")
    .replace(/X/g, "*")
    .replace(/\s/g, "")
    .replace(/%/g, " / 100");
}


function calculate(expression) {
  try {
    return eval(cleanExpression(expression));
  } catch (error) {
    form.reset();
    clearResult();
    inputElement.textContent = "";
    console.log(error);
  }
}


function equalsClick(inputElement, userInput) {
  if (!result) {
    if (userInput.value) {
      inputElement.textContent = `${inputElement.textContent} ${userInput.value}`;
      result = calculate(inputElement.textContent);
      userInput.value = result;
    }
  } else {
    inputElement.textContent = result;
  }
}


function PercentageClick(userInput, inputElement) {
  if (userInput.value) {
    inputElement.textContent = `${inputElement.textContent} ${userInput.value} %`;
    result = userInput.value / 100;
    userInput.value = result;
  }
}


function minusClick(userInput) {
  userInput.value = minusSign;
}


function otherOperatorsClick(operator, userInput, inputElement) {
  if (userInput.value) {
    const expression = result
      ? `${inputElement.textContent} ${operator}`
      : `${inputElement.textContent} ${userInput.value} ${operator}`;
    result = result && undefined;
    inputElement.textContent = expression;
    userInput.value = "";
  } else {
    if (operator === minusSign) {
      minusClick(userInput);
    }
  }
}


function resetClick(form) {
  inputElement.innerHTML = "";
  form.reset();
}


function buttonClick(textContent, userInput) {
  if (textContent === plusMinusSign) {
    userInput.value = +userInput.value * -1;
  } else {
    userInput.value = `${userInput.value}${textContent}`;
  }
}


inputElement.textContent = "";
userInput.value = "";


function submitClick(textContent) {
  if (textContent === equalsSign) {
    equalsClick(inputElement, userInput);
  } else if (textContent === percentageSign) {
    PercentageClick(userInput, inputElement);
  } else {
    otherOperatorsClick(textContent, userInput, inputElement);
  }
}


buttons.forEach(function(button) {
  button.addEventListener("click", function() {
    switch (this.type) {
      case "submit":
        submitClick(this.textContent);
        break;
      case "reset":
        resetClick(inputElement, form);
        break;
      case "button":
        buttonClick(this.textContent, userInput);
        break;
      default:
        break;
    }
  });
});


userInput.addEventListener("input", function() {
  this.value = this.value.match(/[0-9.]*/)[0];
});


form.addEventListener("submit", function(event) {
  event.preventDefault();
});


form.addEventListener("reset", function() {
  clearResult();
});



function clearResult() {
  result = calculate();
}
