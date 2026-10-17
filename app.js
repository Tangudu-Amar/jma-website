/**
 * Jyoti Medical Agencies (JMA) - Web Application Logic
 * Wholesale Distributor of IV Fluids & Essential Medical Supplies
 * Visakhapatnam, Andhra Pradesh
 */

// Default wholesale product inventory (preloaded based on authentic medical formulations)
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

// App State
const state = {
  products: [],
  quotationCart: [],
  searchQuery: "",
  activeCategory: "all",
  activeBrand: "all",
  adminPin: "1234",
  isAdminUnlocked: false
};

// Target Contact Configurations (As specified by user)
const CONTACT_CONFIG = {
  phonePrimary: "9951493384",
  phoneSecondary: "7268846884",
  whatsappNumber: "919951493384",
  email: "jyotimedage5991@gmail.com",
  agencyName: "Jyoti Medical Agencies",
  address: "Akkayapalem, Visakhapatnam, Andhra Pradesh – 530016",
  googleMapsUrl: "https://www.google.com/maps/place/Jyoti+Medical+Agencies/@17.7297207,83.2939815,17z/data=!3m1!4b1!4m6!3m5!1s0x3a3943ee9ac21463:0xe2f68cf4af89c138!8m2!3d17.7297207!4d83.2965564!16s%2Fg%2F11sfrq2xjh",
  googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Jyoti+Medical+Agencies+Akkayapalem+Visakhapatnam"
};

// DOM Content Loaded Handler
document.addEventListener("DOMContentLoaded", () => {
  initStorage();
  initNavigation();
  initCatalogFilters();
  initQuotationCartUI();
  initModals();
  initDirectEnquiryForm();
  renderProducts();
});

/**
 * Initialize Storage with default products or existing saved state
 */
function initStorage() {
  const saved = localStorage.getItem("jma_products_catalog");
  if (saved) {
    try {
      let parsed = JSON.parse(saved);
      let needsSave = false;
      parsed = parsed.map(p => {
        if (p.brand && (p.brand.includes("Otsuka") || p.brand.includes("Claris") || p.brand.includes("Baxter"))) {
          p.brand = "Aculife";
          needsSave = true;
        }
        return p;
      });
      state.products = parsed;
      if (needsSave) saveProductsToStorage();
    } catch (e) {
      console.error("Could not parse saved products, resetting to defaults", e);
      state.products = [...DEFAULT_PRODUCTS];
      saveProductsToStorage();
    }
  } else {
    state.products = [...DEFAULT_PRODUCTS];
    saveProductsToStorage();
  }

  // Load quotation cart if any
  const savedCart = localStorage.getItem("jma_quotation_cart");
  if (savedCart) {
    try {
      state.quotationCart = JSON.parse(savedCart);
    } catch (e) {
      state.quotationCart = [];
    }
  }
}

function saveProductsToStorage() {
  localStorage.setItem("jma_products_catalog", JSON.stringify(state.products));
}

function saveCartToStorage() {
  localStorage.setItem("jma_quotation_cart", JSON.stringify(state.quotationCart));
}

/**
 * Navigation and Mobile Menu
 */
function initNavigation() {
  const mobileToggle = document.getElementById("mobileMenuBtn");
  const navMenu = document.getElementById("navMenu");

  if (mobileToggle && navMenu) {
    // Toggle open/close with animated icon
    mobileToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle("open");
      mobileToggle.textContent = isOpen ? "✕" : "☰";
      mobileToggle.setAttribute("aria-expanded", isOpen);
      // Prevent body scroll when nav is open
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // Close menu when clicking nav links
    navMenu.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        mobileToggle.textContent = "☰";
        mobileToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });

    // Close when clicking outside the nav
    document.addEventListener("click", (e) => {
      if (navMenu.classList.contains("open") &&
          !navMenu.contains(e.target) &&
          !mobileToggle.contains(e.target)) {
        navMenu.classList.remove("open");
        mobileToggle.textContent = "☰";
        mobileToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });

    // Close nav on resize to desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        navMenu.classList.remove("open");
        mobileToggle.textContent = "☰";
        document.body.style.overflow = "";
      }
    });
  }

  // Smooth scroll helper with sticky header offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId !== "#") {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerEl = document.querySelector(".main-header");
          const headerHeight = headerEl ? headerEl.offsetHeight : 70;
          const targetTop = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
          window.scrollTo({ top: targetTop, behavior: "smooth" });
        }
      }
    });
  });
}

