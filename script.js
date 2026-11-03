let currentBalance = 40;
let expectedHeadcount = 412;
let optOutsCount = 38;
let rawMaterialSavings = 1520;
let wasteChartInstance = null;

function login() {
    let name = document.getElementById("username").value;
    let role = document.getElementById("role").value;

    if (name.trim() === "") {
        alert("Please enter your name to log in.");
        return;
    }

    document.querySelector(".login").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
    document.getElementById("welcome").innerText = "Operator Node ID: " + name;

    let studentArea = document.getElementById("student-view");
    let managerArea = document.getElementById("manager-view");

    if (role === "manager") {
        studentArea.classList.add("hidden");
        managerArea.classList.remove("hidden");
        // Update metric values onto fields immediately on launch
        updateChefDashboardFields();
        initializeWasteChart();
    } else {
        studentArea.classList.remove("hidden");
        managerArea.classList.add("hidden");
        document.getElementById("coin-amount").innerText = currentBalance;
    }
}

function updateChefDashboardFields() {
    const hCount = document.getElementById("chef-headcount");
    const oCount = document.getElementById("chef-optouts");
    const sCount = document.getElementById("chef-savings");

    if (hCount) hCount.innerText = expectedHeadcount;
    if (oCount) oCount.innerText = optOutsCount;
    if (sCount) sCount.innerText = "₹" + rawMaterialSavings;
}

function generatePass(mealType) {
    document.getElementById("pass-container").classList.remove("hidden");
    let randomToken = Math.floor(1000 + Math.random() * 9000);
    document.getElementById("pass-meal-type").innerText = "BHOJ-" + randomToken;
    let now = new Date();
    document.getElementById("pass-timestamp").innerText = "Issued: " + now.toLocaleTimeString();
}

function skipMeal() {
    if (confirm("Execute live batch opt-out telemetry sync array?")) {
        currentBalance += 10;
        document.getElementById("coin-amount").innerText = currentBalance;
        
        // Directly update the internal tracking values instantly
        expectedHeadcount -= 1;
        optOutsCount += 1;
        rawMaterialSavings += 40; // ₹40 saved per slide assumptions
        
        alert("BojhCoins Ledger credited! Headcount parameters modified internally for the Chef view.");
        document.getElementById("pass-container").classList.add("hidden");
    }
}

function submitFeedback(tagName) {
    document.getElementById("feedback-status").innerText = "Culinary feedback dispatched!";
    
    // Simulate server dashboard alert array injection
    const alertsPanel = document.getElementById("chef-alerts-panel");
    const textNode = document.getElementById("latest-alert-text");
    if (alertsPanel && textNode) {
        alertsPanel.classList.remove("hidden");
        textNode.innerText = "Student submitted visual tag feedback: \"" + tagName + "\"";
    }
}

function initializeWasteChart() {
    const ctx = document.getElementById('wasteChart').getContext('2d');
    if (wasteChartInstance) wasteChartInstance.destroy();

    wasteChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Today'],
            datasets: [{
                label: 'Overrun Waste %',
                data: [25, 22, 19, 15, 12, 7.8], // Core targets from Slide 9
                borderColor: '#16a34a',
                backgroundColor: 'rgba(22, 163, 74, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { min: 0, max: 30 } }
        }
    });
}

function logout() {
    document.getElementById("dashboard").classList.add("hidden");
    document.querySelector(".login").classList.remove("hidden");
    document.getElementById("username").value = "";
}