let synth = window.speechSynthesis;

document.addEventListener('DOMContentLoaded', () => {
    const enterBtn = document.getElementById('enter-btn');
    enterBtn.onclick = () => {
        document.getElementById('intro-screen').classList.add('hidden');
        document.getElementById('sanctuary-audio').play();
        setTimeout(() => paxSpeak("Sanctuary stable. Welcome home, Architect."), 1000);
    };
});

function paxSpeak(text) {
    synth.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();
    // Prioritize high-quality neural voices
    msg.voice = voices.find(v => v.name.includes("Google UK English Female") || v.name.includes("Premium")) || voices[0];
    msg.rate = 0.85;
    msg.pitch = 0.95;
    synth.speak(msg);
}

function triggerSomaticHijack() {
    document.getElementById('somatic-layer').classList.add('active');
    paxSpeak("Sanctuary protocol engaged. Your heart is loud. Let's ground the signal.");
}

function dismissHijack(e) {
    if(e) e.stopPropagation();
    document.getElementById('somatic-layer').classList.remove('active');
}

function triggerInvestorTour() {
    paxSpeak("The recovery industry has spent 50 years perfecting the Maintenance of Sickness rather than the Architecture of Sovereignty.");
    setTimeout(() => {
        paxSpeak("To look at this Hearth and say 'no' is a public admission that you prefer the profit of a funeral over the intervention of mercy. We don't have a cure, but we have a Sanctuary. Who is joining the Guild?");
    }, 12000);
}

function triggerLore(e) {
    e.stopPropagation();
    document.getElementById('lore-banner').classList.add('active');
    paxSpeak("I am the Architect because I survived the fiery pits where these numbers become human faces. If we save one person from the abyss, this operation is a Profound Success.");
    setTimeout(() => document.getElementById('lore-banner').classList.remove('active'), 8000);
}

// KEYBOARD SHORTCUTS
document.onkeydown = (e) => {
    const key = e.key.toLowerCase();
    if (key === 'h') triggerSomaticHijack(); // H for Hijack
    if (key === 's') dismissHijack();       // S for Safe/Stop
    if (key === 'm') triggerInvestorTour(); // M for Manifesto
    if (key === 'e') {                      // E for Exit/Reload
        paxSpeak("The Vow is sealed.");
        setTimeout(() => location.reload(), 2000);
    }
};
