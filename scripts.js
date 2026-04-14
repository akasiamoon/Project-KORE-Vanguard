let synth = window.speechSynthesis;
let paxVoice = null;
let engineUnlocked = false;
let hapticInterval;

document.addEventListener('DOMContentLoaded', () => {
    const enterBtn = document.getElementById('enter-btn');
    if (enterBtn) {
        enterBtn.addEventListener('click', initializeEngine);
        console.log("✅ Hearth Portal Wired.");
    }
});

// --- 1. THE VOICE ENGINE ---
function loadPremiumVoices() {
    let voices = synth.getVoices();
    paxVoice = voices.find(v => v.name.includes("Google UK English Female")) || 
               voices.find(v => v.name.includes("Samantha")) || 
               voices[0]; 
}
loadPremiumVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadPremiumVoices;
}

function paxSpeak(text, callback) {
    if (synth.speaking) synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (paxVoice) utterance.voice = paxVoice;
    utterance.rate = 0.85; 
    utterance.pitch = 0.9; 
    
    if (callback) utterance.onend = callback;
    synth.speak(utterance);
}

// --- 2. THE TRIGGER (The Air-Lock & 3-Second Vacuum) ---
function initializeEngine() {
    if (engineUnlocked) return;
    engineUnlocked = true;

    // 1. Ignite the fire audio immediately
    const audio = document.getElementById('sanctuary-audio');
    if (audio) { 
        audio.volume = 0.2; 
        let playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => console.log("Browser blocked audio."));
        }
    }

    // 2. Fade out the luxury intro screen
    const intro = document.getElementById('intro-screen');
    if (intro) {
        intro.classList.add('hidden');
        setTimeout(() => { intro.style.display = 'none'; }, 1500); 
    }

    // 3. The 3-Second Vacuum before the strike
    setTimeout(executeHijack, 3000);
}

// --- 3. THE AUTOMATED HIJACK & LEDGER ---
function executeHijack() {
    // 1. Ignite Visual Breathing (pax.png and dark overlay)
    const hearth = document.querySelector('.hearth-container');
    if (hearth) hearth.classList.add('breathing'); 

    const layer = document.getElementById('somatic-layer');
    if (layer) layer.classList.add('active');

    // 2. Ignite Haptic Heartbeat (Mobile only - syncs with 4s CSS animation)
    if ("vibrate" in navigator) {
        navigator.vibrate([40, 60, 40]); 
        hapticInterval = setInterval(() => {
            navigator.vibrate([40, 60, 40]);
        }, 4000); 
    }

    // 3. PAX Drops the Genesis Ledger
    const genesisLedger = "Sovereignty established. Now, look at the reality of the Monopoly. Forty-two billion dollars a year. That is what the recovery industry generates while operating as a cartel of apathy. They treat the individual, and they abandon the family to the fallout. Right now, eighteen million children are living in the blast radius of substance use. They are not collateral damage. They are being groomed by trauma to become the industry's next generation of profit. When a facility discharges a volatile individual back into a low-income home with zero spousal lethality screening, the state calls it a successful discharge. We call it a negligent death sentence. Project KORE intervenes at the heartbeat. We deliver AAA-tier somatic regulation directly to the government-issued phones of the underserved. We disguise evidence-informed support as a Sovereign RPG. We bypass the stigma, we bridge the walls of the rehab, and we give a voice to negative stamina. And while we heal the family, our encrypted telemetry audits the very machines that abandoned them. We will make systemic apathy fund its own replacement. What you are looking at is a zero-day exploit in the behavioral health monopoly. It is the first of its kind in the world. The blueprint is live, and this exact transmission is being seeded to a highly classified list of systemic disruptors. But the Architect is not building a crowded table. She is only looking for the lethal few. Are you ready to claim your seat in the Guild... or should we pass the torch to the next target?";
    
    // Increase audio volume slightly during the manifesto
    const audio = document.getElementById('sanctuary-audio');
    if (audio) audio.volume = 0.5;

    paxSpeak(genesisLedger, () => {
        // Stop haptics when speaking finishes
        clearInterval(hapticInterval);
    });
}
