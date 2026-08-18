/* =========================================================
   FAVOURITE CHAPTER — COMPLETE JAVASCRIPT
   ========================================================= */

const CONFIG = {
  name: "Suma",
  password: "suma",
  birthday: "2026-08-21T00:00:00",

  letterDate: "21 August",

  letter: [
    "There are some people who quietly become a beautiful part of our lives.",
    "No grand announcement. No perfect beginning. Just little conversations, random moments, shared smiles, and somehow... they become special.",
    "You are one of those people.",
    "I may not always say everything that I feel, but I hope you know that your presence matters.",
    "Today is your special day, and I simply want to wish you something beautiful.",
    "May you always find reasons to smile. May your dreams slowly become reality. And may every new chapter of your life be better than the one before it.",
    "Happy Birthday. ❤️"
  ],

  memories: [
    {
      number: "01",
      title: "The Beginning",
      text: "A simple beginning that slowly became something much more beautiful than either of us probably expected."
    },
    {
      number: "02",
      title: "The Conversations",
      text: "Random topics, long conversations, little jokes and those moments where time somehow disappeared."
    },
    {
      number: "03",
      title: "The Little Things",
      text: "Sometimes the smallest things become the memories we remember the longest."
    },
    {
      number: "04",
      title: "The Familiar Feeling",
      text: "Some people simply feel comfortable to talk to. That kind of connection is quietly special."
    },
    {
      number: "05",
      title: "The Smiles",
      text: "A few words, a silly moment, or just knowing you're there can turn an ordinary day into a better one."
    },
    {
      number: "06",
      title: "This Chapter",
      text: "Whatever happens next, this part of the story will always be one worth remembering."
    }
  ],

  photos: [
    { src: "assets/photo1.jpg", caption: "A moment worth keeping." },
    { src: "assets/photo2.jpg", caption: "Some memories feel like little pieces of home." },
    { src: "assets/photo3.jpg", caption: "A simple moment, a beautiful memory." },
    { src: "assets/photo4.jpg", caption: "The kind of moment you wish you could pause." }
  ],

  littleThings: [
    "You deserve happiness.",
    "Your dreams matter.",
    "Your smile matters.",
    "You are allowed to take your time.",
    "You are more special than you probably realize.",
    "And I hope you never forget that. ❤️"
  ],

  surpriseText:
    "If you are reading this, you made it all the way to the end. And that means this little story reached the person it was made for. I hope this tiny corner of the internet made you smile, even for a moment.",

  music: "assets/music.mp3"
};


/* =========================================================
   ELEMENTS
   ========================================================= */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const scenes = $$(".scene");
const music = $("#backgroundMusic");

let currentScene = "opening";
let letterStarted = false;
let musicStarted = false;
let countdownTimer = null;


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  buildMemories();
  buildGallery();
  buildLittleThings();
  setupNavigation();
  setupPassword();
  setupEnvelope();
  setupSurprise();
  setupLightbox();
  setupMusic();
  startParticles();
  startCountdown();

  setTimeout(() => {
    $("#loader").classList.add("done");
    openingSequence();
  }, 900);
});


function applyConfig() {
  $("#letterName").textContent = `${CONFIG.name}...`;
  $("#letterDate").textContent = CONFIG.letterDate;
  $("#birthdayName").textContent = CONFIG.name;
  $("#surpriseText").textContent = CONFIG.surpriseText;

  const surpriseImage = $("#surpriseImage");
  surpriseImage.src = CONFIG.photos[0]?.src || "assets/photo1.jpg";

  if (music) {
    music.src = CONFIG.music;
    music.volume = 0.25;
  }

  document.title = `Favourite Chapter — ${CONFIG.name}`;
}


/* =========================================================
   OPENING SEQUENCE
   ========================================================= */

function openingSequence() {
  setTimeout(() => {
    $("#openingLine2").classList.remove("hidden");
  }, 1700);

  setTimeout(() => {
    $("#enterStoryBtn").classList.remove("hidden");
  }, 3000);
}

$("#enterStoryBtn").addEventListener("click", () => {
  goTo("welcome");
});


/* =========================================================
   NAVIGATION
   ========================================================= */

function goTo(id) {
  const target = document.getElementById(id);
  if (!target) return;

  scenes.forEach(scene => scene.classList.remove("active"));

  setTimeout(() => {
    target.classList.add("active");
    currentScene = id;

    if (target.classList.contains("scroll-scene")) {
      target.scrollTop = 0;
    }

    if (id === "letter") startLetter();
    if (id === "little-things") revealLittleThings();
  }, 60);

  attemptMusic();
}

