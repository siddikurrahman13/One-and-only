/* =========================
   MUSIC CONTROLLER
========================= */
function toggleAudio() {
  const music = document.getElementById("bgMusic");
  const btn = document.getElementById("navMusicBtn");
  if (!music) return;
  if (music.paused) {
    music.play().then(function() {
      btn.innerHTML = "⏸ Pause";
    }).catch(function(err) {
      console.log("Audio play error:", err);
    });
  } else {
    music.pause();
    btn.innerHTML = "♫ Music";
  }
}

/* =========================
   PAGE HISTORY
========================= */
var pageHistoryArray = ["welcome"];

function showPage(pageId) {
  if (chapter1Typing) clearInterval(chapter1Typing);
  if (chapter2Typing) clearInterval(chapter2Typing);
  if (chapter3Typing) clearInterval(chapter3Typing);
  if (birthdayTyping) clearInterval(birthdayTyping);

  hideAllPages();

  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.remove("hidden");
    targetPage.style.display = "flex";
  }

  if (pageHistoryArray[pageHistoryArray.length - 1] !== pageId) {
    pageHistoryArray.push(pageId);
  }

  const backBtn = document.getElementById("navBackBtn");
  if (backBtn) backBtn.style.display = pageHistoryArray.length > 1 ? "inline-flex" : "none";
}

function goBackPage() {
  if (pageHistoryArray.length > 1) {
    pageHistoryArray.pop();
    const previousPageId = pageHistoryArray[pageHistoryArray.length - 1];

    if (chapter1Typing) clearInterval(chapter1Typing);
    if (chapter2Typing) clearInterval(chapter2Typing);
    if (chapter3Typing) clearInterval(chapter3Typing);
    if (birthdayTyping) clearInterval(birthdayTyping);

    hideAllPages();

    const targetPage = document.getElementById(previousPageId);
    if (targetPage) {
      targetPage.classList.remove("hidden");
      targetPage.style.display = "flex";
    }

    const backBtn = document.getElementById("navBackBtn");
    if (backBtn) backBtn.style.display = pageHistoryArray.length > 1 ? "inline-flex" : "none";
  }
}

function hideAllPages() {
  const pages = [
    "welcome","passwordPage","envelopePage","letterPage","chapter2",
    "chapter3","finalChapter","birthdayReveal","celebrationScene","ultimateEnding"
  ];
  pages.forEach(function(id) {
    const page = document.getElementById(id);
    if (page) {
      page.classList.add("hidden");
      page.style.display = "none";
    }
  });
}

/* =========================
   WELCOME → PASSWORD
========================= */
function nextPage() {
  showPage("passwordPage");
}

/* =========================
   PASSWORD → ENVELOPE
========================= */
function checkPassword() {
  const input = document.getElementById("password");
  const pass = input.value.toLowerCase().trim();
  if (pass === "favourite chapter") {
    showPage("envelopePage");
  } else {
    input.classList.add("wrong");
    setTimeout(() => input.classList.remove("wrong"), 500);
    alert("Wrong Password 💔");
  }
}

/* =========================
   ENVELOPE → CHAPTER 1
========================= */
function openEnvelope() {
  showPage("letterPage");
  document.getElementById("nextChapterBtn").style.display = "none";
  startLetter();
}

/* =========================
   CHAPTER 1
========================= */
const lines = [
  "Hey tui... ❤️",
  "Haa... tokei bolchi. 😊",
  "Hoyto vabchis...",
  "Eta sudhu ekta website... na",
  "Eta amar tor jonno banano ekta chotto surprise. 🤍",
  "So aste aste por...",
  "Golpota ekhono shesh hoyni... ✨"
];

let line = 0;
let chapter1Typing = null;

function startLetter() {
  line = 0;
  document.getElementById("typewriter").innerHTML = "";
  showNextLine();
}

function showNextLine() {
  if (line >= lines.length) {
    setTimeout(function () {
      document.getElementById("nextChapterBtn").style.display = "block";
    }, 500);
    return;
  }

  const text = lines[line];
  let i = 0;
  const box = document.getElementById("typewriter");

  chapter1Typing = setInterval(function () {
    box.innerHTML += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(chapter1Typing);
      chapter1Typing = null;
      box.innerHTML += "<br><br>";
      line++;
      setTimeout(showNextLine, 1200);
    }
  }, 50);
}

