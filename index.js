// Initialize shopping list array
let shoppingList = [];

// Select DOM elements
const itemInput = document.getElementById('itemInput');
const addItemBtn = document.getElementById('addItemBtn');
const clearListBtn = document.getElementById('clearListBtn');
const shoppingListContainer = document.getElementById('shoppingList');

// Function to save shoppingList to local storage
function saveShoppingList() {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

// Function to load shoppingList from local storage
function loadShoppingList() {
    const storedShoppingList = localStorage.getItem('shoppingList');
    if (storedShoppingList) {
        shoppingList = JSON.parse(storedShoppingList);
        renderShoppingList(); // Re-render the list from local storage
    }
}

// Event listener for window load to load shoppingList from local storage
window.addEventListener('load', loadShoppingList);

// Function to render shopping list
function renderShoppingList() {
    // Clear existing list items
    shoppingListContainer.innerHTML = '';

    // Loop through shoppingList array and create list items
    shoppingList.forEach((item, index) => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = item.name;

        // Add class 'purchased' if item is marked as purchased
        if (item.purchased) {
            span.classList.add('purchased');
        }

        // Add double-click event listener to edit item
        span.addEventListener('dblclick', () => {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = item.name;
            input.classList.add('edit-input');

            input.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    item.name = input.value;
                    saveShoppingList(); // Save to local storage
                    renderShoppingList(); // Re-render the list
                }
            });

            li.appendChild(input);
            input.focus();
        });

        li.appendChild(span);

        // Add click event listener to mark item as purchased
        li.addEventListener('click', () => {
            item.purchased = !item.purchased; // Toggle purchased status
            saveShoppingList(); // Save to local storage
            renderShoppingList(); // Re-render the list
        });

        shoppingListContainer.appendChild(li);
    });

    saveShoppingList(); // Save after rendering
}

// Event listener for Add button
addItemBtn.addEventListener('click', () => {
    const newItem = {
        name: itemInput.value,
        purchased: false
    };
    shoppingList.push(newItem);
    renderShoppingList();
    itemInput.value = ''; // Clear input field after adding item
});

// Event listener for Clear List button
clearListBtn.addEventListener('click', () => {
    shoppingList = []; // Clear the array
    saveShoppingList(); // Save to local storage
    renderShoppingList();
});
//Rendering the initial shopping list
renderShoppingList();
