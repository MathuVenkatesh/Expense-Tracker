const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// const dummyTransactions = [{ id: 4, text: "Water", amount: +30 }];

// let transactions = dummyTransactions;

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// Add Transaction

function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim === "" || amount.value.trim() === "") {
    alert("Enter a text and amount");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(transaction);
    console.log(typeof transactions);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    text.value = "";
    amount.value = "";
  }
}

// Generate Random ID
function generateID() {
  return Math.floor(Math.random() * 100);
}

// Add transactions to DOM List

function addTransactionDOM(transaction) {
  // Get Sign (it will give + or - sign based on our input value)

  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  //add class based on value (adding plus or minus class to li)
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
  ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
  <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">X</button>
  `;
  list.appendChild(item);
}

// Update the balance, income and expenses
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);
  console.log(amounts);
  const total = amounts.reduce((acc, item) => (acc += item), 0);
  //   console.log(total);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0);
  //   console.log(income);
  const expense =
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1;
  updation(total, income, expense);
  // -1 is used to show the positive no. in the output (- x - = +)
  // else we can wrap the amount in Math.abs() to get Absolute value(means whatever the symbol is, we will get only numbers without any + or - sign)
  //   console.log(expense);
}

function updation(total, income, expense) {
  balance.innerText = `Rs. ${total}`;
  money_plus.innerHTML = `Rs. ${income}`;
  money_minus.innerHTML = `Rs. ${expense}`;
}
// Remove Transaction ID

function removeTransaction(id) {
  transactions = transactions.filter((value) => value.id !== id);
  init();
  updateLocalStorage();
}

//Init app

function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}
init();

form.addEventListener("submit", addTransaction);

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}
