let productions = [];
const startButton = document.getElementById("startProduction");

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
                Deadline:
                ${production.deadline}
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
                    new Date(production.deadline) < new Date()
                        ? "Urgent"
                        : "Normal"
               }
            </p>
            
        </div>
    `;

    if (production.completedQuantity >= production.requiredQuantity) {

        const completedList = document.getElementById("completedList");

        completedList.innerHTML = `
            <div class="production-card">

                <h3>${production.productName}</h3>

                <p>Required Quantity: ${production.requiredQuantity}</p>

                <p>Completed Quantity: ${production.completedQuantity}</p>

                <p>Status: Completed</p>

                <p>Deadline: ${production.deadline}</p>

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
}
