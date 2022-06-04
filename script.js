//Clock variables
const TIME_LIMIT = 600;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let ableToStart = true;

//Home score variables
let homeScores = 0;

//Away score variables
let awayScores = 0;

document.getElementById("clock-time").innerHTML = formatTime(timeLeft);
document.getElementById("home-score").innerHTML = formatScore(homeScores);
document.getElementById("away-score").innerHTML = formatScore(awayScores);

function formatTime(time) {
    let minutes = Math.floor(time/60);
    let seconds = time % 60;

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${minutes}:${seconds}`;
}

let timerInterval = null;

function startClock() {
    if(ableToStart==true) {
        timerInterval = setInterval(() => {
            timePassed += 1;
            timeLeft = TIME_LIMIT - timePassed;
            document.getElementById("clock-time").innerHTML = formatTime(timeLeft);
        }, 1000);
        ableToStart = false;
    }
}

function stopClock() {
    clearInterval(timerInterval);
    ableToStart = true;
}

function resetClock() {
    stopClock();
    timeLeft = TIME_LIMIT;
    timePassed = 0;
    document.getElementById("clock-time").innerHTML = formatTime(timeLeft);
}

function formatScore(score) {
    if (score < 10) {
        score = `0${score}`;
    }
    return `${score}`;
}

function addHomeScore(add) {
    homeScores += add;
    document.getElementById("home-score").innerHTML = formatScore(homeScores);
}

function minusHomeScore(minus) {
    if (homeScores >= minus) {
        homeScores -= minus;
    }
    document.getElementById("home-score").innerHTML = formatScore(homeScores);
}

function addAwayScore(add) {
    awayScores += add;
    document.getElementById("away-score").innerHTML = formatScore(awayScores);
}

function minusAwayScore(minus) {
    if (awayScores >= minus) {
        awayScores -= minus;
    }
    document.getElementById("away-score").innerHTML = formatScore(awayScores);
}


