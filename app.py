from flask import Flask, render_template, request, jsonify, send_file
from io import BytesIO
import test
from baybayin import BaybayinToLatin
from PIL import Image
import base64
import os

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
    result = converter.process_input(input_str)

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

if not os.path.exists('img'):
    os.makedirs('img')

# Your existing routes...

@app.route('/api/capture_canvas', methods=['POST'])
def capture_canvas():
    data = request.get_json()

    if 'canvasId' not in data or 'dataURL' not in data:
        return jsonify({'success': False, 'error': 'Invalid request'}), 400

    canvas_id = data['canvasId']
    data_url = data['dataURL']

    # Assuming you have a function to convert base64 data URL to an image, modify accordingly
    image = convert_data_url_to_image(data_url)

    # Save the image to the 'img' directory
    image.save(f'img/{canvas_id}_output.png')

    # Print a message to the terminal
    print(f'Image from {canvas_id} captured and saved successfully.')

    # Return success response with the image URL
    return jsonify({'success': True, 'imageUrl': f'/get_image/{canvas_id}'})


def convert_data_url_to_image(data_url):
    # Remove the data URL prefix
    data_url = data_url.split(',')[1]

    # Decode base64 data
    image_data = BytesIO(base64.b64decode(data_url))

    # Use PIL to open the image stream
    image = Image.open(image_data)

    return image



if __name__ == '__main__':
    app.run(debug=True)