const gettask = document.getElementById("addTask");
const taskList = document.getElementById("task-display");
const addbtn = document.getElementById("addBtn");
const totalTaskDisplay= document.getElementById("total-task");
const CompletedTaskDisplay= document.getElementById("Completed-task");
const PendingTaskDisplay= document.getElementById("Pending-task");

let taskArray = [];

// Calculate the total, completed, pending task Number 
function taskFilter(){
    let totalTask=0;
    let CompletedTask=0;
    let PendingTask = 0;
    for(let i=0;i<taskArray.length;i++){
        if(taskArray[i].completed){
            CompletedTask++;
        }else{
            PendingTask++;
        }
    }
    totalTask=taskArray.length;
    totalTaskDisplay.innerHTML ="Total: "+ totalTask;
    CompletedTaskDisplay.innerHTML ="Completed: "+ CompletedTask;
    PendingTaskDisplay.innerHTML ="Pending: "+ PendingTask;
}

// this function is for Create and append Li in Tasklist
function displayTask(task){
    let liTag = document.createElement('li');
    liTag.innerHTML=`
    <div>
        <input onchange="ToggleTask(${task.id})" type="checkbox" ${task.completed ? "Checked" : ""} id=${task.id} class="custom-checkbox inLine">
        <label class="${task.completed ? "Completedtask" : ""} text inLine" for=${task.id}><Strong>${task.text}</Strong></label>
        <span class="${task.completed ? "Completed" : "Pending"} inLine">${task.completed ? "Completed" : "Pending"}</span>
        <button onclick="deleteTask(${task.id})" class="delete inLine" delete-id=${task.id}>X</button>
    </div>
    `
    taskList.append(liTag);
    taskFilter();
}

// this function is for filter between the Total , Completed. Pending task 
function renderList(type){
    taskList.innerHTML="";
    for(let i=0; i<taskArray.length;i++){
        if(type === "all"){
            totalTaskDisplay.setAttribute("class", "active");
            CompletedTaskDisplay.removeAttribute("class");
            PendingTaskDisplay.removeAttribute("class");
            displayTask(taskArray[i]);
            taskFilter();
        }else if(type === "completed"){
            CompletedTaskDisplay.setAttribute("class", "active");
            totalTaskDisplay.removeAttribute("class");
            PendingTaskDisplay.removeAttribute("class");
            if (taskArray[i].completed) {
                displayTask(taskArray[i]);
                taskFilter();
            }
        }else if(type === "pending"){
            PendingTaskDisplay.setAttribute("class", "active");
            CompletedTaskDisplay.removeAttribute("class");
            totalTaskDisplay.removeAttribute("class");
            if(!taskArray[i].completed ){
                displayTask(taskArray[i]);
                taskFilter();
            }
        }else{
            return;
        }
    }
};

// this function is for add task to taskArray 
function addTask(){
    let inputValue=gettask.value;
    if(inputValue === ""){
        alert('Please enter a valid value');
        gettask.value="";
    }else{
        const taskDetail = {
            id: new Date().getTime(),
            text: inputValue,
            completed: false,
        }; 
        taskArray.push(taskDetail) ;
        taskFilter();
        renderList("all");
    }
    gettask.value="";
};

// this function is for deleting a task from taskArray 
function deleteTask(id){
    const newArray = taskArray.filter((task) => task.id !== id);
    console.log(newArray);
    taskArray = newArray; 
    taskFilter();
    renderList("all");
};

// this function is for toggle completed or pending in Li tag 
function ToggleTask(id){
    const Index = taskArray.filter((task) => task.id === id);
    if(Index.length > 0){
        const currenttask = Index[0];
        currenttask.completed = !currenttask.completed;
        taskFilter();
        renderList("all");
    }else{
        return;
    }
};

// handle add to button click 
addbtn.addEventListener("click",addTask);

// handle enter button to add task 
gettask.addEventListener("keydown",(e)=>{
    if(e.keyCode === 13){
        addTask();
    }
});