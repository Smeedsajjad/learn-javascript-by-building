const billInput = document.getElementById("bill");
const tipInput = document.getElementById("tip");
const peopleInput = document.getElementById("people");
const result = document.getElementById("result");

window.addEventListener("load", () => {
  const savedBill = localStorage.getItem("lastBill");
  if (savedBill) {
    billInput.value = savedBill;
    calculate();
  }
});

function validateInputs(bill, tip, people) {
  if (isNaN(bill) || bill <= 0) {
    return "Bill must be greater than 0.";
  }
  if (isNaN(tip) || tip < 0) {
    return "Tip must be 0 or more.";
  }
  if (isNaN(people) || people <= 0) {
    return "Number of people must be greater than 0.";
  }
  return null;
}

function calculate() {
  const bill = parseFloat(billInput.value);
  const tip = parseFloat(tipInput.value);
  const people = parseInt(peopleInput.value);

  const error = validateInputs(bill, tip, people);
  if (error) {
    result.textContent = error;
    result.style.color = "red";
    return;
  }

  localStorage.setItem("lastBill", bill);

  const tipAmount = bill * (tip / 100);
  const total = bill + tipAmount;
  const perPerson = total / people;

  result.textContent = `Each person pays: $${perPerson.toFixed(2)}`;
  result.style.color = "green";
}

[billInput, tipInput, peopleInput].forEach(input => {
  input.addEventListener("input", calculate);
});
