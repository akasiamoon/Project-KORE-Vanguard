let heartbeatInterval;

window.onload = function() {
    console.log("Observer active. Tap screen to authorize haptics and start the rhythm.");
};

function engageSanctuary() {
    const layer = document.getElementById('somatic-layer');
    const world = document.querySelector('.wayshrine-container');
    
    if (layer && !layer.classList.contains('active')) {
        layer.classList.add('active');
        if (world) world.classList.add('breathing'); // Start the visual breath
        startHeartbeat();
    }
}

function startHeartbeat() {
    if ("vibrate" in navigator) {
        clearInterval(heartbeatInterval);
        // Initial handshake
        navigator.vibrate(100);
        
        // Match the 4-second breath cycle (2 pulses per breath)
        heartbeatInterval = setInterval(() => {
            navigator.vibrate(150); 
        }, 1000);
    }
}

function dismissHijack(event) {
    if (event) event.stopPropagation(); 
    const layer = document.getElementById('somatic-layer');
    const world = document.querySelector('.wayshrine-container');
    
    if (layer) {
        layer.classList.remove('active');
        if (world) world.classList.remove('breathing'); // Stop the visual breath
        stopHeartbeat();
    }
}

function stopHeartbeat() {
    clearInterval(heartbeatInterval);
    if ("vibrate" in navigator) navigator.vibrate(0);
}

function triggerSomaticHijack() {
    const layer = document.getElementById('somatic-layer');
    if (layer && !layer.classList.contains('active')) {
        engageSanctuary();
    }
}
