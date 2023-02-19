let tasks = [];

loadStorage();
dateValidation();

function loadStorage() {

    const jsonString = localStorage.getItem("tasks");

    if (jsonString) {
        tasks = JSON.parse(jsonString);
        display();
    }

}

function addTasks() {

    event.preventDefault();

    const taskTextBox = document.getElementById("taskTextBox");
    const dateBox = document.getElementById('dateBox');
    const TimeBox = document.getElementById("TimeBox");

    const task = {
        taskName: taskTextBox.value,
        date: dateBox.value,
        time: TimeBox.value
    };

    tasks.push(task);
    display();

    taskTextBox.value = "";
    dateBox.value = "";
    TimeBox.value = "";
    taskTextBox.focus();
    saveStorage();
}

function saveStorage() {
    const jsonString = JSON.stringify(tasks);
    localStorage.setItem("tasks", jsonString);
}

function display() {

    const divContainer = document.getElementById("divContainer");

    let html = "";
    for (let i = 0; i < tasks.length; i++) {
        html += `
        <container class="note">
        <button value= "delete" class="removeNote btn btn-dark" onclick="deleteTask(${i})">X</button>   
        <div class= "taskDiv">Task: ${tasks[i].taskName}</div>   
        <div class= "dateDiv">Date: ${tasks[i].date}</div>
        <div class= "timeDiv">Time: ${tasks[i].time}</div>
        </container>
        `;
    }

    divContainer.innerHTML = html;
}

function hideX(id) {
    const deleteId = document.getElementById("x" + id);
    deleteId.style.display = "none";
}

function showX(id) {
    const deleteId = document.getElementById("x" + id);
    deleteId.style.display = "block";
}

function deleteTask(clear) {
    tasks.splice(clear, 1);
    saveStorage();
    display();
}

function dateValidation() {

    const d = new Date();
    let year = d.getFullYear();
    let day = d.getDate();
    let month = d.getMonth() + 1;

    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    dateBox.min = `${year}-${month}-${day}`;
    dateBox.value = `${year}-${month}-${day}`;
}


