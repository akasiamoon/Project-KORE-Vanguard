// 1. Wire the button on load
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', initializeEngine);
        console.log("✅ Button securely wired.");
    }
});

let heartbeatInterval;
let recognition; 
let isSanctuaryActive = false;
let synth = window.speechSynthesis; // THE NEW VOCAL ENGINE

// --- THE VOICE OF PAX ---
function paxSpeak(text, callback) {
    if (synth.speaking) {
        console.error("PAX is already speaking.");
        return;
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // We slow her down and drop the pitch to make her sound calming, ethereal, and safe
    utterance.rate = 0.85; 
    utterance.pitch = 0.9; 
    
    // Duck the background audio so PAX can be heard
    const audio = document.getElementById('sanctuary-audio');
    if (audio) audio.volume = 0.1; 

    utterance.onend = function (event) {
        // Bring the rain audio back up when she finishes speaking
        if (audio && isSanctuaryActive) audio.volume = 0.5;
        if (callback) callback();
    }

    synth.speak(utterance);
}

function initializeEngine() {
    console.log("🚀 KORE Engine Initializing...");

    const intro = document.getElementById('intro-screen');
    if (intro) {
        intro.classList.remove('active');
        setTimeout(() => { intro.style.display = 'none'; }, 1000);
    }

    if ("vibrate" in navigator) navigator.vibrate(50); 
    const audio = document.getElementById('sanctuary-audio');
    if (audio) audio.load(); 

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = false; 
        recognition.interimResults = false; // Changed to false so it waits for them to finish their sentence
        
        recognition.onstart = function() { console.log("🎙️ PAX IS LISTENING..."); };

        recognition.onresult = function(event) {
            let transcript = Array.from(event.results).map(r => r[0].transcript).join('').toLowerCase();
            console.log("🧠 Mic heard: ", transcript); 
            
            const vocalDisplay = document.getElementById('hud-vocal');

            // --- THE AI INTENT ROUTER ---
            if (transcript.includes("pax") || transcript.includes("safe") || transcript.includes("stop") || transcript.includes("good")) {
                if (vocalDisplay) vocalDisplay.innerHTML = "<span class='calm'>TETHER CONFIRMED.</span>";
                paxSpeak("Tether confirmed. I am with you. Logging your recovery.", () => {
                    dismissHijack(); 
                });
            } 
            else if (transcript.includes("stress") || transcript.includes("panic") || transcript.includes("bad") || transcript.includes("help") || transcript.includes("scared")) {
                if (vocalDisplay) vocalDisplay.innerHTML = "<span class='alert'>DISTRESS DETECTED.</span>";
                paxSpeak("I hear you. You are not alone. Breathe with my light.");
            }
            else if (transcript.includes("who are you") || transcript.includes("what are you")) {
                if (vocalDisplay) vocalDisplay.innerHTML = "<span class='calm'>IDENTITY QUERY.</span>";
                paxSpeak("I am PAX. Your cognitive sanctuary. We are safe here.");
            }
            else {
                if (vocalDisplay) vocalDisplay.innerHTML = "<span class='alert'>ANALYZING...</span>";
                paxSpeak("I am listening. Keep breathing.");
            }
        };

        recognition.onerror = function(event) { console.error("❌ MIC ERROR: ", event.error); };
        
        recognition.onend = function() {
            // Only restart listening if PAX isn't currently talking
            if (isSanctuaryActive && recognition && !synth.speaking) {
                try { recognition.start(); } catch(e) {}
            }
        };
    } else {
        console.error("❌ Web Speech API NOT supported on this browser.");
    }
}

function engageSanctuary() {
    const layer = document.getElementById('somatic-layer');
    const wayshrine = document.querySelector('.wayshrine-container'); 
    const audio = document.getElementById('sanctuary-audio');
    
    if (layer && !layer.classList.contains('active')) {
        isSanctuaryActive = true;
        layer.classList.add('active');
        if (wayshrine) wayshrine.classList.add('breathing'); 
        
        startHeartbeat();
        runTelemetrySimulation(); 
        
        if (audio) { audio.volume = 0.5; audio.play().catch(e => console.error(e)); } 
        
        // Wait a second for the visual transition, then have PAX greet them
        setTimeout(() => {
            paxSpeak("Sanctuary protocol engaged. Speak to me.", () => {
                if (recognition) { try { recognition.start(); } catch(e) {} }
            });
        }, 1500);
    }
}

function dismissHijack(event) {
    if (event) event.stopPropagation(); 
    const layer = document.getElementById('somatic-layer');
    const audio = document.getElementById('sanctuary-audio');
    const wayshrine = document.querySelector('.wayshrine-container');
    const summary = document.getElementById('session-summary'); 
    
    if (layer) {
        clearInterval(bpmInterval); 
        if (wayshrine) wayshrine.classList.remove('breathing');
        
        setTimeout(() => {
            isSanctuaryActive = false;
            layer.classList.remove('active');
            stopHeartbeat();
            
            if (audio) { audio.pause(); audio.currentTime = 0; }
            if (recognition) { try { recognition.stop(); } catch(e) {} }
            if (synth.speaking) synth.cancel(); // Stop her from talking if dismissed early
            
            if (summary) summary.classList.add('active');
            
        }, 1500);
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

function closeSummary() {
    const summary = document.getElementById('session-summary');
    if (summary) summary.classList.remove('active');
}

// Simulated Telemetry (Ensure this is in your script from earlier!)
let bpmInterval;
function runTelemetrySimulation() {
    const bpmDisplay = document.getElementById('hud-bpm');
    const statusDisplay = document.getElementById('hud-status');
    const vocalDisplay = document.getElementById('hud-vocal');
    
    let currentBPM = 118;
    if (bpmDisplay) { bpmDisplay.innerText = currentBPM; bpmDisplay.className = "alert"; }
    if (statusDisplay) { statusDisplay.innerText = "DETECTED"; statusDisplay.className = "alert"; }
    if (vocalDisplay) vocalDisplay.innerText = "LISTENING...";

    clearInterval(bpmInterval);
    bpmInterval = setInterval(() => {
        if (currentBPM > 60) {
            currentBPM -= Math.floor(Math.random() * 3) + 1; 
            if (bpmDisplay) bpmDisplay.innerText = currentBPM;
            if (currentBPM < 85 && bpmDisplay && bpmDisplay.className === "alert") {
                bpmDisplay.className = "calm";
                if (statusDisplay) { statusDisplay.innerText = "REGULATING"; statusDisplay.className = "calm"; }
            }
        } else {
            clearInterval(bpmInterval);
            if (statusDisplay) statusDisplay.innerText = "OPTIMAL";
        }
    }, 800);
}
