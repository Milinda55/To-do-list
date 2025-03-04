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
        this.id = id;
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

$("#frm-task").on('submit', () => {
    $("#tasks-list #no-task").hide();
    const taskDescription = $("#txt-task").val().trim();
    const taskId = taskLists.length;
    taskLists.push(new Task(taskId, taskDescription));
});

function renderTasks(){]


    for (const {id, description, status} of taskLists) {
        const task = `
            <div class="task-item d-flex justify-content-between
        p-2 align-items-center rounded-2 text-secondary-emphasis">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" 
                value="" id="task-${id}"
                ${status ? 'checked': ''}>
                <label class="form-check-label" 
                for="task-${id}">
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