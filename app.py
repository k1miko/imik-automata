from flask import Flask, render_template, request, jsonify
import test
from baybayin import BaybayinToLatin
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/transliterate/latin-to-baybayin', methods=['POST'])
def translit_from_latin_to_baybayin():
    data = request.get_json()

    if 'input' not in data:
        return jsonify({'error': 'Invalid request'}), 400
    input_str = data['input']

    converter = test.LatinToBaybayin()
    result = converter.process_input(input_str)
    if converter.state == converter.state == "dead" or converter.state == "consonant" or converter.state == "digraph": # If last input is not in a final state
        result = "Input not available in Baybayin"
    elif converter.state == "final_consonant": # If last input is a final consonant
        result = result[:-1]
    elif converter.state == "final_digraph": # If last input is a final digraph
            result = result[:-2]

    return jsonify({'result': result})

syllabic = ["BA", "CA", "DA", "FA", "GA", "HA", "JA", "KA", "LA", "MA", "NA", "PA", "QA", "RA", "SA", "TA", "VA", "WA", "XA", "YA", "ZA"]

@app.route('/api/transliterate/baybayin-to-latin', methods=['POST'])
def translit_from_baybayin_to_latin():
    data = request.get_json()

    if 'input' not in data:
        return jsonify({'error': 'Invalid request'}), 400
    
    input_str = data['input']

    if input_str not in syllabic:
        return jsonify({'error': 'Invalid syllabic'}), 400
    
    converter = BaybayinToLatin()
    result = converter.process_input(input_str, syllabic)

    if converter.state == "start": # If input is only in a start state
            result = "Enter a character"
    elif converter.state == "dead": # If last input is not in a final state
            result = "Input not available in Baybayin"
    
    return jsonify({'result': result})


@app.route('/about') 
def about():
    return render_template('about.html')

@app.route('/practice') 
def practice():
    return render_template('practice.html')


if __name__ == '__main__':
    app.run(debug=True)