
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

  document.getElementById("constructionNext")
    .addEventListener("click", () => {
      document.getElementById("constructionCalculator")
        .style.display = "none";

      document.getElementById("propertyCalculator")
        .style.display = "block";

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });


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

  document.getElementById("propertyNext")
    .addEventListener("click", () => {
      document.getElementById("propertyCalculator")
        .style.display = "none";

      document.getElementById("inventoryCalculator")
        .style.display = "block";

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });


  document.getElementById("propertyBack")
    .addEventListener("click", () => {
      document.getElementById("propertyCalculator")
        .style.display = "none";

      document.getElementById("constructionCalculator")
        .style.display = "block";

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
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

document.addEventListener("DOMContentLoaded", () => {
  try {
    const saved = JSON.parse(
      sessionStorage.getItem("coffeeBudgetProperty") || "{}"
    );

    propertyItems.forEach(item => {
      const value = saved[item.id];

      if (
        typeof value === "number" &&
        Number.isFinite(value) &&
        value >= 0
      ) {
        propertyValues[item.id] = value;
      }
    });
  } catch (error) {
    console.warn("Could not restore property values.");
  }

  renderPropertyCalculator();
});

const inventoryItems = [
  {
    id: "coffee",
    name: "Coffee Beans",
    help: "Your initial supply of espresso and brewed coffee beans."
  },
  {
    id: "milk",
    name: "Milk & Dairy Alternatives",
    help: "Milk, oat milk and other alternatives for opening stock."
  },
  {
    id: "syrups",
    name: "Syrups, Sauces & Drink Ingredients",
    help: "Flavourings, chocolate, chai, matcha and other drink ingredients."
  },
  {
    id: "tea",
    name: "Tea & Other Beverages",
    help: "Tea, bottled drinks and other beverage inventory."
  },
  {
    id: "food",
    name: "Food Inventory",
    help: "Pastries, baked goods, sandwiches and other opening food stock."
  },
  {
    id: "cups",
    name: "Cups, Lids & Packaging",
    help: "Takeaway cups, lids, napkins, bags and food packaging."
  },
  {
    id: "cleaning",
    name: "Cleaning & Sanitation Supplies",
    help: "Cleaning chemicals, sanitizers and disposable supplies."
  },
  {
    id: "retail",
    name: "Retail Products",
    help: "Packaged coffee, merchandise and other items for resale."
  },
  {
    id: "other",
    name: "Other Opening Inventory",
    help: "Any additional stock or consumables needed for opening."
  }
];

const inventoryValues = {};

function renderInventoryCalculator() {
  const container = document.getElementById("inventoryCalculator");
  if (!container) return;

  container.innerHTML = `
    <div class="step">STEP 5 — STARTUP COSTS</div>
    <h2>Initial Inventory & Opening Supplies</h2>

    <p class="hint">
      Estimate the stock and supplies you'll need before
      opening your coffee shop. Use supplier prices and
      realistic opening quantities whenever possible.
    </p>

    ${inventoryItems.map(item => `
      <div class="field">
        <label for="inventory-${item.id}">${item.name}</label>
        <p class="hint">${item.help}</p>
        <input
          id="inventory-${item.id}"
          type="number"
          min="0"
          step="0.01"
          value="${inventoryValues[item.id] ?? ""}"
          placeholder="Enter estimated cost ($)"
        >
      </div>
    `).join("")}

    <div class="budget-total">
      <strong>Initial Inventory Total</strong>
      <strong id="inventoryTotal">$0</strong>
    </div>

    <p class="hint">
      Bellissimo planning reminder: Your opening inventory
      should reflect your actual menu and expected demand.
      Don't overbuy perishable products, but make sure you
      have enough supplies to operate smoothly.
    </p>

    <button type="button" id="inventoryBack"
      style="margin-top: 24px; background: #E8E0D8;">
      ← Back to Rent & Property Costs
    </button>

    <button type="button" id="inventoryNext"
      style="margin-top: 12px;">
      Continue to Next Budget Section →
    </button>
 
  `;

  inventoryItems.forEach(item => {
    const input = document.getElementById(`inventory-${item.id}`);

    input.addEventListener("input", () => {
      const value = Number(input.value);

      inventoryValues[item.id] =
        input.value !== "" && Number.isFinite(value) && value >= 0
          ? value
          : null;

      updateInventoryTotal();
    });
  });


  updateInventoryTotal();

  document.getElementById("inventoryNext")
    .addEventListener("click", () => {
      document.getElementById("inventoryCalculator")
        .style.display = "none";

      document.getElementById("staffingCalculator")
        .style.display = "block";

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });


  document.getElementById("inventoryBack")
    .addEventListener("click", () => {
      document.getElementById("inventoryCalculator")
        .style.display = "none";

      document.getElementById("propertyCalculator")
        .style.display = "block";

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
}

function updateInventoryTotal() {


  const total = inventoryItems.reduce((sum, item) => {
    return sum + (inventoryValues[item.id] || 0);
  }, 0);

  document.getElementById("inventoryTotal").textContent =
    formatMoney(total);

  sessionStorage.setItem(
    "coffeeBudgetInventory",
    JSON.stringify(inventoryValues)
  );
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    const saved = JSON.parse(
      sessionStorage.getItem("coffeeBudgetInventory") || "{}"
    );

    inventoryItems.forEach(item => {
      const value = saved[item.id];

      if (
        typeof value === "number" &&
        Number.isFinite(value) &&
        value >= 0
      ) {
        inventoryValues[item.id] = value;
      }
    });
  } catch (error) {
    console.warn("Could not restore inventory values.");
  }

  renderInventoryCalculator();
});

const staffingItems = [
  {
    id: "recruitment",
    name: "Recruitment & Hiring",
    help: "Job advertisements, recruitment fees and hiring expenses."
  },
  {
    id: "training",
    name: "Staff Training",
    help: "Barista training, customer service training and onboarding."
  },
  {
    id: "wages",
    name: "Pre-Opening Staff Wages",
    help: "Wages paid before opening, including training and setup days."
  },
  {
    id: "payroll",
    name: "Pre-Opening Payroll Taxes & Benefits",
    help: "Employer payroll costs associated with pre-opening wages."
  },
  {
    id: "marketing",
    name: "Launch Marketing & Advertising",
    help: "Website, social media, promotional materials and advertising."
  },
  {
    id: "opening",
    name: "Grand Opening Expenses",
    help: "Opening events, promotions and launch activities."
  },
  {
    id: "professional",
    name: "Professional & Business Setup Fees",
    help: "Accounting, business formation and other professional fees not included elsewhere."
  },
  {
    id: "licenses",
    name: "Business Licenses & Certifications",
    help: "Business registrations, food permits and certifications not already included in construction costs."
  },
  {
    id: "other",
    name: "Other Pre-Opening Expenses",
    help: "Additional expenses incurred before opening your coffee shop."
  }
];

const staffingValues = {};

function renderStaffingCalculator() {
  const container = document.getElementById("staffingCalculator");
  if (!container) return;

  container.innerHTML = `
    <div class="step">STEP 6 — STARTUP COSTS</div>
    <h2>Staffing & Pre-Opening Expenses</h2>

    <p class="hint">
      Estimate the costs of hiring, training and preparing
      your coffee shop before opening day.
      Use actual quotes and realistic estimates where possible.
    </p>

    ${staffingItems.map(item => `
      <div class="field">
        <label for="staffing-${item.id}">${item.name}</label>
        <p class="hint">${item.help}</p>
        <input
          id="staffing-${item.id}"
          type="number"
          min="0"
          step="0.01"
          value="${staffingValues[item.id] ?? ""}"
          placeholder="Enter estimated cost ($)"
        >
      </div>
    `).join("")}

    <div class="budget-total">
      <strong>Staffing & Pre-Opening Total</strong>
      <strong id="staffingTotal">$0</strong>
    </div>

    <p class="hint">
      Bellissimo planning reminder: Your team may need
      to be hired and trained before your first sale.
      Include wages, payroll costs and preparation time
      in your startup budget.
    </p>

    <button type="button" id="staffingBack"
      style="margin-top: 24px; background: #E8E0D8;">
      ← Back to Initial Inventory
    </button>

    <button type="button" id="staffingNext"
      style="margin-top: 12px;">
      Continue to Next Budget Section →
    </button>

  `;

  staffingItems.forEach(item => {
    const input = document.getElementById(`staffing-${item.id}`);

    input.addEventListener("input", () => {
      const value = Number(input.value);

      staffingValues[item.id] =
        input.value !== "" && Number.isFinite(value) && value >= 0
          ? value
          : null;

      updateStaffingTotal();
    });
  });


  updateStaffingTotal();

  document.getElementById("staffingNext")
    .addEventListener("click", () => {
      document.getElementById("staffingCalculator")
        .style.display = "none";

      document.getElementById("workingCapitalCalculator")
        .style.display = "block";

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });


  document.getElementById("staffingBack")
    .addEventListener("click", () => {
      document.getElementById("staffingCalculator")
        .style.display = "none";

      document.getElementById("inventoryCalculator")
        .style.display = "block";

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
}

function updateStaffingTotal() {


  const total = staffingItems.reduce((sum, item) => {
    return sum + (staffingValues[item.id] || 0);
  }, 0);

  document.getElementById("staffingTotal").textContent =
    formatMoney(total);

  sessionStorage.setItem(
    "coffeeBudgetStaffing",
    JSON.stringify(staffingValues)
  );
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    const saved = JSON.parse(
      sessionStorage.getItem("coffeeBudgetStaffing") || "{}"
    );

    staffingItems.forEach(item => {
      const value = saved[item.id];

      if (
        typeof value === "number" &&
        Number.isFinite(value) &&
        value >= 0
      ) {
        staffingValues[item.id] = value;
      }
    });
  } catch (error) {
    console.warn("Could not restore staffing values.");
  }

  renderStaffingCalculator();
});

const workingCapitalItems = [
  {
    id: "rent",
    name: "Monthly Rent & Occupancy Costs",
    help: "Rent and recurring property costs after opening."
  },
  {
    id: "wages",
    name: "Monthly Payroll & Staff Costs",
    help: "Wages, employer taxes and benefits for your operating team."
  },
  {
    id: "utilities",
    name: "Monthly Utilities",
    help: "Electricity, water, gas, internet and other utilities."
  },
  {
    id: "inventory",
    name: "Monthly Inventory & Supplies",
    help: "Coffee, milk, food, packaging and other replenishment costs."
  },
  {
    id: "software",
    name: "Monthly Software & Subscriptions",
    help: "POS subscriptions, scheduling, accounting and other software."
  },
  {
    id: "insurance",
    name: "Monthly Insurance",
    help: "Ongoing insurance costs after opening."
  },
  {
    id: "marketing",
    name: "Monthly Marketing",
    help: "Advertising, promotions and customer acquisition."
  },
  {
    id: "other",
    name: "Other Monthly Operating Expenses",
    help: "Maintenance, professional services and other recurring expenses."
  }
];

const workingCapitalValues = {};

function renderWorkingCapitalCalculator() {
  const container = document.getElementById("workingCapitalCalculator");
  if (!container) return;

  container.innerHTML = `
    <div class="step">STEP 7 — STARTUP COSTS</div>
    <h2>Working Capital & Cash Reserves</h2>

    <p class="hint">
      Opening your coffee shop is only the beginning.
      Estimate your monthly operating expenses so you can
      plan enough cash to support the business while sales grow.
    </p>

    ${workingCapitalItems.map(item => `
      <div class="field">
        <label for="working-${item.id}">${item.name}</label>
        <p class="hint">${item.help}</p>
        <input
          id="working-${item.id}"
          type="number"
          min="0"
          step="0.01"
          value="${workingCapitalValues[item.id] ?? ""}"
          placeholder="Enter monthly cost ($)"
        >
      </div>
    `).join("")}

    <div class="field">
      <label for="reserveMonths">
        How many months of operating reserves do you want to plan for?
      </label>
      <p class="hint">
        Choose your planning period. This is not a guaranteed
        runway because actual sales and expenses will vary.
      </p>
      <select id="reserveMonths">
        <option value="3">3 months</option>
        <option value="4">4 months</option>
        <option value="5">5 months</option>
        <option value="6">6 months</option>
        <option value="9">9 months</option>
        <option value="12">12 months</option>
      </select>
    </div>

    <div class="budget-total">
      <strong>Estimated Monthly Operating Costs</strong>
      <strong id="monthlyOperatingTotal">$0</strong>
    </div>

    <div class="budget-total" style="margin-top: 12px;">
      <strong>Planned Working Capital Reserve</strong>
      <strong id="workingCapitalTotal">$0</strong>
    </div>

    <p class="hint">
      Bellissimo planning reminder: Plan for a slower sales
      ramp and unexpected expenses. This reserve is a
      conservative planning allowance, not a prediction
      of your actual cash flow.
    </p>

    <button type="button" id="workingCapitalBack"
      style="margin-top: 24px; background: #E8E0D8;">
      ← Back to Staffing & Pre-Opening
    </button>

    <button type="button" id="workingCapitalNext"
      style="margin-top: 12px;">
      Continue to Budget Summary →
    </button>

  `;

  workingCapitalItems.forEach(item => {
    const input = document.getElementById(`working-${item.id}`);

    input.addEventListener("input", () => {
      const value = Number(input.value);

      workingCapitalValues[item.id] =
        input.value !== "" && Number.isFinite(value) && value >= 0
          ? value
          : null;

      updateWorkingCapitalTotal();
    });
  });

  document.getElementById("reserveMonths")
    .addEventListener("change", updateWorkingCapitalTotal);

  updateWorkingCapitalTotal();

  document.getElementById("workingCapitalBack")
    .addEventListener("click", () => {
      document.getElementById("workingCapitalCalculator")
        .style.display = "none";

      document.getElementById("staffingCalculator")
        .style.display = "block";

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
}

function updateWorkingCapitalTotal() {


  const monthlyTotal = workingCapitalItems.reduce((sum, item) => {
    return sum + (workingCapitalValues[item.id] || 0);
  }, 0);

  const months = Number(
    document.getElementById("reserveMonths").value
  );

  const reserveTotal = monthlyTotal * months;

  document.getElementById("monthlyOperatingTotal").textContent =
    formatMoney(monthlyTotal);

  document.getElementById("workingCapitalTotal").textContent =
    formatMoney(reserveTotal);

  sessionStorage.setItem(
    "coffeeBudgetWorkingCapital",
    JSON.stringify({
      costs: workingCapitalValues,
      months: months
    })
  );
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    const saved = JSON.parse(
      sessionStorage.getItem("coffeeBudgetWorkingCapital") || "{}"
    );

    workingCapitalItems.forEach(item => {
      const value = saved.costs?.[item.id];

      if (
        typeof value === "number" &&
        Number.isFinite(value) &&
        value >= 0
      ) {
        workingCapitalValues[item.id] = value;
      }
    });

    renderWorkingCapitalCalculator();

    const savedMonths = Number(saved.months);
    const monthsDropdown = document.getElementById("reserveMonths");

    if (
      saved.months != null &&
      [...monthsDropdown.options].some(
        option => Number(option.value) === savedMonths
      )
    ) {
      monthsDropdown.value = String(savedMonths);
    }

    updateWorkingCapitalTotal();

  } catch (error) {
    console.warn("Could not restore working capital values.");
    renderWorkingCapitalCalculator();
  }
});

function getSectionTotal(items, values) {
  return items.reduce((sum, item) => {
    return sum + (values[item.id] || 0);
  }, 0);
}

function getStartupBudgetTotals() {
  const equipment = getSectionTotal(equipmentItems, equipmentValues);
  const construction = getSectionTotal(constructionItems, constructionValues);
  const property = getSectionTotal(propertyItems, propertyValues);
  const inventory = getSectionTotal(inventoryItems, inventoryValues);
  const staffing = getSectionTotal(staffingItems, staffingValues);

  const monthlyOperating = getSectionTotal(
    workingCapitalItems,
    workingCapitalValues
  );

  const reserveMonths = Number(
    document.getElementById("reserveMonths").value
  );

  const workingCapital = monthlyOperating * reserveMonths;

  const startupCosts =
    equipment + construction + property + inventory + staffing;

  return {
    equipment,
    construction,
    property,
    inventory,
    staffing,
    monthlyOperating,
    reserveMonths,
    workingCapital,
    startupCosts,
    subtotal: startupCosts + workingCapital
  };
}

function renderBudgetSummary() {
  const container = document.getElementById("budgetSummary");
  if (!container) return;

  const totals = getStartupBudgetTotals();

  container.innerHTML = `
    <div class="step">STEP 8 — YOUR RESULTS</div>
    <h2>Your Coffee Shop Startup Budget</h2>

    <p class="hint">
      Here's your estimated startup budget based on
      the costs you've entered.
    </p>

    ${[
      ["Equipment & Furnishings", totals.equipment],
      ["Construction & Build-Out", totals.construction],
      ["Rent & Property Costs", totals.property],
      ["Initial Inventory", totals.inventory],
      ["Staffing & Pre-Opening", totals.staffing],
      ["Working Capital Reserve", totals.workingCapital]
    ].map(([name, amount]) => `
      <div class="budget-total" style="margin-bottom: 10px;">
        <span>${name}</span>
        <strong>${formatMoney(amount)}</strong>
      </div>
    `).join("")}

    <div class="budget-total" style="margin-top: 20px;">
      <strong>Total Before Contingency</strong>
      <strong>${formatMoney(totals.subtotal)}</strong>
    </div>

    
    <p class="hint" style="margin-top: 20px;">
      Your working capital reserve covers
      ${totals.reserveMonths} months of estimated operating
      expenses. This is a planning allowance, not a
      guarantee of how long your cash will last.
    </p>

    <div class="field">
      <label for="contingencyPercent">
        Contingency Allowance (%)
      </label>
      <p class="hint">
        Choose an additional percentage to allow for
        unexpected startup costs. Enter your own figure.
      </p>
      <input
        id="contingencyPercent"
        type="number"
        min="0"
        max="100"
        step="1"
        value="10"
      >
    </div>

    <div class="field">
      <label for="availableFunding">
        Total Available Funding ($)
      </label>
      <p class="hint">
        Include your available savings and confirmed
        financing. Do not include loans that are
        still awaiting approval.
      </p>
      <input
        id="availableFunding"
        type="number"
        min="0"
        step="0.01"
        placeholder="Enter available funding ($)"
      >
    </div>

    <div class="budget-total">
      <strong>Total Funding Required</strong>
      <strong id="totalFundingRequired">—</strong>
    </div>

    <div class="budget-total" style="margin-top: 12px;">
      <strong>Funding Gap / Surplus</strong>
      <strong id="fundingGap">—</strong>
    </div>
  `;
}

