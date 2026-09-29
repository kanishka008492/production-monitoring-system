let productions = [];
const startButton = document.getElementById("startProduction");
productions = JSON.parse(localStorage.getItem("productions")) || [];

const orderSelect = document.getElementById("orderSelect");
const deleteOrder = document.getElementById("deleteOrder");

startButton.addEventListener("click", function () {

    const productName = document.getElementById("productName").value;
    const requiredQuantity = Number(
        document.getElementById("requiredQuantity").value
    );
    const completedQuantity = Number(
    document.getElementById("completedQuantity").value
);
    const deadline = document.getElementById("deadline").value;

    if (productName === "" || requiredQuantity <= 0 || deadline === "") {
        alert("Please enter all production details.");
        return;
    }

    const production = {
        productName: productName,
        requiredQuantity: requiredQuantity,
        completedQuantity: completedQuantity,
        deadline: deadline,
        startTime: new Date().toISOString()
    };

    productions.push(production);
    localStorage.setItem("productions", JSON.stringify(productions));

    loadOrderOptions();

    displayProduction(production);
    updateDashboard(production);

    document.getElementById("productName").value = "";
    document.getElementById("requiredQuantity").value = "";
    document.getElementById("deadline").value = "";
});


function displayProduction(production) {

    const productionList = document.getElementById("productionList");

    if (productions.length === 1) {
        productionList.innerHTML = "";
    }
    
    productionList.innerHTML += `
        <div class="production-card">

            <h3>${production.productName}</h3>

            <p>
                Required Quantity:
                ${production.requiredQuantity}
            </p>

            <p>
                Completed Quantity:
                ${production.completedQuantity}
            </p>

            <p>
                Remaining Quantity:
                ${production.requiredQuantity - production.completedQuantity}
            </p>

            <p>
                Progress:
                ${(production.completedQuantity / production.requiredQuantity * 100).toFixed(0)}%
            </p>

            <p>
                Status:
                ${
                    production.completedQuantity === 0
                        ? "Not Started"
                        : production.completedQuantity >= production.requiredQuantity
                        ? "Completed"
                        : "In Progress"
                }
            </p>

            <p>
                Days Remaining:
                ${Math.max(
                    0,
                    Math.ceil(
                        (new Date(production.deadline) - new Date()) /
                        (1000 * 60 * 60 * 24)
                    )
                )}
            </p>
            <p>
                Priority:
                ${
                    Math.ceil(
                        (new Date(production.deadline) - new Date()) /
                        (1000 * 60 * 60 * 24)
                    ) <= 3
                        ? "Urgent"
                        : Math.ceil(
                            (new Date(production.deadline) - new Date()) /
                            (1000 * 60 * 60 * 24)
                          ) <= 7
                       ? "High"
                       : "Normal"
               }
           </p>

            <button onclick="updateProduction('${production.productName}')">
                Update Production
            </button>

            <button onclick="editProduction('${production.productName}')">
                Edit Production
            </button>
            
        </div>
    `;

    if (production.completedQuantity >= production.requiredQuantity) {
        productionList.lastElementChild.remove();
    }

    if (production.completedQuantity >= production.requiredQuantity) {

        const completedList = document.getElementById("completedList");

        completedList.innerHTML += `
            <div class="production-card">

                <h3>${production.productName}</h3>

                <p>Required Quantity: ${production.requiredQuantity}</p>

                <p>Completed Quantity: ${production.completedQuantity}</p>

                <p>Status: Completed</p>


            </div>
        `;
    }
}
function updateDashboard(production) {

    const status =
        production.completedQuantity === 0
            ? "Not Started"
            : production.completedQuantity >= production.requiredQuantity
            ? "Completed"
            : "In Progress";

    document.getElementById("totalOrders").textContent = productions.length;

    let inProgressCount = 0;

    productions.forEach(function (item) {
        if (
            item.completedQuantity > 0 &&
            item.completedQuantity < item.requiredQuantity
        ) {
            inProgressCount++;
        }
    });

    document.getElementById("inProgress").textContent = inProgressCount;
    
    let completedCount = 0;

    productions.forEach(function (item) {
        if (item.completedQuantity >= item.requiredQuantity) {
            completedCount++;
        }
    });

    document.getElementById("completed").textContent = completedCount;
    
    const today = new Date();
const deadlineDate = new Date(production.deadline);

const isOverdue =
    deadlineDate < today &&
    status !== "Completed";

let overdueCount = 0;

productions.forEach(function (item) {
    const itemStatus =
        item.completedQuantity >= item.requiredQuantity
            ? "Completed"
            : "In Progress";

    const itemDeadline = new Date(item.deadline);

    if (itemDeadline < new Date() && itemStatus !== "Completed") {
        overdueCount++;
    }
});

document.getElementById("overdue").textContent = overdueCount;

if (overdueCount > 0) {
    alert("⚠️ " + overdueCount + " production order needs urgent attention.");
}
}

