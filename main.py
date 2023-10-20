from flask import Flask, request, render_template, redirect, url_for, abort, flash, g
import requests as req
import json


app = Flask(__name__)
app.secret_key = 'une cle(token) : grain de sel(any random string)'


def get_data(api):
    response = req.get(f"{api}")
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Hello person, there's a {response.status_code} error with your request")
        return []


print(get_data("https://node2.adky.net:25286/voiture"))
@app.route('/clubs/show')
def show_clubs():
    clubs = "get_data()"
    return render_template('clubs/show_clubs.html', clubs=clubs)

if __name__ == '__main__':
    app.run()
