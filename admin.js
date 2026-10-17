/**
 * Jyoti Medical Agencies (JMA) - Private Admin Portal Logic
 * For staff inventory management & product uploading
 */

const DEFAULT_PRODUCTS = [
  {
    id: "prod-1",
    name: "Normal Saline (NS) 0.9% w/v",
    category: "standard_iv",
    categoryLabel: "Standard IV Fluid",
    brand: "Puniska Healthcare",
    volume: "500 ml (Also 100ml & 1000ml)",
    packaging: "FFS Bottle / Box of 24",
    inStock: true,
    isFastMoving: true,
    image: "assets/images/iv-bottles.jpg",
    composition: "Sodium Chloride IP 0.9% w/v in Sterile Water for Injections",
    description: "Sterile, non-pyrogenic isotonic solution for fluid and electrolyte replenishment, dilution of compatible injectable medications, and irrigation."
  },
  {
    id: "prod-2",
    name: "Ringer Lactate (RL) Solution",
    category: "standard_iv",
    categoryLabel: "Standard IV Fluid",
    brand: "Aculife",
    volume: "500 ml",
    packaging: "Euro-Head / Box of 24",
    inStock: true,
    isFastMoving: true,
    image: "assets/images/iv-bottles.jpg",
    composition: "Sodium Chloride, Sodium Lactate, Potassium Chloride & Calcium Chloride IP",
    description: "Compound sodium lactate solution for physiological fluid replenishment in dehydration, trauma resuscitation, surgery, and metabolic acidosis."
  },
  {
    id: "prod-3",
    name: "DNS (Dextrose Normal Saline)",
    category: "standard_iv",
    categoryLabel: "Standard IV Fluid",
    brand: "Fresenius Kabi",
    volume: "500 ml",
    packaging: "Sterile BFS / Box of 24",
    inStock: true,
    isFastMoving: true,
    image: "assets/images/iv-bottles.jpg",
    composition: "Dextrose Anhydrous 5% w/v + Sodium Chloride 0.9% w/v",
    description: "Balanced carbohydrate and electrolyte supply for immediate caloric energy and maintenance fluid volume in hospitalized patients."
  },
  {
    id: "prod-4",
    name: "D5 (Dextrose 5% w/v)",
    category: "standard_iv",
    categoryLabel: "Standard IV Fluid",
    brand: "IHL Lifesciences",
    volume: "500 ml",
    packaging: "Blow Fill Seal / Box of 24",
    inStock: true,
    isFastMoving: false,
    image: "assets/images/iv-bottles.jpg",
    composition: "Dextrose (Glucose) 5% w/v in Sterile Pyrogen-Free Water",
    description: "Isotonic carbohydrate infusion providing 170 kcal/L for cellular hydration, insulin regimens, and baseline clinical nutrition."
  },
  {
    id: "prod-5",
    name: "TNA Peri (Total Nutrition Admixture Peripheral)",
    category: "nutrition",
    categoryLabel: "Clinical Nutrition",
    brand: "Fresenius Kabi",
    volume: "1440 ml / 1920 ml",
    packaging: "Multi-Chamber Bag (Triple Bag)",
    inStock: true,
    isFastMoving: true,
    image: "assets/images/tna-infusion.jpg",
    composition: "Amino acids with electrolytes, Glucose & Lipid emulsion (SmofKabiven Peri equivalent)",
    description: "Ready-to-use 3-chamber bag for peripheral parenteral nutrition for hospital patients when oral or enteral nutrition is insufficient."
  },
  {
    id: "prod-6",
    name: "TNA Central (Total Nutrition Admixture Central)",
    category: "nutrition",
    categoryLabel: "Clinical Nutrition",
    brand: "Fresenius Kabi",
    volume: "1000 ml / 2000 ml",
    packaging: "Triple-Chamber Infusion Bag",
    inStock: true,
    isFastMoving: false,
    image: "assets/images/tna-infusion.jpg",
    composition: "Concentrated Amino Acids, Glucose & Fat Emulsion for Central Venous Infusion",
    description: "Complete hypertonic parenteral nutrition for critically ill ICU patients requiring high nitrogen and caloric intake via central venous line."
  },
  {
    id: "prod-7",
    name: "Sterile Water for Injection",
    category: "sterile_water",
    categoryLabel: "Sterile Solvents",
    brand: "Puniska Healthcare",
    volume: "100 ml & 500 ml",
    packaging: "Box of 24 / 50 bottles",
    inStock: true,
    isFastMoving: true,
    image: "assets/images/tna-infusion.jpg",
    composition: "100% Sterile, Non-Pyrogenic Purified Water IP",
    description: "High-grade sterile water for reconstitution, dilution of pharmaceutical injectables, and sterile hospital compounding."
  },
  {
    id: "prod-8",
    name: "Mannitol Infusion 20% w/v",
    category: "specialty",
    categoryLabel: "Specialty Infusion",
    brand: "Aculife",
    volume: "100 ml / 350 ml",
    packaging: "Euro-Head / Box of 24",
    inStock: true,
    isFastMoving: false,
    image: "assets/images/iv-bottles.jpg",
    composition: "Mannitol IP 20% w/v (Osmotic Diuretic)",
    description: "Indicated for reduction of intracranial pressure, cerebral edema, elevated intraocular pressure, and promoting diuresis in acute renal failure."
  },
  {
    id: "prod-9",
    name: "Metronidazole IV Infusion (500mg/100ml)",
    category: "specialty",
    categoryLabel: "Specialty Infusion",
    brand: "IHL Lifesciences",
    volume: "100 ml",
    packaging: "FFS Infusion Bottle / Box of 30",
    inStock: true,
    isFastMoving: true,
    image: "assets/images/iv-bottles.jpg",
    composition: "Metronidazole IP 500mg in 100ml Isotonic Base",
    description: "Antibacterial and antiprotozoal infusion for prophylaxis and treatment of severe anaerobic bacterial infections and surgical sepsis."
  },
  {
    id: "prod-10",
    name: "Ciprofloxacin IV Infusion (200mg/100ml)",
    category: "specialty",
    categoryLabel: "Specialty Infusion",
    brand: "Puniska Healthcare",
    volume: "100 ml",
    packaging: "BFS Bottle / Box of 30",
    inStock: true,
    isFastMoving: false,
    image: "assets/images/iv-bottles.jpg",
    composition: "Ciprofloxacin IP 200mg in 100ml Normal Saline",
    description: "Broad-spectrum fluoroquinolone antibiotic infusion for systemic hospital infections, respiratory, and urinary tract indications."
  }
];

