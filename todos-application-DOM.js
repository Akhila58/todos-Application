let unorderedList =document.getElementById("unorderedList12");
let todoContainer =document.getElementById("todoContainer");
let addtodoButton = document.getElementById("addButton");
let saveTodoButton = document.getElementById("saveTodoButton");
  
function getTodoFromLocalStorage(){
   let stringifiedText = localStorage.getItem("todoList");
   let parsedItem = JSON.parse(stringifiedText);
   if(parsedItem === null){
    return [];
   }
   else{
    return parsedItem;
   }
}


let todoLists= getTodoFromLocalStorage();

saveTodoButton.onclick = function(){
  localStorage.setItem("todoList",JSON.stringify(todoLists));
}



function onTodoStatusChange(checkboxId, labelId,todoId){
    let checkboxElement = document.getElementById(checkboxId);
    
    let labelEle = document.getElementById(labelId);
    if(checkboxElement.checked === true){
        labelEle.classList.add("checked");
    }
    else{
        labelEle.classList.remove("checked");
    }

   let todoObjectIndex = todoLists.findIndex(function(eachTodo){
       let eachTodoId = "todo" + eachTodo.uniqueNo;
       if(eachTodoId === todoId){
        return true;
       }
       else{
        return false;
       }
   })
   

   let todoObject = todoLists[todoObjectIndex]; 
   if(todoObject.isChecked === true){
       todoObject.isChecked =  false;
   }
   else{
    todoObject.isChecked =  true;
   }

}
function iconDeletion(todoId){
    let todoElement = document.getElementById(todoId); 
    unorderedList.removeChild(todoElement);
    let deleteIndex = todoLists.findIndex(function(eachItem){
        let eachItemId = "todo" + eachItem.uniqueNo;
        if(eachItemId === todoId){
            return true;
        }
        else{
            return false;
        }
    })
    todoLists.splice(deleteIndex,1);
} 


addtodoButton.onclick = function(){
    onaddTodo();

}

function createAndAppendToDo(todo){
    let checkboxId = "checkBox"+ todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;
    

    let todosList = document.createElement("li");
    todosList.classList.add("toDos-list","d-flex", "flex-row");
    todosList.id = todoId ;
    unorderedList.appendChild(todosList);

    let inputElement = document.createElement("input");
    inputElement.type="checkbox";
    inputElement.id=  checkboxId;
    inputElement.checked=todo.isChecked;
    inputElement.classList.add("checkbox1");
    inputElement.onclick = function(){
        onTodoStatusChange(checkboxId, labelId,todoId);
       };
    todosList.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("d-flex","flex-row", "task-container");

    todosList.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for",checkboxId);
    labelElement.id = labelId ;
    labelElement.textContent = todo.text;
    labelElement.classList.add("d-flex","flex-row","checkboxText");
    if(todo.isChecked === true){
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);


    let deleteiconContainer=document.createElement("div");
    deleteiconContainer.classList.add("delete-icon-container");

    labelContainer.appendChild(deleteiconContainer); 

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far" , "fa-trash-alt" , "delete-icon");
    deleteIcon.onclick = function(){
        iconDeletion(todoId);
    };
    deleteiconContainer.appendChild(deleteIcon);
}
function onaddTodo(){
    let count = todoLists.length;
    count = count +1;

    let userInput = document.getElementById("inputContainer");
    let userinputValue = userInput.value;
    if(userinputValue === ""){
        alert("enter valid text");
        return;
    }

    let newTodo = {
        text : userinputValue,
        uniqueNo : count,
        isChecked : false
    };
    todoLists.push(newTodo);
    createAndAppendToDo(newTodo);
     userinputValue.value = "";
}


for(let eachTodo of todoLists){
    createAndAppendToDo(eachTodo);
}