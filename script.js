// ONE PIECE BORKED UI LOGIC

// 1. GUM-GUM STRETCH (Input stretches wildly)
function gumGumStretch(input) {
    const length = input.value.length;
    
    // As you type, width grows exponentially
    // 100% is normal, adds 10% per character
    let newWidth = 100 + (length * 10);
    
    // Randomly shift it slightly up or down to look unstable
    let randomSkew = Math.random() * 5 - 2;

    input.style.width = `${newWidth}%`;
    input.style.transform = `skew(${randomSkew}deg)`;

    // Reset if empty
    if(length === 0) {
        input.style.width = '100%';
        input.style.transform = 'skew(0deg)';
    }
}

// 2. ZORO IS LOST (Button moves when you try to click)
let zoroConfusionLevel = 0;

function zoroLost() {
    const btn = document.getElementById('addBtn');
    
    // 60% chance the button moves
    // Increases annoyance but allows clicking eventually (Functional!)
    if (Math.random() > 0.4) {
        zoroConfusionLevel++;
        
        // Calculate random movement within 200px
        const x = (Math.random() * 300) - 150;
        const y = (Math.random() * 200) - 100;
        
        btn.style.transform = `translate(${x}px, ${y}px)`;
        
        // Change text to mock user
        const phrases = ["WRONG WAY!", "I'M LOST!", "OVER HERE?", "SANTORYU!", "NOT THERE!"];
        btn.querySelector('span').innerText = phrases[Math.floor(Math.random() * phrases.length)];
    }
}

// 3. ADDING A TASK (Handling the button click)
document.getElementById('addBtn').addEventListener('click', function() {
    const input = document.getElementById('taskInput');
    const taskText = input.value;

    if (taskText.trim() === "") return;

    createBounty(taskText);
    
    // Reset Input
    input.value = "";
    input.style.width = "100%";
    
    // Reset Button Text
    this.querySelector('span').innerText = "⚔️ POST BOUNTY";
    this.style.transform = "translate(0,0)";
});

function createBounty(text) {
    const list = document.getElementById('bounty-list');
    
    // Random Berry Amount
    const berry = Math.floor(Math.random() * 90000000) + 1000;
    const formattedBerry = berry.toLocaleString();

    const div = document.createElement('div');
    div.className = 'wanted-poster';
    div.innerHTML = `
        <div class="bounty-text">
            <h2 style="margin:0; text-transform:uppercase;">${text}</h2>
            <div class="berry-amount">DEAD OR ALIVE: ฿${formattedBerry}</div>
        </div>
        <button class="delete-btn" onclick="gumGumPistol(this)">PUNCH</button>
    `;

    list.appendChild(div);
}

// 4. GUM-GUM PISTOL (Delete Animation)
function gumGumPistol(btn) {
    const fist = document.getElementById('luffy-fist');
    const poster = btn.parentElement;

    // 1. Get position of the item we are deleting
    const rect = poster.getBoundingClientRect();

    // 2. Move fist to align Y-axis with the item
    fist.style.top = (rect.top - 50) + "px"; // Adjust for fist size
    fist.classList.remove('hidden-fist'); // Make visible

    // 3. Trigger Animation
    fist.classList.add('gum-gum-pistol');

    // 4. Play Sound Effect (Simulated via console for now)
    console.log("GOMU GOMU NO... PISTOL!");

    // 5. When the punch "hits" (approx 200ms in), break the element
    setTimeout(() => {
        poster.classList.add('smashed');
    }, 250);

    // 6. Cleanup after animation
    setTimeout(() => {
        poster.remove();
        fist.classList.remove('gum-gum-pistol');
    }, 600);
}