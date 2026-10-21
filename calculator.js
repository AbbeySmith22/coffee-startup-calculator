
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


<button type="button" id="equipmentBack"
  style="margin-top: 24px; background: #E8E0D8;">
  ← Back to My Coffee Shop Concept
</button>

<button type="button" id="equipmentNext"
  style="margin-top: 12px;">
  Continue to Construction & Build-Out →
</button>

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

  document.getElementById("equipmentBack")
    .addEventListener("click", () => {
      document.getElementById("equipmentCalculator")
        .style.display = "none";

      document.getElementById("conceptForm")
        .closest(".card").style.display = "block";

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

  document.getElementById("equipmentNext")
    .addEventListener("click", () => {
      document.getElementById("equipmentCalculator")
        .style.display = "none";

      document.getElementById("constructionCalculator")
        .style.display = "block";

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
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

const constructionItems = [
  {
    id: "design",
    name: "Design & Architectural Plans",
    help: "Architectural drawings, layout design and professional design fees."
  },
  {
    id: "permits",
    name: "Permits & Inspections",
    help: "Building permits, inspections and local approval costs."
  },
  {
    id: "plumbing",
    name: "Plumbing & Drainage",
    help: "Water lines, drains, sinks and plumbing installation."
  },
  {
    id: "electrical",
    name: "Electrical Upgrades",
    help: "Power requirements, outlets, lighting and electrical installation."
  },
  {
    id: "construction",
    name: "General Construction",
    help: "Contractors, walls, structural changes and general build-out work."
  },
  {
    id: "counters",
    name: "Counters & Service Bar",
    help: "Customer counter, espresso bar and service-area construction."
  },
  {
    id: "finishes",
    name: "Flooring, Painting & Finishes",
    help: "Flooring, painting, tiling and interior finishes."
  },
  {
    id: "signage",
    name: "Signage",
    help: "Exterior and interior signage, including installation."
  },
  {
    id: "installation",
    name: "Equipment Installation",
    help: "Installation costs not already included in equipment quotes."
  },
  {
    id: "other",
    name: "Other Build-Out Costs",
    help: "Any additional construction or property-specific expenses."
  }
];

const constructionValues = {};

function renderConstructionCalculator() {
  const container =
    document.getElementById("constructionCalculator");

  if (!container) return;

  container.innerHTML = `
    <div class="step">STEP 3 — STARTUP COSTS</div>
    <h2>Construction & Build-Out</h2>

    <p class="hint">
      Estimate the costs of preparing your space for opening.
      Use contractor quotes whenever possible.
    </p>

    ${constructionItems.map(item => `
      <div class="field">
        <label for="construction-${item.id}">
          ${item.name}
        </label>
        <p class="hint">${item.help}</p>
        <input
          id="construction-${item.id}"
          type="number"
          min="0"
          step="0.01"
          value="${constructionValues[item.id] ?? ""}"
          placeholder="Enter estimated cost ($)"
        >
      </div>
    `).join("")}

    <div class="budget-total">
      <strong>Construction & Build-Out Total</strong>
      <strong id="constructionTotal">$0</strong>
    </div>

    <p class="hint">
      Bellissimo planning reminder: Don't build your budget
      around the best-case number. Construction surprises,
      permitting delays and unexpected upgrades can increase
      your startup costs.
    </p>

    
<button type="button" id="constructionBack"
  style="margin-top: 24px; background: #E8E0D8;">
  ← Back to Equipment & Furnishings
</button>

<button type="button" id="constructionNext"
  style="margin-top: 12px;">
  Continue to Next Budget Section →
</button>

  `;

  constructionItems.forEach(item => {
    const input =
      document.getElementById(`construction-${item.id}`);

    input.addEventListener("input", () => {
      const value = Number(input.value);

      constructionValues[item.id] =
        input.value !== "" &&
        Number.isFinite(value) &&
        value >= 0
          ? value
          : null;

      updateConstructionTotal();
    });
  });

 
  updateConstructionTotal();

  document.getElementById("constructionBack")
    .addEventListener("click", () => {
      document.getElementById("constructionCalculator")
        .style.display = "none";

      document.getElementById("equipmentCalculator")
        .style.display = "block";

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
}

function updateConstructionTotal() {

  const total = constructionItems.reduce(
    (sum, item) =>
      sum + (constructionValues[item.id] || 0),
    0
  );

  document.getElementById("constructionTotal")
    .textContent = formatMoney(total);

  sessionStorage.setItem(
    "coffeeBudgetConstruction",
    JSON.stringify(constructionValues)
  );
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    const saved = JSON.parse(
      sessionStorage.getItem("coffeeBudgetConstruction") || "{}"
    );

    constructionItems.forEach(item => {
      const value = saved[item.id];

      if (
        typeof value === "number" &&
        Number.isFinite(value) &&
        value >= 0
      ) {
        constructionValues[item.id] = value;
      }
    });
  } catch (error) {
    console.warn("Could not restore construction values.");
  }

  renderConstructionCalculator();
});

const propertyItems = [
  {
    id: "deposit",
    name: "Security Deposit",
    help: "The deposit required by your landlord when signing the lease."
  },
  {
    id: "advanceRent",
    name: "Advance Rent",
    help: "Any rent you must pay upfront when signing your lease."
  },
  {
    id: "preOpeningRent",
    name: "Rent Before Opening",
    help: "Rent payable during construction, setup and permitting delays. Do not double-count advance rent."
  },
  {
    id: "utilities",
    name: "Utility Deposits & Connections",
    help: "Electricity, water, gas, internet and other connection costs."
  },
  {
    id: "legal",
    name: "Legal & Lease Review Fees",
    help: "Professional fees for reviewing and negotiating your lease."
  },
  {
    id: "insurance",
    name: "Pre-Opening Insurance",
    help: "Insurance premiums payable before your coffee shop opens."
  },
  {
    id: "other",
    name: "Other Property Costs",
    help: "Additional property-related expenses not included elsewhere."
  }
];

const propertyValues = {};

function renderPropertyCalculator() {
  const container = document.getElementById("propertyCalculator");
  if (!container) return;

  container.innerHTML = `
    <div class="step">STEP 4 — STARTUP COSTS</div>
    <h2>Rent & Property Costs</h2>

    <p class="hint">
      Include the costs of securing your location and
      paying for it before your coffee shop opens.
      Use your actual lease terms whenever possible.
    </p>

    ${propertyItems.map(item => `
      <div class="field">
        <label for="property-${item.id}">${item.name}</label>
        <p class="hint">${item.help}</p>
        <input
          id="property-${item.id}"
          type="number"
          min="0"
          step="0.01"
          value="${propertyValues[item.id] ?? ""}"
          placeholder="Enter estimated cost ($)"
        >
      </div>
    `).join("")}

    <div class="budget-total">
      <strong>Rent & Property Costs Total</strong>
      <strong id="propertyTotal">$0</strong>
    </div>

    <p class="hint">
      Bellissimo planning reminder: Rent can start long
      before your first customer walks through the door.
      Allow for construction and permitting delays, and
      avoid counting the same rent payment twice.
    </p>

    <button type="button" id="propertyBack"
      style="margin-top: 24px; background: #E8E0D8;">
      ← Back to Construction & Build-Out
    </button>

    <button type="button" id="propertyNext"
      style="margin-top: 12px;">
      Continue to Next Budget Section →
    </button>

  `;

  propertyItems.forEach(item => {
    const input = document.getElementById(`property-${item.id}`);

    input.addEventListener("input", () => {
      const value = Number(input.value);

      propertyValues[item.id] =
        input.value !== "" && Number.isFinite(value) && value >= 0
          ? value
          : null;

      updatePropertyTotal();
    });
  });

  updatePropertyTotal();
}

function updatePropertyTotal() {

  const total = propertyItems.reduce((sum, item) => {
    return sum + (propertyValues[item.id] || 0);
  }, 0);

  document.getElementById("propertyTotal").textContent =
    formatMoney(total);

  sessionStorage.setItem(
    "coffeeBudgetProperty",
    JSON.stringify(propertyValues)
  );
}
