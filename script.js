
/* ===================================
   GET HTML ELEMENTS
=================================== */

const startBtn = document.getElementById("startBtn");
const welcome = document.getElementById("welcome");
const countdown = document.getElementById("countdown");
const number = document.getElementById("number");

const hearts = document.getElementById("hearts");
const balloons = document.getElementById("balloons");
const music = document.getElementById("bgMusic");

const musicBtn = document.getElementById("musicBtn");
const volumeControl = document.getElementById("volumeControl");

const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

const gallery = document.getElementById("gallery");


/* ===================================
   MUSIC CONTROL SYSTEM
=================================== */

// Set initial volume
music.volume = 0.5;

// Update music button text
function updateMusicButton() {

    if (music.paused) {
        musicBtn.innerHTML = "🔇 Music Off";
    } else {
        musicBtn.innerHTML = "🔊 Music On";
    }

}

// Music On / Off
musicBtn.onclick = function () {

    if (music.paused) {

        music.play().then(function () {
            updateMusicButton();
        }).catch(function (error) {
            console.log("Music could not play:", error);
            updateMusicButton();
        });

    } else {

        music.pause();
        updateMusicButton();

    }

};

// Volume Control
volumeControl.oninput = function () {

    music.volume = Number(this.value);

};

// Update button if music state changes
music.addEventListener("play", updateMusicButton);
music.addEventListener("pause", updateMusicButton);

// Initial button state
updateMusicButton();


/* ===================================
   CANVAS SIZE
=================================== */

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


/* ===================================
   PHOTO DATA
=================================== */

const photos = [
    "assets/images/pic1.jpg",
    "assets/images/pic2.jpg",
    "assets/images/pic3.jpg",
    "assets/images/pic4.jpg",
    "assets/images/pic5.jpg",
    "assets/images/pic6.jpg",
    "assets/images/pic7.jpg"
];

const captions = [
    "❤️ Our First Meet ❤️",
    "😊 Beautiful Smile",
    "🌸 Sweet Memory",
    "💖 Together Forever",
    "🎉 Happy Moments",
    "📸 Cute Selfie",
    "🥰 Best Day Ever"
];

const dates = [
    "14 February 2024",
    "20 March 2024",
    "15 April 2024",
    "30 May 2024",
    "18 June 2024",
    "25 July 2024",
    "01 August 2024"
];

const memories = [
    "Every beautiful story starts with one unforgettable moment.",
    "Your smile always makes my day brighter.",
    "One of my favourite memories with you.",
    "Together, every moment feels magical.",
    "A day full of happiness and laughter.",
    "This selfie always brings back good memories.",
    "Thank you for making life so beautiful."
];


/* ===================================
   SLIDER VARIABLES
=================================== */

let currentSlide = 0;
let autoSlide = null;
let isPaused = false;
let isStarted = false;
let isFinished = false;


/* ===================================
   SLIDER ELEMENTS
=================================== */

const sliderImage = document.getElementById("sliderImage");
const caption = document.getElementById("caption");
const memoryDate = document.getElementById("memoryDate");
const memoryText = document.getElementById("memoryText");
const counter = document.getElementById("counter");

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const pauseBtn = document.getElementById("pauseBtn");


/* ===================================
   START BUTTON & COUNTDOWN
=================================== */

startBtn.onclick = function () {

    if (isStarted) return;

    isStarted = true;
    startBtn.disabled = true;

    // Start background music
    music.play().then(function () {

        updateMusicButton();

    }).catch(function (error) {

        console.log("Music could not start:", error);
        updateMusicButton();

    });

    createConfetti();

    welcome.style.display = "none";
    countdown.style.display = "flex";

    let i = 3;

    number.innerHTML = i;

    const timer = setInterval(function () {

        i--;

        if (i > 0) {

            number.innerHTML = i;

        } else if (i === 0) {

            number.innerHTML = "🎂";

        } else {

            clearInterval(timer);

            countdown.innerHTML = `
                <div style="text-align:center;">
                    <h1 style="font-size:70px;">
                        🎉 Happy Birthday ❤️
                    </h1>

                    <p style="font-size:28px;">
                        Your Surprise Starts Now...
                    </p>
                </div>
            `;

            setTimeout(function () {

                countdown.style.display = "none";

                gallery.style.display = "block";

                currentSlide = 0;
                isPaused = false;
                isFinished = false;

                pauseBtn.innerHTML = "⏸ Pause";

                showSlide(currentSlide);

                startAutoSlide();

            }, 3000);

        }

    }, 1000);

};


/* ===================================
   FLOATING HEARTS
=================================== */

function createHeart() {

    const heart = document.createElement("div");

    heart.className = "heart";
    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * 100 + "%";

    heart.style.animationDuration =
        (4 + Math.random() * 4) + "s";

    hearts.appendChild(heart);

    setTimeout(function () {
        heart.remove();
    }, 8000);

}

setInterval(createHeart, 300);


/* ===================================
   FLOATING BALLOONS
=================================== */

function createBalloon() {

    const balloon = document.createElement("div");

    balloon.className = "balloon";

    const list = ["🎈", "🎈", "🎈", "🎉"];

    balloon.innerHTML =
        list[Math.floor(Math.random() * list.length)];

    balloon.style.left = Math.random() * 100 + "%";

    balloon.style.animationDuration =
        (6 + Math.random() * 4) + "s";

    balloons.appendChild(balloon);

    setTimeout(function () {
        balloon.remove();
    }, 10000);

}

setInterval(createBalloon, 1200);


/* ===================================
   CONFETTI ANIMATION
=================================== */

let confetti = [];