function setupNavigation() {
  $$("[data-next]").forEach(button => {
    button.addEventListener("click", () => {
      goTo(button.dataset.next);
    });
  });

  $$("[data-prev]").forEach(button => {
    button.addEventListener("click", () => {
      goTo(button.dataset.prev);
    });
  });
}


/* =========================================================
   PASSWORD
   ========================================================= */

function setupPassword() {
  $("#passwordForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const input = $("#passwordInput");
    const error = $("#passwordError");
    const value = input.value.trim();

    if (value.toLowerCase() === CONFIG.password.toLowerCase()) {
      error.textContent = "";
      error.classList.remove("show");
      input.value = "";
      goTo("envelope");
    } else {
      error.textContent = "Hmm... that's not the one. Try again. ❤️";
      error.classList.add("show");
      input.classList.remove("shake");
      void input.offsetWidth;
      input.classList.add("shake");
      input.focus();
    }
  });
}


/* =========================================================
   ENVELOPE
   ========================================================= */

function setupEnvelope() {
  $("#envelopeButton").addEventListener("click", () => {
    const envelope = $(".envelope");
    const hint = $("#envelopeHint");

    if (envelope.classList.contains("open")) return;

    envelope.classList.add("open");
    hint.textContent = "Opening something special...";

    burstParticles(18);

    setTimeout(() => {
      goTo("letter");
    }, 1500);
  });
}


/* =========================================================
   LETTER TYPEWRITER
   ========================================================= */

