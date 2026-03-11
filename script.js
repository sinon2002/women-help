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