/* =========================
   CHAPTER 2
========================= */
function goToChapter2() {
  showPage("chapter2");
  startChapter2();
}

const chapter2Lines = [
  "Our story didn't really start with a beautiful moment... 🤍",
  "বরং শুরুটা হয়েছিল একটা classroom-এ... আর একটা ছোট্ট ঝগড়া দিয়ে। 😬",
  "সেদিন কে জানত, ওই মানুষটার সাথেই একদিন এত কথা জমে থাকবে... এত memories তৈরি হবে।",
  "At that time, we weren't even close... সত্যি বলতে, friend বললেও হয়তো একটু বেশি বলা হয়ে যেত।",
  "Then came 28 November 2023... ✨",
  "একটা simple video-তে তোর একটা comment... আর somehow, সেখান থেকেই আবার আমাদের কথা শুরু হলো।",
  "কথা বলতে বলতে একসময় তুই আমাকে তোর number দিতে চাইলি।",
  "But TikTok-এর privacy তখন আমাদের একটু পরীক্ষা নিতে চেয়েছিল। 😭😂",
  "তাই numberটা সরাসরি দেখাতে না পেরে তুই যেভাবে দিলি...",
  "\"zero one seven\" 😁",
  "সত্যি বলছি, তোর ওই বুদ্ধি দেখে আমি সেদিন একটু অবাকই হয়েছিলাম। 😂❤️",
  "তারপর... একটার পর একটা দিন চলে গেল।",
  "কথা বাড়তে থাকল, রাতগুলো একটু একটু করে ছোট হতে থাকল... আর অজান্তেই তুই হয়ে উঠলি আমার পরিচিত মানুষগুলোর মধ্যে একটু আলাদা একজন।",
  "But then... 27 April 2024. 💔",
  "হঠাৎ করেই তুই হারিয়ে গেলি।",
  "কোনো proper goodbye ছিল না... কোনো explanation-ও না।",
  "আমি তোকে খুঁজেছি... কিন্তু কোথাও পেলাম না।",
  "সময় চলে গেল। Days became months... আর আমি ভেবেছিলাম, হয়তো গল্পটা এখানেই শেষ।",
  "But some stories don't end when we think they do...",
  "Because then came 2 June 2025. ✨",
  "একদিন হঠাৎ... an unknown number থেকে একটা message এলো।",
  "আর message-এর ওপাশে ছিলি... তুই। ❤️",
  "কী অদ্ভুত না? এতদিন পরেও somehow, we found our way back to each other.",
  "তারপর থেকে আবার কথা... আবার সেই পরিচিত feeling... আর এবার গল্পটা আর হারিয়ে যায়নি।",
  "Maybe that's what makes our story a little different...",
  "কিছু মানুষ জীবনে আসে খুব quietly...",
  "কিছুদিন থাকে... তারপর হারিয়ে যায়...",
  "কিন্তু যদি তারা সত্যিই important হয়, somehow life তাদের আবার ফিরিয়ে আনে। 🤍",
  "And maybe... that's exactly what happened with us.",
  "কিন্তু জানিস তো... এই গল্পটা এখানেও শেষ হয়নি।",
  "Because the best part of our story... is still being written. ❤️"
];

let chapter2Line = 0;
let chapter2Typing = null;

function startChapter2() {
  chapter2Line = 0;
  document.getElementById("chapter2Story").innerHTML = "";
  showChapter2Line();
}

function showChapter2Line() {
  const box = document.getElementById("chapter2Story");
  const btn = document.getElementById("chapter2NextBtn");
  const memory = document.getElementById("memoryNo");

  if (chapter2Line >= chapter2Lines.length) {
    btn.innerHTML = "Continue to Chapter 3 →";
    btn.style.display = "inline-flex";
    btn.onclick = goToChapter3;
    return;
  }

  if (memory) memory.textContent = String(chapter2Line + 1).padStart(2, "0");

  const text = chapter2Lines[chapter2Line];
  let specialClass = "";
  if (text.includes("28 November 2023")) specialClass = "dateMoment";
  if (text.includes("27 April 2024")) specialClass = "sadMoment";
  if (text.includes("2 June 2025")) specialClass = "returnMoment";

  box.innerHTML = `<div class="chapterStoryText ${specialClass}"></div>`;
  const textBox = box.querySelector(".chapterStoryText");
  let i = 0;
  btn.style.display = "none";

  chapter2Typing = setInterval(function () {
    textBox.innerHTML += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(chapter2Typing);
      chapter2Typing = null;
      chapter2Line++;
      btn.innerHTML = "Continue ✦";
      btn.style.display = "inline-flex";
      btn.onclick = showChapter2Line;
    }
  }, 45);
}

