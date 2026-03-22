import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAGgvhJJguOe-5NPjzCCeCYqGuXr3MxxTE",
  authDomain: "women-support-488a3.firebaseapp.com",
  projectId: "women-support-488a3",
  storageBucket: "women-support-488a3.appspot.com",
  messagingSenderId: "333591134994",
  appId: "1:333591134994:web:d4e0f4a579e3fa578ca9cb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);













function openSurvey(){
document.getElementById("surveyModal").style.display="flex";
}

function sendSurvey(){

alert("Спасибо за ваш ответ ❤️");

document.getElementById("surveyModal").style.display="none";

}

window.openContact = function(type){

const modal = document.getElementById("contactModal")
const title = document.getElementById("modalTitle")
const body = document.getElementById("modalBody")

if(type === "psychologist"){

title.innerText="Связаться с психологом"

body.innerHTML=`
<a class="modal-btn call-btn" href="tel:+996700000000">
📞 Позвонить сейчас
</a>

<a class="modal-btn whatsapp-btn" href="https://wa.me/996700000000" target="_blank">
💬 Чат в WhatsApp
</a>
`

}

if(type === "lawyer"){

title.innerText="Юридическая помощь"

body.innerHTML=`
<a class="modal-btn call-btn" href="tel:+996700000111">
📞 Позвонить сейчас
</a>

<a class="modal-btn whatsapp-btn" href="https://wa.me/996700000111" target="_blank">
💬 Чат в WhatsApp
</a>
`

}



if(type === "group"){

title.innerText="Группа поддержки"

body.innerHTML=`

<a class="modal-btn telegram-btn" href="https://t.me/yourgroup" target="_blank">
✈️ Открыть Telegram группу
</a>

<div class="modal-divider">
------ or ------
</div>

<button class="modal-question">
💬 Задать вопрос
</button>

<div class="modal-cancel" onclick="closeModal()">
Отмена
</div>

`


}

modal.style.display="flex"
}




window.onclick = function(event){

const modal = document.getElementById("contactModal")

if(event.target === modal){
modal.style.display="none"
}

}








window.closeModal = function(){
document.getElementById("contactModal").style.display="none";
}                         



let videos = []
let videoIndex = 0
let container
let title

document.addEventListener("DOMContentLoaded", async () => {

container = document.getElementById("videoContainer")
title = document.getElementById("videoTitle")

const querySnapshot = await getDocs(collection(db,"videos"))

querySnapshot.forEach((doc)=>{

const data = doc.data()

videos.push({
url: data.url,
title: data.title
})

})

if(videos.length > 0){
showVideo(0)
}

})




function showVideo(index){

const data = videos[index]

let videoHtml = ""
let videoClass = "video-horizontal"

// 🎬 YouTube
if (data.url.includes("youtube.com") || data.url.includes("youtu.be")) {

let videoId = ""

// обычная ссылка
if (data.url.includes("v=")) {
videoId = data.url.split("v=")[1].split("&")[0]
}
// короткая ссылка
else if (data.url.includes("youtu.be")) {
videoId = data.url.split("/").pop()
}
// shorts
else if (data.url.includes("shorts")) {
videoId = data.url.split("shorts/")[1].split("?")[0]
videoClass = "video-vertical"
}

// 👉 если это shorts — делаем вертикально
if (data.url.includes("shorts")) {
videoClass = "video-vertical"
}

videoHtml = `
<iframe class="${videoClass}"
src="https://www.youtube.com/embed/${videoId}"
frameborder="0"
allowfullscreen>
</iframe>
`
}

// 📁 обычное видео
else {

// 👉 если вертикальное видео (примерно определяем)
videoClass = "video-horizontal"

videoHtml = `
<video class="${videoClass}" controls src="${data.url}"></video>
`
}

container.innerHTML = videoHtml
title.textContent = data.title

}


















async function loadStories() {
  const storiesBox = document.getElementById("storiesBox");

  const querySnapshot = await getDocs(collection(db, "stories"));

  storiesBox.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const data = doc.data();

    const story = document.createElement("div");
    story.className = "story";

    story.innerHTML = `
      <h3>Анонимная история</h3>
      <p>${data.text}</p>
    `;

    storiesBox.appendChild(story);
  });
}

