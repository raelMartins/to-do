//TODO app workings controller
const toDoController = (() => {
    const data = {
        arr: {
            to: [],
            comp: []
        }
    }
    return {
        addItem: (val, list) => {
            data.arr[list].push(val)
        },
        removeItem: (val,list) => {
            const index = data.arr[list].findIndex(cur => cur === val);
            data.arr[list].splice(index, 1);
        },
        getData: () => data
    }
})()

//Interface controller
const UIcontroller = (() => {
    const DOMStrings = {
        addNew: '#addbtn',
        inputBox: '#toDoItem',
        toDoList: '#toDoItemList',
        completed: '#accomplished',
        completeTask: '.complete',
        deleteTask: '.remove',
        container: '.item-list',
        content: '.content'
    };

    return {
        getInputs: () => {
            const input = document.querySelector(DOMStrings.inputBox).value;

            return input;
        },
        addToList: (val, list) => {
            let html, newHtml, element;
            if( list === 'to' ) {
                element = DOMStrings.toDoList;
                html = '<li id = "to">%value%<span class="buttons"><button class="remove"><i class="far fa-trash-alt"></i></button><button class="complete"><i class="fas fa-check"></i></button></span></li>';
            }else if(list === 'comp') {
                element = DOMStrings.completed;
                html = '<li id = "comp">%value%<span class="buttons"><button class="remove"><i class="far fa-trash-alt"></i></button><button class="redo"><i class="fas fa-undo-alt"></i></button></span></li>';
            }

            newHtml = html.replace('%value%', val);
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        removeFromList: (val, id) => {
            const item = document.querySelector(`#${id}`)

            if(item.textContent === val) {
                item.parentNode.removeChild(item);
            }
        },
        clearBackgrounds: () => {
            document.querySelector('.item-list').style.backgroundImage = 'none';
            document.querySelector('.item-list#completed').style.backgroundImage = 'none';
        },
        clearFields: () => {
            document.querySelector(DOMStrings.inputBox).value = "";

    },
        getDomStrings: () => DOMStrings
    }
    
})()

//General controller
const controller = ((todo, uictrl) => {

    const addNew = (value,list) => {
        console.log(value)
        //add item to the data obect
        todo.addItem(value, list);
        //add the new item to the list end
        uictrl.addToList(value, list);
    };
    const removeItem = (id, btn, val) => {
        console.log(btn);
        if (btn === 'remove'|| btn === 'redo'|| btn === 'complete') {
            //remove item from the data structure
            todo.removeItem(val, id)
            //remove item from the UI
            uictrl.removeFromList(val, id)
        }
    }

    const addToDo = () => {
        //check to see if any value has been put
        if(uictrl.getInputs() !== "") { 
            //set the list to be added to
            const list = 'to';
            //get the input value from the ui
            const val = uictrl.getInputs();
            //add item 
            addNew(val, list)
            //remove background images
            uictrl.clearBackgrounds();
            //clear input field
            uictrl.clearFields();
            
        }
    };
    const deleteItem = event => {
        
        //select el
        const el = event.target.parentNode.parentNode.parentNode;
        //get the class o the button being selected
        const btn = event.target.parentNode.className;
        //get the id of the list you'e selecting
        const id = el.id;
        //get the value o text content
        const text = el.textContent;
        //check that it's a to do or completed item
        if(id === 'to' || id === 'comp') {
            removeItem(id, btn, text);
        }

        
        
    };
    const completeItem = event => {
        //select el
        const el = event.target.parentNode.parentNode.parentNode;
        //get the class o the button being selected
        const btn = event.target.parentNode.className;
        //get the id of the list you'e selecting
        const id = el.id;
        //get the value o text content
        const text = el.textContent;

        //check that it's a to do or completed item
        if(id === 'to') {
            removeItem(id, btn, text);
            addNew(text, 'comp');
        }
        
        

    };

    const reDoItem = event => {
        //select el
        const el = event.target.parentNode.parentNode.parentNode;
        //get the class o the button being selected
        const btn = event.target.parentNode.className;
        //get the id of the list you'e selecting
        const id = el.id;
        //get the value o text content
        const text = el.textContent;

        //check that it's a to do or completed item
        if(id === 'comp') {
            removeItem(id, btn, text);
            addNew(text, 'to');
        }
        
    };

    const setUpEventListeners = () => {

        const DOM = uictrl.getDomStrings();
        //Clicking the add item button to add an item to the to do list
        document.querySelector(DOM.addNew).addEventListener('click', addToDo)

        //clicking the delete icon to delete the item
        document.querySelector(DOM.content).addEventListener('click', deleteItem)

        //clicking the complete icon to add it to the complete section
        document.querySelector(DOM.content).addEventListener('click', completeItem)

        //clicking the complete icon to add it back to the todo section
        document.querySelector(DOM.content).addEventListener('click', reDoItem)
        
    };
    
    return {
        init: () => {
            //setup event listeners
            setUpEventListeners();
        },
    };
})(toDoController, UIcontroller)

controller.init();