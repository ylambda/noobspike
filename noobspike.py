from flask import Flask, request, render_template
from noobspike.database import db_session

app = Flask(__name__)
app.debug = True

@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()

@app.route("/")
def index():
    return render_template("index.html")


if __name__ == '__main__':
    app.run()
