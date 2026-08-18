/* ==========================================
   CONFIGURATIONS (Edit your details here)
   ========================================== */
const CONFIG = {
    name: "Suma",
    password: "suma",
    birthday: "2026-08-21T00:00:00",
    letterDate: "21 August",
    letterLines: [
        "There are some people who quietly become a beautiful part of our lives.",
        "You are one of those people.",
        "Thank you for being the quiet comfort in noisy days, and for bringing light into every simple moment."
    ],
    photos: [
        {
            url: "assets/photo1.jpg",
            caption: "Some moments don't look special when they happen... until you look back."
        },
        {
            url: "assets/photo2.jpg",
            caption: "A quiet smile that somehow stays in memory forever."
        },
        {
            url: "assets/photo3.jpg",
            caption: "Just another chapter in our endless story."
        }
    ]
};

/* ==========================================
   DOM INITIALIZATION & EVENTS
   ========================================== */
document.addEventListener("DOMContentLoaded", () => {
    initStarsCanvas();
    setupNavigation();
    setupPassword();
    setupEnvelope();
    setupMusic();
    setupGallery();
    setupCountdown();
    setupScrollEffects();
    setupSurpriseModal();
    setupLightbox();

    // Set dynamic elements
    document.getElementById("bday-name").textContent = CONFIG.name;
    document.getElementById("letter-date-display").textContent = CONFIG.letterDate;
});

