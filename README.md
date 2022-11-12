# Chrome_Extension_Workshop
This project is created for the Backend + Frontend workshop hosted during [BostonHacks 2022](https://bostonhacks.io/). It provides example code for creating a Chrome Extension with a Python Flask backend.

## Running This Project
**Both the Frontend and Backend have to be running before the application will work**

### Setting up the Google Chrome Extension Frontend
1. On the right-most icon of your Chrome taskbar (three vertical dots), select "More tools" and "Extensions"
2. Enable Developer Mode in the top right corner
3. Click the "Load unpacked" button that appears and select this project folder

### Setting up the Flask Backend
1. Download [Python](https://www.python.org/downloads/)
2. Run the following in your terminal:
```bash
# PATH_TO_THIS_FOLDER refers to the folder you place these files in.
cd <PATH_TO_THIS_FOLDER>

# If you have both Python 2 and Python 3 running on your computer, use pip3 and python3 instead.
pip install -r requirements.txt
python Backend.py
```
