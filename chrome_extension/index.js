// URL of the Flask Server backend.
const BACKEND_URL = "http://127.0.0.1:5000";

// Create a new Todo item.
const createTodo = async () => {
    // Grab the item name from the input.
    const itemName = document.getElementById("todoName").value;

    try {
        // Send a request to the /create route in the Flask server.
        const response = await fetch(BACKEND_URL + "/create", {
            method: "POST",

            // Specify that we are sending JSON over.
            headers: {
            "Content-Type": "application/json",
            },

            // Send the item name in JSON format.
            body: JSON.stringify({
            itemName: itemName
            }),
        });

        // Obtain the JSON response from the server and display its message.
        const responseJSON = await response.json();
        alert(responseJSON.message);

        // Refresh the Todos list.
        viewTodos();
    
    } catch (e) {
        alert(e);

    }
}

// Obtain the current list of todo items.
const viewTodos = async () => {
    try {
        // Send a request to the /view route in the Flask server.
        const response = await fetch(BACKEND_URL + "/view");

        // Extract the data from the response.
        const responseJSON = await response.json();
        const data = responseJSON.data;

        // Reference the table body and clear it.
        const tableBody = document.getElementById("todoTable").getElementsByTagName("tbody")[0];
        tableBody.innerHTML = "";

        for (let id in data) {
            // Create a row for the todo item.
            let row = document.createElement("tr");

            // Create the name cell for the row.
            let nameCell = document.createElement("td");
            nameCell.innerHTML = data[id];
            row.appendChild(nameCell);

            // Create the delete cell for the row.
            let deleteCell = document.createElement("td");
            deleteCell.innerHTML = "<button class='btn btn-danger'>Delete</button>";

            // Make the button call the delete function with the id of the todo item when clicked.
            deleteCell.addEventListener("click", () => deleteTodo(id))

            row.appendChild(deleteCell);

            // Add row to the table.
            tableBody.appendChild(row);
        }
    
    } catch (e) {
        alert(e);

    }
}

// Delete a todo item.
// INPUT: id of the item to delete
const deleteTodo = async (id) => {
    try {
        // Send a request to the /delete route in the Flask server.
        const response = await fetch(BACKEND_URL + "/delete", {
            method: "DELETE",

            // Specify that we are sending JSON over.
            headers: {
            "Content-Type": "application/json",
            },

            // Send the id in JSON format.
            body: JSON.stringify({
                itemID: id
            }),
        });

        // Obtain the JSON response from the server and display its message.
        const responseJSON = await response.json();
        alert(responseJSON.message + " " + responseJSON.id);

        // Refresh the Todos list.
        viewTodos();
    
    } catch (e) {
        alert(e);

    }
}

// Make the create button call the create function when it is clicked.
document.getElementById("createButton").addEventListener("click", createTodo);

// Run on page load to obtain the current list of items.
viewTodos();
