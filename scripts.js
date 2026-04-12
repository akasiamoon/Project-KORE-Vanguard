let heartbeatInterval;

window.onload = function() {
    console.log("Observer active. Tap screen to authorize haptics.");
};

function engageSanctuary() {
    const layer = document.getElementById('somatic-layer');
    if (layer && !layer.classList.contains('active')) {
        layer.classList.add('active');
        startHeartbeat();
    }
}

function startHeartbeat() {
    if ("vibrate" in navigator) {
        console.log("Haptics: Triggering 60BPM pulse.");
        clearInterval(heartbeatInterval);
        
        // Initial "Handshake" pulse
        navigator.vibrate(300); 
        
        // Set the loop
        heartbeatInterval = setInterval(() => {
            navigator.vibrate(200); 
        }, 1000);
    } else {
        console.log("Haptics: Not supported by this browser.");
    }
}

function dismissHijack(event) {
    if (event) event.stopPropagation(); 
    const layer = document.getElementById('somatic-layer');
    if (layer) {
        layer.classList.remove('active');
        stopHeartbeat();
    }
}

function stopHeartbeat() {
    clearInterval(heartbeatInterval);
    if ("vibrate" in navigator) navigator.vibrate(0);
}

// THE TRIGGER: This now forces the vibration to start on your tap
function triggerSomaticHijack() {
    const layer = document.getElementById('somatic-layer');
    
    // On the first tap, we 'wake up' the vibration
    if ("vibrate" in navigator) navigator.vibrate(50); 
    
    if (layer) {
        if (!layer.classList.contains('active')) {
            engageSanctuary();
        }
    }
}
