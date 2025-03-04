import $ from 'jquery';

const taskItem = $(".task-item");

for (let i = 0; i < 5; i++) {
    $("#tasks-list").append(taskItem.clone());
    $("#completed-task-list").append(taskItem.clone());
}