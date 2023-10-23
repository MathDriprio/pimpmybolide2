from flask import Flask, request, render_template, redirect, url_for, abort, flash, g
import requests as req
import json


app = Flask(__name__)
app.secret_key = 'une cle(token) : grain de sel(any random string)'


def get_data(api):
    response = req.get(f"{api}", verify=False)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Hello person, there's a {response.status_code} error with your request")
        return []


@app.route('/show_voiture')
def show_voiture():
    clubs = get_data("http://node2.adky.net:25286/voiture")
    return render_template('acceuil.html', clubs=clubs)

@app.route('/page_detail')
def page_detail():
    id = request.args.get('id')
    # clubs = get_data("http://node2.adky.net:25286/voiture")
    voiture = get_data(f"http://node2.adky.net:25286/voiture?id="+id)
    return render_template('page_detail.html', voiture=voiture[0])

@app.route('/panier', methods=['GET'])
def page_panier():
    panier = get_data("http://node2.adky.net:25286/panier")
    return render_template('panier.html', panier=panier)

if __name__ == '__main__':
    app.run()

