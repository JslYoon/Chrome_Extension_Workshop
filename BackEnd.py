import json
import uuid

from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)

# calling CORS on the app allows everyone to get info from the app. By default, servers an only request from themselves
CORS(app)

# This function will run when the "/" route is called with a GET request.
@app.route("/")
def index():
    return "Hello Bostonhacks!"

# This function will run when the "/create" route is called with a POST request.
@app.route("/create", methods=["POST"])
def create():
    """
    Create an item in a todo list with a unique ID
    input type: string
    return type: string
    """
    try:
        # Get the item name from the request sent.
        item_name = request.get_json().get("itemName")

        # Read data from the JSON file.
        with open("todo.json") as readfile:
            data = json.load(readfile)

        # Create a unique ID and store it in dictionary
        id = uuid.uuid4().int
        data[id] = item_name

        # Write JSON using data dictionary
        with open("todo.json", "w") as outfile:
            json.dump(data, outfile)

        # Return a response
        return {"message": "Success"}

    except Exception as e:
        # Return a response
        return {"message": type(e)}

# This function will run when the "/view" route is called with a GET request.
@app.route("/view")
def view():
    """
    view ToDo Items stored in a JSON File
    input type: None
    return type: dictionary
    """
    try:
        # Read data from the JSON file.
        with open("todo.json") as readfile:
            data = json.load(readfile)

        return {"data": data}

    except Exception as e:
        # Return a response
        return {"message": type(e)}

# This function will run when the "/delete" route is called with a DELETE request.
@app.route("/delete", methods=["DELETE"])
def delete():
    """
    Delete the item with the specified ID 
    input type: string
    return type: string
    """
    try:
        # Get the item id from the request sent.
        item_ID = request.get_json().get("itemID")
            
        # Read data from the JSON file.
        with open("todo.json") as readfile:
            data = json.load(readfile)

        # Delete the item correlated with the given ID and upload it to JSON
        data.pop(item_ID)
        with open("todo.json", "w") as outfile:
            json.dump(data, outfile)

        # Return a response
        return {"message": "Success", "id": item_ID}
    
    except Exception as e:
        # Return a response
        return {"message": type(e)}

if __name__ == "__main__":
    # debug=True will rerun the code whenever a change is made.
    app.run(debug=True)