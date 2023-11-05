<<<<<<< HEAD
from flask import Flask, jsonify, request
from flask_cors import CORS

=======
from flask import Flask, request, jsonify
from flask_cors import CORS

from doc import getDoc
>>>>>>> 07ee5418c0a59f15aad2114446bccfe4ffd2aeb9
from taskGen import getTaskList

app = Flask(__name__)

allowed_origins = ["http://127.0.0.1:5173/"]
CORS(app, origins=allowed_origins, supports_credentials=True)


@app.route("/text2break", methods=["POST"])
def text_prompt():
    response = jsonify({"msg": "text"})
    response.headers.add("Access-Control-Allow-Origin", "http://127.0.0.1:5173")
    return response


@app.route("/pdf2break", methods=["POST"])
def pdf_prompt():
    if "file" not in request.files:
        return {"error": "No file part"}, 400
    file = request.files['file']
    filename = file.filename

    response = jsonify({
        'filename': filename, 
        "msg": "dank"
        })
    response.headers.add("Access-Control-Allow-Origin", "http://127.0.0.1:5173")

    return response


# TEST
@app.route("/test", methods=["GET"])
def backend_function():
    response = jsonify({"msg": "Backend function called successfully"})
    response.headers.add("Access-Control-Allow-Origin", "http://127.0.0.1:5173")
    return response

<<<<<<< HEAD
@app.route("/getTasks", methods=["POST"])
def getTasks():
    pass
=======
>>>>>>> 07ee5418c0a59f15aad2114446bccfe4ffd2aeb9

if __name__ == "__main__":
    app.run(debug=True, port=8080)
