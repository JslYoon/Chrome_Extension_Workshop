const BACKEND_URL = "http://localhost:5000";

const createTodo = async () => {
    const itemName = document.getElementById("todoName").value;

    try {
        const response = await fetch(BACKEND_URL + "/create", {
            method: "POST",

            headers: {
            "Content-Type": "application/json",
            },

            body: JSON.stringify({
            itemName: itemName
            }),
        });

        const responseJSON = await response.json();
        alert(responseJSON.message);
        viewTodos();
    
    } catch (e) {
        alert(e);

    }
}

const viewTodos = async () => {
    try {
        const response = await fetch(BACKEND_URL + "/view");
        const responseJSON = await response.json();
        const data = responseJSON.data;

        const tableBody = document.getElementById("todoTable").getElementsByTagName("tbody")[0];
        
        // Clear the table body.
        tableBody.innerHTML = "";

        for (let id in data) {
            let row = document.createElement("tr");

            // Create the name cell.
            let nameCell = document.createElement("td");
            nameCell.innerHTML = data[id];
            row.appendChild(nameCell);

            // Create the delete cell.
            let deleteCell = document.createElement("td");
            deleteCell.innerHTML = "<button class='btn btn-danger'>Delete</button>";
            deleteCell.addEventListener("click", () => deleteTodo(id))
            row.appendChild(deleteCell);

            // Add row to the table.
            tableBody.appendChild(row);
        }
    
    } catch (e) {
        alert(e);

    }
}

const deleteTodo = async (id) => {
    try {
        const response = await fetch(BACKEND_URL + "/delete", {
            method: "DELETE",

            headers: {
            "Content-Type": "application/json",
            },

            body: JSON.stringify({
                itemID: id
            }),
        });

        const responseJSON = await response.json();
        alert(responseJSON.message + " " + responseJSON.id);
        viewTodos();
    
    } catch (e) {
        alert(e);

    }
}

document.getElementById("createButton").addEventListener("click", createTodo);
viewTodos();