let adminProducts = [];
const MASTER_PIN = "1234";

document.addEventListener("DOMContentLoaded", () => {
  loadInventory();
  checkExistingSession();
  initAuthForm();
  initAddProductForm();
});

function loadInventory() {
  const saved = localStorage.getItem("jma_products_catalog");
  if (saved) {
    try {
      let parsed = JSON.parse(saved);
      // Cleanse any old deprecated brands
      let needsSave = false;
      parsed = parsed.map(p => {
        if (p.brand && (p.brand.includes("Otsuka") || p.brand.includes("Claris") || p.brand.includes("Baxter"))) {
          p.brand = "Aculife";
          needsSave = true;
        }
        return p;
      });
      adminProducts = parsed;
      if (needsSave) saveInventory();
    } catch (e) {
      adminProducts = [...DEFAULT_PRODUCTS];
      saveInventory();
    }
  } else {
    adminProducts = [...DEFAULT_PRODUCTS];
    saveInventory();
  }
}

function saveInventory() {
  localStorage.setItem("jma_products_catalog", JSON.stringify(adminProducts));
}

function checkExistingSession() {
  const isUnlocked = sessionStorage.getItem("jma_admin_unlocked") === "true";
  if (isUnlocked) {
    showDashboard();
  } else {
    showAuth();
  }
}

function initAuthForm() {
  const submitBtn = document.getElementById("adminPinSubmit");
  const pinInput = document.getElementById("adminPinInput");
  const errorBox = document.getElementById("adminPinError");

  if (submitBtn && pinInput) {
    submitBtn.addEventListener("click", () => {
      const entered = pinInput.value.trim();
      if (entered === MASTER_PIN || entered === "admin") {
        sessionStorage.setItem("jma_admin_unlocked", "true");
        showDashboard();
        showToast("Welcome back! Staff access unlocked.", "success");
      } else {
        if (errorBox) {
          errorBox.textContent = "Invalid PIN. Default PIN is 1234.";
          errorBox.style.display = "block";
        }
        pinInput.focus();
      }
    });

    pinInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") submitBtn.click();
    });
  }
}

function showAuth() {
  const authSection = document.getElementById("adminAuthSection");
  const dashSection = document.getElementById("adminDashboardSection");
  const logoutBtn = document.getElementById("adminLogoutBtn");

  if (authSection) authSection.style.display = "block";
  if (dashSection) dashSection.style.display = "none";
  if (logoutBtn) logoutBtn.style.display = "none";
}

function showDashboard() {
  const authSection = document.getElementById("adminAuthSection");
  const dashSection = document.getElementById("adminDashboardSection");
  const logoutBtn = document.getElementById("adminLogoutBtn");

  if (authSection) authSection.style.display = "none";
  if (dashSection) dashSection.style.display = "block";
  if (logoutBtn) logoutBtn.style.display = "inline-flex";

  renderProductsTable();
}

