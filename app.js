//Getting all the HTML elements
const song = document.querySelector("#default-sound");
const play = document.querySelector(".play");
const outline = document.querySelector(".moving-outline circle");
const video = document.querySelector(".vid-container video");
const timeselect = document.querySelectorAll(".time-cont button");
const sounds = document.querySelectorAll(".sound-picker button");
let timeDisplay = document.querySelector(".time-display");
const outlineLength = outline.getTotalLength();
let fakeDuration = 600;
outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;

//Playing or pausing the sound
play.addEventListener("click", () => {
    playPause();
    console.log("sonng was played");
});

//Function to play or pause a song.
let playPause = () => {
    if (song.paused) {
        video.play();
        song.play();
        play.src = "./svg/pause.svg";
    } else {
        video.pause();
        song.pause();
        play.src = "./svg/play.svg";
    }
};

//Check if Seconds are double digited or not
function checkDouble(timeSec) {
    if (timeSec <= 9) {
        return "0" + timeSec;
    } else {
        return timeSec;
    }
}
//For Selecting the Time Duration.
timeselect.forEach(function (option) {
    option.addEventListener("click", function () {
        fakeDuration = this.getAttribute("data-time");
        let minutes = Math.floor(fakeDuration / 60);
        let seconds = Math.floor(fakeDuration % 60);

        console.log(checkDouble(seconds));
        timeDisplay.innerHTML = `${minutes}:${checkDouble(seconds)}`;
        resetAll();
    });
});
//Reset Function
function resetAll() {
    song.currentTime = 0;
    video.pause();
    song.pause();
    play.src = "./svg/play.svg";
    outline.style.strokeDashoffset = outlineLength;
}

//Replay/Restart the Music with the Replay Button
document.querySelector(".replay").addEventListener("click", function replay() {
    resetAll();
});

//Selecting Environment
sounds.forEach(function (e) {
    e.addEventListener("click", function () {
        song.src = this.getAttribute("data-sound");
        video.src = this.getAttribute("data-video");
        resetAll();
    });
});

//Main Function To track the playing song duration , updating the timer and animating the playing circle.
song.ontimeupdate = function () {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);
    //Animating the circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;
    s = checkDouble(seconds); //To get the text in Double digits
    console.log("this is  the final seconds ", s);
    timeDisplay.innerHTML = `${minutes} : ${s}`;
    if (currentTime >= fakeDuration) {
        resetAll();
    }
};
