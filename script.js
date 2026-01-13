// --- 1. PARTICLES ---
setInterval(createParticle, 100);

function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + 'vw';
    const size = Math.random() * 5 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.animationDuration = Math.random() * 2 + 2 + 's';
    document.body.appendChild(particle);
    setTimeout(() => { particle.remove(); }, 4000);
}


// --- 2. LOGIC ---
const submitBtn = document.getElementById('submitBtn');
const usernameInput = document.getElementById('username');

submitBtn.addEventListener('click', executeSantoryu);
usernameInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') executeSantoryu();
});

function executeSantoryu() {
    const userText = usernameInput.value;
    if (!userText) { alert("A SWORDSMAN NEEDS A NAME."); return; }

    const originalBox = document.getElementById('target-box');
    const container = document.querySelector('.container');
    const zoroLayer = document.getElementById('zoro-layer');
    const zoroImg = document.getElementById('zoro-img');
    const flash = document.getElementById('flash-overlay');
    
    const sfxVoice = document.getElementById('sfx-voice');
    const sfxSlash = document.getElementById('sfx-slash');
    const sfxSheath = document.getElementById('sfx-sheath'); 

    // 1. VOICE
    sfxVoice.volume = 1.0;
    sfxVoice.currentTime = 0;
    sfxVoice.play();

    // 2. DELAY FOR VOICE
    setTimeout(() => {
        sfxSlash.volume = 0.6;
        sfxSlash.currentTime = 0;
        sfxSlash.play();
        
        zoroLayer.style.display = 'block';
        zoroImg.classList.add('zoro-strike');

        // 3. IMPACT (300ms)
        setTimeout(() => {
            document.body.classList.add('shake-screen');
            flash.classList.add('flash-active');
            originalBox.style.opacity = '0';

            // IMPORTANT: Calculate layout here for mobile accuracy
            createClone(userText, 'anim-top', originalBox);
            createClone(userText, 'anim-bot', originalBox);
            createClone(userText, 'anim-left', originalBox);
            createClone(userText, 'anim-right', originalBox);

            createSlashLine(45); 
            createSlashLine(-45);

        }, 300); 

    }, 1000);


    // 4. RESET
    setTimeout(() => {
        sfxSheath.volume = 0.8;
        sfxSheath.play();
    }, 5000);

    setTimeout(() => {
        container.style.transition = "opacity 1s";
        container.style.opacity = "0";

        setTimeout(() => {
            document.getElementById('slice-container').innerHTML = '';
            originalBox.style.opacity = '1';
            zoroImg.classList.remove('zoro-strike');
            zoroLayer.style.display = 'none';
            document.body.classList.remove('shake-screen');
            flash.classList.remove('flash-active');
            
            container.style.opacity = "1";
            usernameInput.value = "";
            
        }, 1000);

    }, 5500); 
}

// Function to clone box exactly where it stands on screen
function createClone(text, animationClass, originalBox) {
    const div = document.createElement('div');
    div.className = `slice-clone ${animationClass}`;
    
    // Get Coordinates (Critical for Mobile)
    const rect = originalBox.getBoundingClientRect();
    div.style.width = rect.width + 'px';
    div.style.height = rect.height + 'px';
    div.style.top = rect.top + 'px';
    div.style.left = rect.left + 'px';
    
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
    line.style.top = '50%';
    line.style.left = '50%'; 
    line.style.width = '0px';
    line.style.transform = `translate(-50%, -50%) rotate(${rotateDeg}deg)`;

    document.getElementById('slice-container').appendChild(line);

    line.animate([
        { width: '0px', opacity: 1 },
        { width: '100vmax', opacity: 0 }
    ], {
        duration: 500, 
        easing: 'cubic-bezier(0.1, 0.9, 0.2, 1)',
        fill: 'forwards'
    });
}