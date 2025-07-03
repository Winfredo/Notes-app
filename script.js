const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const closeIcon = document.querySelector("header i");
const addBtn = document.querySelector(".add-btn");
const titleTag = document.querySelector("input");
const descTag = document.querySelector("textarea");
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
const containerEl = document.querySelector(".container");
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
    notes.forEach(note => {
        containerEl.innerHTML += `<li class="note">
        <div class="details">
          <p>${note.title}</p>
          <span class=""
            >${note.description}</span
          >
        </div>

        <div class="bottom-content">
          <span class="date">${note.date}</span>
          <div class="settings">
            <i class="fa-solid fa-ellipsis"></i>
            <ul class="menu">
              <li class="edit">
                <i class="fa-solid fa-pen-to-square"></i>Edit
              </li>
              <li class="delete"><i class="fa-solid fa-trash"></i>Delete</li>
            </ul>
          </div>
        </div>
      </li>`
    })
}
addBox.addEventListener("click", () => {
  popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  popupBox.classList.remove("show");
});

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
    notes.push(noteInfo);
    localStorage.setItem("notes", JSON.stringify(notes));
    console.log(notes);
    closeIcon.click();
    showNotes();
  }


});
