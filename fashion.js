// Children Dimension Measurement Target Timestamps Reference Objects
const visualTimelineGuides = {
  chest: { start: 0, end: 6, title: "Anatomical Chest Girth Measurement", desc: "Wrap tape horizontally directly below arms spanning widest chest radius. Maintain one finger padding space for growth breathing room." },
  shoulder: { start: 7, end: 13, title: "Skeletol Shoulder Span Horizon", desc: "Align reference tape point crossways horizontally tracking from right bone tip edge spanning straight back line onto opposing bone boundary." },
  waist: { start: 14, end: 22, title: "Natural Loose Waist Perimeter", desc: "Position tracking alignment loop immediately floating horizontally above naval area level. Avoid pulling tight; children expand posture continuously." },
  height: { start: 23, end: 30, title: "Total Vertical Structural Length", desc: "Track dropped vertical orientation pointing downward beginning flat alongside neck shoulder joint connection directly onto baseline targeted lower ankle limits." }
};

let activeLoopIntervalId = null;
let temporaryStagedOutfit = null;

// Persistent Global Reactive Shopping Basket Model Array
let shoppingCartItems = [];

// Entry point initialization logic hooks
function launchMeasuringStudio(name, price) {
  temporaryStagedOutfit = { name, basePrice: price, timestampAdded: Date.now() };
  
  document.getElementById('activeOutfitTitle').innerText = `Bespoke Fit: ${name}`;
  document.getElementById('studioModal').classList.remove('hidden');
  
  // Pivot UI visibility layout explicitly onto data entry sub-wizard module view 
  document.getElementById('wizard-form-view').classList.remove('hidden');
  document.getElementById('wizard-checkout-view').classList.add('hidden');
  document.getElementById('wizard-tracking-view').classList.add('hidden');

  // Activate default background instructional reference clip instantly
  syncVideoGuide('chest');
}

function closeStudioModal() {
  document.getElementById('studioModal').classList.add('hidden');
  if (activeLoopIntervalId) clearInterval(activeLoopIntervalId);
}

// Loop Control Module Management Functions
function syncVideoGuide(metricKey) {
  const video = document.getElementById('guideVideo');
  const txtTitle = document.getElementById('videoInstructionTitle');
  const txtDesc = document.getElementById('videoInstructionDesc');
  const config = visualTimelineGuides[metricKey];

  if (!video || !config) return;
  if (activeLoopIntervalId) clearInterval(activeLoopIntervalId);

  txtTitle.innerText = config.title;
  txtDesc.innerText = config.desc;
  
  video.currentTime = config.start;
  video.play();

  activeLoopIntervalId = setInterval(() => {
    if (video.currentTime >= config.end || video.currentTime < config.start) {
      video.currentTime = config.start;
    }
  }, 250);
}

// Add Item and Apply Price Adjustment Logic
function processAddtoCart() {
  const chest = document.getElementById('m_chest').value;
  const shoulder = document.getElementById('m_shoulder').value;
  const waist = document.getElementById('m_waist').value;
  const height = document.getElementById('m_height').value;
  const errorCard = document.getElementById('formValidationError');

  if (!chest || !shoulder || !waist || !height) {
    errorCard.classList.remove('hidden');
    return;
  }
  errorCard.classList.add('hidden');

  // Map inputs directly into the item object
  const finishedCartObject = {
    ...temporaryStagedOutfit,
    ageClass: document.getElementById('child_age').value,
    fitType: document.getElementById('fit_type').value,
    metrics: { chest, shoulder, waist, height }
  };

  shoppingCartItems.push(finishedCartObject);
  updateGlobalCartUI();
  
  // Transition directly onto billing matrix presentation dashboard automatically
  renderCheckoutStageView();
}

function updateGlobalCartUI() {
  document.getElementById('cartCount').innerText = shoppingCartItems.length;
}

