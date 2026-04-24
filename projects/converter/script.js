document.addEventListener('DOMContentLoaded', () => {
    const usdInput = document.getElementById('usd-amount');
    const sarValue = document.getElementById('sar-value');
    const convertBtn = document.getElementById('convert-btn');
    
    const EXCHANGE_RATE = 3.75;

    function convert() {
        const usd = parseFloat(usdInput.value);
        
        if (isNaN(usd) || usd < 0) {
            sarValue.textContent = '0.00';
            return;
        }

        const sar = usd * EXCHANGE_RATE;
        
        // Dynamic update with a slight animation feel
        animateValue(sarValue, parseFloat(sarValue.textContent.replace(/,/g, '')), sar, 500);
    }

    // Real-time conversion
    usdInput.addEventListener('input', convert);

    // Button click conversion
    convertBtn.addEventListener('click', () => {
        convert();
        // Add a small feedback effect to the button
        convertBtn.classList.add('btn-clicked');
        setTimeout(() => convertBtn.classList.remove('btn-clicked'), 200);
    });

    // Simple counter animation for the result
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = progress * (end - start) + start;
            obj.innerHTML = current.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
});
