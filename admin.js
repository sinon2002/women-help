import { initializeApp } from "supabase.com/dashboard/project/rinzrphvqbdjgascgymv/storage/files";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "supabase.com/dashboard/project/rinzrphvqbdjgascgymv/storage/files";

// 🔥 SUPABASE
import { createClient } from 'https://supabase.com/dashboard/project/rinzrphvqbdjgascgymv/storage/files'

// 👉 ВСТАВЬ СВОИ ДАННЫЕ
const supabaseUrl = 'rinzrphvqbdjgascgymv'
const supabaseKey = 'sb_publishable_nqjEWqg2glLj2VAm58KkeQ_GMnGXss9'

const supabase = createClient(supabaseUrl, supabaseKey)


// 🔥 FIREBASE
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
// 📊 ЗАГРУЗКА
// =======================

window.loadData = async function () {
  const storiesSnap = await getDocs(collection(db, "stories"));
  const faqSnap = await getDocs(collection(db, "faq"));
  const videosSnap = await getDocs(collection(db, "videos"));

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

  if (!text) return alert("Введите историю");

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
        <button onclick="editStory('${docSnap.id}', \`${data.text}\`)">✏️</button>
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

  await updateDoc(doc(db, "stories", id), { text: newText });
  loadData();
};


// =======================
// 💡 FAQ
// =======================

window.addFAQ = async function () {
  const q = document.getElementById("faqQuestion").value;
  const a = document.getElementById("faqAnswer").value;

  if (!q || !a) return alert("Введите данные");

  await addDoc(collection(db, "faq"), {
    question: q,
    answer: a
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
        <button onclick="editFAQ('${docSnap.id}', \`${data.question}\`, \`${data.answer}\`)">✏️</button>
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
// 🎥 VIDEO (🔥 SUPABASE)
// =======================

window.addVideo = async function () {

  const title = document.getElementById("videoTitleInput").value;
  const file = document.getElementById("videoFileInput").files[0];
  const urlInput = document.getElementById("videoUrlInput").value;

  if (!title) return alert("Введите название");

  let finalUrl = "";

  // 📁 загрузка файла через Supabase
  if (file) {

    const fileName = Date.now() + "_" + file.name;

    const { error } = await supabase.storage
      .from('videos')
      .upload(fileName, file);

    if (error) {
      alert("Ошибка загрузки");
      console.log(error);
      return;
    }

    finalUrl = supabase
      .storage
      .from('videos')
      .getPublicUrl(fileName).data.publicUrl;
  }

  // 🔗 ссылка
  else if (urlInput) {
    finalUrl = urlInput;
  }

  else {
    return alert("Добавьте файл или ссылку");
  }

  await addDoc(collection(db, "videos"), {
    title,
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
        <video width="300" controls src="${data.url}"></video>
        <br>
        <button onclick="deleteVideo('${docSnap.id}')">🗑</button>
        <button onclick="editVideo('${docSnap.id}', \`${data.title}\`, \`${data.url}\`)">✏️</button>
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
// 🚀 СТАРТ
// =======================

window.onload = function () {
  loadData();
};
