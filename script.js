 const steps = ['intro', 'choices', 'results', 'services', 'kits', 'business', 'installation'];
let currentStep = 0;
let userData = { address: '', choices: [], people: '', devices: '', kit: '', plan: '', promo: '', fee: '' };

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

// New function for quiz submit
function submitQuiz() {
    userData.choices = [];
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => userData.choices.push(checkbox.value));

    if (userData.choices.length === 0) {
        alert('You cannot provide results without making choices.');
        return;
    }

    // New logic as agreed
    let stationaryScore = 0;
    let mobileScore = 0;
    let isRoam = userData.choices.includes('roam');
    let isResidential = userData.choices.includes('residential');
    let isBusiness = userData.choices.includes('business');
    userData.choices.forEach(choice => {
        if (['work-from-home', 'video-calls', 'vpn', 'surfing'].includes(choice)) stationaryScore++;
        if (['school-from-home', 'gaming', 'streaming'].includes(choice)) mobileScore++;
    });

    if (isBusiness) {
        nextStep('choices', 'business');
        return;
    }

    // Service determination
    if (isRoam) {
        userData.plan = (mobileScore > 2) ? 'Roam Unlimited' : 'Roam 100GB';
        userData.kit = (mobileScore > stationaryScore) ? 'Mini Kit' : 'Standard Gen 3 Kit'; // Mini if more mobile, else Standard
        if (isResidential) {
            // Hybrid note
            document.getElementById('recommendation').innerHTML += '<p>Note: You selected both services. Standard Gen 3 Kit works for both; consider Residential base with Mini add-on for portability.</p>';
        }
    } else {
        userData.plan = 'Residential MAX';
        userData.kit = 'Standard Gen 3 Kit';
    }

    // People/devices as radios (assuming one selected or default to low)
    const peopleNum = userData.people === 'more' ? 5 : parseInt(userData.people || 1); // Default low if skipped
    const devicesNum = parseInt(userData.devices?.split('-')[0] || 1); // Default low

    if (peopleNum > 4 || devicesNum > 4) {
        if (userData.plan.includes('Residential')) userData.plan = 'Residential MAX';
        if (userData.plan.includes('Roam')) userData.plan = 'Roam Unlimited';
    }

    // Display recommendation
    let html = `<p>Recommended Kit: ${userData.kit}</p><p>Recommended Service: ${userData.plan}</p>`;
    html += '<p>200 Mbps and 100 Mbps services are available in limited areas. Not available in all areas. Enter your address to check availability.</p>';
    document.getElementById('recommendation').innerHTML = html;

    nextStep('choices', 'results');
}

// New mock for promo check
function mockPromoCheck() {
    const address = document.getElementById('results-address').value;
    alert('In production: Check promotions for address: ' + address);
    // Simulate result
    document.getElementById('promo-result').innerHTML = '<p>Promotions checked (mock): $0 Kit Rental available!</p>';
}

// New mock for residential address check
function mockAddressCheckResidential() {
    const address = document.getElementById('residential-address').value;
    alert('In production: Redirect to Starlink availability checker with address: ' + address);
    // Simulate result
    document.getElementById('residential-result').innerHTML = '<p>Availability checked (mock): Services available in your area!</p>';
}

// New mock for roam address check
function mockAddressCheckRoam() {
    const address = document.getElementById('roam-address').value;
    alert('In production: Redirect to Starlink availability checker with address: ' + address);
    // Simulate result
    document.getElementById('roam-result').innerHTML = '<p>Availability checked (mock): Services available in your area!</p>';
}

// New mock for kits promo check
function mockPromoCheckKits() {
    const address = document.getElementById('kits-address').value;
    alert('In production: Check promotions for address: ' + address);
    // Simulate result
    document.getElementById('kits-promo-result').innerHTML = '<p>Promotions checked (mock): $0 Kit Rental available!</p>';
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