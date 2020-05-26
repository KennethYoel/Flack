import os
import requests
import time

from flask import Flask, session, render_template, request, jsonify
from flask_session import (
    Session,
)  # an additional extension to sessions which allows them to be stored server-side
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.urandom(16)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)
socketio = SocketIO(app)

channelName = ["Channel 1", "Channel 2", "Channel 3"]
usersMsgs = {}
userName = ""


@app.route("/", methods=["GET", "POST"])
def index():
    """Register in users name."""
    # Forget any user_id
    session.clear()

    if session.get("userName") is None:
        session["userName"]  = ""

    if request.method == "POST":
        session["userName"] = request.form.get("username")
        userName = session["userName"] 
        print(userName)
        # Should I just have Session for username, since I want the cookies bowser to know who is the user is.
    
    return render_template("index.html", name=session["userName"])


@app.route("/username")
def username():
    return userName


@socketio.on("submit chat")
def loveLetter(json):
    # some JSON:
    name = json['username']
    usersMsgs[name] = json['chats']
    print("received my event: " + str(usersMsgs))  # so create a session[json["username"]] = json["chats"]
    # some emitting
    emit("message all", json, broadcast=True)


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


if __name__ == "__main__":
    socketio.run(app, debug=True)
