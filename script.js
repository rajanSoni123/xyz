// ======================================================================================
// --- NEW: Preload all GIFs to prevent loading delays and "skipping" ---
// ======================================================================================
// We create a list of all the GIF files you are using.
const gifsToPreload = [
    "gif1.gif", "gif2.gif", "gif3.gif", 
    "gif4.gif", "gif5.gif", "gif6.gif"
];

// We loop through the list and create a new Image object for each GIF.
// This tells the browser to download and cache them in the background.
gifsToPreload.forEach(src => {
    const img = new Image();
    img.src = src;
});
// ======================================================================================
// (The rest of the code is the same)
// ======================================================================================

// --- Get references to the HTML elements ---
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const questionElement = document.getElementById('question');
const subtitleElement = document.getElementById('subtitle');
const gifElement = document.getElementById('gif');
const container = document.querySelector('.container');

// --- Customization Section ---
const randomSubtitles = [
    "Are you absolutely, positively sure?", "Maybe you misclicked? It happens!", "My heart just did a little sad flip-flop.",
    "Take a deep breath and reconsider?", "Is that your final answer? Really?", "I'll be sad, you know...",
];
const pleadingMessages = [
    { message: "Ek aur baar Soch lo! 😠", subtitle: "kyu aisa kar rahe ho 😠", gif: "gif5.gif" },
    { message: "Babu Man jao na! Kitna bhav khaogi 😭", subtitle: "bhut glt baat hai yaar😥", gif: "gif4.gif" },
    { message: "This is my last try... please?🥺", subtitle: "I will be very, very sad...", gif: "gif3.gif" }
];
const yesButtonColors = [
    '#4CAF50', '#45a049', '#3e8e41', '#337a36', '#2a652c', '#1e4d22'
];

// --- Logic ---
let noClickCount = 0;

function moveNoButton() {
    const containerRect = container.getBoundingClientRect();
    const noBtnRect = noBtn.getBoundingClientRect();
    const yesBtnRect = yesBtn.getBoundingClientRect();
    let newTop, newLeft;
    let isOverlapping;
    let attempts = 0; 

    do {
        newTop = Math.random() * (containerRect.height - noBtnRect.height);
        newLeft = Math.random() * (containerRect.width - noBtnRect.width);
        const noBtnFutureLeft = newLeft + containerRect.left;
        const noBtnFutureTop = newTop + containerRect.top;
        isOverlapping = (
            noBtnFutureLeft < yesBtnRect.right &&
            noBtnFutureLeft + noBtnRect.width > yesBtnRect.left &&
            noBtnFutureTop < yesBtnRect.bottom &&
            noBtnFutureTop + noBtnRect.height > yesBtnRect.top
        );
        attempts++;
        if (attempts > 100) { break; }
    } while (isOverlapping);

    noBtn.style.position = 'absolute';
    noBtn.style.top = `${newTop}px`;
    noBtn.style.left = `${newLeft}px`;
}

noBtn.addEventListener('click', () => {
    noClickCount++;
    if (noClickCount < yesButtonColors.length) {
        yesBtn.style.backgroundColor = yesButtonColors[noClickCount];
    }
    if (noClickCount <= 4) {
        questionElement.textContent = "Please think again! 🤔";
        const randomIndex = Math.floor(Math.random() * randomSubtitles.length);
        subtitleElement.textContent = randomSubtitles[randomIndex];
        gifElement.src = "gif2.gif";
    }
    if (noClickCount === 4) {
        noBtn.style.transition = 'top 0.4s ease-out, left 0.4s ease-out';
        noBtn.addEventListener('mousemove', moveNoButton);
    }
    if (noClickCount > 4) {
        const messageIndex = noClickCount - 5; 
        if (messageIndex < pleadingMessages.length) {
            questionElement.textContent = pleadingMessages[messageIndex].message;
            subtitleElement.textContent = pleadingMessages[messageIndex].subtitle;
            gifElement.src = pleadingMessages[messageIndex].gif;
        } else {
            questionElement.textContent = "You're being mean now! 😠";
            subtitleElement.textContent = "Just click yes... please.";
            gifElement.src = "gif5.gif";
        }
    }
});

yesBtn.addEventListener('click', () => {
    questionElement.textContent = "YESSS! I totally knew it! It's official, we're besties for life now! 🥳✨";
    subtitleElement.textContent = "";
    gifElement.src = "gif6.gif";
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
});