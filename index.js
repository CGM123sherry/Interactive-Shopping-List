
//awaits DOM to load before running script
document.addEventListener('DOMContentLoaded', () => {
    //gets element references from HTML
    const itemInput = document.getElementById('item-input');
    const addButton = document.getElementById('add-button');
    const clearButton = document.getElementById('clear-button');
    const shoppingList = document.getElementById('shopping-list');
    //declaring a variable to store the list
    let items;
    //retrieves stored items in localstorage
    const storedItems = localStorage.getItem('shoppingList');
    //parses the data into array, if available
    if (storedItems) {
        items = storedItems.split(',').map(item => ({
            name: item,
            purchased: false
        }));
    } else {
        //if there were no store items, start with an empty array
        items = [];
    }
    //update local storage with current items
    const updateLocalStorage = () => {
        const itemNames = items.map(item => item.name);
        localStorage.setItem('shoppingList', itemNames.join(','));
    };
    //Function to render the shopping list on the page
    const renderList = () => {
        shoppingList.innerHTML = '';
        // Iterate over each item in the items array
        for (let index = 0; index < items.length; index++) {
            const item = items[index];
         // Create a list item element for the current item
            const listItem = document.createElement('li');
            listItem.textContent = item.name;
            if (item.purchased) {
                listItem.classList.add('purchased');
            }
        //An edit button for the current item
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit-button');
            editButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent the parent click event
                editItem(index);
            });
            //Append the edit button to the list
            listItem.appendChild(editButton);
        // add eventlistener for click on purchased items
            listItem.addEventListener('click', () => {
                items[index].purchased = !items[index].purchased;
                updateLocalStorage();
                // Re-render the list to include the new item
                renderList();
            });
        //append the list item on shopping
            shoppingList.appendChild(listItem);
        }
    };
   // Function to add a new item to the list
    const addItem = () => {
        const itemName = itemInput.value.trim();
        if (itemName) {
            items.push({ name: itemName, purchased: false });
            itemInput.value = '';
            updateLocalStorage();
            // // Re-render the list to reflect change
            renderList();
        }
    };
// Function to edit an existing item in the list
    const editItem = (index) => {
        const newName = prompt('Edit item name:', items[index].name);
        if (newName !== null) {
            items[index].name = newName.trim();
            updateLocalStorage();
            // Re-render the list to reflect change
            renderList();
        }
    };
// Function to clear all items in the list
    const clearList = () => {
        items = [];
        updateLocalStorage();
        renderList();
    };
// Add a click event listener to the add button
    addButton.addEventListener('click', addItem);
    // Add a click event listener to the clear button
    clearButton.addEventListener('click', clearList);

    // Render the list initially when the page loads
    renderList();
});



