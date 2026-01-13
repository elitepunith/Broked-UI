// --- 1. HAKI PARTICLE SYSTEM ---
setInterval(createParticle, 100);

function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random Position
    particle.style.left = Math.random() * 100 + 'vw';
    
    // Random Size (Embers)
    const size = Math.random() * 5 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Random Speed
    particle.style.animationDuration = Math.random() * 2 + 2 + 's';
    
    document.body.appendChild(particle);
    setTimeout(() => { particle.remove(); }, 4000);
}


// --- 2. MAIN LOGIC ---
const submitBtn = document.getElementById('submitBtn');
const usernameInput = document.getElementById('username');

// Event Listener for Click
submitBtn.addEventListener('click', executeSantoryu);

// UPGRADE: Event Listener for Enter Key
usernameInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        executeSantoryu();
    }
});


function executeSantoryu() {
    const userText = usernameInput.value;

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
    const sfxSheath = document.getElementById('sfx-sheath'); // UPGRADE: Sheath Sound

    // STEP 1: VOICE LINE
    sfxVoice.volume = 1.0;
    sfxVoice.currentTime = 0;
    sfxVoice.play();

    // STEP 2: WAIT FOR VOICE (Sync with audio length)
    setTimeout(() => {
        
        // Trigger Slash Sound
        sfxSlash.volume = 0.6;
        sfxSlash.currentTime = 0;
        sfxSlash.play();
        
        // Zoro Dash
        zoroLayer.style.display = 'block';
        zoroImg.classList.add('zoro-strike');

        // STEP 3: IMPACT (When Zoro hits center - approx 300ms)
        setTimeout(() => {
            
            // Violent Screen Shake
            document.body.classList.add('shake-screen');

            // White Impact Flash & Hide Real Box
            flash.classList.add('flash-active');
            originalBox.style.opacity = '0';

            // Create 4 Pieces for X Cut
            createClone(userText, 'anim-top');
            createClone(userText, 'anim-bot');
            createClone(userText, 'anim-left');
            createClone(userText, 'anim-right');

            // Create "X" Slash Lines
            createSlashLine(45);  // /
            createSlashLine(-45); // \

        }, 300); 

    }, 1000); // 1s delay for "Santoryu..." voice


    // STEP 4: SHEATH SOUND & SMOOTH RESET
    // Play sheath sound right before fade out
    setTimeout(() => {
        sfxSheath.volume = 0.8;
        sfxSheath.play();
    }, 5000);

    setTimeout(() => {
        // Fade Out
        container.style.transition = "opacity 1s";
        container.style.opacity = "0";

        setTimeout(() => {
            // Reset Everything
            document.getElementById('slice-container').innerHTML = '';
            originalBox.style.opacity = '1';
            zoroImg.classList.remove('zoro-strike');
            zoroLayer.style.display = 'none';
            document.body.classList.remove('shake-screen');
            flash.classList.remove('flash-active');
            
            // Fade In
            container.style.opacity = "1";
            usernameInput.value = "";
            
        }, 1000);

    }, 5500); 
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
    
    // Center it
    line.style.top = '50%';
    line.style.left = '50%'; 
    line.style.width = '0px';
    line.style.transform = `translate(-50%, -50%) rotate(${rotateDeg}deg)`;

    document.getElementById('slice-container').appendChild(line);

    // Explosive Line Expansion
    line.animate([
        { width: '0px', opacity: 1 },
        { width: '700px', opacity: 0 }
    ], {
        duration: 500, 
        easing: 'cubic-bezier(0.1, 0.9, 0.2, 1)', // Explosive ease
        fill: 'forwards'
    });
}