/* =========================
   CHAPTER 3
========================= */
function goToChapter3() {
  showPage("chapter3");
  startChapter3();
}

const chapter3Lines = [
  "At first, everything was pretty simple... 😊",
  "আমি একটু বেশি fun করতাম, আর তুইও সেগুলো equally enjoy করতি।",
  "তারপর কখন যে আমরা এতটা close হয়ে গেলাম... honestly, I didn't even notice. 🤍",
  "কিছু রাত তো এমনও গেছে—9টা-10টায় কথা শুরু করে কখন যে সকাল 5টা-6টা বেজে গেছে, বুঝতেই পারিনি। 🌙",
  "সবচেয়ে অবাক করার বিষয়... এতক্ষণ কথা বলার পরেও আমাদের কথা যেন কখনো শেষ হতো না।",
  "আর তোর ওই জেদটা... 😑❤️",
  "মাঝে মাঝে সত্যিই বিরক্ত করতি, but somehow... that stubborn little side of you became one of my favourite things. 😂",
  "কিন্তু জানিস...",
  "ঠিক কখন তুই আমার কাছে এতটা important হয়ে গেলি, সেটা আমি নিজেও বুঝতে পারিনি।",
  "কোনো particular moment ছিল না... কোনো special day-ও না।",
  "Maybe it happened somewhere between all those random talks, stupid jokes, little arguments and endless nights...",
  "কখন যে 'তুই' শুধু একজন মানুষ না হয়ে আমার favourite person হয়ে গেলি... I just didn't notice. 🤍",
  "And maybe... that's the part I never really said. ❤️"
];

let chapter3Line = 0;
let chapter3Typing = null;

function startChapter3() {
  chapter3Line = 0;
  document.getElementById("chapter3Story").innerHTML = "";
  document.getElementById("chapter3NextBtn").style.display = "none";
  showNextChapter3Line();
}

function showNextChapter3Line() {
  const box = document.getElementById("chapter3Story");
  const btn = document.getElementById("chapter3NextBtn");

  if (chapter3Line >= chapter3Lines.length) {
    btn.innerHTML = "Continue to Final Chapter →";
    btn.style.display = "inline-flex";
    btn.onclick = goToFinalChapter;
    return;
  }

  const text = chapter3Lines[chapter3Line];
  let i = 0;
  box.innerHTML = "";
  btn.style.display = "none";

  chapter3Typing = setInterval(function () {
    box.innerHTML += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(chapter3Typing);
      chapter3Typing = null;
      chapter3Line++;
      btn.innerHTML = "Continue ✦";
      btn.style.display = "inline-flex";
      btn.onclick = showNextChapter3Line;
    }
  }, 45);
}

function goToFinalChapter() {
  showPage("finalChapter");
}

/* =========================
   BIRTHDAY
========================= */
const birthdayLines = [
  "আজকের দিনটা শুধু একটা date না... 🤍",
  "আজ এমন একজন মানুষের birthday, যে somehow আমার গল্পের একটা very special part হয়ে গেছে। ❤️",
  "তোর জন্য আমার একটাই wish—",
  "তুই সবসময় হাসিস, happy থাকিস, আর তোর ছোট-বড় সব dream একদিন সত্যি হোক। ✨",
  "আর জীবন তোকে যত দূরেই নিয়ে যাক... তোর এই সুন্দর হাসিটা যেন কখনো হারিয়ে না যায়। 🤍"
];

let birthdayLine = 0;
let birthdayTyping = null;

function openFinalSurprise() {
  showPage("birthdayReveal");
  birthdayLine = 0;
  const box = document.getElementById("birthdayMessage");
  box.innerHTML = "";
  const btn = document.getElementById("oneMoreBtn");
  btn.innerHTML = "Continue ✨";
  btn.style.display = "none";
  showBirthdayLine();
}

