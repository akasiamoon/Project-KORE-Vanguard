// Wait for the entire page to load, then wire up the button
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', initializeEngine);
        console.log("Button securely wired to the Engine.");
    } else {
        console.log("ERROR: Could not find the ENTER SANCTUARY button.");
    }
});
let heartbeatInterval;
let recognition; 
let isSanctuaryActive = false;

function initializeEngine() {
    console.log("KORE Engine Initializing...");

   // 1. PULL THE CURTAIN FIRST (So you never get stuck on the intro screen)
    const intro = document.getElementById('intro-screen');
    if (intro) {
        intro.classList.remove('active');
        
        // THE FIX: Wait 1 second for the fade, then annihilate the invisible wall
        setTimeout(() => {
            intro.style.display = 'none'; 
            console.log("Invisible wall destroyed. Wayshrine is now clickable.");
        }, 1000);
    }

    // 2. UNLOCK THE AUDIO & HAPTICS (Must happen exactly during the click)
    if ("vibrate" in navigator) navigator.vibrate(50); 
    
    const audio = document.getElementById('sanctuary-audio');
    if (audio) {
        // We tell the browser to play, then immediately pause it. 
        // This "authorizes" the audio to be used later without being blocked.
        audio.play().then(() => {
            audio.pause();
            console.log("Audio pipeline unlocked.");
        }).catch(err => console.log("Audio blocked by browser:", err));
    }

    // 3. PREPARE THE VOCAL TETHER (But don't start the mic just yet)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = false; // We use a manual loop
        recognition.interimResults = true;
        
        recognition.onresult = function(event) {
            let transcript = Array.from(event.results).map(r => r[0].transcript).join('').toLowerCase();
            if (transcript.includes("pax") || transcript.includes("safe")) {
                console.log("Vocal Tether Confirmed.");
                dismissHijack(); 
            }
        };

        recognition.onend = function() {
            // If sanctuary is still active, keep listening!
            if (isSanctuaryActive && recognition) {
                try { recognition.start(); } catch(e) {}
            }
        };
    } else {
        console.log("Web Speech API not supported on this specific browser.");
    }
}

function engageSanctuary() {
    const layer = document.getElementById('somatic-layer');
    const audio = document.getElementById('sanctuary-audio');
    
    if (layer && !layer.classList.contains('active')) {
        isSanctuaryActive = true;
        layer.classList.add('active');
        startHeartbeat();
        
        // Start the audio
        if (audio) {
            audio.volume = 0.5;
            audio.play();
        } 
        
        // THIS is where the browser will ask for Microphone permission!
        if (recognition) { 
            try { recognition.start(); } catch(e) { console.log("Mic start error", e); } 
        }
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
        
        if (audio) {
            audio.pause(); 
            audio.currentTime = 0; // Rewind the track
        }
        if (recognition) {
            try { recognition.stop(); } catch(e) {}
        }
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
