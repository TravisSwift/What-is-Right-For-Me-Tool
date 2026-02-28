 // ... (all previous functions remain the same) ...

// New mock for Standard Gen 3 Kit promo
function mockPromoCheckStandard() {
    const address = document.getElementById('standard-address').value;
    alert('In production: Check promotions for address: ' + address);
    document.getElementById('standard-promo-result').innerHTML = '<p>Promotions checked (mock): $0 Kit Rental available!</p>';
}

// New mock for Mini Kit promo
function mockPromoCheckMini() {
    const address = document.getElementById('mini-address').value;
    alert('In production: Check promotions for address: ' + address);
    document.getElementById('mini-promo-result').innerHTML = '<p>Promotions checked (mock): $0 Kit Rental available!</p>';
}

// ... rest of script.js unchanged ...