async function startLetter() {
  if (letterStarted) return;
  letterStarted = true;

  const container = $("#letterText");
  const signature = $("#letterSignature");
  const continueButton = $("#letterContinue");

  container.innerHTML = "";

  for (const paragraph of CONFIG.letter) {
    const p = document.createElement("p");
    p.style.marginBottom = "20px";
    container.appendChild(p);

    for (const char of paragraph) {
      p.textContent += char;
      await wait(char === "." ? 130 : char === "," ? 90 : 27);
    }
  }

  signature.classList.remove("hidden");

  setTimeout(() => {
    continueButton.classList.remove("hidden");
  }, 500);
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


/* =========================================================
   MEMORIES
   ========================================================= */

function buildMemories() {
  const grid = $("#memoryGrid");

  grid.innerHTML = CONFIG.memories.map(memory => `
    <article class="memory-card">
      <div class="memory-number">${escapeHTML(memory.number)}</div>
      <h3>${escapeHTML(memory.title)}</h3>
      <p>${escapeHTML(memory.text)}</p>
    </article>
  `).join("");
}


/* =========================================================
   GALLERY
   ========================================================= */

function buildGallery() {
  const grid = $("#galleryGrid");

  grid.innerHTML = CONFIG.photos.map((photo, index) => `
    <button class="gallery-item" type="button"
      data-index="${index}"
      aria-label="Open memory ${index + 1}">
      <img src="${escapeAttribute(photo.src)}"
           alt="${escapeAttribute(photo.caption)}"
           loading="lazy"
           onerror="this.parentElement.classList.add('image-missing'); this.style.opacity='0';">
      <span class="gallery-caption">${escapeHTML(photo.caption)}</span>
    </button>
  `).join("");

  $$(".gallery-item").forEach(item => {
    item.addEventListener("click", () => {
      const index = Number(item.dataset.index);
      openLightbox(CONFIG.photos[index]);
    });
  });
}


/* =========================================================
   LIGHTBOX
   ========================================================= */

function setupLightbox() {
  $("#lightboxClose").addEventListener("click", closeLightbox);

  $("#lightbox").addEventListener("click", (event) => {
    if (event.target.id === "lightbox") closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
}

function openLightbox(photo) {
  $("#lightboxImage").src = photo.src;
  $("#lightboxImage").alt = photo.caption;
  $("#lightboxCaption").textContent = photo.caption;
  $("#lightbox").classList.add("open");
  $("#lightbox").setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  $("#lightbox").classList.remove("open");
  $("#lightbox").setAttribute("aria-hidden", "true");
}


/* =========================================================
   LITTLE THINGS
   ========================================================= */

function buildLittleThings() {
  $("#littleThings").innerHTML = CONFIG.littleThings.map(text => `
    <div class="little-line">${escapeHTML(text)}</div>
  `).join("");
}

function revealLittleThings() {
  $$("#littleThings .little-line").forEach((line, index) => {
    setTimeout(() => line.classList.add("visible"), index * 380);
  });
}


/* =========================================================
   COUNTDOWN
   ========================================================= */

function startCountdown() {
  updateCountdown();
  countdownTimer = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
  const target = new Date(CONFIG.birthday).getTime();
  const now = Date.now();
  const difference = target - now;

  if (difference <= 0) {
    $("#countdown").classList.add("countdown-today");
    $("#countdownTitle").innerHTML = "Today is your<br><em>special day.</em>";
    $("#countdownMessage").textContent = `Happy Birthday, ${CONFIG.name}. ❤️`;
    $("#countdownBox").style.display = "none";
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  $("#days").textContent = String(days).padStart(2, "0");
  $("#hours").textContent = String(hours).padStart(2, "0");
  $("#minutes").textContent = String(minutes).padStart(2, "0");
  $("#seconds").textContent = String(seconds).padStart(2, "0");
}


/* =========================================================
   SURPRISE
   ========================================================= */

function setupSurprise() {
  $("#surpriseBtn").addEventListener("click", () => {
    burstParticles(35);
    setTimeout(() => goTo("surprise"), 350);
  });

  $("#restartBtn").addEventListener("click", () => {
    resetExperience();
    goTo("opening");
  });
}

function resetExperience() {
  letterStarted = false;
  $("#letterText").innerHTML = "";
  $("#letterSignature").classList.add("hidden");
  $("#letterContinue").classList.add("hidden");
  $(".envelope").classList.remove("open");
  $("#envelopeHint").textContent = "Tap the envelope to open";
  $("#passwordError").classList.remove("show");

  $("#openingLine2").classList.add("hidden");
  $("#enterStoryBtn").classList.add("hidden");

  setTimeout(openingSequence, 500);
}


/* =========================================================
   MUSIC
   ========================================================= */

function setupMusic() {
  $("#musicBtn").addEventListener("click", toggleMusic);

  $("#volumeSlider").addEventListener("input", event => {
    music.volume = Number(event.target.value);
  });

  document.addEventListener("pointerdown", attemptMusic, { once: true });
}

function attemptMusic() {
  if (!music || musicStarted) return;

  music.volume = Number($("#volumeSlider").value);

  music.play()
    .then(() => {
      musicStarted = true;
      $("#musicLabel").textContent = "On";
      $("#musicBtn").classList.add("playing");
    })
    .catch(() => {
      // Browser may block autoplay; the Music button remains available.
    });
}

function toggleMusic() {
  if (!music) return;

  if (music.paused) {
    music.play()
      .then(() => {
        musicStarted = true;
        $("#musicLabel").textContent = "On";
      })
      .catch(() => {
        $("#musicLabel").textContent = "Add music";
      });
  } else {
    music.pause();
    $("#musicLabel").textContent = "Off";
  }
}


/* =========================================================
   PARTICLES
   ========================================================= */

function startParticles() {
  setInterval(() => createParticle(), 900);
}

function createParticle() {
  const particle = document.createElement("span");
  particle.className = "particle";

  const symbols = ["♥", "✦", "·", "♡"];
  particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];

  particle.style.left = `${Math.random() * 100}vw`;
  particle.style.fontSize = `${8 + Math.random() * 12}px`;
  particle.style.setProperty("--drift", `${-90 + Math.random() * 180}px`);
  particle.style.animationDuration = `${6 + Math.random() * 5}s`;

  $("#particles").appendChild(particle);

  setTimeout(() => particle.remove(), 12000);
}

function burstParticles(amount) {
  for (let i = 0; i < amount; i++) {
    setTimeout(createParticle, i * 35);
  }
}


/* =========================================================
   HELPERS
   ========================================================= */

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHTML(value);
}


/* =========================================================
   PREVENT ACCIDENTAL BACKGROUND SCROLL
   ========================================================= */

document.addEventListener("wheel", event => {
  const active = document.querySelector(".scene.active");
  if (!active || !active.classList.contains("scroll-scene")) return;

  // Scroll remains inside the active scene.
  if (active.scrollHeight <= active.clientHeight) {
    event.preventDefault();
  }
}, { passive: false });
