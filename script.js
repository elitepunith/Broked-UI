document.getElementById('submitBtn').addEventListener('click', executeSantoryu);

function executeSantoryu() {
    const inputField = document.getElementById('username');
    const userText = inputField.value;

    if (!userText) {
        alert("A swordsman needs a name!");
        return;
    }

    // 1. SETUP ASSETS
    const originalBox = document.getElementById('target-box');
    const container = document.querySelector('.container');
    const zoroLayer = document.getElementById('zoro-layer');
    const zoroImg = document.getElementById('zoro-img');
    const flash = document.getElementById('flash-overlay');
    const sfx = document.getElementById('sfx-slash');

    // 2. TRIGGER SOUND & ZORO
    sfx.volume = 0.5;
    sfx.currentTime = 0; // Reset sound if played before
    sfx.play();
    
    zoroLayer.style.display = 'block';
    zoroImg.classList.add('zoro-strike');

    // 3. WAIT FOR IMPACT (Synced with Slow Zoro)
    // Zoro takes 1.5s to cross. Cut happens around 600ms.
    setTimeout(() => {
        // A. Flash Screen
        flash.classList.add('flash-active');

        // B. Hide Real Box
        originalBox.style.opacity = '0';

        // C. Create 3 Clones (Top, Mid, Bottom)
        createClone(userText, 'anim-top');
        createClone(userText, 'anim-mid');
        createClone(userText, 'anim-bot');

        // D. Create Green Haki Slash Lines (Slow & Glowing)
        createSlashLine(32, -10); // Top cut
        createSlashLine(62, 5);   // Bottom cut

    }, 600); 

    // 4. RELOAD PAGE (Wait for slow motion to finish)
    setTimeout(() => {
        window.location.reload();
    }, 4000); 
}

function createClone(text, animationClass) {
    const div = document.createElement('div');
    div.className = `slice-clone ${animationClass}`;
    
    // Identical HTML structure to mirror the original
    div.innerHTML = `
        <div class="box-content">
            <h2>WHO ARE YOU?</h2>
            <p>Enter your name to challenge Roronoa Zoro.</p>
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
    line.style.left = '0';
    line.style.width = '0%';
    line.style.transform = `rotate(${rotateDeg}deg)`;

    document.getElementById('slice-container').appendChild(line);

    // Slower Slash Line Animation
    line.animate([
        { width: '0%', opacity: 1 },
        { width: '150%', opacity: 0 }
    ], {
        duration: 800, // Visible for longer
        easing: 'ease-out',
        fill: 'forwards'
    });
}