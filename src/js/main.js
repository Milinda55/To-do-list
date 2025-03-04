import $ from 'jquery';

// const taskItem = $(".task-item");

// for (let i = 0; i < 5; i++) {
//     $("#tasks-list").append(taskItem.clone());
//     $("#completed-task-list").append(taskItem.clone());
// }

class Task {
    id;
    description;
    status;

    constructor(id, description, status = false) {
        this.id = 'task-' + id;
        this.description = description;
        this.status = status;
    }
}

const taskLists = [new Task(1, "Task 1"),
    new Task(2, "Task 2"),
    new Task(3, "Task 3", true),
    new Task(4, "Task 4"),
    new Task(5, "Task 5", true)];

renderTasks();

let lastTaskId = taskLists.length ;
let currentTask = null;

$("#frm-task").on('submit', () => {
    // $("#tasks-list #no-task").hide();
    const txtTask = $("#txt-task");
    // const taskId = taskLists.length;
    taskLists.push(new Task(++lastTaskId, txtTask.val().trim()));
    renderTasks();
    txtTask.val("").trigger('focus');
});

$('#task-list > section, #completed-task-list > section')
    .on('change', '.task-item input[type="checkbox"]', (e) => {
        const task = taskLists.find(task => task.id === e.currentTarget.id);
        task.status = !task.status;
        renderTasks();
    }).on('click', '.bi-trash', (e) => {
    const taskId = $(e.currentTarget).parents(".task-item").find('input[type="checkbox"]').prop("id");
    const taskIndex = taskLists.findIndex(task => task.id === taskId);
    taskLists.splice(taskIndex, 1);
    renderTasks();
}).on('click', '.bi-pencil', (e) => {
    // alert("pencil")
    const taskId = $(e.currentTarget).parents(".task-item").find('input[type="checkbox"]').prop("id");
    currentTask = taskLists.find(task => task.id === taskId);
    $("#txt-task").val(currentTask.description);
    $("#frm-task button").text("Update");



});

function renderTasks(){
    $("#task-list > section, #completed-task-list > section").empty();
    const noTask = $("#no-task");
    (taskLists.length) ? noTask.hide() : noTask.show();
    for (const {id, description, status} of taskLists) {
        const task = `
            <div class="task-item d-flex justify-content-between
        p-2 align-items-center rounded-2 text-secondary-emphasis">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" 
                value="" id="${id}"
                ${status ? 'checked': ''}>
                <label class="form-check-label" 
                for="${id}">
                  ${description}
                </label>
              </div>
              <div class="d-flex gap-3 fs-5">
                <i class="bi bi-pencil" title="Edit"></i>
                <i class="bi bi-trash" title="Delete"></i>
              </div>
            </div>        
        `;
        $(!status ? "#task-list > section" :
            "#completed-task-list > section").append(task);
    }
}