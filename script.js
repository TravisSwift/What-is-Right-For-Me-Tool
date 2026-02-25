 const steps = ['intro', 'choices', 'results', 'services', 'kits'];
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
    document.querySelectorAll('input[type="radio"]:checked').forEach(radio => userData.choices.push(radio.value));
    const surfingChecked = document.querySelector('input[value="surfing"]:checked');
    if (surfingChecked) userData.choices.push('surfing');

    if (userData.choices.length === 0) {
        alert('You cannot provide results without making choices.');
        return;
    }

    // Simple logic to recommend (based on counts)
    let stationaryScore = 0;
    let mobileScore = 0;
    userData.choices.forEach(choice => {
        if (['residential', 'work-from-home', 'video-calls', 'vpn', 'surfing'].includes(choice)) stationaryScore++;
        if (['roam', 'school-from-home', 'gaming', 'streaming'].includes(choice)) mobileScore++;
    });

    // Multipliers from radios (people/devices now radios)
    const peopleNum = userData.people === 'more' ? 5 : parseInt(userData.people || 0);
    const devicesNum = parseInt(userData.devices?.split('-')[0] || 0);

    if (peopleNum > 3 || devicesNum > 3) stationaryScore += 1; // Favor Residential for high usage

    if (stationaryScore > mobileScore) {
        userData.kit = 'Standard Gen 3 Kit';
        userData.plan = (peopleNum > 4 || devicesNum > 4) ? 'Residential MAX' : 'Residential Standard';
    } else if (mobileScore > stationaryScore) {
        userData.kit = 'Starlink Mini Kit'; // Mini only for Roam
        userData.plan = (mobileScore > 2) ? 'Roam Unlimited' : 'Roam 100GB';
    } else {
        userData.kit = 'Standard Gen 3 Kit'; // Versatile for both
        userData.plan = 'Roam Unlimited'; // Default to Roam if tie, but Gen 3
    }

    // Display recommendation
    let html = `<p>Recommended Kit: ${userData.kit}</p><p>Recommended Service: ${userData.plan}</p>`;
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

// New mock for services address check
function mockAddressCheck() {
    const address = document.getElementById('services-address').value;
    alert('In production: Redirect to Starlink availability checker with address: ' + address);
    // Simulate result
    document.getElementById('services-result').innerHTML = '<p>Availability checked (mock): Services available in your area!</p>';
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