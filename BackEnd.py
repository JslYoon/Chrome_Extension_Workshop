import json
import uuid
from flask import Flask
app = Flask(__name__)

@app.route("/view")
def view():
    """
    view ToDo Items stored in a JSON File
    input type: None
    return type: dictionary
    """

    # Open JSON file
    f = open('todo.json')

    # JSON data is stored in data as a dictionary
    data = json.load(f)

    # Closing file
    f.close()

    return data

@app.route("/create")
def create(item):
    """
    Create an item in a todo list with a unique ID
    input type: string
    return type: string
    """
    # Read the todo list as a dictionary
    data = view()

    # Create a unique ID and store it in dictionary
    id = uuid.uuid4().int
    data[id] = str(item)

    # Write JSON using data dictionary
    with open("todo.json", "w") as outfile:
        json.dump(data, outfile)

    # Return the created Id
    return id

@app.route("/delete")
def delete(item_id):
    """
    Delete the item with the specified ID 
    input type: string
    return type: string
    """
        
    # Read the todo list as a dictionary
    data = view()

    # Read the todo item with specified ID
    item = data[item_id]

    # Delete the item correlated with the given ID and upload it to JSON
    data.pop(item_id)
    with open("todo.json", "w") as outfile:
        json.dump(data, outfile)

    # Return the item
    return item

if __name__ == "__main__":
    app.run()
