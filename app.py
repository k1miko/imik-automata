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
    result = converter.process_input(input_str)

    return jsonify({'result': result})


if __name__ == '__main__':
    app.run(debug=True)