
const equipmentItems = [
  {
    id: "espresso",
    name: "Espresso machine",
    help: "Consider capacity, installation, warranty and service support."
  },
  {
    id: "grinders",
    name: "Coffee grinders",
    help: "Plan for your espresso and other coffee service needs."
  },
  {
    id: "brewing",
    name: "Batch brewing equipment",
    help: "Include brewers, servers and supporting equipment."
  },
  {
    id: "water",
    name: "Water filtration",
    help: "Check water quality and equipment requirements."
  },
  {
    id: "refrigeration",
    name: "Refrigeration",
    help: "Consider milk storage, food storage and service capacity."
  },
  {
    id: "pos",
    name: "Point-of-sale system",
    help: "Include hardware, setup and any upfront fees."
  },
  {
    id: "furniture",
    name: "Furniture and fixtures",
    help: "Tables, chairs, shelving and other furnishings."
  },
  {
    id: "smallwares",
    name: "Smallwares",
    help: "Pitchers, tampers, scales, utensils and service tools."
  },
  {
    id: "other",
    name: "Other equipment",
    help: "Add equipment specific to your coffee shop concept."
  }
];

const equipmentValues = {};

function formatMoney(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(amount);
}

function renderEquipmentCalculator() {
  const container = document.getElementById("equipmentCalculator");

  if (!container) return;

  container.innerHTML = `
    <div class="step">STEP 2 — STARTUP COSTS</div>
    <h2>Equipment & Furnishings</h2>

    <p class="hint">
      Enter your estimated costs in USD. Use actual supplier
      quotes whenever possible. Leave an amount at zero
      if it does not apply or you haven't priced it yet.
    </p>

    ${equipmentItems.map(item => `
      <div class="field">
        <label for="cost-${item.id}">${item.name}</label>
        <p class="hint">${item.help}</p>
        <input
          id="cost-${item.id}"
          type="number"
          min="0"
          step="0.01"
          value="${equipmentValues[item.id] ?? ""}"
          placeholder="Enter estimated cost ($)"
        >
      </div>
    `).join("")}

    <div class="budget-total">
      <strong>Equipment & Furnishings Total</strong>
      <strong id="equipmentTotal">$0</strong>
    </div>

    <p class="hint">
      Planning reminder: An unpriced item is not necessarily
      a free item. Confirm equipment needs and supplier
      quotes before finalizing your budget.
    </p>
  `;

  equipmentItems.forEach(item => {
    const input = document.getElementById(`cost-${item.id}`);

    input.addEventListener("input", () => {
      const value = Number(input.value);

      equipmentValues[item.id] =
        input.value !== "" && Number.isFinite(value) && value >= 0
          ? value
          : null;

      updateEquipmentTotal();
    });
  });

  updateEquipmentTotal();
}

function updateEquipmentTotal() {
  const total = equipmentItems.reduce((sum, item) => {
    return sum + (equipmentValues[item.id] || 0);
  }, 0);

  document.getElementById("equipmentTotal").textContent =
    formatMoney(total);

  sessionStorage.setItem(
    "coffeeBudgetEquipment",
    JSON.stringify(equipmentValues)
  );
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    const saved = JSON.parse(
      sessionStorage.getItem("coffeeBudgetEquipment") || "{}"
    );

    for (const item of equipmentItems) {
      const value = saved[item.id];
      if (
        typeof value === "number" &&
        Number.isFinite(value) &&
        value >= 0
      ) {
        equipmentValues[item.id] = value;
      }
    }
  } catch (error) {
    console.warn("Could not restore equipment values.");
  }

  renderEquipmentCalculator();
});
