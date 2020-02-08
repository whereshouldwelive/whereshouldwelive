from flask import Flask, render_template, request
app = Flask(__name__)


@app.route('/')
def my_form():
    ppl_idx=['1','2','3']
    return render_template('index.html',ppl_idx=ppl_idx)

@app.route('/usr_list', methods=['POST'])
def my_form_post():
    ppl_idx=['1','2','3']
    ppl_dat=[]
    for i in ppl_idx:
        ppl_dat.append(request.form[i])
    # text = request.form['text']
    # processed_text = text.upper()
    return render_template('usr_list.html',ppl_idx=ppl_idx,ppl_dat=ppl_dat)

if __name__ == '__main__':
    app.run(debug=True)
