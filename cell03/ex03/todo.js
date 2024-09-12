let tasksArr = [];
let taskId = 0;

window.onload = function() {
    loadTasks();
}

function createTask(){
    let inp = prompt();
    if (inp != "" && inp !== null){
        tasksArr.push([inp, taskId]);
        taskId++;
        setCookie("tasks", JSON.stringify(tasksArr));
        renderTasks();
    }
}

function renderTasks(){
    const taskBox = document.getElementById("ft_list");
    taskBox.innerHTML = "";
    for (let i = tasksArr.length - 1; i >= 0; i--){
        const taskItem = document.createElement("div");
        const textNode = document.createTextNode(tasksArr[i][0]);
        taskItem.id = tasksArr[i][1];
        taskItem.className = "task";
        taskItem.addEventListener("click", function(){
            deleteTask(taskItem);
        });
        taskItem.appendChild(textNode);
        taskBox.appendChild(taskItem);
    }
}

function deleteTask(element){
    const targetId = element.id;
    const text = element.innerHTML;
    if (confirm(`Delete "${text}"`) == true){
        for (let i = 0; i < tasksArr.length; i++){
            if (tasksArr[i][1] == targetId){
                tasksArr.splice(i, 1);
            }
        }
        setCookie("tasks", JSON.stringify(tasksArr));
        renderTasks();
    }
}

function loadTasks(){
    const cookieTask = getCookie("tasks");
    if (cookieTask){
        const tasks = JSON.parse(cookieTask);
        if (tasks.length > 0){
            taskId = tasks[tasks.length - 1][1] + 1;
            tasks.forEach(task => {
                tasksArr.push(task);
            });
        }
    }
    else {
        tasksArr = [];
    }
    renderTasks();
}

function setCookie(cName, cValue){
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${cName}=${encodeURIComponent(cValue)}; ${expires}; path=/`;
}

function getCookie(cName){
    const name = cName + "=";
    const decodedCookie = document.cookie;
    const cookieArr = decodedCookie.split(";");

    for (let i = 0; i < cookieArr.length; i++) {
        let cookie = cookieArr[i].trim();
        if (cookie.indexOf(name) === 0) {
            return decodeURIComponent(cookie.substring(name.length, cookie.length));
        }
    }
    return null;
}