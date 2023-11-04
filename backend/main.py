from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

# allowed_origins = ["http://127.0.0.1:5173/"]
# CORS(app, origins=allowed_origins, supports_credentials=True)

# TEST
@app.route("/test", methods=["GET"])
def backend_function():
    # Your backend logic here
    response = jsonify({"msg": "Backend function called successfully"})
    response.headers.add("Access-Control-Allow-Origin", "http://127.0.0.1:5173")
    return response

if __name__ == "__main__":
    app.run(debug=True, port=8080)
