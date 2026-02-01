let gameseq = [];
let userseq = [];
let level = 0;
let started = false;
let btns = ["red", "blue", "green", "yellow"];
let h2 = document.querySelector("h2");

// Start the game on keydown or by clicking the header (helps mobile/testing)
document.addEventListener("keydown", function (e) {
    if (!started) {
        console.log('start detected by key:', e.key);
        started = true;
        levelup();
    }
});
if (h2) {
    h2.addEventListener('click', function () {
        if (!started) {
            console.log('start detected by click on header');
            started = true;
            levelup();
        }
    });
}

function gameflash(btn) {
    if (!btn) return;
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userflash(btn) {
    if (!btn) return;
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelup() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`#${randColor}`);
    gameseq.push(randColor);
    console.log('levelup: chosen', randColor, 'randbtn:', randbtn);
    gameflash(randbtn);
    console.log('gameseq:', gameseq);
}

function checkans(idx) {
    console.log('checkans:', idx, userseq[idx], gameseq[idx]);
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! <b>Level: ${level}</b>. Press any key to restart`;
        document.body.style.backgroundColor = "red";
        setTimeout(function () {
            document.body.style.backgroundColor = "white";
        }, 400);
        reset();
    }
}

function btnpress() {
    let btn = this;
    userflash(btn);
    let usercolor = btn.id;
    console.log('btnpress:', usercolor);
    userseq.push(usercolor);
    checkans(userseq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

reset();
function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
    if (h2) h2.innerText = "Press any key to start";
}