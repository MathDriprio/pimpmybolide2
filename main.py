from flask import Flask, request, render_template, redirect, url_for, abort, flash, g
import requests as req
import json, math


app = Flask(__name__)
app.secret_key = 'une cle(token) : grain de sel(any random string)'


def get_data(api):
    response = req.get(f"{api}", verify=False)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Hello person, there's a {response.status_code} error with your request")
        return []


@app.route("/")
def accueuil():
    return render_template("acceuil.html")


@app.route('/show_voiture')
def show_voiture():
    voitures = get_data("http://node2.adky.net:25286/voiture")
    return render_template('show_voitures.html', voitures = voitures)


@app.route('/page_detail')
def page_detail():
    id = request.args.get('id')
    # clubs = get_data("http://node2.adky.net:25286/voiture")
    voiture = get_data(f"http://node2.adky.net:25286/voiture?id=" + id)
    return render_template('page_detail.html', voiture=voiture[0])


@app.route('/panier', methods=['GET'])
def page_panier():
    panier = get_data("http://node2.adky.net:25286/panier")
    total = 0
    for car in panier:
        total+=car["prixVoiture"] * pow(1.1, car["stage"])
    return render_template('panier.html', panier=panier, total=format(total, '.2f'))


@app.route("/panier/delete", methods=["GET"])
def del_panier():
    idPanier = request.args.get("id")
    req.delete(f"http://node2.adky.net:25286/panier?idPanier="+idPanier, verify=False)
    return redirect("/panier")

@app.route("/panier/add", methods=["GET"])
def add_panier():
    idVoiture = request.args.get("idVoiture")
    stage = request.args.get("stage")
    if stage is None:
        stage = 0
    req.post(f"http://node2.adky.net:25286/panier?idVoiture="+str(idVoiture)+"&stageVoiture="+str(stage), verify=False)
    return redirect("/panier")

@app.route("/validerPanier")
def lol():
    return render_template("validerPanier.html")

if __name__ == '__main__':
    app.run()
