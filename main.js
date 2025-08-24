// Flower data with emojis and names
const flowers = [
    { emoji: '🌹', name: 'Rose', class: 'rose' },
    { emoji: '🌷', name: 'Tulip', class: 'tulip' },
    { emoji: '🌻', name: 'Sunflower', class: 'sunflower' },
    { emoji: '🌺', name: 'Hibiscus', class: 'hibiscus' },
    { emoji: '🌸', name: 'Cherry Blossom', class: 'cherry' },
    { emoji: '💐', name: 'Bouquet', class: 'bouquet' },
    { emoji: '🌼', name: 'Daisy', class: 'daisy' },
    { emoji: '🪷', name: 'Lotus', class: 'lily' },
    { emoji: '🌾', name: 'Wheat', class: 'wheat' },
    { emoji: '🌿', name: 'Herb', class: 'herb' }
];

// Sweet messages that appear with flowers
const sweetMessages = [
    "A beautiful flower for a beautiful soul",
    "This one's as lovely as your smile ",
    "Growing flowers of love for you ",
    "Each petal represents my love ",
    "Blooming with happiness",
    "You make my heart blossom ",
    "Sweet as honey, beautiful as flowers",
    "My love grows like these flowers",
    "You're my sunshin!",
    "Forever and always"
];

let flowerCount = 0;
let garden = null;
let countDisplay = null;
let flowerButton = null;

document.addEventListener('DOMContentLoaded', function() {
    garden = document.getElementById('garden');
    countDisplay = document.getElementById('count');
    flowerButton = document.getElementById('flower-button');
    
    flowerButton.addEventListener('click', growFlower);
    
    createInitialGarden();
});

function growFlower() {
    const randomFlower = flowers[Math.floor(Math.random() * flowers.length)];
    
    const flowerElement = document.createElement('div');
    flowerElement.className = `flower ${randomFlower.class}`;
    flowerElement.innerHTML = randomFlower.emoji;
    flowerElement.title = randomFlower.name;
    
    flowerElement.addEventListener('click', function() {
        showLoveMessage(randomFlower.name);
        createSparkles(flowerElement);
    });
    
    garden.appendChild(flowerElement);
    
    flowerCount++;
    countDisplay.textContent = flowerCount;
    
    // Add button feedback
    addButtonFeedback();
    
    if (flowerCount % 5 === 0) {
        showSweetMessage();
    }
    
    if (garden.children.length > 20) {
        const oldestFlower = garden.firstChild;
        oldestFlower.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => {
            if (oldestFlower.parentNode) {
                garden.removeChild(oldestFlower);
            }
        }, 500);
    }
}

function addButtonFeedback() {
    flowerButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        flowerButton.style.transform = 'scale(1)';
    }, 150);
}

function showSweetMessage() {
    const message = sweetMessages[Math.floor(Math.random() * sweetMessages.length)];
    
    const messageElement = document.createElement('div');
    messageElement.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(45deg, #ff6b9d, #ff8cc5);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-size: 1.1em;
        font-weight: bold;
        z-index: 1000;
        animation: slideDown 0.5s ease-out, fadeOut 2s ease-out 2s;
        box-shadow: 0 8px 20px rgba(255, 107, 157, 0.3);
    `;
    messageElement.textContent = message;
    
    document.body.appendChild(messageElement);
    
    setTimeout(() => {
        if (messageElement.parentNode) {
            document.body.removeChild(messageElement);
        }
    }, 4000);
}

function showLoveMessage(flowerName) {
    const loveMessages = [
        `${flowerName} - as beautiful as you`,
        `This ${flowerName} reminds me of you`,
        `${flowerName} for my flower`,
        `You're more beautiful than any ${flowerName}`
    ];
    
    const message = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    
    const messageElement = document.createElement('div');
    messageElement.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 255, 255, 0.95);
        color: #d63384;
        padding: 10px 20px;
        border-radius: 20px;
        font-size: 1em;
        font-weight: bold;
        z-index: 1000;
        animation: bounceIn 0.5s ease-out, fadeOut 1.5s ease-out 1.5s;
        box-shadow: 0 4px 15px rgba(214, 51, 132, 0.2);
        border: 2px solid #ff6b9d;
    `;
    messageElement.textContent = message;
    
    document.body.appendChild(messageElement);
    
    setTimeout(() => {
        if (messageElement.parentNode) {
            document.body.removeChild(messageElement);
        }
    }, 3000);
}

function createSparkles(element) {
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.cssText = `
                position: absolute;
                left: ${Math.random() * 60}px;
                top: ${Math.random() * 60}px;
                animation: sparkle 1s ease-out ${Math.random() * 0.5}s;
            `;
            
            element.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 1500);
        }, i * 100);
    }
}

function createInitialGarden() {
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const grass = document.createElement('div');
            grass.style.cssText = `
                position: absolute;
                bottom: 0;
                left: ${Math.random() * 80}%;
                font-size: 2em;
                opacity: 0.6;
                animation: sway 3s ease-in-out infinite ${Math.random() * 2}s;
            `;
            grass.innerHTML = '🌱';
            garden.appendChild(grass);
        }, i * 500);
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes bounceIn {
        0% {
            transform: translateX(-50%) scale(0);
            opacity: 0;
        }
        50% {
            transform: translateX(-50%) scale(1.1);
            opacity: 1;
        }
        100% {
            transform: translateX(-50%) scale(1);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes sway {
        0%, 100% { transform: rotate(-5deg); }
        50% { transform: rotate(5deg); }
    }
`;
document.head.appendChild(style);

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        event.preventDefault();
        growFlower();
    }
});

function checkSpecialNumbers() {
    if (flowerCount === 10) {
        showSpecialMessage("Double digits You're amazing");
    } else if (flowerCount === 25) {
        showSpecialMessage("Quarter century of flowers");
    } else if (flowerCount === 50) {
        showSpecialMessage("Fifty flowers of love");
    } else if (flowerCount === 100) {
        showSpecialMessage("A hundred flowers You're incredible");
    }
}

function showSpecialMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #ffd700, #ffed4a);
        color: #333;
        padding: 25px 35px;
        border-radius: 15px;
        font-size: 1.3em;
        font-weight: bold;
        z-index: 1001;
        animation: bounceIn 0.7s ease-out, fadeOut 2s ease-out 3s;
        box-shadow: 0 10px 30px rgba(255, 215, 0, 0.5);
        border: 3px solid #ffd700;
        text-align: center;
    `;
    messageElement.textContent = message;
    
    document.body.appendChild(messageElement);
    
    setTimeout(() => {
        if (messageElement.parentNode) {
            document.body.removeChild(messageElement);
        }
    }, 5000);
}