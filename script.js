const dateInput = document.getElementById("dateInput");
const colorInput = document.getElementById("colorInput");
const titleInput = document.getElementById("titleInput");
const noteInput = document.getElementById("noteInput");
const saveBtn = document.getElementById("saveBtn");
const calendar = document.getElementById("calendar");

let entries = JSON.parse(localStorage.getItem("moodEntries")) || [];

//save entry
saveBtn.addEventListener("click", () => {
    const date = dateInput.value;
    if (!date) {
        alert("Please select a date.");
        return;
    }

    entries[date] = {
        color: colorInput.value,
        title: titleInput.value,
        note: noteInput.value
    };
    localStorage.setItem("moodEntries", JSON.stringify(entries));
    renderCalendar();
});
//build calendar for current month
function renderCalendar() {
    calendar.innerHTML = "";

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

    //Empty slots before first day
    for(let i=0; i< firstDay; i++) {
        const blank = document.createElement("div");
        calendar.appendChild(blank);
    }

    //actual days
    for( let d=1; d<= daysInMonth; d++) {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("day");

        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

        dayDiv.innerHTML = `<span>${d}</span>`;

        if(entries[dateStr]) {
            dayDiv.style.background = entries[dateStr].color;
            dayDiv.title = entries[dateStr].title + "\n" + entries[dateStr].note;
        }

        calendar.appendChild(dayDiv);

    }
}

renderCalendar();
