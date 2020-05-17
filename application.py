import os
import requests
import time

from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

channelName = ["Channel 1", "Channel 2", "Channel 3"]


@app.route("/")
def index():
    return render_template("index.html")


@socketio.on("submit message")
def message(data):
    userInput = data["userInput"]
    emit("chats", {'userInput': userInput}, broadcast=True)
    # emit("announce vote", {"selection": selection}, broadcast=True)


@app.route("/first")
def first():
    return channelName[0]


@app.route("/second")
def second():
    return channelName[1]    


@app.route("/third")
def third():
    return channelName[2]


@app.route("/posts", methods=["POST"])
def posts():
    # Get start and end point for posts to generate.
    start = int(request.form.get("start") or 0)
    end = int(request.form.get("end") or (start + 100))

    # Generate list of posts.
    data = []
    for i in range(start, end + 1):
        data.append(f"Post #{i}")

        # Artificially delay speed of response.
        time.sleep(1)

        # Return list of posts.
        return jsonify(data)