
var removeSymbol = "&times;";
var completeSymbol = "&RightArrow;";
var reCompleteSymbol = "&LeftArrow;";


document.getElementById('addbtn').addEventListener('click', function () {

    var value = document.getElementById('toDoItem').value;

    if (value) {
        addToList(value);
        document.getElementById('toDoItem').value = '';
    }
});

document.getElementById('toDoItem').addEventListener('keydown', function (e) {
    var value = this.value;

    if (e.code === 'Enter' && value) {
    addToList(value);
    document.getElementById('toDoItem').value = '';
    }
})

function removeFromList() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;

    parent.removeChild(item);
}

function completeItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;

    var target = (id === 'toDoItemList') ? document.getElementById('accomplished'):document.getElementById('toDoItemList');

    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0])

}


function addToList(text) {

    var list = document.getElementById('toDoItemList');

    var item = document.createElement('li');
    item.innerText = text;

    var buttons = document.createElement('div');
    buttons.classList.add('buttons');

    var remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = '<i class="far fa-trash-alt"></i>';

    //Add an event listener for removing an item 

    remove.addEventListener('click', removeFromList);

    var complete = document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML = '<i class="fas fa-check"></i>';

    //Click event for completing tasks

    complete.addEventListener('click', completeItem);

    buttons.appendChild(remove);
    buttons.appendChild(complete);
    item.appendChild(buttons) 

    list.insertBefore(item, list.childNodes[0]);
}