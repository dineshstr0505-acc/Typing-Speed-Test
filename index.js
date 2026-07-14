const paragraph = document.getElementById("paragraph");
const input = document.getElementById("input");
const time = document.getElementById("time");
const wpm = document.getElementById("wpm");
const mistakes = document.getElementById("mistakes");
const accuracy = document.getElementById("accuracy");
const restart = document.getElementById("restart");

let timer = 60;
let interval = null;
let started = false;

function startTimer() {
    interval = setInterval(() => {
        timer--;
        time.innerText = timer;

        if (timer <= 0) {
            clearInterval(interval);
            input.disabled = true;
            calculateResult();
        }
    }, 1000);
}

input.addEventListener("input", () => {

    if (!started) {
        started = true;
        startTimer();
    }

    let originalText = paragraph.innerText;
    let typedText = input.value;

    let wrong = 0;

    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] !== originalText[i]) {
            wrong++;
        }
    }

    mistakes.innerText = wrong;

    let correct = typedText.length - wrong;

    let acc = typedText.length === 0
        ? 100
        : Math.round((correct / typedText.length) * 100);

    accuracy.innerText = acc + "%";
});

function calculateResult() {

    let words = input.value.trim().split(/\s+/).length;

    if (input.value.trim() === "") {
        words = 0;
    }

    let result = words;

    wpm.innerText = result;
}

restart.addEventListener("click", () => {

    clearInterval(interval);

    timer = 60;
    started = false;

    time.innerText = 60;
    wpm.innerText = 0;
    mistakes.innerText = 0;
    accuracy.innerText = "100%";

    input.value = "";
    input.disabled = false;
    input.focus();

});