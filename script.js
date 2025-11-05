const display = document.getElementById('display');

function appendValue(value) {
    if (display.value === 'Error') {
        display.value = value;
    } else {
        display.value += value;
    }
    animateDisplay();
}

function clearDisplay() {
    display.value = '';
    animateDisplay();
}

function calculateResult() {
    try {
        const result = eval(display.value);

        if (!isFinite(result)) {
            display.value = 'Error';
        } else {
            display.value = parseFloat(result.toFixed(10));
        }
    } catch {
        display.value = 'Error';
    }
    animateDisplay();
}

function animateDisplay() {
    display.style.transform = 'scale(1.02)';
    setTimeout(() => {
        display.style.transform = 'scale(1)';
    }, 100);
}

// Ripple effect
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - 20;
        const y = e.clientY - rect.top - 20;
        
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 500);
    });
});

// Keyboard support
document.addEventListener('keydown', function(e) {
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
        appendValue(e.key);
    } else if (['+', '-', '*', '/'].includes(e.key)) {
        appendValue(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculateResult();
    } else if (['Escape', 'c', 'C'].includes(e.key)) {
        clearDisplay();
    } else if (e.key === 'Backspace') {
        display.value = display.value.slice(0, -1);
        animateDisplay();
    }
});
