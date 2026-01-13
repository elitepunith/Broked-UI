// judge hints - if you are reading this, hi!
console.log("%c⚔️ RORONOA ZORO ⚔️", "color: #00ff88; font-size: 20px; font-weight: bold; background: #000; padding: 10px;");
console.log("%cTry: 'Sanji', 'Kuina', 'Mihawk', or 'Lost'", "color: #fff; font-size: 14px;");

// particle system
setInterval(() => {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = Math.random() * 100 + 'vw';
    const s = Math.random() * 5 + 2;
    p.style.width = s + 'px';
    p.style.height = s + 'px';
    p.style.animationDuration = Math.random() * 2 + 2 + 's';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 4000);
}, 100);

const btn = document.getElementById('submitBtn');
const nameInput = document.getElementById('username');

btn.addEventListener('click', cutUI);
nameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') cutUI();
});

function cutUI() {
    console.log('challenge accepted');
    
    const val = nameInput.value;
    const txt = val.toLowerCase().trim();

    if (!val) { 
        alert("A SWORDSMAN NEEDS A NAME."); 
        return; 
    }

    const box = document.getElementById('target-box');
    const container = document.querySelector('.container');
    const layer = document.getElementById('zoro-layer');
    const img = document.getElementById('zoro-img');
    const flash = document.getElementById('flash-overlay');
    
    // audio
    const voice = document.getElementById('voice');
    const slash = document.getElementById('slash');
    const sheath = document.getElementById('sheath'); 

    // check if he gets lost (10% chance) or cheat code
    const isLost = Math.random() < 0.1 || txt === "lost";

    if (isLost) {
        console.log('zoro got lost...');
        
        slash.volume = 0.5;
        slash.currentTime = 0;
        slash.play();

        // force left position via JS to override CSS
        layer.style.display = 'block';
        img.style.left = "-50vw";         
        img.style.right = "auto";         
        img.style.transform = "scaleX(1)"; 
        
        img.classList.add('zoro-lost-anim'); 

        // update text
        setTimeout(() => {
            document.querySelector('#target-box h2').innerText = "HUH?";
            document.querySelector('#target-box p').innerText = "HE GOT LOST...";
        }, 600);

        // reset
        setTimeout(() => {
            container.style.opacity = "0";
            setTimeout(() => {
                img.classList.remove('zoro-lost-anim'); 
                layer.style.display = 'none';
                
                // clear manual styles
                img.style.left = "";      
                img.style.right = "";     
                img.style.transform = ""; 
                
                document.querySelector('#target-box h2').innerText = "RORONOA ZORO";
                document.querySelector('#target-box p').innerText = "ONLY THE STRONG MAY ENTER.";
                
                container.style.opacity = "1";
                nameInput.value = "";
            }, 1000);
        }, 2500);

        return; 
    }


    // easter eggs
    if (txt === "kuina") {
        document.body.classList.add('dark-mode');
        document.querySelector('#target-box h2').innerText = "I PROMISED...";
        document.querySelector('#target-box p').innerText = "I cannot cut this.";
        
        setTimeout(() => {
            document.body.classList.remove('dark-mode');
            document.querySelector('#target-box h2').innerText = "RORONOA ZORO";
            document.querySelector('#target-box p').innerText = "ONLY THE STRONG MAY ENTER.";
            nameInput.value = "";
        }, 3000);
        return; 
    }

    if (txt === "mihawk" || txt === "dracule mihawk") {
        document.body.classList.add('dark-mode');
        document.querySelector('#target-box h2').innerText = "TOO STRONG";
        document.querySelector('#target-box p').innerText = "I am not ready yet.";
        
        sheath.volume = 0.5;
        sheath.play(); 

        setTimeout(() => {
            document.body.classList.remove('dark-mode');
            document.querySelector('#target-box h2').innerText = "RORONOA ZORO";
            document.querySelector('#target-box p').innerText = "ONLY THE STRONG MAY ENTER.";
            nameInput.value = "";
        }, 3000);
        return; 
    }

    let delay = 1000;
    // sanji check
    if (txt === "sanji" || txt === "cook") {
        delay = 0; 
        voice.src = ""; 
    } else {
        voice.src = "voice.mp3"; 
        voice.volume = 1.0;
        voice.currentTime = 0;
        voice.play();
    }

    // go dark
    document.body.classList.add('dark-mode'); 

    setTimeout(() => {
        slash.volume = 0.6;
        slash.currentTime = 0;
        slash.play();
        
        layer.style.display = 'block';
        img.classList.add('zoro-strike');

        // impact
        setTimeout(() => {
            document.body.classList.add('shake-screen');
            flash.classList.add('flash-active');
            box.style.opacity = '0';

            createClones(val, box);
            createSlashLine(45); 
            createSlashLine(-45);

        }, 450); 

    }, delay);

    // cleanup
    setTimeout(() => {
        sheath.volume = 0.8;
        sheath.play();
    }, delay + 4000);

    setTimeout(() => {
        container.style.transition = "opacity 1s";
        container.style.opacity = "0";

        setTimeout(() => {
            document.getElementById('slice-container').innerHTML = '';
            box.style.opacity = '1';
            img.classList.remove('zoro-strike');
            layer.style.display = 'none';
            document.body.classList.remove('shake-screen');
            document.body.classList.remove('dark-mode');
            flash.classList.remove('flash-active');
            
            document.querySelector('#target-box h2').innerText = "RORONOA ZORO";
            document.querySelector('#target-box p').innerText = "ONLY THE STRONG MAY ENTER.";
            
            container.style.opacity = "1";
            nameInput.value = "";
            
        }, 1000);

    }, delay + 4500); 
}

function createClones(text, originalBox) {
    // helper to spawn pieces
    const makePiece = (anim) => {
        const div = document.createElement('div');
        div.className = `slice-clone ${anim}`;
        
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
    };

    makePiece('anim-top');
    makePiece('anim-bot');
    makePiece('anim-left');
    makePiece('anim-right');
}

function createSlashLine(deg) {
    const line = document.createElement('div');
    line.className = 'slash-line';
    line.style.top = '50%';
    line.style.left = '50%'; 
    line.style.width = '0px';
    line.style.transform = `translate(-50%, -50%) rotate(${deg}deg)`;

    document.getElementById('slice-container').appendChild(line);

    line.animate([
        { width: '0px', opacity: 1 },
        { width: '100vmax', opacity: 0 }
    ], {
        duration: 400, 
        easing: 'cubic-bezier(0.1, 0.9, 0.2, 1)',
        fill: 'forwards'
    });
}