/**
 * Filter & Search handlers
 */
function initCatalogFilters() {
  const searchInput = document.getElementById("catalogSearch");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value.trim().toLowerCase();
      renderProducts();
    });
  }

  const categoryPills = document.querySelectorAll(".filter-pill[data-category]");
  categoryPills.forEach(pill => {
    pill.addEventListener("click", () => {
      categoryPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      state.activeCategory = pill.getAttribute("data-category");
      renderProducts();
    });
  });

  const brandSelect = document.getElementById("brandFilter");
  if (brandSelect) {
    brandSelect.addEventListener("change", (e) => {
      state.activeBrand = e.target.value;
      renderProducts();
    });
  }
}

/**
 * Render the Product Grid based on current filters and state
 */
function renderProducts() {
  const grid = document.getElementById("productsGrid");
  const countDisplay = document.getElementById("catalogCount");
  if (!grid) return;

  const filtered = state.products.filter(item => {
    // Category match
    const matchCategory = (state.activeCategory === "all" || item.category === state.activeCategory);
    
    // Brand match
    const matchBrand = (state.activeBrand === "all" || item.brand === state.activeBrand);

    // Search query match (name, composition, brand, volume)
    const matchSearch = !state.searchQuery || 
      item.name.toLowerCase().includes(state.searchQuery) ||
      (item.brand && item.brand.toLowerCase().includes(state.searchQuery)) ||
      (item.composition && item.composition.toLowerCase().includes(state.searchQuery)) ||
      (item.volume && item.volume.toLowerCase().includes(state.searchQuery));

    return matchCategory && matchBrand && matchSearch;
  });

  if (countDisplay) {
    countDisplay.innerHTML = `Showing <strong>${filtered.length}</strong> of <strong>${state.products.length}</strong> products available`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="catalog-empty">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
        <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">No matching medical supplies found</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.25rem;">Try adjusting your search terms or filter criteria.</p>
        <button class="btn btn-secondary" onclick="resetCatalogFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => {
    const isItemInCart = state.quotationCart.some(c => c.productId === item.id);
    const cartItem = state.quotationCart.find(c => c.productId === item.id);
    const currentQty = cartItem ? cartItem.quantity : 1;

    return `
      <div class="product-card" id="card-${item.id}">
        <div class="product-card-top">
          <img src="${item.image || 'assets/images/iv-bottles.jpg'}" alt="${item.name}" loading="lazy" onerror="this.src='assets/images/iv-bottles.jpg'">
          <div class="product-badge-group">
            <span class="badge-stock ${item.inStock ? '' : 'limited'}">${item.inStock ? 'Ready Stock' : 'Call for Stock'}</span>
            <span class="badge-brand">${item.brand}</span>
          </div>
        </div>

        <div class="product-card-body">
          <span class="product-cat">${item.categoryLabel || 'IV Solution'}</span>
          <h3 class="product-name">${item.name}</h3>
          
          <div class="product-specs">
            <span class="spec-chip">📦 ${item.volume}</span>
            <span class="spec-chip">${item.packaging}</span>
          </div>

          <p class="product-desc">${item.description || item.composition || ''}</p>

          <div class="product-card-footer">
            <div class="qty-control" title="Adjust wholesale boxes/units">
              <button class="qty-btn" onclick="stepCardQty('${item.id}', -1)" aria-label="Decrease quantity">-</button>
              <input type="number" id="qty-${item.id}" class="qty-input" value="${currentQty}" min="1" max="999" onchange="validateCardQty('${item.id}')">
              <button class="qty-btn" onclick="stepCardQty('${item.id}', 1)" aria-label="Increase quantity">+</button>
            </div>

            <div class="product-action-btns">
              <button class="btn ${isItemInCart ? 'btn-secondary' : 'btn-primary'}" onclick="toggleQuotationItem('${item.id}')" title="Add to quotation list">
                <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${isItemInCart ? 'M5 13l4 4L19 7' : 'M12 4v16m8-8H4'}" /></svg>
                ${isItemInCart ? 'In Quote' : 'Add to Quote'}
              </button>

              <button class="btn btn-whatsapp" onclick="quickProductQuote('${item.id}')" title="Get direct quotation on WhatsApp/Email">
                Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

window.resetCatalogFilters = function() {
  state.searchQuery = "";
  state.activeCategory = "all";
  state.activeBrand = "all";
  const searchInput = document.getElementById("catalogSearch");
  if (searchInput) searchInput.value = "";
  const brandSelect = document.getElementById("brandFilter");
  if (brandSelect) brandSelect.value = "all";
  document.querySelectorAll(".filter-pill[data-category]").forEach(p => {
    if (p.getAttribute("data-category") === "all") p.classList.add("active");
    else p.classList.remove("active");
  });
  renderProducts();
};

window.stepCardQty = function(productId, delta) {
  const input = document.getElementById(`qty-${productId}`);
  if (!input) return;
  let val = parseInt(input.value) || 1;
  val = Math.max(1, val + delta);
  input.value = val;

  // If item is already in cart, update cart quantity
  const cartItem = state.quotationCart.find(c => c.productId === productId);
  if (cartItem) {
    cartItem.quantity = val;
    saveCartToStorage();
    updateQuotationUI();
  }
};

window.validateCardQty = function(productId) {
  const input = document.getElementById(`qty-${productId}`);
  if (!input) return;
  let val = parseInt(input.value) || 1;
  if (val < 1) val = 1;
  input.value = val;

  const cartItem = state.quotationCart.find(c => c.productId === productId);
  if (cartItem) {
    cartItem.quantity = val;
    saveCartToStorage();
    updateQuotationUI();
  }
};

/**
 * Quotation Cart Logic
 */
window.toggleQuotationItem = function(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  const existingIdx = state.quotationCart.findIndex(c => c.productId === productId);
  const qtyInput = document.getElementById(`qty-${productId}`);
  const qty = qtyInput ? (parseInt(qtyInput.value) || 1) : 1;

  if (existingIdx >= 0) {
    // Remove from cart
    state.quotationCart.splice(existingIdx, 1);
    showToast(`Removed "${product.name}" from quotation list`);
  } else {
    // Add to cart
    state.quotationCart.push({
      productId: product.id,
      name: product.name,
      brand: product.brand,
      volume: product.volume,
      packaging: product.packaging,
      quantity: qty
    });
    showToast(`Added "${product.name}" (${qty} units) to quotation list!`, "success");
  }

  saveCartToStorage();
  updateQuotationUI();
  renderProducts();
};

window.quickProductQuote = function(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  const qtyInput = document.getElementById(`qty-${productId}`);
  const qty = qtyInput ? (parseInt(qtyInput.value) || 1) : 1;

  // Ensure item is in quotation list
  const existing = state.quotationCart.find(c => c.productId === productId);
  if (existing) {
    existing.quantity = qty;
  } else {
    state.quotationCart.push({
      productId: product.id,
      name: product.name,
      brand: product.brand,
      volume: product.volume,
      packaging: product.packaging,
      quantity: qty
    });
  }
  saveCartToStorage();
  updateQuotationUI();
  renderProducts();

  // Open the quotation modal directly
  openQuotationModal();
};

function initQuotationCartUI() {
  updateQuotationUI();
}

function updateQuotationUI() {
  const countBadges = document.querySelectorAll(".cart-count-badge");
  const floatingBar = document.getElementById("floatingQuoteBar");
  const floatingBadge = document.getElementById("floatingQuoteBadge");
  const floatingText = document.getElementById("floatingQuoteText");

  const totalItems = state.quotationCart.length;

  countBadges.forEach(badge => {
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? "inline-flex" : "none";
  });

  if (floatingBar) {
    if (totalItems > 0) {
      floatingBar.classList.add("visible");
      if (floatingBadge) floatingBadge.textContent = totalItems;
      if (floatingText) floatingText.textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'items'} selected for quotation`;
    } else {
      floatingBar.classList.remove("visible");
    }
  }

  renderQuotationModalItems();
}

