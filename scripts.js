document.addEventListener('DOMContentLoaded', () => {
    const enterBtn = document.getElementById('enter-btn');
    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            document.getElementById('intro-screen').classList.add('hidden');
            const audio = document.getElementById('sanctuary-audio');
            if(audio) audio.play();
        });
    }
});

let synth = window.speechSynthesis;

function paxSpeak(text) {
    if (synth.speaking) synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    synth.speak(utterance);
}

function triggerSomaticHijack() {
    document.getElementById('somatic-layer').classList.add('active');
    paxSpeak("Sanctuary protocol engaged. Speak to me.");
}

function dismissHijack(e) {
    if(e) e.stopPropagation();
    document.getElementById('somatic-layer').classList.remove('active');
}

function triggerInvestorTour() {
    paxSpeak("The recovery industry has spent 50 years perfecting the Maintenance of Sickness rather than the Architecture of Sovereignty.");
    setTimeout(() => {
        paxSpeak("We have removed every excuse. For an investor to look at this Hearth and still say no would be a public admission that they prefer the profit of a funeral over the intervention of mercy. Who is joining the Guild?");
    }, 12000);
}

function triggerLore(e) {
    if(e) e.stopPropagation();
    document.getElementById('lore-banner').classList.add('active');
    paxSpeak("I am the Architect because I survived the fiery pits. If we save one person from the abyss, this operation is a Profound Success.");
}
