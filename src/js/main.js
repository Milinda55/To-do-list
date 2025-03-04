import './auth.js';
import $ from 'jquery';
import {auth, db} from './firebase-config.js';
import {query, orderBy, addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, updateDoc} from "firebase/firestore";
import {onAuthStateChanged} from "firebase/auth";

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

const taskLists = [];
let loggedUser = null;

onAuthStateChanged(auth, async user=>{
    if (user){
        loggedUser = user.email;
        await loadDbTasks();
        renderTasks();
        $("#loader-wrapper").addClass("d-none");
        $("#task-lists-wrapper").removeClass("d-none");
    }else{
        loggedUser = null;
    }
});

//let lastTaskId = taskLists.length;
let currentTask = null;

$("#frm-task").on('submit', async () => {
    const txtTask = $("#txt-task");
    if (!currentTask) {
        const taskId = await addDbTask(txtTask.val().trim());
        if (taskId)
            taskLists.push(new Task(taskId, txtTask.val().trim()));
    } else {
        if (await updateDbTaskStatus(currentTask.id,
            txtTask.val().trim(), currentTask.status)) {
            currentTask.description = txtTask.val().trim();
            currentTask = null;
            $("#frm-task button").text('Add');
        }
    }
    renderTasks();
    txtTask.val("").trigger('focus');
});

$('#task-list > section, #completed-task-list > section')
    .on('change', '.task-item input[type="checkbox"]', async (e) => {
        const task = taskLists.find(task => task.id === e.currentTarget.id);
        if (await updateDbTaskStatus(task.id,
            task.description, !task.status)) {
            task.status = !task.status;
            renderTasks();
        }
    }).on('click', '.bi-trash', async (e) => {
    const taskId = $(e.currentTarget).parents(".task-item").find('input[type="checkbox"]').prop("id");
    const taskIndex = taskLists.findIndex(task => task.id === taskId);
    if (await deleteDbTask(taskId)) {
        taskLists.splice(taskIndex, 1);
        renderTasks();
    }
}).on('click', '.bi-pencil', (e) => {
    $(".task-item-selected").removeClass('task-item-selected');
    const taskId = $(e.currentTarget).parents(".task-item")
        .addClass('task-item-selected')
        .find('input[type="checkbox"]').prop("id");
    currentTask = taskLists.find(task => task.id === taskId);
    $("#txt-task").val(currentTask.description)
        .trigger('focus').trigger('select');
    $("#frm-task button").text("Update");
});

function renderTasks() {
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
                ${status ? 'checked' : ''}>
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
            "#completed-task-list > section").prepend(task);
    }
}

$("#chk-mode")
    .on('change', function () {
        const darkMode = $(this).prop("checked");
        $("html").attr("data-bs-theme", darkMode ? "dark" : "light");
    })

if (matchMedia('(prefers-color-scheme: dark)').matches) {
    $("#chk-mode").trigger('click');
}

async function loadDbTasks() {
    const collectionRef = collection(db, "/task");
    const docsSnapshot = await getDocs(query(collectionRef,
        orderBy("createdAt")));
    docsSnapshot.forEach(doc => {
        taskLists.push(new Task(doc.id,
            doc.data().description,
            doc.data().status));
    });
}

async function addDbTask(description, status = false) {
    try {
        const collectionRef = collection(db, "/task");
        const docRef = await addDoc(collectionRef, {
            description,
            status,
            createdAt: serverTimestamp()
        });
        return docRef.id;
    } catch (e) {
        console.log(e);
    }
}

async function deleteDbTask(taskId) {
    try {
        taskId = taskId.replace('task-', '');
        const docRef = doc(db, `/task/${taskId}`);
        await deleteDoc(docRef);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function updateDbTaskStatus(taskId, description, status) {
    try {
        taskId = taskId.replace('task-', '');
        const docRef = doc(db, `/task/${taskId}`);
        await updateDoc(docRef, {
            description,
            status
        });
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}