function showBirthdayLine() {
  const box = document.getElementById("birthdayMessage");
  const btn = document.getElementById("oneMoreBtn");

  if (birthdayLine >= birthdayLines.length) {
    btn.innerHTML = "🎂 Let's Celebrate";
    btn.style.display = "inline-flex";
    btn.onclick = goToCelebration;
    return;
  }

  box.innerHTML = "";
  const text = birthdayLines[birthdayLine];
  let i = 0;
  btn.style.display = "none";

  birthdayTyping = setInterval(function () {
    box.innerHTML += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(birthdayTyping);
      birthdayTyping = null;
      birthdayLine++;
      btn.innerHTML = "Continue ✨";
      btn.style.display = "inline-flex";
      btn.onclick = showBirthdayLine;
    }
  }, 45);
}

/* =========================
   CELEBRATION
========================= */
function goToCelebration() {
  showPage("celebrationScene");
  const message = document.getElementById("celebrationMessage");
  message.innerHTML = "";
  document.getElementById("celebrationContinueBtn").style.display = "none";
  document.getElementById("makeWishBtn").style.display = "inline-flex";
  document.getElementById("celebrationConfetti").innerHTML = "";
}

function startCelebration() {
  const wishButton = document.getElementById("makeWishBtn");
  const message = document.getElementById("celebrationMessage");
  const continueBtn = document.getElementById("celebrationContinueBtn");

  wishButton.style.display = "none";

  message.innerHTML = `
    <p class="wishMoment">
      Close your eyes... 🤍<br><br>
      Make a wish. ✨
    </p>`;

  setTimeout(function () {
    message.innerHTML = `
      <p class="wishMoment">
        And now... make it come true. ❤️
      </p>`;
    createConfetti();
  }, 2200);

  setTimeout(function () {
    continueBtn.style.display = "inline-flex";
  }, 4200);
}

function createConfetti() {
  const container = document.getElementById("celebrationConfetti");
  const pieces = ["✦", "✧", "♡", "✿", "⋆", "♥"];
  container.innerHTML = "";

  for (let i = 0; i < 35; i++) {
    const piece = document.createElement("span");
    piece.innerHTML = pieces[Math.floor(Math.random() * pieces.length)];
    piece.style.left = Math.random() * 100 + "%";
    piece.style.animationDelay = Math.random() * 2 + "s";
    piece.classList.add("confettiPiece");
    container.appendChild(piece);
  }
}

/* =========================
   FINAL MESSAGE
========================= */
function goToFinalMessage() {
  showPage("ultimateEnding");

  const box = document.getElementById("ultimateText");
  box.innerHTML = "";

  const finalLines = [
    "I don't know what the future holds for us...",
    "But I'm really glad that, somehow, our paths crossed again. 🤍",
    "From a classroom argument to endless midnight conversations...",
    "কী সুন্দর একটা little journey হয়ে গেছে, তাই না? ❤️",
    "আর যদি আজ তোর জন্য একটা wish করতে পারতাম...",
    "তাহলে চাইতাম, life তোকে ঠিক সেই happiness-টাই দিক, যেটা তুই unknowingly আমার জীবনে নিয়ে এসেছিস। 🤍",
    "This whole little world you just walked through...",
    "এটা শুধু একটা website ছিল না।",
    "এটা ছিল আমার মনে জমে থাকা কিছু কথা... শুধু তোর জন্য। ❤️",
    "21 August — তোর day, আর somehow এখন আমার কাছেও এই দিন টি special একটা দিন।",
    "সবসময় happy থাকিস। হাসিস। আর নিজের মতোই থাকিস। 🤍",
    "— From someone who's really glad you found your way back. ❤️"
  ];

  let currentLine = 0;

  function typeFinalLine() {
    if (currentLine >= finalLines.length) return;

    const paragraph = document.createElement("p");
    paragraph.className = "finalTypingLine";
    box.appendChild(paragraph);

    paragraph.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    const text = finalLines[currentLine];
    let i = 0;

    const typing = setInterval(function () {
      paragraph.textContent += text.charAt(i);
      i++;

      if (i >= text.length) {
        clearInterval(typing);
        currentLine++;
        setTimeout(typeFinalLine, 1200);
      }
    }, 45);
  }

  setTimeout(typeFinalLine, 1000);
}

/* =========================
   PAGE LOAD
========================= */
window.addEventListener("load", function () {
  pageHistoryArray = ["welcome"];
  showPage("welcome");
});
