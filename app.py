from flask import Flask, render_template, request
from flask_cors import CORS
from geocoding import get_listings, get_result
app = Flask(__name__)
CORS(app)

global ppl_idx
ppl_idx=['person_1','person_2','person_3']

@app.route('/')
def my_form():
    return render_template('index.html',ppl_idx=ppl_idx)

@app.route('/usr_list', methods=['get'])
def my_form_post():
    # ppl_idx=['1','2','3']
    ppl_dat=[]
    for i in ppl_idx:
        ppl_dat.append(request.args.get(i))
    # text = request.form['text']
    # processed_text = text.upper()
    return render_template('usr_list.html',ppl_idx=ppl_idx,ppl_dat=ppl_dat)

@app.route('/find')
def find():
    return get_result(["SW7", "SW1", "SW2"])
    # return get_listings(["SW7", "23 Olympic Way"])


@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add("Access-Control-Allow-Credentials", "true")
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')
  response.headers.add('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,OPTIONS')
  response.headers.add('Cache-Control', 'no-cache, no-store, must-revalidate')
  response.headers.add('Pragma', 'no-cache')
  response.headers.add('Expires', '0')
  response.headers.add('Cache-Control', 'public, max-age=0')
  return response
if __name__ == '__main__':
    app.run(debug=True)
