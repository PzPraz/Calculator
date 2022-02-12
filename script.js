const getSum = function (num1, o, num2) {
  if (o == "x") {
    o = "*";
  } else if (o == "÷" || o == ":") {
    o = "/";
  }
  switch (o) {
    case "*":
      return (hasil = Math.round(num1 * num2 * 1000) / 1000);
      break;
    case "+":
      return (hasil = Math.round((num1 + num2) * 1000) / 1000);
      break;
    case "-":
      return (hasil = Math.round((num1 - num2) * 1000) / 1000);
      break;
    case "/":
      return (hasil = Math.round((num1 / num2) * 1000) / 1000);
      break;
  }
  return (rounded = Math.round(hasil * 1000) / 1000);
};

function operate(numOne, operasi, numTwo) {
  let num1 = numOne;
  let o = operasi;
  let num2 = numTwo;
  return getSum(num1, o, num2);
}

/* Akhir Calculator Awal */

let currentNum;
let prevNum;
let prevNom;
let operator;

const negative = document.querySelector(".negative");
const comma = document.querySelector(".comma");
const del = document.querySelector(".delete");
const AC = document.querySelector(".AC");
const equal = document.querySelector(".equal");
const factorize = document.querySelector(".factorize");

const numInput = document.querySelectorAll("[data-number]");
const operatorInput = document.querySelectorAll("[data-operation]");
const result = document.querySelector(".result");
const prevInput = document.querySelector(".prevResult");

numInput.forEach((num) => {
  num.addEventListener("click", () => {
    if ((result.textContent == 0 && result.textContent.charAt(1) != ".") || result.textContent == "ERROR") {
      result.textContent = "";
      result.textContent += num.textContent;
      currentNum = parseFloat(result.textContent);
    } else if (result.textContent.length < 6) {
      result.textContent += num.textContent;
      currentNum = parseFloat(result.textContent);
    }
  });
});

operatorInput.forEach((op) =>
  op.addEventListener("click", () => {
    if (currentNum == undefined) currentNum = 0;
    if (prevInput.textContent.includes(prevNum) && prevInput.textContent.includes("=")) {
      operator = op.textContent;
      prevNum = currentNum;
      currentNum = undefined;
      result.textContent = 0;
      return (prevInput.textContent = prevNum + " " + operator);
    }
    if (prevNum != undefined && operator != undefined) {
      if (currentNum == 0) {
        prevInput.textContent = prevNum + " " + op.textContent;
        return (operator = op.textContent);
      }
      currentNum = getSum(prevNum, operator, currentNum);
      operator = op.textContent;
      prevInput.textContent = currentNum + " " + operator;
      prevNum = currentNum;
      currentNum = undefined;
      result.textContent = 0;
    } else if (operator != undefined) {
      operator = op.textContent;
    } else if (prevNum == undefined && operator == undefined) {
      prevNum = currentNum;
      operator = op.textContent;
    }
    result.textContent = "0";
    prevInput.textContent = prevNum + " " + operator;
  })
);

const getEqual = function () {
  if (prevInput.textContent.includes(prevNum) && prevInput.textContent.includes("=")) return false;
  if (currentNum == 0) return false;
  prevNom = currentNum;
  currentNum = getSum(prevNum, operator, currentNum);
  prevInput.textContent = prevNum + " " + operator + " " + prevNom + " " + "=";
  result.textContent = currentNum;
  prevNom = undefined;
};

equal.addEventListener("click", getEqual);

function clear() {
  prevNum = undefined;
  currentNum = undefined;
  result.textContent = 0;
  prevNom = undefined;
  operator = undefined;
  prevInput.textContent = 0;
}

AC.addEventListener("click", clear);

function negatif() {
  if (prevInput.textContent.includes(prevNum) && prevInput.textContent.includes(operator) && prevInput.textContent.includes(prevNom)) return false;
  if (result.textContent == 0) {
    result.textContent = "-";
  } else {
    currentNum *= -1;
    return (result.textContent = currentNum);
  }
}

negative.addEventListener("click", negatif);

function factor() {
  if (prevInput.textContent.includes(prevNum) && prevInput.textContent.includes(operator) && prevInput.textContent.includes(prevNom)) return false;
  a = currentNum; // assign currentNum to A

  if (a < 0 || a == undefined) return (result.textContent = "ERROR");
  prevInput.textContent = a + "!" + " =";
  currentNum = getFactorize(a); // call factorize
  result.textContent = currentNum;
  return result.textContent.slice(0, result.textContent.length - 1);
}

function getFactorize(a) {
  if (a == 0) return 1; // base case

  return a * getFactorize(a - 1); // recursion
}

factorize.addEventListener("click", () => {
  factor();
});

function remove() {
  if (prevInput.textContent.includes("=")) {
    prevInput.textContent = 0;
    prevNum = undefined;
    operator = undefined;
  }
  if (result.textContent.length == 1) {
    currentNum = 0;
    return (result.textContent = currentNum);
  } else {
    hapus = result.textContent.slice(0, result.textContent.length - 1);
    currentNum = hapus;
    return (result.textContent = currentNum);
  }
}

del.addEventListener("click", remove);

function koma() {
  if (result.textContent.includes(".")) return false;
  result.textContent += ".";
}

comma.addEventListener("click", koma);

/* Keyboard Input */

const body = document.querySelector("body");

body.addEventListener("keydown", (e) => {
  if (e.key == "Backspace") remove();
  if (e.key == "Enter") getEqual();
  if (e.key == "c") clear();

  if (e.key == "!") {
    if (currentNum == 0 || currentNum == 1) return (result.textContent = 1);
    factor();
  }

  if (e.key == "*" || e.key == "-" || e.key == ":" || e.key == "+") {
    if (e.key == "-" && currentNum == undefined) {
      return negatif();
    }

    if (prevInput.textContent.includes("=")) {
      prevNum = currentNum;
      operator = e.key;
      currentNum = undefined;
      result.textContent = 0;
      if (operator == ":") operator = "÷";
      return (prevInput.textContent = prevNum + " " + operator);
    }
    if (operator == e.key) return false;
    if (operator != undefined) {
      operator = e.key;
    }
    if (operator == undefined) operator = e.key;
    if (currentNum != undefined) {
      prevNum = currentNum;
      currentNum = undefined;
      result.textContent = 0;
      if (operator == ":") operator = "÷";
      return (prevInput.textContent = prevNum + " " + operator);
    }
    if (prevNum == undefined) {
      prevNum = 0;
      currentNum = undefined;
      result.textContent = 0;
      if (operator == ":") operator = "÷";
      prevInput.textContent = prevNum + " " + operator;
    }
  }

  let jablay;

  if (result.textContent.length > 5) return false;
  if (e.key >= 0 && e.key <= 9) {
    if ((result.textContent == 0 && result.textContent.charAt(1) != ".") || result.textContent == "ERROR") {
      result.textContent = "";
      jablay = e.key;
      result.textContent = jablay.toString();
      return (currentNum = parseFloat(result.textContent));
    } else {
      jablay = e.key;
      result.textContent += jablay.toString();
      return (currentNum = parseFloat(result.textContent));
    }
  }
  if (e.key == ".") {
    koma();
  }
});

numInput.forEach((num) => {
  num.addEventListener("keydown", (e) => {
    if (e.key == parseInt(numInput.textContent)) {
      num.classList.add("play");
    }
  });
});