loadStories();



















window.toggleStories = function() {

const box = document.getElementById("storiesBox");

if (box.style.display === "block") {
box.style.display = "none"
} else {
box.style.display = "block"
}

}








async function loadFAQ(){

const faqBox = document.getElementById("adviceBox")

const querySnapshot = await getDocs(collection(db,"faq"))

faqBox.innerHTML = ""

querySnapshot.forEach((doc)=>{

const data = doc.data()

const item = document.createElement("div")

item.className = "faq-item"

item.innerHTML = `
<div class="faq-question">
<span>${data.question}</span>
<span class="faq-arrow">▶</span>
</div>

<div class="faq-answer">
${data.answer}
</div>
`

faqBox.appendChild(item)

})

}

loadFAQ()

document.addEventListener("click",(e)=>{

if(e.target.closest(".faq-question")){

const q = e.target.closest(".faq-question")
const answer = q.nextElementSibling

q.classList.toggle("active")

if(answer.style.display==="block"){
answer.style.display="none"
}else{
answer.style.display="block"
}

}



})





window.toggleContacts = function(){

const dropdown = document.getElementById("contactDropdown")

if(dropdown.style.display === "block"){
dropdown.style.display = "none"
}else{
dropdown.style.display = "block"
}

}

window.addEventListener("click", function(e){

const dropdown = document.getElementById("contactDropdown")
const button = document.querySelector(".contact-btn")

if(!button.contains(e.target) && !dropdown.contains(e.target)){
dropdown.style.display = "none"
}

})























const nbButterflies = 20;
var conf, scene, camera, renderer;
var butterflies = [];
var bodyTexture, wingTexture1, wingTexture2, wingTexture3, bodyTexture4, wingTexture4;

// Переменные для мышки нам больше не нужны для движения, 
// но оставим Raycaster, если захочешь добавить клики позже.
var mouse = new THREE.Vector2();

function init() {
  conf = {
    attraction: 0.01,      // Немного уменьшил, чтобы летали плавнее
    velocityLimit: 0.8,    // Ограничил скорость для естественности
    move: true,
  };

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 75;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  initScene();

  window.addEventListener('resize', onWindowResize, false);
  animate();
}

function initScene() {
  const loader = new THREE.TextureLoader();
  bodyTexture = loader.load('https://klevron.github.io/codepen/butterflies/b1.png');
  wingTexture1 = loader.load('https://klevron.github.io/codepen/butterflies/b1w.png');
  wingTexture2 = loader.load('https://klevron.github.io/codepen/butterflies/b2w.png');
  wingTexture3 = loader.load('https://klevron.github.io/codepen/butterflies/b3w.png');
  bodyTexture4 = loader.load('https://klevron.github.io/codepen/butterflies/b4.png');
  wingTexture4 = loader.load('https://klevron.github.io/codepen/butterflies/b4w.png');

  butterflies = [];
  for (var i = 0; i < nbButterflies; i++) {
    var b = new Butterfly();
    butterflies.push(b);
    scene.add(b.o3d);
  }
}

function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
  if (conf.move) {
    for (var i = 0; i < butterflies.length; i++) {
      butterflies[i].move();
    }
  }
  renderer.render(scene, camera);
}

function Butterfly() {
  this.minWingRotation = -Math.PI / 6;
  this.maxWingRotation = Math.PI / 2 - 0.1;
  this.wingRotation = 0;
  this.velocity = new THREE.Vector3(rnd(1, true), rnd(1, true), rnd(1, true));
  
  // У каждой бабочки своя точка назначения
  this.destination = new THREE.Vector3(rnd(100, true), rnd(100, true), rnd(100, true));

  var confs = [
    { bodyTexture: bodyTexture, bodyW: 10, bodyH: 15, wingTexture: wingTexture1, wingW: 10, wingH: 15, wingX: 5.5 },
    { bodyTexture: bodyTexture, bodyW: 6, bodyH: 9, wingTexture: wingTexture2, wingW: 15, wingH: 20, wingX: 7.5 },
    { bodyTexture: bodyTexture, bodyW: 8, bodyH: 12, wingTexture: wingTexture3, wingW: 10, wingH: 15, wingX: 5.5 },
    { bodyTexture: bodyTexture4, bodyW: 6, bodyH: 10, bodyY: 2, wingTexture: wingTexture4, wingW: 15, wingH: 20, wingX: 8 },
  ];
  this.init(confs[Math.floor(rnd(4))]);
}