function createConfetti() {

    confetti = [];

    for (let i = 0; i < 150; i++) {

        confetti.push({

            x: Math.random() * canvas.width,

            y: Math.random() * -canvas.height,

            size: Math.random() * 8 + 4,

            speed: Math.random() * 4 + 2,

            color: `hsl(${Math.random() * 360},100%,50%)`

        });

    }

}

function drawConfetti() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    confetti.forEach(function (c) {

        ctx.fillStyle = c.color;

        ctx.fillRect(
            c.x,
            c.y,
            c.size,
            c.size
        );

        c.y += c.speed;

    });

    confetti = confetti.filter(function (c) {
        return c.y < canvas.height;
    });

    requestAnimationFrame(drawConfetti);

}

drawConfetti();


/* ===================================
   SHOW PHOTO SLIDE + ANIMATION
=================================== */

function showSlide(index) {

    sliderImage.src = photos[index];

    caption.innerHTML = captions[index];

    memoryDate.innerHTML = "📅 " + dates[index];

    memoryText.innerHTML = "📍 " + memories[index];

    counter.innerHTML =
        (index + 1) + " / " + photos.length;


    // Remove old animation

    const animatedElements = [
        sliderImage,
        caption,
        memoryDate,
        memoryText,
        counter
    ];

    animatedElements.forEach(function (element) {

        element.classList.remove(
            "slide-animation",
            "text-animation"
        );

        // Restart CSS animation
        void element.offsetWidth;

        if (element === sliderImage) {

            element.classList.add("slide-animation");

        } else {

            element.classList.add("text-animation");

        }

    });

}


/* ===================================
   FINAL BIRTHDAY MESSAGE
=================================== */

function showFinalMessage() {

    const style = document.createElement("style");

    style.innerHTML = `

        @keyframes finalFadeIn {

            from {
                opacity: 0;
                transform: scale(0.8);
            }

            to {
                opacity: 1;
                transform: scale(1);
            }

        }

        #finalScreen button:hover {

            transform: scale(1.08);
            background: #ff4f81;
            color: white;

        }

    `;

    document.head.appendChild(style);

    const finalScreen = document.createElement("div");

    finalScreen.id = "finalScreen";

    finalScreen.style.cssText = `

        position: fixed;
        inset: 0;
        z-index: 99999;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 25px;
        box-sizing: border-box;
        color: white;

        background: linear-gradient(
            135deg,
            #ff758c,
            #ff7eb3,
            #a18cd1
        );

        animation: finalFadeIn 1.5s ease;

    `;

    finalScreen.innerHTML = `

        <div style="font-size:75px;">
            🎂🎉❤️
        </div>

        <h1 style="
            font-size: clamp(35px, 7vw, 65px);
            margin: 15px 0;
        ">
            Happy Birthday! ❤️
        </h1>

        <h2 style="
            font-size: clamp(22px, 4vw, 35px);
        ">
            You Are Truly Special! 🌸
        </h2>

        <p style="
            font-size: clamp(17px, 3vw, 23px);
            max-width: 650px;
            line-height: 1.7;
        ">
            May your life always be filled with happiness,
            beautiful memories, endless smiles and success.
            Keep shining and keep smiling! ❤️
        </p>

        <h2 style="font-size:30px;">
            Lots of Love! 💖
        </h2>

        <div style="font-size:55px;">
            🎈 🎁 🎊
        </div>

        <button id="replayBtn" style="
            margin-top: 25px;
            padding: 14px 35px;
            font-size: 19px;
            border: none;
            border-radius: 30px;
            background: white;
            color: #ff4f81;
            cursor: pointer;
            font-weight: bold;
            transition: 0.3s;
        ">
            🔄 Replay Surprise
        </button>

    `;

    document.body.appendChild(finalScreen);

    document.getElementById("replayBtn").onclick = function () {

        location.reload();

    };

}


/* ===================================
   NEXT SLIDE
=================================== */

function nextSlide() {

    if (isFinished) return;

    currentSlide++;

    if (currentSlide >= photos.length) {

        clearInterval(autoSlide);

        autoSlide = null;

        isFinished = true;

        gallery.style.display = "none";

        showFinalMessage();

        return;

    }

    showSlide(currentSlide);

}


/* ===================================
   PREVIOUS SLIDE
=================================== */

function prevSlide() {

    if (isFinished) return;

    currentSlide--;

    if (currentSlide < 0) {

        currentSlide = photos.length - 1;

    }

    showSlide(currentSlide);

}


/* ===================================
   BUTTON EVENTS
=================================== */

nextBtn.onclick = nextSlide;

prevBtn.onclick = prevSlide;


/* ===================================
   AUTO SLIDE
=================================== */

function startAutoSlide() {

    clearInterval(autoSlide);

    if (isFinished || isPaused) return;

    autoSlide = setInterval(function () {

        nextSlide();

    }, 3000);

}


/* ===================================
   PAUSE & PLAY
=================================== */

pauseBtn.onclick = function () {

    if (!isPaused) {

        clearInterval(autoSlide);

        autoSlide = null;

        this.innerHTML = "▶ Play";

        isPaused = true;

    } else {

        isPaused = false;

        startAutoSlide();

        this.innerHTML = "⏸ Pause";

    }

};


/* ===================================
   KEYBOARD SUPPORT
=================================== */

document.addEventListener("keydown", function (e) {

    if (gallery.style.display !== "block") return;

    if (isFinished) return;

    if (e.key === "ArrowRight") {

        nextSlide();

    }

    if (e.key === "ArrowLeft") {

        prevSlide();

    }

});


/* ===================================
   INITIAL SLIDE
=================================== */

showSlide(currentSlide);
