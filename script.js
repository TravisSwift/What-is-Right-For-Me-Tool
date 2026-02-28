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
    steps.forEach(s => document.getElementById(`step-${s}`).classList.remove('active'));
    document.getElementById(`step-${step}`).classList.add('active');
    currentStep = steps.indexOf(step);
    updateProgress();
}

function updateProgress() {
    document.querySelectorAll('.progress li').forEach((li, i) => {
        li.classList.toggle('active', i <= currentStep);
        if (i === currentStep && li.querySelector('.rocket')) {
            li.querySelector('.rocket').style.transform = 'rotate(45deg)';
        }
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

// Quiz submit with updated logic
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

    // Service & Kit logic (Residential always outweighs Roam unless "roam" is explicitly chosen)
    if (isRoam) {
        userData.plan = (mobileScore > 2) ? 'Roam Unlimited' : 'Roam 100GB';
        userData.kit = (mobileScore > stationaryScore) ? 'Mini Kit' : 'Standard Gen 3 Kit';
    } else {
        userData.plan = 'Residential MAX';
        userData.kit = 'Standard Gen 3 Kit';
    }

    // People / Devices (default low if skipped)
    const peopleNum = userData.people === 'more' ? 5 : parseInt(userData.people || 1);
    const devicesNum = parseInt(userData.devices?.split('-')[0] || 1);

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

// Mock promo checks
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

function mockPromoCheckKits() {
    const address = document.getElementById('kits-address').value;
    alert('In production: Check promotions for address: ' + address);
    document.getElementById('kits-promo-result').innerHTML = '<p>Promotions checked (mock): $0 Kit Rental available!</p>';
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
    // Event listeners already attached in HTML
});