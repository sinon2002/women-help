import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";


const storage = getStorage(app);
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


// =======================
// 📊 ЗАГРУЗКА ВСЕГО
// =======================

window.loadData = async function () {
  const storiesSnap = await getDocs(collection(db, "stories"));
  const faqSnap = await getDocs(collection(db, "faq"));
  const videosSnap = await getDocs(collection(db, "videos"));

  // 📊 счетчики
  document.getElementById("storiesCount").innerText = storiesSnap.size;
  document.getElementById("faqCount").innerText = faqSnap.size;
  document.getElementById("videosCount").innerText = videosSnap.size;

  renderStories(storiesSnap);
  renderFAQ(faqSnap);
  renderVideos(videosSnap);
};


// =======================
// 📚 STORIES
// =======================

window.addStory = async function () {
  const text = document.getElementById("storyText").value;

  if (!text) {
    alert("Введите историю");
    return;
  }

  await addDoc(collection(db, "stories"), { text });

  document.getElementById("storyText").value = "";
  loadData();
};

function renderStories(snapshot) {
  const list = document.getElementById("storiesList");
  list.innerHTML = "";

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();

    list.innerHTML += `
      <div class="item">
        <p>${data.text}</p>
        <button onclick="deleteStory('${docSnap.id}')">🗑</button>
        <button onclick="editStory('${docSnap.id}', '${data.text}')">✏️</button>
      </div>
    `;
  });
}

window.deleteStory = async function (id) {
  await deleteDoc(doc(db, "stories", id));
  loadData();
};

window.editStory = async function (id, oldText) {
  const newText = prompt("Редактировать:", oldText);
  if (!newText) return;

  await updateDoc(doc(db, "stories", id), {
    text: newText
  });

  loadData();
};


// =======================
// 💡 FAQ
// =======================

window.addFAQ = async function () {
  const question = document.getElementById("faqQuestion").value;
  const answer = document.getElementById("faqAnswer").value;

  if (!question || !answer) {
    alert("Введите вопрос и ответ");
    return;
  }

  await addDoc(collection(db, "faq"), {
    question,
    answer
  });

  document.getElementById("faqQuestion").value = "";
  document.getElementById("faqAnswer").value = "";

  loadData();
};

function renderFAQ(snapshot) {
  const list = document.getElementById("faqList");
  list.innerHTML = "";

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();

    list.innerHTML += `
      <div class="item">
        <b>${data.question}</b>
        <p>${data.answer}</p>
        <button onclick="deleteFAQ('${docSnap.id}')">🗑</button>
        <button onclick="editFAQ('${docSnap.id}', '${data.question}', '${data.answer}')">✏️</button>
      </div>
    `;
  });
}

window.deleteFAQ = async function (id) {
  await deleteDoc(doc(db, "faq", id));
  loadData();
};

window.editFAQ = async function (id, q, a) {
  const newQ = prompt("Вопрос:", q);
  const newA = prompt("Ответ:", a);

  if (!newQ || !newA) return;

  await updateDoc(doc(db, "faq", id), {
    question: newQ,
    answer: newA
  });

  loadData();
};


// =======================
// 🎥 VIDEO
// =======================

window.addVideo = async function () {

  const title = document.getElementById("videoTitleInput").value;
  const file = document.getElementById("videoFileInput").files[0];
  const urlInput = document.getElementById("videoUrlInput").value;

  if (!title) {
    alert("Введите название");
    return;
  }

  let finalUrl = "";

  // 📁 ЕСЛИ ФАЙЛ
  if (file) {
    const storageRef = ref(storage, "videos/" + Date.now() + "_" + file.name);

    await uploadBytes(storageRef, file);

    finalUrl = await getDownloadURL(storageRef);
  }

  // 🔗 ЕСЛИ URL
  else if (urlInput) {
    finalUrl = urlInput;
  }

  else {
    alert("Добавьте файл или ссылку");
    return;
  }

  await addDoc(collection(db, "videos"), {
    title: title,
    url: finalUrl
  });

  alert("Видео добавлено!");

  document.getElementById("videoTitleInput").value = "";
  document.getElementById("videoUrlInput").value = "";
  document.getElementById("videoFileInput").value = "";

  loadData();
};

function renderVideos(snapshot) {
  const list = document.getElementById("videosList");
  list.innerHTML = "";

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();

    list.innerHTML += `
      <div class="item">
        <b>${data.title}</b>
        <p>${data.url}</p>
        <button onclick="deleteVideo('${docSnap.id}')">🗑</button>
        <button onclick="editVideo('${docSnap.id}', '${data.title}', '${data.url}')">✏️</button>
      </div>
    `;
  });
}

window.deleteVideo = async function (id) {
  await deleteDoc(doc(db, "videos", id));
  loadData();
};

window.editVideo = async function (id, title, url) {
  const newTitle = prompt("Название:", title);
  const newUrl = prompt("URL:", url);

  if (!newTitle || !newUrl) return;

  await updateDoc(doc(db, "videos", id), {
    title: newTitle,
    url: newUrl
  });

  loadData();
};


// =======================
// 📂 ВКЛАДКИ
// =======================

window.showTab = function (tabId) {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.style.display = "none";
  });

  document.getElementById(tabId).style.display = "block";
};


// =======================
// 🚀 СТАРТ
// =======================

window.onload = function () {
  loadData();
};
