document.addEventListener("DOMContentLoaded", fetchAccounts);

const apiUrl = "http://localhost:8080/api/accounts"; 

// Fetch all accounts from backend
function fetchAccounts() {
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById("accountTableBody");
        tableBody.innerHTML = "";

        data.forEach(account => {
            let row = `<tr>
                <td>${account.accountHolderName || "N/A"}</td>
                <td>${account.balance}</td>
                <td>
                    <button class="deposit-btn" onclick="deposit(${account.id})">Deposit</button>
                    <button class="withdraw-btn" onclick="withdraw(${account.id})">Withdraw</button>
                    <button class="delete-btn" onclick="deleteAccount(${account.id})">Delete</button>
                </td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    })
    .catch(error => {
        document.getElementById("errorMessage").textContent = "Failed to load accounts.";
        console.error("Error fetching accounts:", error);
    });
}

// Add Account Function
document.getElementById("addAccountBtn").addEventListener("click", function() {
    let accountHolder = prompt("Enter Account Holder Name:");
    let balance = prompt("Enter Initial Balance:");

    if (!accountHolder || !balance || isNaN(balance) || balance <= 0) {
        alert("Invalid input. Please enter correct details.");
        return;
    }

    let accountData = {
        accountHolderName: accountHolder,
        balance: parseFloat(balance)
    };

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(accountData)
    })
    .then(response => response.json())
    .then(() => {
        alert("Account Added Successfully!");
        fetchAccounts();
    })
    .catch(error => console.error("Error adding account:", error));
});

// Deposit Money
function deposit(accountId) {
    const amount = prompt("Enter deposit amount:");
    if (!amount || isNaN(amount) || amount <= 0) {
        alert("Invalid amount");
        return;
    }

    fetch(`${apiUrl}/${accountId}/deposit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: parseFloat(amount) })
    })
    .then(response => response.json())
    .then(() => fetchAccounts())
    .catch(error => console.error("Error depositing money:", error));
}

// Withdraw Money
function withdraw(accountId) {
    const amount = prompt("Enter withdrawal amount:");
    if (!amount || isNaN(amount) || amount <= 0) {
        alert("Invalid amount");
        return;
    }

    fetch(`${apiUrl}/${accountId}/withdraw`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: parseFloat(amount) })
    })
    .then(response => response.json())
    .then(() => fetchAccounts())
    .catch(error => console.error("Error withdrawing money:", error));
}

// Delete Account
function deleteAccount(accountId) {
    if (!confirm("Are you sure you want to delete this account?")) return;

    fetch(`${apiUrl}/${accountId}`, { method: "DELETE" })
    .then(response => response.json())
    .then(() => fetchAccounts())
    .catch(error => console.error("Error deleting account:", error));
}
