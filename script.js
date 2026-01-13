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
    
    // AUDIO
    const sfxVoice = document.getElementById('sfx-voice');
    const sfxSlash = document.getElementById('sfx-slash');

    // 1. UPGRADE 3: VOICE LINE START
    sfxVoice.volume = 1.0;
    sfxVoice.currentTime = 0;
    sfxVoice.play();

    // 2. WAIT FOR VOICE (e.g. 1 second) BEFORE ATTACK
    setTimeout(() => {
        
        // A. Trigger Slash Sound & Dash
        sfxSlash.volume = 0.6;
        sfxSlash.currentTime = 0;
        sfxSlash.play();
        
        zoroLayer.style.display = 'block';
        zoroImg.classList.add('zoro-strike');

        // B. The Impact (Synced to when Zoro hits center - approx 600ms)
        setTimeout(() => {
            
            // UPGRADE 1: SCREEN SHAKE
            document.body.classList.add('shake-screen');

            // Flash & Hide Real Box
            flash.classList.add('flash-active');
            originalBox.style.opacity = '0';

            // Create Pieces
            createClone(userText, 'anim-top');
            createClone(userText, 'anim-mid');
            createClone(userText, 'anim-bot');

            // UPGRADE 2: SLASH LINES
            createSlashLine(35, -6); 
            createSlashLine(75, -6);   

        }, 600); 

    }, 800); // 800ms delay for voice to say "Santoryu..."


    // 3. SMOOTH RESET LOGIC
    setTimeout(() => {
        // Fade out
        container.style.transition = "opacity 1s";
        container.style.opacity = "0";

        setTimeout(() => {
            // Clean up DOM
            document.getElementById('slice-container').innerHTML = '';
            
            // Reset Box
            originalBox.style.opacity = '1';
            
            // Reset Zoro
            zoroImg.classList.remove('zoro-strike');
            zoroLayer.style.display = 'none';
            
            // Reset Classes
            document.body.classList.remove('shake-screen');
            flash.classList.remove('flash-active');
            
            // Fade In
            container.style.opacity = "1";
            inputField.value = "";
            
        }, 1000);

    }, 5500); // Wait 5.5s total
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

function createSlashLine(topPercent, rotateDeg) {
    const line = document.createElement('div');
    line.className = 'slash-line';
    
    line.style.top = topPercent + '%';
    line.style.left = '-10%'; 
    line.style.width = '0%';
    line.style.transform = `rotate(${rotateDeg}deg)`;

    document.getElementById('slice-container').appendChild(line);

    line.animate([
        { width: '0%', opacity: 1 },
        { width: '120%', opacity: 0 } 
    ], {
        duration: 900, 
        easing: 'ease-out',
        fill: 'forwards'
    });
}