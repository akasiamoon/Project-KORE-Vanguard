let heartbeatInterval;
let isSanctuaryActive = false;
let engineUnlocked = false;

document.addEventListener('DOMContentLoaded', () => {
    const enterBtn = document.getElementById('enter-btn');
    if (enterBtn) {
        enterBtn.onclick = () => {
            console.log("🚀 Engine Initiated.");
            initializeEngine();
        };
    }
});

let synth = window.speechSynthesis; 
let paxVoice = null;

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

function paxSpeak(text) {
    if (synth.speaking) synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (paxVoice) utterance.voice = paxVoice;
    utterance.rate = 0.85; 
    utterance.pitch = 0.9; 
    
    const audio = document.getElementById('sanctuary-audio');
    if (audio) audio.volume = 0.5; 

    utterance.onend = function() {
        clearInterval(heartbeatInterval);
        console.log("🏁 Transmission Concluded.");
        setTimeout(revealGuildCovenant, 2000);
    };

    synth.speak(utterance);
}

function initializeEngine() {
    if (engineUnlocked && isSanctuaryActive) return;
    engineUnlocked = true;

    const intro = document.getElementById('intro-screen');
    const enterBtn = document.getElementById('enter-btn');
    const audio = document.getElementById('sanctuary-audio');

    if (audio) {
        audio.volume = 0.15; 
        audio.play().catch(e => console.log("Audio waiting..."));
    }

    if (enterBtn) {
        enterBtn.style.opacity = '0';
        enterBtn.style.pointerEvents = 'none';
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
    const layer = document.getElementById('somatic-layer');
    const hearth = document.querySelector('.hearth-container'); 
    
    if (!isSanctuaryActive) {
        isSanctuaryActive = true;
        
        if (layer) layer.classList.add('active');
        if (hearth) hearth.classList.add('breathing'); 
        
        startHeartbeat();
        
        const genesisLedger = `Sovereignty established. Now, look at the reality of the Monopoly. Forty-two billion dollars a year. That is what the recovery industry generates while operating as a cartel of apathy. They treat the individual, and they abandon the family to the fallout. Right now, eighteen million children are living in the blast radius of substance use. They are not collateral damage. They are being groomed by trauma to become the industry's next generation of profit. When a clinic charges fifty thousand dollars, drains a family's lifeline, and discharges a volatile individual back into a low-income home with zero spousal lethality screening, the state calls it a successful discharge. We call it a negligent death sentence. Project KORE is a Non-Profit Sovereign Foundation. We do not answer to shareholders. We answer to the heartbeat. We deliver AAA-tier somatic regulation directly to the government-issued phones of the underserved. We disguise evidence-informed support as a Sovereign RPG. We bypass the stigma, we bridge the walls of the rehab, and we give a voice to negative stamina. Every heartbeat, every breath, and every decrypted fragment is protected by ENEE. Our End-to-End Encryption ensures that the sanctuary remains private, even from us. And while we heal the family, our encrypted telemetry audits the very machines that abandoned them. We will make systemic apathy fund its own replacement. What you are looking at is a zero-day exploit in the behavioral health monopoly. It is the first of its kind in the world. This is not a product; it is a Digital Public Utility. And before you audit the code, understand its origin. This Engine was not built in a high-rise with seed capital. It was forged on a kitchen floor in the middle of the night, written in a Walmart notebook by an Architect who knows exactly what it costs to survive the system. The blueprint is live, and this exact transmission is being seeded to a highly classified list of systemic disruptors. But the Architect is not building a crowded table. She is only looking for the lethal few. Are you ready to claim your seat in the Guild... or should we pass the torch to the next target?`;
        
        setTimeout(() => paxSpeak(genesisLedger), 500);
    }
}

function startHeartbeat() { 
    if ("vibrate" in navigator) { 
        clearInterval(heartbeatInterval); 
        navigator.vibrate([40, 60, 40]);
        heartbeatInterval = setInterval(() => navigator.vibrate([40, 60, 40]), 4000); 
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
            const btn = document.getElementById('final-cta-btn');
            if (btn) {
                btn.onmousedown = joinTheGuild;
                btn.ontouchstart = joinTheGuild;
            }
        }
    }
}

function joinTheGuild(e) {
    if (e) e.preventDefault();
    const recipient = "architect@projectkore.org"; 
    const subject = "GUILD ADMITTANCE REQUEST";
    const body = "The Ledger has been decrypted. I have seen the blueprint from the kitchen floor. I am ready to discuss the move against the monopoly.";
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

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
