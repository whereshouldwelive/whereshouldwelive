from flask import Flask, render_template, request
from geocoding import get_lat_long
app = Flask(__name__)

global ppl_idx
ppl_idx=['person_1','person_2','person_3']

@app.route('/')
def my_form():
    print(ppl_idx)
    return render_template('index.html',ppl_idx=ppl_idx)

@app.route('/usr_list', methods=['POST'])
def my_form_post():
    # ppl_idx=['1','2','3']
    ppl_dat=[]
    for i in ppl_idx:
        print(i)
        ppl_dat.append(request.form[i])
    # text = request.form['text']
    # processed_text = text.upper()
    return render_template('usr_list.html',ppl_idx=ppl_idx,ppl_dat=ppl_dat)

# @app.route('/find')
# def find():
#     return get_lat_long("SW7")

if __name__ == '__main__':
    app.run(debug=True)
