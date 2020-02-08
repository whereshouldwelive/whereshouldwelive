from flask import Flask, render_template, request
from geocoding import get_lat_long
app = Flask(__name__)

global ppl_idx
ppl_idx=['person 1','person 2','person 3']

@app.route('/')
def my_form():
    return render_template('index.html',ppl_idx=ppl_idx)

# er
@app.route('/usr_list', methods=['POST'])
def my_form_post():
    # ppl_idx=['1','2','3']
    ppl_dat=[]
    for i in ppl_idx:
        ppl_dat.append(request.form[i])
    # text = request.form['text']
    # processed_text = text.upper()
    return render_template('usr_list.html',ppl_idx=ppl_idx,ppl_dat=ppl_dat)

@app.route('/find')
def find():
    return get_lat_long("SW7")

if __name__ == '__main__':
    app.run(debug=True)