Butterfly.prototype.init = function (bconf) {
  var geometry = new THREE.PlaneGeometry(bconf.wingW, bconf.wingH);
  var material = new THREE.MeshBasicMaterial({ transparent: true, map: bconf.wingTexture, side: THREE.DoubleSide, depthTest: false });
  this.lwing = new THREE.Object3D();
  this.lwing.add(new THREE.Mesh(geometry, material));
  this.lwing.children[0].position.x = -bconf.wingX;

  this.rwing = new THREE.Object3D();
  var rwmesh = new THREE.Mesh(geometry, material);
  rwmesh.rotation.y = Math.PI;
  rwmesh.position.x = bconf.wingX;
  this.rwing.add(rwmesh);

  geometry = new THREE.PlaneGeometry(bconf.bodyW, bconf.bodyH);
  material = new THREE.MeshBasicMaterial({ transparent: true, map: bconf.bodyTexture, side: THREE.DoubleSide, depthTest: false });
  this.body = new THREE.Mesh(geometry, material);
  if (bconf.bodyY) this.body.position.y = bconf.bodyY;

  this.group = new THREE.Object3D();
  this.group.add(this.body, this.lwing, this.rwing);
  this.group.rotation.x = Math.PI / 2;
  this.group.rotation.y = Math.PI;

  this.o3d = new THREE.Object3D();
  this.o3d.add(this.group);
  
  // Раскидываем их в начале
  this.o3d.position.set(rnd(50, true), rnd(50, true), rnd(50, true));
  this.o3d.scale.setScalar(rnd(0.3) + 0.1);

  this.initTween();
};

Butterfly.prototype.initTween = function () {
  var duration = limit(conf.velocityLimit - this.velocity.length(), 0.1, 1.5) * 1000;
  this.wingRotation = this.minWingRotation;
  new TWEEN.Tween(this)
    .to({ wingRotation: this.maxWingRotation }, duration)
    .repeat(1)
    .yoyo(true)
    .onComplete((object) => { object.initTween(); })
    .start();
};

Butterfly.prototype.move = function () {
  // Если бабочка долетела близко к цели, выбираем новую случайную цель
  if (this.o3d.position.distanceTo(this.destination) < 5) {
    this.destination.set(rnd(100, true), rnd(100, true), rnd(50, true));
  }

  var dv = this.destination.clone().sub(this.o3d.position).normalize();
  this.velocity.x += conf.attraction * dv.x;
  this.velocity.y += conf.attraction * dv.y;
  this.velocity.z += conf.attraction * dv.z;
  
  this.limitVelocity();
  
  this.lwing.rotation.y = this.wingRotation;
  this.rwing.rotation.y = -this.wingRotation;
  
  this.o3d.lookAt(this.o3d.position.clone().add(this.velocity));
  this.o3d.position.add(this.velocity);
};

Butterfly.prototype.limitVelocity = function () {
  this.velocity.x = limit(this.velocity.x, -conf.velocityLimit, conf.velocityLimit);
  this.velocity.y = limit(this.velocity.y, -conf.velocityLimit, conf.velocityLimit);
  this.velocity.z = limit(this.velocity.z, -conf.velocityLimit, conf.velocityLimit);
};

function limit(n, min, max) { return Math.min(Math.max(n, min), max); }
function rnd(max, neg) { return neg ? Math.random() * 2 * max - max : Math.random() * max; }

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

init();





window.nextVideo = function(){
  console.log("NEXT нажали")
  videoIndex++

  if(videoIndex >= videos.length){
    videoIndex = 0
  }

  showVideo(videoIndex)
}
