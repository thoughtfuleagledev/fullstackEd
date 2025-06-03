document.getElementById("add-btn").addEventListener("click", () => {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  if (isNaN(num1) || isNaN(num2)) {
    document.getElementById("result").textContent = "Invalid input";
  } else {
    document.getElementById("result").textContent = num1 + num2;
  }
});

document.getElementById("subtract-btn").addEventListener("click", () => {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  if (isNaN(num1) || isNaN(num2)) {
    document.getElementById("result").textContent = "Invalid input";
  } else {
    document.getElementById("result").textContent = num1 - num2;
  }
});