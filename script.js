const getSum = function (num1, o, num2) {
  if (o == "x") {
    o = "*";
  } else if (o == "÷") {
    o = "/";
  }
  switch (o) {
    case "*":
      return (hasil = num1 * num2);
      break;
    case "+":
      return (hasil = num1 + num2);
      break;
    case "-":
      return (hasil = num1 - num2);
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
    if (result.textContent == 0 || result.textContent == "ERROR") {
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
      currentNum = 0;
      result.textContent = currentNum;
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
      currentNum = 0;
      result.textContent = currentNum;
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

equal.addEventListener("click", () => {
  if (prevInput.textContent.includes(prevNum) && prevInput.textContent.includes("=")) return false;
  if (currentNum == 0) return false;
  prevNom = currentNum;
  currentNum = getSum(prevNum, operator, currentNum);
  prevInput.textContent = prevNum + " " + operator + " " + prevNom + " " + "=";
  result.textContent = currentNum;
  prevNom = undefined;
});

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
  return (result.textContent = currentNum.toString());
}

function getFactorize(a) {
  if (a == 0) return 1; // Factorize Function

  return a * getFactorize(a - 1);
}

factorize.addEventListener("click", factor);

function remove() {
  if (prevInput.textContent.includes("=")) {
    prevInput.textContent = 0;
    prevNum = undefined;
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
