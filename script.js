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

    displayProduction(production);
    updateDashboard(production);

    document.getElementById("productName").value = "";
    document.getElementById("requiredQuantity").value = "";
    document.getElementById("deadline").value = "";
});


function displayProduction(production) {

    const productionList = document.getElementById("productionList");

    productionList.innerHTML = `
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

    document.getElementById("totalOrders").textContent = 1;

    document.getElementById("inProgress").textContent =
        status === "In Progress" ? 1 : 0;
    
    document.getElementById("completed").textContent =
    status === "Completed" ? 1 : 0;
    
    const today = new Date();
const deadlineDate = new Date(production.deadline);

const isOverdue =
    deadlineDate < today &&
    status !== "Completed";

document.getElementById("overdue").textContent =
    isOverdue ? 1 : 0;
}
