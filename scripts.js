// --- 1. INITIALIZATION & PORTAL LOGIC ---
let heartbeatInterval;
let isSanctuaryActive = false;

document.addEventListener('DOMContentLoaded', () => {
    const enterBtn = document.getElementById('enter-btn');
    if (enterBtn) {
        enterBtn.addEventListener('click', initializeEngine);
        console.log("✅ Hearth Portal Wired.");
    }
});

// --- 2. THE VOICE ENGINE ---
let synth = window.speechSynthesis; 
let paxVoice = null;

function loadPremiumVoices() {
    let voices = synth.getVoices();
    // Prioritizing high-quality English voices
    paxVoice = voices.find(v => v.name.includes("Google UK English Female")) || 
               voices.find(v => v.name.includes("Samantha")) || 
               voices[0]; 
}

loadPremiumVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadPremiumVoices;
}

function paxSpeak(text) {
    if (synth.speaking) synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (paxVoice) utterance.voice = paxVoice;
    utterance.rate = 0.85; 
    utterance.pitch = 0.9; 
    
    const audio = document.getElementById('sanctuary-audio');
    if (audio) audio.volume = 0.5; 

    // Kill the haptics once the transmission is complete
    utterance.onend = function() {
        clearInterval(heartbeatInterval);
        console.log("🏁 Transmission Concluded.");
    };

    synth.speak(utterance);
}

// --- 3. THE TRIGGER (Air-Lock & 3-Second Vacuum) ---
function initializeEngine() {
    const audio = document.getElementById('sanctuary-audio');
    if (audio) {
        audio.volume = 0.15; 
        let playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => console.log("Audio trigger failed: Browser policy."));
        }
    }

    const intro = document.getElementById('intro-screen');
    if (intro) {
        intro.classList.add('hidden');
        setTimeout(() => { intro.style.display = 'none'; }, 1500); 
    }

    // The silence before the strike
    setTimeout(engageSanctuary, 3000);
}

// --- 4. THE AUTOMATED DROP (The Public Utility Ledger) ---
function engageSanctuary() {
    const layer = document.getElementById('somatic-layer');
    const hearth = document.querySelector('.hearth-container'); 
    
    if (!isSanctuaryActive) {
        isSanctuaryActive = true;
        
        if (layer) layer.classList.add('active');
        if (hearth) hearth.classList.add('breathing'); 
        
        startHeartbeat();
        
        // THE FINALIZED GENESIS LEDGER
        const genesisLedger = `Sovereignty established. Now, look at the reality of the Monopoly. 
        Forty-two billion dollars a year. That is what the recovery industry generates while operating as a cartel of apathy. 
        They treat the individual, and they abandon the family to the fallout. Right now, eighteen million children are living in the blast radius of substance use. 
        They are not collateral damage. They are being groomed by trauma to become the industry's next generation of profit. 
        When a clinic charges fifty thousand dollars, drains a family's lifeline, and discharges a volatile individual back into a low-income home with zero spousal lethality screening, the state calls it a successful discharge. We call it a negligent death sentence. 
        Project KORE is a Non-Profit Sovereign Foundation. We do not answer to shareholders. We answer to the heartbeat. 
        We deliver AAA-tier somatic regulation directly to the government-issued phones of the underserved. We disguise evidence-informed support as a Sovereign RPG. We bypass the stigma, we bridge the walls of the rehab, and we give a voice to negative stamina. 
        Every heartbeat, every breath, and every decrypted fragment is protected by ENEE. Our End-to-End Encryption ensures that the sanctuary remains private, even from us. 
        And while we heal the family, our telemetry audits the very machines that abandoned them. We will make systemic apathy fund its own replacement. 
        What you are looking at is a zero-day exploit in the behavioral health monopoly. It is the first of its kind in the world. This is not a product; it is a Digital Public Utility. 
        And before you audit the code, understand its origin. This Engine was not built in a high-rise with seed capital. It was forged on a kitchen floor in the middle of the night, written in a Walmart notebook by an Architect who knows exactly what it costs to survive the system. 
        The blueprint is live, and this exact transmission is being seeded to a highly classified list of systemic disruptors. But the Architect is not building a crowded table. She is only looking for the lethal few. 
        Are you ready to claim your seat in the Guild... or should we pass the torch to the next target?`;
        
        paxSpeak(genesisLedger);function paxSpeak(text) {
    if (synth.speaking) synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (paxVoice) utterance.voice = paxVoice;
    utterance.rate = 0.85; 
    utterance.pitch = 0.9; 
    
    const audio = document.getElementById('sanctuary-audio');
    if (audio) audio.volume = 0.5;

    // --- THE TRANSITION AT THE END ---
    utterance.onend = function() {
        clearInterval(heartbeatInterval);
        if (audio) audio.volume = 0.15; // Fire drops to background levels
        
        // Bring in the Call to Action after a 2-second silent pause
        setTimeout(revealGuildCovenant, 2000);
    };

    synth.speak(utterance);
}

function revealGuildCovenant() {
    // We reuse your 'exit-screen' or create a clean overlay
    const exitScreen = document.getElementById('exit-screen');
    if (exitScreen) {
        exitScreen.style.display = 'flex';
        exitScreen.classList.remove('hidden');
        
        // Change the text to reflect the Guild choice
        const tagline = exitScreen.querySelector('.kore-tagline');
        if (tagline) {
            tagline.innerHTML = `
                <button class="sanctuary-btn" onclick="joinTheGuild()">CLAIM YOUR SEAT</button>
                <p style="font-size: 0.7rem; margin-top: 20px; opacity: 0.5; letter-spacing: 2px;">
                    OR REMAIN IN THE STATIC.
                </p>
            `;
        }
    }
}

function joinTheGuild() {
    // This opens their email and prepares the reply to the Ghost
    window.location.href = "mailto:architect@kore.foundation?subject=GUILD ADMITTANCE REQUEST&body=The Ledger has been decrypted. I am ready to discuss the blueprint.";
}
        
    }
}

function startHeartbeat() { 
    if ("vibrate" in navigator) { 
        clearInterval(heartbeatInterval); 
        // Syncing haptics to the 4s "Breathing" animation: (Thump-Thump... Pause)
        navigator.vibrate([40, 60, 40]);
        heartbeatInterval = setInterval(() => navigator.vibrate([40, 60, 40]), 4000); 
    } 
}

// --- 5. ARCHITECT'S FAILSAFE (E to Exit) ---
document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'e') {
        const exitScreen = document.getElementById('exit-screen');
        if(exitScreen) {
            exitScreen.style.display = 'flex'; 
            exitScreen.classList.remove('hidden'); 
        }
        setTimeout(() => {
            paxSpeak("The Old Road awaits.");
        }, 1000);
    }
});
