const day = document.getElementById("todayDate");
const today = new Date().toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
day.textContent = today;

// ============ export button =============
// const exportBtn = document.querySelector('.export-btn')
// exportBtn.addEventListener("onClick", () => {

// })

//declare monthly income-expense at local storage
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let monthlyIncome =
  parseFloat(JSON.parse(localStorage.getItem("monthlyIncome"))) || 0;
let monthlyExpense =
  parseFloat(JSON.parse(localStorage.getItem("monthlyExpense"))) || 0;

function addTransaction(TransactionType) {
  const amount = parseFloat(document.getElementById("incomeAmount").value);
  const category = document.getElementById("incomeCategory").value;
  const date = document.getElementById("incomeDate").value;

  let transaction = {
    id: transactions.length + 1,
    date: date ? date : today,
    category: category.charAt(0).toUpperCase() + category.slice(1),
    amount: amount,
    type: `${TransactionType}`,
  };

  transactions.push(transaction);
  // localStorage.setItem(transactions,)

  updateDashboard();
  renderTransactions();

  TransactionType === "income"
    ? closeModal("incomeModal")
    : closeModal("expenseModal");

  showNotification("Added Successfully", "success");
}

function renderTransactions() {
  const tbody = document.querySelector("tbody");
  transactions.forEach((transaction) => {
    const tdDate = document.createElement("td");
    tdDate.innerHTML = transaction.date;

    const tdCategory = document.createElement("td");
    tdCategory.innerHTML = transaction.category;

    const tdAmount = document.createElement("td");
    tdAmount.innerHTML = transaction.amount;

    const tdStatus = document.createElement("td");
    const span = document.createElement("span");
    span.classList.add("status-success");
    span.innerText = "success";
    tdStatus.appendChild(span);
  });
}

function openModal(modalId) {
  document.getElementById(modalId).style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
  document.body.style.overflow = "auto";

  document.getElementById("");
}

window.onclick = (e) => {
  const incomeModal = document.getElementById("incomeModal");
  const expenseModal = document.getElementById("expenseModal");

  if (event.target === incomeModal) {
    closeModal("incomeModal");
  }

  if (event.target === expenseModal) {
    closeModal("expenseModal");
  }
};
