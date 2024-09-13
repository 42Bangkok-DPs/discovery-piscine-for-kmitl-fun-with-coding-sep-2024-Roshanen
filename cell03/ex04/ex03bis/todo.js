let tasksArr = [];
let taskId = 0;

$(document).ready(function() {
    loadTasks();

    $('#newTaskBtn').click(function() {
        createTask();
    });
});

function createTask() {
    let inp = prompt();
    if (inp !== "" && inp !== null) {
        tasksArr.push([inp, taskId]);
        taskId++;
        setCookie("tasks", JSON.stringify(tasksArr));
        renderTasks();
    }
}

function renderTasks() {
    const $taskBox = $("#ft_list");
    $taskBox.empty();
    for (let i = tasksArr.length - 1; i >= 0; i--) {
        const $taskItem = $("<div></div>");
        $taskItem.text(tasksArr[i][0]);
        $taskItem.attr('id', tasksArr[i][1]);
        $taskItem.addClass("task");
        $taskItem.click(function() {
            deleteTask($(this));
        });
        $taskBox.append($taskItem);
    }
}

function deleteTask($element) {
    const targetId = $element.attr('id');
    const text = $element.text();
    if (confirm(`Delete "${text}"`) === true) {
        tasksArr = tasksArr.filter(task => task[1] != targetId);
        setCookie("tasks", JSON.stringify(tasksArr));
        renderTasks();
    }
}

function loadTasks() {
    const cookieTask = getCookie("tasks");
    if (cookieTask) {
        const tasks = JSON.parse(cookieTask);
        if (tasks.length > 0) {
            taskId = tasks[tasks.length - 1][1] + 1;
            tasks.forEach(task => {
                tasksArr.push(task);
            });
        }
    }
    renderTasks();
}

function setCookie(cName, cValue) {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${cName}=${encodeURIComponent(cValue)}; ${expires}; path=/`;
}

function getCookie(cName) {
    const name = cName + "=";
    const decodedCookie = document.cookie;
    const cookieArr = decodedCookie.split(";");
    for (let cookie of cookieArr) {
        cookie = cookie.trim();
        if (cookie.indexOf(name) === 0) {
            return decodeURIComponent(cookie.substring(name.length, cookie.length));
        }
    }
    return null;
}