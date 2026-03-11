function openSurvey(){
document.getElementById("surveyModal").style.display="flex";
}

function sendSurvey(){

alert("Спасибо за ваш ответ ❤️");

document.getElementById("surveyModal").style.display="none";

}

function openContact(type){

const modal = document.getElementById("contactModal")
const title = document.getElementById("modalTitle")
const body = document.getElementById("modalBody")

if(type === "psychologist"){

title.innerText = "Связаться с психологом"

body.innerHTML = `
<a href="tel:+996700000000">📞 Позвонить</a><br><br>
<a href="https://wa.me/996700000000" target="_blank">💬 Написать в WhatsApp</a>
`

}

if(type === "lawyer"){

title.innerText = "Юридическая помощь"

body.innerHTML = `
<a href="tel:+996700000111">📞 Позвонить юристу</a><br><br>
<a href="https://wa.me/996700000111" target="_blank">💬 Написать в WhatsApp</a>
`

}

if(type === "group"){

title.innerText = "Группа поддержки"

body.innerHTML = `
<a href="https://t.me/yourgroup" target="_blank">📢 Открыть Telegram группу</a>
`

}

modal.style.display = "flex"
}

function closeModal(){
document.getElementById("contactModal").style.display="none"
}

const slides = document.querySelectorAll(".slide")

let index = 0

setInterval(()=>{

slides[index].classList.remove("active")

index++

if(index >= slides.length){
index = 0
}

slides[index].classList.add("active")

},4000)


function toggleStories(){

const box = document.getElementById("storiesBox")

box.classList.toggle("active")

}


function toggleAdvice(){

const box = document.getElementById("adviceBox")

box.classList.toggle("active")

}


const videos = [
{
title:"История 1",
src:"videos/video1.mp4"
},

{
title:"История 2",
src:"videos/video2.mp4"
},

{
title:"История 3",
src:"videos/video3.mp4"
}

]

let videoIndex = 0

const video = document.getElementById("storyVideo")
const title = document.getElementById("videoTitle")

function updateVideo(){

video.src = videos[videoIndex].src
title.textContent = videos[videoIndex].title

video.load()
video.play()

}

function nextVideo(){

videoIndex++

if(videoIndex >= videos.length){

videoIndex = 0

}

updateVideo()

}

function prevVideo(){

videoIndex--

if(videoIndex < 0){

videoIndex = videos.length - 1

}

updateVideo()

}


