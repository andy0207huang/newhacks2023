import os
from flask import Flask, jsonify, request
from flask_cors import CORS

from doc import getDoc
from taskGen import getTaskList
# from gcal import createEvent

app = Flask(__name__)

# allowed_origins = ["http://127.0.0.1:5173/"]
CORS(app, origins="*", supports_credentials=True)


@app.route("/text2break", methods=["POST"])
def text_prompt():
    response = jsonify({"msg": "text"})
    # response.headers.add("Access-Control-Allow-Origin", "http://127.0.0.1:5173")
    return response


@app.route("/pdf2break", methods=["POST"])
def pdf_prompt():
    if "file" not in request.files:
        return {"error": "No file part"}, 400
    file = request.files['file']
    filename = file.filename

    text = getDoc(file)

    # openai free limit of 4096 tokens
    if len(text) > 4096:
        taskListText = getTaskList(text[0:4095], "November 4th, 2023", "November 30th, 2023")
    else:
        taskListText = getTaskList(text, "November 4th, 2023", "November 30th, 2023")

    response = jsonify({
        'filename': filename, 
        # 'text': text,
        'text': taskListText,
        "msg": "dank"
        })
    # response.headers.add("Access-Control-Allow-Origin", "http://127.0.0.1:5173")

    return response

# @app.route("/createEvent", methods=["POST"])
# def eventCreate():
#     eventList = request.form.get("events")

#     createEvent(eventList)

#     response = jsonify({
#         'msg': "Events Saved in Calendar"
#     })

#     return response

# TEST
@app.route("/test", methods=["GET"])
def backend_function():
    response = jsonify({"msg": "Backend function called successfully"})
    response.headers.add("Access-Control-Allow-Origin", "http://127.0.0.1:5173")
    return response


if __name__ == "__main__":
    app.run(debug=True, port=8080)
