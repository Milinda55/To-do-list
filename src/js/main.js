import $ from 'jquery';

// const taskItem = $(".task-item").remove();
//
// for (let i = 0; i < 5; i++) {
//     $("#tasks-list").append(taskItem.clone());
//     $("#completed-task-list").append(taskItem.clone());
// }

const taskLists = [];

class TaskItem {
    id;
    description;
    status

    constructor(id, description, status) {
        this.id = id;
        this.description = description;
        this.status = status;
    }
}

$("#frm-task").on("submit", ()=> {
    const textDescription = $("#txt-task").val().trim();
    $("#tasks-list #no-task").hide();
    const taskId = taskLists.length;
    taskLists.push(new TaskItem(taskId, textDescription));

});

function renderTasks() {
    for (const {id, description, status} of taskLists) {
        const task = `
            <div class="task-item d-flex justify-content-between p-2  align-items-center rounded-2 text-secondary-emphasis">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" 
                value="" id="task-${id}">
                
                <label class="form-check-label" for="flexCheckDefault">
                  Default checkbox
                </label>
              </div>
              <div class="d-flex gap-3 fs-5">
                <i class="bi bi-pencil" title="Edit"></i>
                <i class="bi bi-trash" title="Delete"></i>
              </div>
            </div>
            `
    }
}