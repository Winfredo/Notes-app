const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const popupTitle = document.querySelector("header p");
const popupBtn = document.querySelector("form button");
const closeIcon = document.querySelector("header i");
const addBtn = document.querySelector(".add-btn");
const titleTag = document.querySelector("input");
const descTag = document.querySelector("textarea");
let notes = JSON.parse(localStorage.getItem("notes")) || [];
let isUpdated = false, updatedId;
const containerEl = document.querySelector(".mini-container");
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let showNotes = () => {
  document.querySelectorAll(".note").forEach((note) => note.remove());
  notes.forEach((note, index) => {
    let liTag = ` <li class="note">
          <div class="details">
            <p>${note.title}</p>
            <span class=""
              >${note.description}</span
            >
          </div>
          <div class="bottom-content">
            <span class="date">${note.date}</span>
            <div class="settings">
              <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
              <ul class="menu">
                <li onclick="updateNote(${index}, '${note.title}', '${note.description}')" class="edit">
                  <i class="fa-solid fa-pen-to-square"></i>Edit
                </li> 
                <li onclick="deleteNote(${index})" class="delete"><i class="fa-solid fa-trash"></i>Delete</li>
              </ul>
            </div>
          </div>
        </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
  });
};
showNotes();

let showMenu = (elem) => {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
};

addBox.addEventListener("click", () => {
    titleTag.focus();
  popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
    isUpdated = false;
  titleTag.value = "";
  descTag.value = "";
  popupTitle.innerText = "Add a Note";
  popupBtn.innerText = "Add a New Note";
  popupBox.classList.remove("show");
});

let deleteNote = (noteId) => {
    let confirmDelete = confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;
  notes.splice(noteId, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
};

let updateNote = (noteId, title, description) => {
    isUpdated = true;
    updatedId = noteId;
  addBox.click();
  titleTag.value = title;
  descTag.value = description;
  popupTitle.innerText = "Update Note";
  popupBtn.innerText = "Update Note";
};

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let notetitle = titleTag.value;
  let notedesc = descTag.value;

  if (notetitle || notedesc) {
    let dateObj = new Date();
    let monthEl = months[dateObj.getMonth()];
    let date = dateObj.getDate();
    let dayEl = days[dateObj.getDay()];
    let yearEl = dateObj.getFullYear();

    let noteInfo = {
      title: notetitle,
      description: notedesc,
      date: `${dayEl} ${monthEl} ${date}, ${yearEl}`,
    };

    if (!isUpdated){
        notes.push(noteInfo);
    }else {
        isUpdated = false;
        notes[updatedId] = noteInfo; 
    }
    localStorage.setItem("notes", JSON.stringify(notes));
    closeIcon.click();
    showNotes();
    titleTag.value = "";
    descTag.value = "";
  }
});
