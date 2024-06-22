/*$(function () {
    $('.datetimepicker').datetimepicker(); //function to show calendar
});*/

function addTaskButton(){ //click on add new task and show selectors inputs
    document.getElementById("addNewTask").style.display = "none";
    document.getElementById("addTitle").style.display = "";
    document.getElementById("selectType").style.display = "";
    document.getElementById("selectTime").style.display = "";
    document.getElementById("selectDeadline").style.display = "";
    document.getElementById("sendButtons").style.display = "";
}



function cancel(){     //cancel and stop creating one
    document.getElementById("addNewTask").style.display = "";
    document.getElementById("addTitle").style.display = "none";
    document.getElementById("selectType").style.display = "none";
    document.getElementById("selectTime").style.display = "none";
    document.getElementById("selectDeadline").style.display = "none";
    document.getElementById("sendButtons").style.display = "none";  
}

function clearInputField() {   //reset inputs
    document.getElementById('titleTask').value = "";
    document.getElementById('pickupdate').value = "";
    document.getElementById('time-input').value = "";
    document.getElementById('unitTime').selectedIndex = 0;
    document.getElementById('infoInput').selectedIndex = 0;
    //unitTime.selectedOptions[0].text ="Time";
    //  infoInput.selectedOptions[0].text = "Select a type";
}


document.addEventListener('DOMContentLoaded', (event) => {
    const containers = document.querySelectorAll('.dropzone');
    containers.forEach(container => {
        new Sortable(container, {
            group: 'shared', //allow dragging between containers
            animation: 50,
            draggable: '.card',
            onEnd: function (evt) {
                const movedToContainer = evt.to;
                const movedItem = evt.item;
                if(movedToContainer.id == 'done'){
                    movedItem.style.textDecoration = 'line-through';
                }
                else{
                    movedItem.style.textDecoration = 'none';
                }
                //console.log('Dragged element:', evt.item);
                //console.log('Moved to container:', movedToContainer.id || movedToContainer.className);
            }
        });
    });
 

    // Initially add the example card to the backlog
    const backlog = document.getElementById('backlog');
    const card = document.getElementById('taskToDo');
    backlog.appendChild(card);
    card.style.display = 'block';

});

let titleArray = new Map();
function createCard() {
    const typeVal = infoInput.selectedOptions[0].text;
    const titleVal = document.getElementById('titleTask').value;
    const dateVal = document.getElementById('pickupdate').value;
    const numTimeVal = document.getElementById('time-input').value;
    const unitTimeVal = unitTime.selectedOptions[0].text;

    const templateCard = document.getElementById('taskToDo');
    const backlogCards = document.getElementById('columnCards');
    const newCard = templateCard.cloneNode(true);
    


    backlogCards.style.display = ''; 
    templateCard.style.display = "none";
    let newTitle = document.getElementById('titleTask').value; //check duplicates
    if (!titleArray.has(newTitle)){
        titleArray.set(newTitle, true);
        newCard.style.display = 'block';
        cancel();
        clearInputField();
    }
    else {
        (console.log('already exists'))
        var modalDuplicate = document.getElementById('duplicateModal');
        var myModalDup = new bootstrap.Modal(modalDuplicate);
        myModalDup.show();
    }

    newCard.querySelector('#typeResult').innerText = typeVal;
    newCard.querySelector('#titleResult').innerText = titleVal;
    newCard.querySelector('#dateResult').innerText = 'Due: ' + dateVal;
    newCard.querySelector('#timeResult').innerText = 'Duration: ' + numTimeVal + " " + unitTimeVal;
 
    const backlog = document.getElementById('backlog'); // Append the new card to the container
    backlog.appendChild(newCard);

    const trashButton = newCard.querySelector('.btn-outline-secondary');
    
    trashButton.addEventListener('click', function() {
        var modalDelete = document.getElementById('deleteModal');
        var modalDel = new bootstrap.Modal(modalDelete);
        const deleteCard = modalDelete.querySelector('.btn-primary')
        modalDel.show();
        deleteCard.addEventListener('click', function(){
            modalDel.hide();
            newCard.remove();
            titleArray.delete(newTitle);
            console.log(titleArray)
        });
        //newCard.remove();
    });  
    
    newCard.removeAttribute('id');
    newCard.querySelector('#typeResult').removeAttribute('id');// Remove ids to avoid duplicates
    newCard.querySelector('#titleResult').removeAttribute('id');
    newCard.querySelector('#dateResult').removeAttribute('id');
    newCard.querySelector('#timeResult').removeAttribute('id');

}