// Render Items and Apply Time-Based Price Changes
function renderCheckoutStageView() {
  const container = document.getElementById('cartItemsContainer');
  container.innerHTML = "";
  let aggregateCartSum = 0;

  shoppingCartItems.forEach((item, index) => {
    // CRITICAL REQUIREMENT LOGIC: Check time elapsed since product was configured.
    // If elapsed time passes a specific timeframe threshold (simulated here at 10 seconds for real-time testing), increase base price by 15%.
    const secondsElapsed = Math.floor((Date.now() - item.timestampAdded) / 1000);
    let finalAdjustedItemPrice = item.basePrice;
    let priceHikeAppliedIndicator = "";

    if (secondsElapsed > 10) { 
      finalAdjustedItemPrice = Math.floor(item.basePrice * 1.15); // 15% increase applied
      priceHikeAppliedIndicator = `<span class="text-[9px] bg-rose-500/20 text-rose-400 border border-rose-500/30 px-1.5 py-0.5 rounded uppercase font-bold">Price Updated (+15% Material Drift)</span>`;
    }

    aggregateCartSum += finalAdjustedItemPrice;

    container.innerHTML += `
      <div class="bg-neutral-950 border border-neutral-800 p-4 rounded-xl flex justify-between items-start">
        <div class="space-y-1">
          <h4 class="font-bold text-xs text-white">${item.name}</h4>
          <p class="text-[10px] text-neutral-500 font-mono uppercase">${item.ageClass} • ${item.fitType}</p>
          <div class="pt-1">${priceHikeAppliedIndicator}</div>
        </div>
        <span class="text-xs font-mono font-bold text-emerald-400">₦${finalAdjustedItemPrice.toLocaleString()}</span>
      </div>
    `;
  });

  document.getElementById('lbl_total_price').innerText = `₦${aggregateCartSum.toLocaleString()}`;

  // Swap wizard presentation sections panels visible routes maps values
  document.getElementById('wizard-form-view').classList.add('hidden');
  document.getElementById('wizard-checkout-view').classList.remove('hidden');
}

// Payment Simulation Layer
function executePaymentGatewaySim() {
  const payBtn = document.getElementById('btnPayment');
  payBtn.disabled = true;
  payBtn.innerHTML = "Processing Secured Order Assets Escrow...";

  setTimeout(() => {
    const generatedTrackingCode = "#507-" + Math.random().toString(36).substr(2, 6).toUpperCase();
    document.getElementById('lbl_track_id').innerText = generatedTrackingCode;

    document.getElementById('wizard-checkout-view').classList.add('hidden');
    document.getElementById('wizard-tracking-view').classList.remove('hidden');
    
    // Wipe shopping cart cleanly post operational execution fulfillment completions
    shoppingCartItems = [];
    updateGlobalCartUI();
  }, 2000);
}

// Global Cart Nav Trigger Override Entry mapping hooks logic shortcuts
document.getElementById('cartBtn').addEventListener('click', () => {
  if (shoppingCartItems.length === 0) {
    alert("Your 507 Brand custom styling cart is empty. Choose an item below to measure first.");
    return;
  }
  document.getElementById('studioModal').classList.remove('hidden');
  renderCheckoutStageView();
});
// ... (all your other existing event listeners are up here) ...

  // 3. Bind input field action listener triggers
  document.getElementById('m_neck').addEventListener('focus', () => syncVideoGuide('neck'));
  document.getElementById('m_shoulder').addEventListener('focus', () => syncVideoGuide('shoulder'));
  document.getElementById('m_chest').addEventListener('focus', () => syncVideoGuide('chest'));
  document.getElementById('m_length').addEventListener('focus', () => syncVideoGuide('length'));


  // ==========================================
  // PASTE THE NEW HAMBURGER MENU CODE HERE:
  // ==========================================
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const navLinksMenu = document.getElementById('navLinksMenu');

  menuToggleBtn.addEventListener('click', () => {
    navLinksMenu.classList.toggle('hidden');
  });

  const interiorLinks = navLinksMenu.querySelectorAll('a');
  interiorLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        navLinksMenu.classList.add('hidden');
      }
    });
  });
  // ==========================================


}); // <--- This is the absolute last line of your file. Leave this here!