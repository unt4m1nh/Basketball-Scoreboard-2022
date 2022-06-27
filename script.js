//Auido variables
var overtimeSound = new Audio();

var currentPossesion = 0;

//Clock variables
const TIME_LIMIT = 600;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let ableToStart = true;

//Short clock variables
const ATTACK_TIME = 24;
let atkTimePassed = 0;
let atkTimeLeft = ATTACK_TIME; 
let ableToCon = true;


//Home varialbes
let homeScores = 0;
let homeTimeout = 6;
let homeFouls = 0;

//Away variables
let awayScores = 0;
let awayTimeout = 6;
let awayFouls = 0;

var bonusLabel = "";

document.getElementById("clock-time").innerHTML = formatTime(timeLeft);
document.getElementById("short-clock").innerHTML = formatScore(atkTimeLeft);
document.getElementById("home-score").innerHTML = formatScore(homeScores);
document.getElementById("away-score").innerHTML = formatScore(awayScores);
document.getElementById("home-timeout").innerHTML = homeTimeout;
document.getElementById("away-timeout").innerHTML = awayTimeout;
document.getElementById("home-fouls").innerHTML = homeFouls;
document.getElementById("away-fouls").innerHTML = awayFouls;

overtimeSound.src = "asserts\audio\buzzer.wav"

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
let shortClockInterval = null;

function startClock() {
    if(ableToStart==true) {
        timerInterval = setInterval(() => {
            timePassed += 1;
            timeLeft = TIME_LIMIT - timePassed;
            if (timeLeft == 0) {
                clearInterval(timerInterval);
                resetFouls();
            }
            document.getElementById("clock-time").innerHTML = formatTime(timeLeft);
        }, 1000);
        ableToStart = false;
    }
}

function startShortClock() {
    if (ableToCon == true) {
        shortClockInterval = setInterval(() => {
            atkTimePassed += 1;
            atkTimeLeft = ATTACK_TIME - atkTimePassed;
            if (atkTimeLeft == 0) {
                resetShortClock();
            }
            document.getElementById("short-clock").innerHTML = formatScore(atkTimeLeft);
        }, 1000);
        ableToCon = false;
    }
}


function stopClock() {
    clearInterval(timerInterval);
    clearInterval(shortClockInterval);
    ableToStart = true;
    ableToCon = true;
}

function resetClock() {
    stopClock();
    timeLeft = TIME_LIMIT;
    timePassed = 0;
    document.getElementById("clock-time").innerHTML = formatTime(timeLeft);
}

function resetShortClock() {
    clearInterval(shortClockInterval);
    atkTimeLeft = ATTACK_TIME;
    atkTimePassed = 0;
    ableToCon = true;
    startShortClock();
    if (currentPossesion == 0) {
        setPossesion(1);
        currentPossesion = 1;
    } else {
        setPossesion(0);
        currentPossesion = 0;
    }
}

function addAtkTime() {
    clearInterval(shortClockInterval);
    atkTimeLeft = 14;
    atkTimePassed = 0;
    ableToCon = true;
    startShortClock();
}


function addTime(time) {
    if (timeLeft + time <= TIME_LIMIT) {
        timePassed = TIME_LIMIT - (timeLeft + time);
        timeLeft += time;
        stopClock();
        document.getElementById("clock-time").innerHTML = formatTime(timeLeft);
    }
}

function minusTime(time) {
    if (timeLeft - time >= 0) {
        timePassed = TIME_LIMIT - (timeLeft - time);
        timeLeft -= time;
        stopClock();
        document.getElementById("clock-time").innerHTML = formatTime(timeLeft);
    }
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
    if (ableToStart == false) {
        resetShortClock();
    }
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
    if (ableToStart == false) {
        resetShortClock();
    }
}

function minusAwayScore(minus) {
    if (awayScores >= minus) {
        awayScores -= minus;
    }
    document.getElementById("away-score").innerHTML = formatScore(awayScores);
}

function resetScore() {
    homeScores = 0;
    awayScores = 0;
    document.getElementById("home-score").innerHTML = formatScore(homeScores);
    document.getElementById("away-score").innerHTML = formatScore(awayScores);
}

function setPossesion(pos) {
    var btn1 = document.getElementById("home-pos-btn");
    var btn2 = document.getElementById("away-pos-btn");
    if (pos == 0) {
        currentPossesion = 0;
        btn1.style.backgroundColor = "#7FFF00"
        btn2.style.backgroundColor = "#FFFFFF"
    } 
    if (pos == 1) {
        currentPossesion = 1;
        btn1.style.backgroundColor = "#FFFFFF"
        btn2.style.backgroundColor = "#7FFF00"
    }
    clearInterval(shortClockInterval);
    atkTimeLeft = ATTACK_TIME;
    atkTimePassed = 0;
    ableToCon = true;
    if (ableToStart == false) {
        startShortClock();
    }
}

function changeFouls(team, change) {
    if (team == 0) {
        homeFouls += change;
        document.getElementById("home-fouls").innerHTML = homeFouls;
        if (homeFouls >= 5) {
            bonusLabel = "BONUS";
            document.getElementById("home-bonus").innerHTML = bonusLabel;
        } else {
            bonusLabel = "";
            document.getElementById("home-bonus").innerHTML = bonusLabel;
        }
    } else {
        awayFouls += change;
        document.getElementById("away-fouls").innerHTML = awayFouls;
        if (awayFouls >= 5) {
            bonusLabel = "BONUS";
            document.getElementById("away-bonus").innerHTML = bonusLabel;
        } else {
            bonusLabel = "";
            document.getElementById("away-bonus").innerHTML = bonusLabel;
        }
    }
}

function changeTimeout(team, change) {
    if (team == 0) {
        homeTimeout += change;
        document.getElementById("home-timeout").innerHTML = homeTimeout;
    } else {
        awayTimeout += change;
        document.getElementById("away-timeout").innerHTML = awayTimeout;
    }
}

function resetFouls() {
    homeFouls = 0;
    awayFouls = 0;
    document.getElementById("home-fouls").innerHTML = homeFouls;
    document.getElementById("away-fouls").innerHTML = awayFouls;
}







