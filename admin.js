import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore,
collection,
addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";




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

window.addStory = async function(){

const text = document.getElementById("storyText").value;

if(text === ""){
alert("Введите историю");
return;
}

await addDoc(collection(db,"stories"),{
text:text
});

document.getElementById("status").innerText="История добавлена!";
document.getElementById("storyText").value="";

}





window.addFAQ = async function(){

const question = document.getElementById("faqQuestion").value
const answer = document.getElementById("faqAnswer").value

if(question === "" || answer === ""){
alert("Введите вопрос и ответ")
return
}

await addDoc(collection(db,"faq"),{
question:question,
answer:answer
})

document.getElementById("faqStatus").innerText="Совет добавлен!"

document.getElementById("faqQuestion").value=""
document.getElementById("faqAnswer").value=""

}


window.addVideo = async function(){

const title = document.getElementById("videoTitleInput").value
const url = document.getElementById("videoUrlInput").value

if(!title || !url){
alert("Заполните все поля")
return
}

await addDoc(collection(db,"videos"),{
title: title,
url: url
})

alert("Видео добавлено!")

}