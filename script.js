let songs= [
    {title: "Elijah Waters - Lose Control", src:"./music/Elijah Waters - Lose Control.mp3"}, 
    {title: "LP - Lost On You (Live)", src:"./music/LP - Lost On You (Live).mp3"}, 
    {title: "Son Little - Lay Down", src:"./music/Son Little - Lay Down.mp3"}
];

let music= document.querySelector("audio");

let musicDuration= document.querySelector(".end");

let singerAndMusic= document.querySelector("marquee");

let bar= document.getElementById("progress");

let indexMusic= 0;

renderMusic(indexMusic);

music.addEventListener("timeupdate", moveBar);

function renderMusic(index){
    music.setAttribute("src", songs[index].src);
    music.addEventListener("loadeddata", () => {
        singerAndMusic.textContent= songs[index].title;
        musicDuration.textContent= secondsToMin(Math.floor(music.duration));
    });
}

setInterval(() => {
    bar.value = music.currentTime;
    if (Math.floor(music.currentTime) == Math.floor(bar.max)){
        next();
    }
}, 500);

music.onloadedmetadata = function(){            
    setTimeout(() => {
        bar.max = music.duration
    })};

    bar.addEventListener("change", () => {
        music.currentTime = bar.value;
    });


function moveBar(){
    bar.style.width= "540px";
    let currentTime= document.querySelector(".start");
    currentTime.textContent= secondsToMin(Math.floor(music.currentTime));
}


function secondsToMin(seconds){
    let min= Math.floor(seconds / 60);
    let sec= seconds % 60;
    if (sec < 10){
        sec= "0" + sec;
    }
    return min+ ":" +sec;
}
function play(){
    music.play();
}

function pause(){
    music.pause();
}
function back(){
    indexMusic--;
    if (indexMusic < 0){
        indexMusic= 2;
    }
    renderMusic(indexMusic);
    music.play();
}
function next(){
    indexMusic++;
    if (indexMusic > 2){
        indexMusic= 0;
    }
    renderMusic(indexMusic);
    music.play();
}
function stop(){
    music.pause();
    music.currentTime= 0;
}
function volumeup(){
    music.volume+=0.1;
}
function volumedown(){
    music.volume-=0.1;
}