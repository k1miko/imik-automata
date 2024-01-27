from flask import Flask, render_template, request, jsonify
import test
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/transliterate', methods=['POST'])
def translit_from_latin_to_baybayin():
    data = request.get_json()

    if 'input' not in data:
        return jsonify({'error': 'Invalid request'}), 400

    input_str = data['input']

    converter = test.LatinToBaybayinConverter()
    converter.process_input(input_str)
    if converter.state == converter.state == "dead" or converter.state == "consonant" or converter.state == "digraph": # If last input is not in a final state
        converter.result = "Input not available in Baybayin"
    elif converter.state == "final_consonant": # If last input is a final consonant
        converter.result = converter.result[:-1]
    
    result = converter.result

    return jsonify({'result': result})


if __name__ == '__main__':
    app.run(debug=True)