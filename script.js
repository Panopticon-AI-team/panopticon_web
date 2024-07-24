const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const lines = [];
const numLines = 110;

canvas.width = canvas.parentElement.offsetWidth;
canvas.height = canvas.parentElement.offsetHeight;

class Line {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.length = 350 + Math.random() * 300;
        this.angle = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() < 0.5 ? -1 : 1) * (0.0002 + Math.random() * 0.0006);
        this.speed = 0.02 + Math.random() * 0.06;
        this.opacity = 0;
        this.fadeSpeed = 0.002 + Math.random() * 0.004;
        this.thickness = 0.5 + Math.random() * 1.5;
    }

    update() {
        this.angle += this.rotationSpeed;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        if (this.opacity < 1) {
            this.opacity += this.fadeSpeed;
        }

        if (this.x > canvas.width + this.length || this.x < -this.length ||
            this.y > canvas.height + this.length || this.y < -this.length) {
            this.reset();
        }
    }

    draw() {
        const gradient = ctx.createLinearGradient(
            this.x, this.y,
            this.x + Math.cos(this.angle) * this.length,
            this.y + Math.sin(this.angle) * this.length
        );

        const color = `rgba(30, 50, 90, ${this.opacity * 0.35})`; // Dark navy color

        gradient.addColorStop(0, 'rgba(10, 14, 31, 0)'); // Fully transparent at the start
        gradient.addColorStop(0.3, color); // Fade in
        gradient.addColorStop(0.7, color); // Fade out
        gradient.addColorStop(1, 'rgba(10, 14, 31, 0)'); // Fully transparent at the end

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + Math.cos(this.angle) * this.length,
            this.y + Math.sin(this.angle) * this.length);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.thickness;
        ctx.stroke();
    }
}


// Initialize lines
for (let i = 0; i < numLines; i++) {
    lines.push(new Line());
}

function animate() {
    ctx.fillStyle = 'rgba(10, 14, 31, 0.2)'; // More transparent for more intense tracers
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const line of lines) {
        line.update();
        line.draw();
    }

    requestAnimationFrame(animate);
}

// Start the animation
animate();


// Resize canvas when window is resized
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});



document.addEventListener('DOMContentLoaded', () => {
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    if ($navbarBurgers.length > 0) {
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', (e) => {
                const target = el.dataset.target;
                const $target = document.getElementById(target);
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');
                e.stopPropagation(); // Prevent this click from being propagated up
            });
        });
    }

    document.addEventListener('click', (e) => {
        $navbarBurgers.forEach(el => {
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            if (!el.contains(e.target) && !$target.contains(e.target) && $target.classList.contains('is-active')) {
                el.classList.remove('is-active');
                $target.classList.remove('is-active');
            }
        });

        // If the clicked element is a link inside the burger menu
        if (e.target.matches('.navbar-item') || e.target.closest('.button')) {
            $navbarBurgers.forEach(el => {
                const target = el.dataset.target;
                const $target = document.getElementById(target);
                el.classList.remove('is-active');
                $target.classList.remove('is-active');
            });
        }
    });
});