const steps = ['intro', 'choices', 'results', 'services', 'kits', 'business', 'installation'];
let currentStep = 0;
let userData = { address: '', choices: [], people: '', devices: '', kit: '', plan: '', promo: '', fee: '' };

function nextStep(current, next) {
    document.getElementById(`step-${current}`).classList.remove('active');
    document.getElementById(`step-${next}`).classList.add('active');
    currentStep = steps.indexOf(next);
    updateProgress();
    saveData();
    console.log(`Step completed: ${next}`);
}

function goToStep(step) {
    steps.forEach(s => {
        const el = document.getElementById(`step-${s}`);
        if (el) el.classList.remove('active');
    });
    const target = document.getElementById(`step-${step}`);
    if (target) {
        target.classList.add('active');
        currentStep = steps.indexOf(step);
        updateProgress();
    }
}

function updateProgress() {
    // No mobile dots
}

function saveData() {
    localStorage.setItem('starlinkData', JSON.stringify(userData));
}

function loadData() {
    const saved = localStorage.getItem('starlinkData');
    if (saved) userData = JSON.parse(saved);
}

// Quiz submit (Residential always wins unless "roam" is chosen)
function submitQuiz() {
    userData.choices = [];
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => userData.choices.push(cb.value));

    if (userData.choices.length === 0) {
        alert('You cannot provide results without making choices.');
        return;
    }

    const isRoam = userData.choices.includes('roam');
    const isBusiness = userData.choices.includes('business');

    if (isBusiness) {
        nextStep('choices', 'business');
        return;
    }

    let stationaryScore = 0;
    let mobileScore = 0;
    userData.choices.forEach(choice => {
        if (['residential', 'work-from-home', 'video-calls', 'vpn', 'surfing'].includes(choice)) stationaryScore++;
        if (['roam', 'school-from-home', 'gaming', 'streaming'].includes(choice)) mobileScore++;
    });

    if (isRoam) {
        userData.plan = (mobileScore > 2) ? 'Roam Unlimited' : 'Roam 100GB';
        userData.kit = (mobileScore > stationaryScore) ? 'Mini Kit' : 'Standard Gen 3 Kit';
    } else {
        userData.plan = 'Residential MAX';
        userData.kit = 'Standard Gen 3 Kit';
    }

    // Display
    let html = `<p>Recommended Kit: ${userData.kit}</p><p>Recommended Service: ${userData.plan}</p>`;
    html += '<p>200 Mbps and 100 Mbps services are available in limited areas. Not available in all areas. Enter your address to check availability.</p>';
    document.getElementById('recommendation').innerHTML = html;

    nextStep('choices', 'results');
}

// Mock functions (unchanged)
function mockPromoCheck() {
    const address = document.getElementById('results-address').value;
    alert('In production: Check promotions for address: ' + address);
    document.getElementById('promo-result').innerHTML = '<p>Promotions checked (mock): $0 Kit Rental available!</p>';
}

function mockPromoCheckStandard() {
    const address = document.getElementById('standard-address').value;
    alert('In production: Check promotions for address: ' + address);
    document.getElementById('standard-promo-result').innerHTML = '<p>Promotions checked (mock): $0 Kit Rental available!</p>';
}

function mockPromoCheckMini() {
    const address = document.getElementById('mini-address').value;
    alert('In production: Check promotions for address: ' + address);
    document.getElementById('mini-promo-result').innerHTML = '<p>Promotions checked (mock): $0 Kit Rental available!</p>';
}

function mockAddressCheck() {
    const address = document.getElementById('services-address').value;
    alert('In production: Redirect to Starlink availability checker with address: ' + address);
    document.getElementById('services-result').innerHTML = '<p>Availability checked (mock): Services available in your area!</p>';
}

function placeOrder() {
    alert('Order simulated! In production: Redirect to cart with pre-filled options. Kit: ' + userData.kit + ', Plan: ' + userData.plan);
    console.log('Order clicked');
}

// Init
loadData();
updateProgress();

document.addEventListener('DOMContentLoaded', () => {
    // All buttons are already wired in HTML
});