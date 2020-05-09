import os
import requests

from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

# Set enviroment variable
os.environ["API_KEY"] = "GZZX52IAd0zxYaYnZOsw"
# Check for environment variable
if not os.getenv("API_KEY"):
    raise RuntimeError("API_KEY is not set")

votes = {"yes": 0, "no": 0, "maybe": 0}


@app.route("/")
def index():
    return render_template("index.html", votes=votes)


@app.route("/book_review", methods=["POST"])
def book_review():
    """Look a book by its isbn."""
    # Contact API
    api_key = os.environ.get("API_KEY")
    # Query for isbn.
    isbn = request.form.get("isbn")
    response = requests.get(
        "https://www.goodreads.com/book/review_counts.json",
        params={"key": api_key, "isbns": isbn},
    )

    if response.status_code != 200:
        return jsonify({"success": False})

    # Parse response
    try:
        data = response.json()
        return jsonify(
            {"success": True, "rate_average": data["books"][0]["average_rating"]}
        )
    except (KeyError, TypeError, ValueError):
        return jsonify({"success": False})


@socketio.on("submit vote")
def vote(data):
    selection = data["selection"]
    votes[selection] += 1
    emit("vote totals", votes, broadcast=True)
    # emit("announce vote", {"selection": selection}, broadcast=True)
