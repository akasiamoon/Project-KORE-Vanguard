let heartbeatInterval;
let isSanctuaryActive = false;
let engineUnlocked = false;

document.addEventListener('DOMContentLoaded', () => {
    console.log("KORE // Engine Staged.");
    const enterBtn = document.getElementById('enter-btn');
    if (enterBtn) {
        enterBtn.onclick = () => {
            console.log("🚀 User Handshake Initiated.");
            initializeEngine();
        };
    }
});

let synth = window.speechSynthesis; 

function paxSpeak(text) {
    console.log("🎤 Attempting to speak...");
    if (synth.speaking) {
        console.log("⚠️ Interrupting current speech.");
        synth.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Simplified Voice Selection: Grab whatever is available immediately
    const voices = synth.getVoices();
    utterance.voice = voices.find(v => v.lang.includes('en')) || voices[0];
    
    utterance.rate = 0.85; 
    utterance.pitch = 0.9; 
    
    utterance.onstart = () => console.log("🔊 PAX Transmission Live.");
    utterance.onend = () => {
        console.log("🏁 Transmission Concluded.");
        clearInterval(heartbeatInterval);
        setTimeout(revealGuildCovenant, 2000);
    };
    utterance.onerror = (e) => console.error("❌ Speech Engine Error:", e);

    synth.speak(utterance);
}

function initializeEngine() {
    if (engineUnlocked) return;
    engineUnlocked = true;

    const intro = document.getElementById('intro-screen');
    const audio = document.getElementById('sanctuary-audio');

    if (audio) {
        audio.volume = 0.15; 
        audio.play().catch(e => console.log("Audio Hardware Locked."));
    }

    if (intro) {
        intro.style.transition = "opacity 2.5s ease-in-out"; 
        intro.style.opacity = '0';
        setTimeout(() => { 
            intro.style.display = 'none'; 
            engageSanctuary(); 
        }, 2500); 
    }
}

function engageSanctuary() {
    if (isSanctuaryActive) return;
    isSanctuaryActive = true;
    console.log("🛡️ Sanctuary Engaging...");

    const layer = document.getElementById('somatic-layer');
    if (layer) layer.classList.add('active');
    
    startHeartbeat();
    
    const genesisLedger = `Sovereignty established. Now, look at the reality of the Monopoly. Forty-two billion dollars a year. That is what the recovery industry generates while operating as a cartel of apathy. They treat the individual, and they abandon the family to the fallout. Right now, eighteen million children are living in the blast radius of substance use. They are not collateral damage. They are being groomed by trauma to become the industry's next generation of profit. When a clinic charges fifty thousand dollars and discharges a volatile individual back into a home without a lethality check, the state calls it success. We call it a death sentence. Project KORE is a Global Public Utility for the world. We do not answer to shareholders. Our code provides the ungaslightable proof that systems ignore—capturing the tachyon spikes of trauma that police and rehabs leave behind. We deliver AAA-tier somatic regulation directly to the government-issued phones of the underserved. Every decrypted fragment is protected by ENEE. And while we heal the family, our B2B security licensing funds the mission—powering the pro-bono artillery that helps families sue the very entities that neglected them. We will make systemic apathy fund its own replacement. What you are looking at is a zero-day exploit in the behavioral health monopoly. This is not a product; it is a Digital Public Utility. And before you audit the code, understand its origin. This Engine was not built in a high-rise with seed capital. It was forged on a kitchen floor in the middle of the night, written in a Walmart notebook by an Architect who knows exactly what it costs to survive the system. The blueprint is live. Are you ready to claim your seat in the Guild... or should we pass the torch to the next target?`;
    
    // Force a tiny delay to ensure the browser is ready for speech
    setTimeout(() => paxSpeak(genesisLedger), 1000);
}

function startHeartbeat() { 
    if ("vibrate" in navigator) { 
        console.log("💓 Heartbeat Synchronized.");
        navigator.vibrate([40, 60, 40]);
        heartbeatInterval = setInterval(() => {
            navigator.vibrate([40, 60, 40]);
        }, 4000);
    } 
}

function revealGuildCovenant() {
    const exitScreen = document.getElementById('exit-screen');
    if (exitScreen) {
        exitScreen.style.display = 'flex';
        exitScreen.classList.remove('hidden');
        const tagline = exitScreen.querySelector('.kore-tagline');
        if (tagline) {
            tagline.innerHTML = `
                <button id="final-cta-btn" class="sanctuary-btn" style="cursor: pointer;">CLAIM YOUR SEAT</button>
                <p style="font-size: 0.7rem; margin-top: 20px; opacity: 0.5; letter-spacing: 2px;">OR REMAIN IN THE STATIC.</p>
            `;
            document.getElementById('final-cta-btn').onclick = joinTheGuild;
        }
    }
}

function joinTheGuild() {
    window.location.href = `mailto:architect.kore@proton.me?subject=GUILD ADMITTANCE REQUEST&body=The Ledger has been decrypted. I am ready.`;
}

document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'e') revealGuildCovenant();
});