window.adminLogout = function() {
  sessionStorage.removeItem("jma_admin_unlocked");
  showAuth();
  showToast("Admin session locked.");
};

function renderProductsTable() {
  const tbody = document.getElementById("adminProductsTableBody");
  const counter = document.getElementById("activeProdCounter");
  if (!tbody) return;

  if (counter) {
    counter.textContent = `${adminProducts.length} Products Active`;
  }

  tbody.innerHTML = adminProducts.map((p, idx) => `
    <tr>
      <td style="font-weight: 700; color: var(--text-light);">${idx + 1}</td>
      <td>
        <strong style="color: var(--text-main); font-size: 0.95rem;">${p.name}</strong><br>
        <small style="color: var(--text-muted);">${p.volume} • ${p.packaging}</small>
      </td>
      <td>
        <span class="spec-chip" style="font-weight: 700; color: var(--primary-dark);">${p.brand}</span>
      </td>
      <td>
        <span class="spec-chip">${p.categoryLabel || p.category}</span>
      </td>
      <td>
        <button onclick="toggleProductStock('${p.id}')" class="spec-chip" style="cursor: pointer; border: 1px solid ${p.inStock ? '#bbf7d0' : '#fecaca'}; background: ${p.inStock ? '#dcfce7' : '#fee2e2'}; color: ${p.inStock ? '#16a34a' : '#dc2626'}; font-weight: 700; padding: 0.35rem 0.75rem;">
          ${p.inStock ? '● In Stock' : '○ Out of Stock'}
        </button>
      </td>
      <td style="text-align: right;">
        <button class="btn btn-secondary" style="padding: 0.35rem 0.75rem; font-size: 0.8rem; color: var(--danger); border-color: #fecaca;" onclick="deleteProduct('${p.id}')">
          Delete
        </button>
      </td>
    </tr>
  `).join("");
}

window.toggleProductStock = function(productId) {
  const p = adminProducts.find(item => item.id === productId);
  if (p) {
    p.inStock = !p.inStock;
    saveInventory();
    renderProductsTable();
    showToast(`Updated stock status for ${p.name}`);
  }
};

window.deleteProduct = function(productId) {
  const p = adminProducts.find(item => item.id === productId);
  if (!p) return;

  if (confirm(`Are you sure you want to delete "${p.name}" from the live website?`)) {
    adminProducts = adminProducts.filter(item => item.id !== productId);
    saveInventory();
    renderProductsTable();
    showToast(`Removed "${p.name}" from catalog.`);
  }
};

window.restoreDefaults = function() {
  if (confirm("Reset catalog back to verified default wholesale inventory? This will restore standard items for Aculife, Puniska, Fresenius, and IHL.")) {
    adminProducts = [...DEFAULT_PRODUCTS];
    saveInventory();
    renderProductsTable();
    showToast("Catalog restored to default wholesale inventory.", "success");
  }
};

window.exportInventoryJSON = function() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(adminProducts, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `JMA_Inventory_Backup_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast("Inventory backup downloaded!", "success");
};

function initAddProductForm() {
  const form = document.getElementById("adminAddProductForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("newProdName").value.trim();
    const brand = document.getElementById("newProdBrand").value;
    const category = document.getElementById("newProdCategory").value;
    const volume = document.getElementById("newProdVolume").value.trim();
    const packaging = document.getElementById("newProdPackaging").value.trim();
    const inStock = document.getElementById("newProdStock").value === "true";
    const desc = document.getElementById("newProdDesc").value.trim();
    const imageChoice = document.getElementById("newProdImage").value;

    if (!name) {
      alert("Please enter a product title.");
      return;
    }

    const catLabels = {
      standard_iv: "Standard IV Fluid",
      nutrition: "Clinical Nutrition",
      sterile_water: "Sterile Solvents",
      specialty: "Specialty Infusion"
    };

    const newProd = {
      id: "prod-" + Date.now(),
      name: name,
      category: category,
      categoryLabel: catLabels[category] || "IV Fluid",
      brand: brand,
      volume: volume || "500 ml",
      packaging: packaging || "Standard Hospital Box",
      inStock: inStock,
      isFastMoving: true,
      image: imageChoice || "assets/images/iv-bottles.jpg",
      composition: desc,
      description: desc
    };

    adminProducts.unshift(newProd);
    saveInventory();
    renderProductsTable();
    form.reset();
    showToast(`Uploaded "${name}" successfully! It is now live on the website.`, "success");
  });
}

function showToast(message, type = "normal") {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type === "success" ? "success" : ""}`;
  toast.innerHTML = `
    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${type === 'success' ? 'M5 13l4 4L19 7' : 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'}" />
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
