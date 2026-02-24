const steps = ['intro', 'location', 'use-case', 'usage', 'equipment', 'installation', 'plan', 'summary'];
let currentStep = 0;
let userData = { address: '', useCase: '', usage: [], users: '', kit: '', plan: '', promo: '', fee: '' };

function nextStep(current, next) {
    document.getElementById(`step-${current}`).classList.remove('active');
    document.getElementById(`step-${next}`).classList.add('active');
    currentStep = steps.indexOf(next);
    updateProgress();
    saveData(); // Persist
    console.log(`Step completed: ${next}`); // Metric tracking demo
}

function goToStep(step) {
    steps.forEach(s => document.getElementById(`step-${s}`).classList.remove('active'));
    document.getElementById(`step-${step}`).classList.add('active');
    currentStep = steps.indexOf(step);
    updateProgress();
}

function updateProgress() {
    document.querySelectorAll('.progress li').forEach((li, i) => {
        li.classList.toggle('active', i <= currentStep);
        if (i === currentStep) li.querySelector('.rocket').style.transform = 'rotate(45deg)'; // Fun animation
    });

    // Update mobile progress dots
    let dotsHtml = '';
    steps.forEach((_, i) => {
        dotsHtml += `<div class="dot ${i <= currentStep ? 'active' : ''}"></div>`;
    });
    document.getElementById('mobile-steps').innerHTML = dotsHtml;
}

function saveData() {
    localStorage.setItem('starlinkData', JSON.stringify(userData));
}

function loadData() {
    const saved = localStorage.getItem('starlinkData');
    if (saved) userData = JSON.parse(saved);
}

function checkLocation() {
    userData.address = document.getElementById('address').value;
    let result = '';
    // Placeholder simulation
    const zip = userData.address.match(/\d{5}/)?.[0] || '';
    if (zip.startsWith('9')) { // Simulate high-demand
        userData.promo = 'No promo';
        userData.fee = '$100 Congestion Fee (one-time, for high-demand area—helps manage network)';
        result = 'High-demand area: Service available with fee. Plans from $80/month.';
    } else { // Low-demand
        userData.promo = '$0 Kit Rental (pay only shipping $20 + service)';
        userData.fee = 'No fee';
        result = 'Low-demand area: Service available with promo! Plans from $50/month.';
    }
    document.getElementById('location-result').innerHTML = `<p>${result}</p>`;
    nextStep('location', 'use-case');
}

// Event listeners for radios (show cards)
document.querySelectorAll('input[name="useCase"]').forEach(input => {
    input.addEventListener('change', (e) => {
        userData.useCase = e.target.value;
        document.getElementById('residential-card').style.display = e.target.value === 'residential' ? 'block' : 'none';
        document.getElementById('roam-card').style.display = e.target.value === 'roam' ? 'block' : 'none';
    });
});

// Usage next: Collect checkboxes
document.querySelectorAll('input[name="usage"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        userData.usage = Array.from(document.querySelectorAll('input[name="usage"]:checked')).map(c => c.value);
    });
});
document.getElementById('users').addEventListener('change', (e) => userData.users = e.target.value);

// Equipment recommendation
function generateEquipment() {
    let html = '';
    if (userData.useCase === 'residential') {
        userData.kit = 'Standard Gen 3 Kit ($349 or promo; 23.4x15x1.5in, 6.4lbs, Wi-Fi 6 up to 3200sq ft)';
        html = `<div class="card">Recommended: ${userData.kit}<span class="tooltip"><img src="images/info-icon.png" alt="Info" class="icon"><span class="tooltip-text">Versatile for home—better speeds.</span></span><img src="images/standard-dish.png" alt="Standard Kit"></div>`;
    } else {
        userData.kit = 'Starlink Mini Kit ($599, 12x10x1.5in, 2.5lbs, built-in router, portable)';
        html = `<div class="card">Recommended: ${userData.kit}<span class="tooltip"><img src="images/info-icon.png" alt="Info" class="icon"><span class="tooltip-text">Great for travel—connects anywhere.</span></span><img src="images/mini-kit.png" alt="Mini Kit"></div>`;
    }
    document.getElementById('equipment-cards').innerHTML = html;
}

// Plan recommendation
function generatePlans() {
    let html = '';
    let basePrice = userData.fee.includes('$100') ? 80 : 50; // Simulate based on location
    if (userData.useCase === 'residential') {
        const highUsage = userData.usage.includes('gaming') || userData.usage.includes('streaming') || userData.users === '6+';
        userData.plan = highUsage ? 'Residential MAX ($120/month, up to 400Mbps, unlimited)' : 'Residential Standard ($' + basePrice + '/month, 50-220Mbps, unlimited)';
        html = `<div class="card">Recommended Plan: ${userData.plan}<span class="tooltip"><img src="images/info-icon.png" alt="Info" class="icon"><span class="tooltip-text">No data caps; pause with Standby Mode ($20/month).</span></span></div>`;
    } else {
        const highUsage = userData.usage.length > 2;
        userData.plan = highUsage ? 'Roam Unlimited ($165/month, unlimited, in-motion OK)' : 'Roam 100GB ($50/month, then low-speed)';
        html = `<div class="card">Recommended Plan: ${userData.plan}<span class="tooltip"><img src="images/info-icon.png" alt="Info" class="icon"><span class="tooltip-text">Gaming on Roam: Playable (20-50ms), but spikes possible—fine for casual.</span></span></div>`;
    }
    document.getElementById('plan-cards').innerHTML = html;
}

// Summary
function generateSummary() {
    let html = `<p>Your Fit: ${userData.useCase.toUpperCase()} with ${userData.kit} and ${userData.plan}.</p>
                <p>Promo/Fee: ${userData.promo} | ${userData.fee}</p>
                <p>Total Est: Kit + Shipping + Service (30-day trial—risk-free!)</p>
                <p>Hesitations? Speeds reliable, weather OK, support 24/7 via app.</p>`;
    document.getElementById('summary-content').innerHTML = html;
}

function placeOrder() {
    alert('Order simulated! In production: Redirect to cart with pre-filled options. Kit: ' + userData.kit + ', Plan: ' + userData.plan);
    console.log('Order clicked'); // Metric demo
}

// Init
loadData();
updateProgress();

// Generate on step entry (for persistence)
document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners if needed, but most are already set
});