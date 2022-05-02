import os
import json
import datetime
import forex_python
from flask import Flask, request, render_template, redirect, flash
from forex_python.converter import CurrencyRates

app = Flask(__name__)
app.config['SECRET_KEY'] = "forexconverterapp"

file_path = os.path.dirname(os.path.abspath(__file__))
with open(file_path + '/assets/currencies.json') as f:
    currency_data = json.loads(f.read())

@app.route("/")
def homepage():
    return redirect('/convert')

@app.route("/convert",methods=['POST'])
def convert_result():
    codes = [d['cc'] for d in currency_data]
    currentDT = datetime.datetime.now()
    return render_template("index.html", codes=codes, currentDT=currentDT)

@app.route("/convert/new", methods=['POST'])
def convert():
    try:
        amount = request.form["amount"]
        to = request.form["to"]
        from_code = request.form["from-code"]
        c = CurrencyRates()
        converted = c.convert(from_code, to, float(amount))
        def get_name_symbol(code):
            return next((item for item in currency_data if item["cc"] == code), None)
        from_name = get_name_symbol(from_code)['name']
        to_symb = get_name_symbol(to)['symbol']
        to_name = get_name_symbol(to)['name']
        flash(
            f"{amount} {from_name} equals {to_symb}{round(converted, 2)} {to_name}",
            'success')
    except forex_python.converter.RatesNotAvailableError:
        flash(
            f"{from_code} to {to} conversion is currently not available.",
            'error')
    return redirect('/convert')

if __name__ == '__main__':
    app.run()
