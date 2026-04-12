let heartbeatInterval;
let recognition; 
let isSanctuaryActive = false;

function initializeEngine() {
    console.log("KORE Engine Initializing...");
    if ("vibrate" in navigator) navigator.vibrate(50); // Haptic handshake

    // Speech Setup
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = false; // We will manually loop it so it doesn't crash
        recognition.interimResults = true;
        
        try { recognition.start(); setTimeout(() => recognition.stop(), 400); } catch(e) {}

        recognition.onresult = function(event) {
            let transcript = Array.from(event.results).map(r => r[0].transcript).join('').toLowerCase();
            if (transcript.includes("pax") || transcript.includes("safe")) {
                console.log("Vocal Tether Confirmed.");
                dismissHijack(); 
            }
        };

        // THE FIX: If the mic goes to sleep while sanctuary is active, wake it back up!
        recognition.onend = function() {
            if (isSanctuaryActive) {
                try { recognition.start(); } catch(e) {}
            }
        };
    }

    // Pull the Curtain
    const intro = document.getElementById('intro-screen');
    if (intro) intro.classList.remove('active');
}

function engageSanctuary() {
    const layer = document.getElementById('somatic-layer');
    const audio = document.getElementById('sanctuary-audio');
    
    if (layer && !layer.classList.contains('active')) {
        isSanctuaryActive = true;
        layer.classList.add('active');
        startHeartbeat();
        
        if (audio) { audio.volume = 0.5; audio.play(); } // Fade in audio
        if (recognition) { try { recognition.start(); } catch(e) {} } // Start listening
    }
}

function dismissHijack(event) {
    if (event) event.stopPropagation(); 
    const layer = document.getElementById('somatic-layer');
    const audio = document.getElementById('sanctuary-audio');
    
    if (layer) {
        isSanctuaryActive = false;
        layer.classList.remove('active');
        stopHeartbeat();
        
        if (audio) { audio.pause(); audio.currentTime = 0; } // Stop audio
        if (recognition) recognition.stop(); // Stop listening
    }
}

function startHeartbeat() {
    if ("vibrate" in navigator) {
        clearInterval(heartbeatInterval);
        navigator.vibrate(100);
        heartbeatInterval = setInterval(() => navigator.vibrate(150), 1000);
    }
}

function stopHeartbeat() {
    clearInterval(heartbeatInterval);
    if ("vibrate" in navigator) navigator.vibrate(0);
}

function triggerSomaticHijack() {
    if (!isSanctuaryActive) engageSanctuary();
}
