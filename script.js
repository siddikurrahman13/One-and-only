/* =========================================
   PAGE CONTROL
========================================= */

function goToPage(pageId) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {

        page.classList.remove("active");

    });


    const target = document.getElementById(pageId);

    if (target) {

        setTimeout(() => {

            target.classList.add("active");

        }, 100);

    }

}



/* =========================================
   WELCOME → PASSWORD
========================================= */

function goToPassword() {

    goToPage("passwordPage");

}



/* =========================================
   PASSWORD
========================================= */

function checkPassword() {

    const input =
        document.getElementById("passwordInput");

    const error =
        document.getElementById("passwordError");


    /*
       CHANGE YOUR PASSWORD HERE
    */

    const correctPassword = "suma";


    if (
        input.value.trim().toLowerCase()
        === correctPassword.toLowerCase()
    ) {

        error.classList.remove("show");

        input.value = "";

        goToPage("envelopePage");

    }

    else {

        error.classList.add("show");

        input.classList.add("shake");

        setTimeout(() => {

            input.classList.remove("shake");

        }, 500);

    }

}



/* =========================================
   ENTER KEY PASSWORD
========================================= */

document
    .getElementById("passwordInput")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {

            checkPassword();

        }

    });



/* =========================================
   ENVELOPE
========================================= */

function openEnvelope() {

    const envelope =
        document.querySelector(".envelope");

    const hint =
        document.getElementById("envelopeHint");


    if (
        envelope.classList.contains("open")
    ) {

        return;

    }


    envelope.classList.add("open");

    hint.innerHTML =
        "Opening something special... ❤️";


    setTimeout(() => {

        goToPage("letterPage");

        startLetter();

    }, 1800);

}



/* =========================================
   LETTER TYPEWRITER
========================================= */

let letterStarted = false;


function startLetter() {

    if (letterStarted) {

        return;

    }


    letterStarted = true;


    const text = `There are some people who quietly become a beautiful part of our lives.

No grand announcement.
No perfect beginning.

Just little conversations,
random moments,
shared smiles,
and somehow...

they become special.

You are one of those people.

I may not always say everything that I feel,
but I hope you know that your presence matters.

Today is your special day,
and I simply want to wish you something beautiful.

May you always find reasons to smile.
May your dreams slowly become reality.
And may every new chapter of your life
be better than the one before it.

Happy Birthday. ❤️`;


    const element =
        document.getElementById("letterText");


    let index = 0;


    function typeWriter() {

        if (index < text.length) {

            if (text[index] === "\n") {

                element.innerHTML += "<br>";

            }

            else {

                element.innerHTML +=
                    text[index];

            }


            index++;


            setTimeout(
                typeWriter,
                28
            );

        }

        else {

            document
                .getElementById("letterContinue")
                .style.display = "inline-block";

        }

    }


    typeWriter();

}



/* =========================================
   RESTART
========================================= */

function restartJourney() {

    letterStarted = false;


    document
        .getElementById("letterText")
        .innerHTML = "";


    document
        .getElementById("letterContinue")
        .style.display = "none";


    const envelope =
        document.querySelector(".envelope");

    envelope.classList.remove("open");


    document
        .getElementById("passwordError")
        .classList.remove("show");


    goToPage("welcomePage");

}



/* =========================================
   FLOATING HEARTS
========================================= */

function createHeart() {

    const heart =
        document.createElement("div");


    heart.classList.add(
        "floating-heart"
    );


    const hearts = [
        "❤️",
        "♡",
        "♥",
        "💗",
        "✦"
    ];


    heart.innerHTML =
        hearts[
            Math.floor(
                Math.random() *
                hearts.length
            )
        ];


    heart.style.left =
        Math.random() * 100 + "vw";


    heart.style.fontSize =
        (10 + Math.random() * 14) + "px";


    heart.style.animationDuration =
        (5 + Math.random() * 5) + "s";


    document
        .querySelector(".floating-hearts")
        .appendChild(heart);


    setTimeout(() => {

        heart.remove();

    }, 10000);

}


setInterval(
    createHeart,
    900
);



/* =========================================
   BACKGROUND MUSIC
========================================= */

const music =
    document.getElementById(
        "backgroundMusic"
    );


document.addEventListener(
    "click",
    function() {

        /*
           Browser automatically blocks
           autoplay until user interacts.

           This starts music after interaction.
        */

        if (music) {

            music.volume = 0.25;

            music.play().catch(() => {});

        }

    },
    { once: true }
);
