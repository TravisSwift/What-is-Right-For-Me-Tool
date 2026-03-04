const steps = ['intro', 'choices', 'results', 'services', 'kits', 'business', 'installation', 'how'];

let currentStep = 0;
let userData = {
    address: '',
    choices: [],
    people: '',
    devices: '',
    kit: '',
    plan: '',
    promo: '',
    fee: ''
};

function nextStep(current, next) {
    document.getElementById(`step-${current}`).classList.remove('active');
    document.getElementById(`step-${next}`).classList.add('active');
    currentStep = steps.indexOf(next);
    updateProgress();
    saveData();
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

function submitQuiz() {
    userData.choices = [];
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => userData.choices.push(cb.value));

    if (userData.choices.length === 0) {
        alert('Please make more choices so we can make a recommendation.');
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

    let html = `<p>Recommended Kit: ${userData.kit}</p><p>Recommended Service: ${userData.plan}</p>`;
    html += '<p>200 Mbps and 100 Mbps services are available in limited areas.</p>';
    document.getElementById('recommendation').innerHTML = html;

    nextStep('choices', 'results');
}

function mockPromoCheck() {
    const address = document.getElementById('results-address').value || "your address";
    alert('In production: Check promotions for address: ' + address);
    document.getElementById('promo-result').innerHTML = '<p>Promotions checked (mock): $0 Kit Rental available!</p>';
}

function mockPromoCheckStandard() {
    const address = document.getElementById('standard-address').value || "your address";
    alert('In production: Check promotions for address: ' + address);
    document.getElementById('standard-promo-result').innerHTML = '<p>Promotions checked (mock): $0 Kit Rental available!</p>';
}

function mockPromoCheckMini() {
    const address = document.getElementById('mini-address').value || "your address";
    alert('In production: Check promotions for address: ' + address);
    document.getElementById('mini-promo-result').innerHTML = '<p>Promotions checked (mock): $0 Kit Rental available!</p>';
}

function mockAddressCheckResidential() {
    const address = document.getElementById('residential-address').value || "your address";
    alert('In production: Redirect to Starlink availability checker with address: ' + address);
    document.getElementById('residential-result').innerHTML = '<p>Availability checked (mock): Services available in your area!</p>';
}

function mockAddressCheckRoam() {
    const address = document.getElementById('roam-address').value || "your address";
    alert('In production: Redirect to Starlink availability checker with address: ' + address);
    document.getElementById('roam-result').innerHTML = '<p>Availability checked (mock): Services available in your area!</p>';
}

function placeOrder() {
    alert('Order simulated! In production: Redirect to cart with pre-filled options. Kit: ' + userData.kit + ', Plan: ' + userData.plan);
    console.log('Order clicked');
}

// Init
loadData();
updateProgress();

document.addEventListener('DOMContentLoaded', () => {
    // All buttons are wired in HTML
});