from flask import Flask, request, jsonify, send_from_directory
import os
import tensorflow as tf
from PIL import Image
import numpy as np
import io

app = Flask(__name__, static_url_path='', static_folder='.')

# Load model
model_path = os.path.join('model', 'Plant_Disease_Classification.keras')
print(f"Loading model from {model_path}...")
model = tf.keras.models.load_model(model_path)
print("Model loaded successfully.")

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No image provided'}), 400
        
    try:
        # Read image
        img = Image.open(io.BytesIO(file.read()))
        # Ensure RGB
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Resize to 224x224
        img = img.resize((224, 224))
        
        # Convert to numpy array
        img_array = np.array(img)
        
        # Preprocess using MobileNetV2 standards
        # (This scales pixels to [-1, 1] as required by standard MobileNetV2)
        img_array = tf.keras.applications.mobilenet_v2.preprocess_input(img_array)
        
        # Add batch dimension
        img_array = np.expand_dims(img_array, axis=0)
        
        # Predict
        predictions = model.predict(img_array)
        class_index = np.argmax(predictions[0])
        confidence = float(predictions[0][class_index])
        
        return jsonify({
            'class_index': int(class_index),
            'confidence': round(confidence * 100, 2)
        })
        
    except Exception as e:
        print(f"Error during prediction: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