/* Canvas Particle Animation (Subtle Stars & Glow) */
function initStarsCanvas() {
    const canvas = document.getElementById("bg-canvas");
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const stars = Array.from({ length: 60 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2,
        alpha: Math.random(),
        speed: Math.random() * 0.005 + 0.002
    }));

    function animate() {
        ctx.clearRect(0, 0, width, height);
        stars.forEach(star => {
            star.alpha += star.speed;
            if (star.alpha > 1 || star.alpha < 0) star.speed = -star.speed;

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(244, 114, 182, ${Math.abs(star.alpha) * 0.5})`;
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

/* Page Navigation Flow */
function setupNavigation() {
    const btnEnter = document.getElementById("btn-enter");
    const btnBegin = document.getElementById("btn-begin");

    btnEnter.addEventListener("click", () => {
        transitionSection("sec-opening", "sec-welcome");
    });

    btnBegin.addEventListener("click", () => {
        transitionSection("sec-welcome", "sec-password");
    });
}

function transitionSection(hideId, showId) {
    const hideEl = document.getElementById(hideId);
    const showEl = document.getElementById(showId);

    hideEl.style.opacity = "0";
    hideEl.style.transition = "opacity 0.8s ease";

    setTimeout(() => {
        hideEl.classList.add("hidden");
        showEl.classList.remove("hidden");
        showEl.style.opacity = "0";
        setTimeout(() => {
            showEl.style.transition = "opacity 0.8s ease";
            showEl.style.opacity = "1";
        }, 50);
    }, 800);
}

/* Password System */
function setupPassword() {
    const submitBtn = document.getElementById("btn-pass-submit");
    const input = document.getElementById("pass-input");
    const errorMsg = document.getElementById("pass-error");

    function checkPassword() {
        if (input.value.trim().toLowerCase() === CONFIG.password.toLowerCase()) {
            const passSec = document.getElementById("sec-password");
            const storyContainer = document.getElementById("story-container");

            passSec.style.opacity = "0";
            passSec.style.transition = "opacity 1s ease";

            setTimeout(() => {
                passSec.classList.add("hidden");
                storyContainer.classList.remove("hidden");
                window.scrollTo({ top: 0, behavior: "smooth" });
            }, 1000);
        } else {
            errorMsg.textContent = "Hmm... that's not the one. Try again ❤️";
            input.value = "";
            input.focus();
        }
    }

    submitBtn.addEventListener("click", checkPassword);
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") checkPassword();
    });
}

/* Envelope & Letter Trigger */
function setupEnvelope() {
    const envelope = document.querySelector(".envelope");
    const envelopeWrapper = document.getElementById("envelope-btn");
    let opened = false;

    envelopeWrapper.addEventListener("click", () => {
        if (opened) return;
        opened = true;
        envelope.classList.add("open");

        setTimeout(() => {
            document.getElementById("sec-letter").scrollIntoView({ behavior: "smooth" });
            startTypewriter();
        }, 1200);
    });
}

/* Cinematic Typewriter Effect */
function startTypewriter() {
    const container = document.getElementById("typewriter-text");
    if (container.innerHTML !== "") return; // Prevent double trigger

    let lineIndex = 0;

    function typeNextLine() {
        if (lineIndex < CONFIG.letterLines.length) {
            const p = document.createElement("p");
            container.appendChild(p);

            let charIndex = 0;
            const currentText = CONFIG.letterLines[lineIndex];

            const interval = setInterval(() => {
                if (charIndex < currentText.length) {
                    p.textContent += currentText.charAt(charIndex);
                    charIndex++;
                } else {
                    clearInterval(interval);
                    lineIndex++;
                    setTimeout(typeNextLine, 1200); // Cinematic pause between lines
                }
            }, 55);
        }
    }
    typeNextLine();
}

/* Audio Control System */
function setupMusic() {
    const musicBtn = document.getElementById("music-toggle");
    const musicStatus = document.getElementById("music-status");
    const audio = document.getElementById("bg-music");
    let isPlaying = false;

    musicBtn.addEventListener("click", () => {
        if (!isPlaying) {
            audio.play().then(() => {
                isPlaying = true;
                musicStatus.textContent = "Music ON";
            }).catch(() => {
                musicStatus.textContent = "Error Loading";
            });
        } else {
            audio.pause();
            isPlaying = false;
            musicStatus.textContent = "Music OFF";
        }
    });
}

/* Photo Gallery Population */
function setupGallery() {
    const gallery = document.getElementById("photo-gallery-container");
    CONFIG.photos.forEach(photo => {
        const item = document.createElement("div");
        item.className = "photo-item";
        item.innerHTML = `
            <img src="${photo.url}" alt="Memory" loading="lazy">
            <p class="photo-caption">"${photo.caption}"</p>
        `;
        gallery.appendChild(item);
    });
}

/* Countdown Logic */
function setupCountdown() {
    const bdayDate = new Date(CONFIG.birthday).getTime();

    const timer = setInterval(() => {
        const now = new Date().getTime();
        const diff = bdayDate - now;

        if (diff <= 0) {
            clearInterval(timer);
            document.getElementById("countdown-title").textContent = "Today is your day. ❤️";
            document.getElementById("timer").style.display = "none";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = String(days).padStart(2, "0");
        document.getElementById("hours").textContent = String(hours).padStart(2, "0");
        document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
        document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
    }, 1000);
}

/* Scroll Animation Observer */
function setupScrollEffects() {
    const observerOptions = { threshold: 0.2 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, observerOptions);

    document.querySelectorAll(".reveal-quote").forEach(el => observer.observe(el));
}

/* Modal Popup Setup */
function setupSurpriseModal() {
    const btn = document.getElementById("btn-surprise");
    const modal = document.getElementById("surprise-modal");
    const closeBtn = document.getElementById("modal-close");

    btn.addEventListener("click", () => modal.classList.remove("hidden"));
    closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
}

/* Image Lightbox Setup */
function setupLightbox() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.getElementById("lightbox-close");

    document.getElementById("photo-gallery-container").addEventListener("click", (e) => {
        if (e.target.tagName === "IMG") {
            lightboxImg.src = e.target.src;
            lightbox.classList.remove("hidden");
        }
    });

    closeBtn.addEventListener("click", () => lightbox.classList.add("hidden"));
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) lightbox.classList.add("hidden");
    });
}
