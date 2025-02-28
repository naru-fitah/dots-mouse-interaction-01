// Select canvas and set up context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Resize canvas to fit window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Grid settings
const spacing = 20;
const safeMargin = 30; // Space from edges
const cols = Math.floor((canvas.width - safeMargin * 2) / spacing);
const rows = Math.floor((canvas.height - safeMargin * 2) / spacing);

// Store dots
let dots = [];

// Create grid of dots inside the safe area
for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
        dots.push({ 
            x: x * spacing + safeMargin, 
            y: y * spacing + safeMargin, 
            originalX: x * spacing + safeMargin, 
            originalY: y * spacing + safeMargin,
            radius: 2, // Default size
            color: "#000" // Default color
        });
    }
}

// Animation loop
function animateDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    dots.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
    });

    requestAnimationFrame(animateDots);
}

// Mouse interaction
canvas.addEventListener("mousemove", (e) => {
    dots.forEach(dot => {
        let dx = e.clientX - dot.x;
        let dy = e.clientY - dot.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {  // Increased sensitivity
            let randomX = (Math.random() - 0.5) * 15; // Slightly larger movement
            let randomY = (Math.random() - 0.5) * 15;

            gsap.to(dot, { 
                x: dot.originalX + randomX, 
                y: dot.originalY + randomY, 
                duration: 0.5,  
                ease: "elastic.out(0.5, 0.5)" 
            });
        } else {
            gsap.to(dot, { 
                x: dot.originalX, 
                y: dot.originalY, 
                duration: 1.2,  
                ease: "elastic.out(0.5, 0.5)" 
            });
        }
    });
});

// Start animation
animateDots();
