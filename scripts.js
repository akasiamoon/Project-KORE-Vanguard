function triggerSomaticHijack() {
    const layer = document.getElementById('somatic-layer');
    
    // Toggle the Amber 2300K Filter
    if (layer.classList.contains('active')) {
        layer.classList.remove('active');
        console.log("Somatic Hijack: Disengaged");
    } else {
        layer.classList.add('active');
        console.log("Somatic Hijack: Engaged. 2300K Filter Active.");
        
        // Optional: Trigger a slight vibration if on mobile
        if ("vibrate" in navigator) {
            navigator.vibrate([100, 100, 100]);
        }
    }
}