const productionList = document.getElementById("productionList");

productionList.innerHTML = "";

productions.forEach(function (item) {
    displayProduction(item);
});

if (productions.length > 0) {
    updateDashboard(productions[productions.length - 1]);
}

function loadOrderOptions() {
orderSelect.innerHTML = '<option value="">Select an order</option>';

    productions.forEach(function (item, index) {
        const option = document.createElement("option");

        option.value = index;
        option.textContent = item.productName;

        orderSelect.appendChild(option);
    });
}

loadOrderOptions();

deleteOrder.addEventListener("click", function () {
    const selectedIndex = orderSelect.value;

    if (selectedIndex === "") {
        alert("Please select an order to delete.");
        return;
    }

   const name = productions[selectedIndex].productName;
   productions.splice(selectedIndex, 1);

   localStorage.removeItem("history");
   localStorage.setItem("productions", JSON.stringify(productions));
    
   location.reload();
    
});


function updateProduction(productName) {
    const p = productions.find(x => x.productName === productName);
    const q = Number(prompt("Enter completed quantity:"));

    if (!p || q < 0 || q > p.requiredQuantity) {
        alert("Enter a valid quantity.");
        return;
    }

    p.completedQuantity = q;

    let history = JSON.parse(localStorage.getItem("history")) || [];
    history.push({
        productName: productName,
        quantity: q,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("history", JSON.stringify(history));
    localStorage.setItem("productions", JSON.stringify(productions));
    location.reload();
}
function loadHistory() {
    const list = document.getElementById("historyList");
    const history = JSON.parse(localStorage.getItem("history")) || [];

    list.innerHTML = history.length
        ? history.map(item => `
            <div class="production-card">
                <h3>${item.productName}</h3>
                <p>Completed Quantity: ${item.quantity}</p>
                <p>Updated: ${item.date}</p>
            </div>
        `).join("")
        : "<p>No production updates yet.</p>";
}

loadHistory();

const search = document.getElementById("searchOrder");

search.oninput = function () {
    const text = search.value.toLowerCase();

    document.querySelectorAll("#productionList .production-card").forEach(card => {
        const name = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = name.includes(text) ? "" : "none";
    });
};

const completedSearch = document.getElementById("completedSearch");

completedSearch.addEventListener("input", function() {
    const text = this.value.toLowerCase();

    document.querySelectorAll("#completedList .production-card").forEach(card => {
        card.style.display =
            card.innerText.toLowerCase().includes(text) ? "" : "none";
    });
});

function editProduction(name) {
    const p = productions.find(x => x.productName === name);
    p.productName = prompt("New name:", p.productName);
    p.requiredQuantity = Number(prompt("New quantity:", p.requiredQuantity));
    p.deadline = prompt("New deadline:", p.deadline);
    localStorage.setItem("productions", JSON.stringify(productions));
    location.reload();
}
