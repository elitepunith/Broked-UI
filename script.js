// --- 1. PARTICLE SYSTEM ---
setInterval(createParticle, 150);

function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random Start Position
    particle.style.left = Math.random() * 100 + 'vw';
    
    // Random Size (Embers)
    const size = Math.random() * 5 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Random Speed
    particle.style.animationDuration = Math.random() * 2 + 2 + 's';
    
    document.body.appendChild(particle);
    
    // Cleanup
    setTimeout(() => { particle.remove(); }, 4000);
}


// --- 2. MAIN LOGIC ---
document.getElementById('submitBtn').addEventListener('click', executeSantoryu);

function executeSantoryu() {
    const inputField = document.getElementById('username');
    const userText = inputField.value;

    if (!userText) {
        alert("A SWORDSMAN NEEDS A NAME.");
        return;
    }

    const originalBox = document.getElementById('target-box');
    const container = document.querySelector('.container');
    const zoroLayer = document.getElementById('zoro-layer');
    const zoroImg = document.getElementById('zoro-img');
    const flash = document.getElementById('flash-overlay');
    
    const sfxVoice = document.getElementById('sfx-voice');
    const sfxSlash = document.getElementById('sfx-slash');

    // STEP 1: VOICE LINE
    sfxVoice.volume = 1.0;
    sfxVoice.currentTime = 0;
    sfxVoice.play();

    // STEP 2: WAIT FOR VOICE (approx 1s)
    setTimeout(() => {
        
        // Trigger Slash Sound & Zoro Dash
        sfxSlash.volume = 0.6;
        sfxSlash.currentTime = 0;
        sfxSlash.play();
        
        zoroLayer.style.display = 'block';
        zoroImg.classList.add('zoro-strike');

        // STEP 3: IMPACT (When Zoro is in middle)
        setTimeout(() => {
            
            // Screen Shake
            document.body.classList.add('shake-screen');

            // Flash & Hide Real Box
            flash.classList.add('flash-active');
            originalBox.style.opacity = '0';

            // Create 4 Pieces for X Cut
            createClone(userText, 'anim-top');
            createClone(userText, 'anim-bot');
            createClone(userText, 'anim-left');
            createClone(userText, 'anim-right');

            // Create X Slash Lines
            createSlashLine(45);  // Diagonal /
            createSlashLine(-45); // Diagonal \

        }, 300); // Fast dash impact

    }, 1000); // Delay for voice


    // STEP 4: SMOOTH RESET
    setTimeout(() => {
        // Fade Out
        container.style.transition = "opacity 1s";
        container.style.opacity = "0";

        setTimeout(() => {
            // Clean DOM
            document.getElementById('slice-container').innerHTML = '';
            
            // Reset Elements
            originalBox.style.opacity = '1';
            zoroImg.classList.remove('zoro-strike');
            zoroLayer.style.display = 'none';
            document.body.classList.remove('shake-screen');
            flash.classList.remove('flash-active');
            
            // Fade In
            container.style.opacity = "1";
            inputField.value = "";
            
        }, 1000);

    }, 5000); 
}

function createClone(text, animationClass) {
    const div = document.createElement('div');
    div.className = `slice-clone ${animationClass}`;
    div.innerHTML = `
        <div class="box-content">
            <h2>RORONOA ZORO</h2>
            <p>ONLY THE STRONG MAY ENTER.</p>
            <input type="text" value="${text}" readonly>
            <button>CHALLENGE</button>
        </div>
    `;
    document.getElementById('slice-container').appendChild(div);
}

function createSlashLine(rotateDeg) {
    const line = document.createElement('div');
    line.className = 'slash-line';
    
    // Center of box
    line.style.top = '50%';
    line.style.left = '50%'; 
    line.style.width = '0px';
    
    // Translate to center pivot and rotate
    line.style.transform = `translate(-50%, -50%) rotate(${rotateDeg}deg)`;

    document.getElementById('slice-container').appendChild(line);

    line.animate([
        { width: '0px', opacity: 1 },
        { width: '700px', opacity: 0 } // Long enough to cover box
    ], {
        duration: 600, 
        easing: 'ease-out',
        fill: 'forwards'
    });
}