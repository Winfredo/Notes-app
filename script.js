const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const closeIcon = document.querySelector("header i");
const addBtn = document.querySelector(".add-btn");
const titleTag = document.querySelector("input");
const descTag = document.querySelector("textarea");
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
    }
    const notes = []
    notes.push(noteInfo);
    const stringNotes = JSON.stringify(notes);
    localStorage.setItem('notes', stringNotes)
    console.log(noteInfo);
  }
});