/**
 * Generate formatted quotation message text matching the user's prompt:
 * "I would like to get quotation please do send for the following products"
 */
function buildQuotationMessage(institution = "", contactName = "", location = "", notes = "") {
  let message = "I would like to get quotation please do send for the following products:\n\n";

  if (state.quotationCart.length === 0) {
    message += "- General wholesale inquiry for IV fluids (NS, RL, DNS, D5, TNA, Sterile Water).\n";
  } else {
    state.quotationCart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.brand}) - Size: ${item.volume} | Packaging: ${item.packaging} | Requested Qty: ${item.quantity} boxes/units\n`;
    });
  }

  message += `\n--- Healthcare Institution / Hospital Details ---\n`;
  message += `Institution / Hospital: ${institution || "Hospital / Clinic Inquiry"}\n`;
  message += `Contact Person: ${contactName || "Procurement / Purchase Department"}\n`;
  message += `Delivery Location: ${location || "Visakhapatnam, Andhra Pradesh"}\n`;
  if (notes) {
    message += `Requirement Notes: ${notes}\n`;
  }
  message += `\nThank you,\nSent via Jyoti Medical Agencies Portal (Akkayapalem, Vizag)`;

  return message;
}

/**
 * Render items inside the quotation modal
 */
function renderQuotationModalItems() {
  const list = document.getElementById("quoteModalItemsList");
  const previewBox = document.getElementById("quotePreviewText");
  if (!list) return;

  if (state.quotationCart.length === 0) {
    list.innerHTML = `
      <div style="padding: 1rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
        No products added yet. You can still send a general quotation request or browse products to add!
      </div>
    `;
  } else {
    list.innerHTML = state.quotationCart.map((item, idx) => `
      <div class="quote-item-row">
        <div>
          <div class="quote-item-title">${item.name}</div>
          <div class="quote-item-sub">${item.brand} • ${item.volume} • Qty: <strong>${item.quantity}</strong></div>
        </div>
        <button class="quote-item-remove" onclick="removeCartItem('${item.productId}')" title="Remove item">
          Remove
        </button>
      </div>
    `).join("");
  }

  // Update live preview text
  if (previewBox) {
    const inst = document.getElementById("quoteModalHospital") ? document.getElementById("quoteModalHospital").value : "";
    const name = document.getElementById("quoteModalContact") ? document.getElementById("quoteModalContact").value : "";
    const loc = document.getElementById("quoteModalLocation") ? document.getElementById("quoteModalLocation").value : "";
    const notes = document.getElementById("quoteModalNotes") ? document.getElementById("quoteModalNotes").value : "";
    previewBox.textContent = buildQuotationMessage(inst, name, loc, notes);
  }
}

window.removeCartItem = function(productId) {
  state.quotationCart = state.quotationCart.filter(c => c.productId !== productId);
  saveCartToStorage();
  updateQuotationUI();
  renderProducts();
};

window.clearAllQuotation = function() {
  if (confirm("Are you sure you want to clear your quotation list?")) {
    state.quotationCart = [];
    saveCartToStorage();
    updateQuotationUI();
    renderProducts();
    showToast("Quotation list cleared.");
  }
};

/**
 * Redirection Actions for WhatsApp and Email
 */
window.sendQuotationWhatsApp = function() {
  const inst = document.getElementById("quoteModalHospital") ? document.getElementById("quoteModalHospital").value.trim() : "";
  const name = document.getElementById("quoteModalContact") ? document.getElementById("quoteModalContact").value.trim() : "";
  const loc = document.getElementById("quoteModalLocation") ? document.getElementById("quoteModalLocation").value.trim() : "";
  const notes = document.getElementById("quoteModalNotes") ? document.getElementById("quoteModalNotes").value.trim() : "";

  const text = buildQuotationMessage(inst, name, loc, notes);
  const encodedText = encodeURIComponent(text);
  const waUrl = `https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${encodedText}`;

  // Open WhatsApp in new tab
  window.open(waUrl, "_blank");
  showToast("Redirecting to WhatsApp with quotation message...", "success");
};

window.sendQuotationEmail = function() {
  const inst = document.getElementById("quoteModalHospital") ? document.getElementById("quoteModalHospital").value.trim() : "";
  const name = document.getElementById("quoteModalContact") ? document.getElementById("quoteModalContact").value.trim() : "";
  const loc = document.getElementById("quoteModalLocation") ? document.getElementById("quoteModalLocation").value.trim() : "";
  const notes = document.getElementById("quoteModalNotes") ? document.getElementById("quoteModalNotes").value.trim() : "";

  const text = buildQuotationMessage(inst, name, loc, notes);
  const subject = encodeURIComponent(`Wholesale Quotation Request - ${inst || "Healthcare Institution"} (Jyoti Medical Agencies)`);
  const body = encodeURIComponent(text);
  const mailUrl = `mailto:${CONTACT_CONFIG.email}?subject=${subject}&body=${body}`;

  // Redirect to email client
  window.location.href = mailUrl;
  showToast("Opening Email client with quotation...", "success");
};

window.copyQuotationText = function() {
  const inst = document.getElementById("quoteModalHospital") ? document.getElementById("quoteModalHospital").value.trim() : "";
  const name = document.getElementById("quoteModalContact") ? document.getElementById("quoteModalContact").value.trim() : "";
  const loc = document.getElementById("quoteModalLocation") ? document.getElementById("quoteModalLocation").value.trim() : "";
  const notes = document.getElementById("quoteModalNotes") ? document.getElementById("quoteModalNotes").value.trim() : "";

  const text = buildQuotationMessage(inst, name, loc, notes);
  navigator.clipboard.writeText(text).then(() => {
    showToast("Quotation text copied to clipboard!", "success");
  }).catch(() => {
    showToast("Please manually copy the preview text.");
  });
};

/**
 * Direct Enquiry Form on the Page (Contact Section)
 */
function initDirectEnquiryForm() {
  const form = document.getElementById("directEnquiryForm");
  if (!form) return;

  const btnWA = document.getElementById("btnDirectWhatsApp");
  const btnEmail = document.getElementById("btnDirectEmail");

  const getFormMessage = () => {
    const institution = document.getElementById("directHospital") ? document.getElementById("directHospital").value.trim() : "";
    const contact = document.getElementById("directContact") ? document.getElementById("directContact").value.trim() : "";
    const phone = document.getElementById("directPhone") ? document.getElementById("directPhone").value.trim() : "";
    const category = document.getElementById("directCategory") ? document.getElementById("directCategory").value : "";
    const notes = document.getElementById("directMessage") ? document.getElementById("directMessage").value.trim() : "";

    let text = "I would like to get quotation please do send for the following products:\n";
    text += `- Product Category/Requirement: ${category || 'IV Fluids & Essential Medical Supplies'}\n`;
    if (notes) text += `- Specific Products/Quantities: ${notes}\n`;
    text += `\n--- Healthcare Institution Details ---\n`;
    text += `Hospital / Institution: ${institution || 'Not specified'}\n`;
    text += `Contact Person: ${contact || 'Purchase Manager'}\n`;
    text += `Phone Number: ${phone || 'Not specified'}\n`;
    text += `Location: Visakhapatnam / Andhra Pradesh\n`;
    return text;
  };

  if (btnWA) {
    btnWA.addEventListener("click", (e) => {
      e.preventDefault();
      const text = getFormMessage();
      const waUrl = `https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
      window.open(waUrl, "_blank");
    });
  }

  if (btnEmail) {
    btnEmail.addEventListener("click", (e) => {
      e.preventDefault();
      const text = getFormMessage();
      const subject = encodeURIComponent("Wholesale Medical Supplies Quotation Request - Jyoti Medical Agencies");
      const mailUrl = `mailto:${CONTACT_CONFIG.email}?subject=${subject}&body=${encodeURIComponent(text)}`;
      window.location.href = mailUrl;
    });
  }
}

/**
 * Modals Initialization
 */
function initModals() {
  const quoteModal = document.getElementById("quotationModal");
  const adminModal = document.getElementById("adminModal");

  // Close buttons
  document.querySelectorAll(".modal-close-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (quoteModal) quoteModal.classList.remove("active");
      if (adminModal) adminModal.classList.remove("active");
    });
  });

  // Close on backdrop click
  [quoteModal, adminModal].forEach(modal => {
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("active");
        }
      });
    }
  });

  // Modal form inputs live preview updater
  ["quoteModalHospital", "quoteModalContact", "quoteModalLocation", "quoteModalNotes"].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", renderQuotationModalItems);
    }
  });
}

window.openQuotationModal = function() {
  const modal = document.getElementById("quotationModal");
  if (modal) {
    modal.classList.add("active");
    renderQuotationModalItems();
  }
};

window.closeQuotationModal = function() {
  const modal = document.getElementById("quotationModal");
  if (modal) modal.classList.remove("active");
};

/**
 * Toast Notification Utility
 */
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

  // Trigger animation
  setTimeout(() => toast.classList.add("show"), 10);

  // Auto remove after 3.5s
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
