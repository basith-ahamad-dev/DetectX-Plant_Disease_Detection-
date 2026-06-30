from flask import Flask, request, jsonify, send_from_directory
import os
import tensorflow as tf
from PIL import Image
import numpy as np
import io
import mysql.connector
import json

app = Flask(__name__, static_url_path='', static_folder='.')

# Database configuration
DB_CONFIG = {
    'user': 'root',
    'password': '',
    'host': 'localhost',
    'database': 'plant_disease_db'
}

# Load model
model_path = os.path.join('model', 'Plant_Disease_Classification.keras')
print(f"Loading model from {model_path}...")
model = tf.keras.models.load_model(model_path)
print("Model loaded successfully.")

def get_disease_info(class_index):
    try:
        cnx = mysql.connector.connect(**DB_CONFIG)
        cursor = cnx.cursor(dictionary=True)
        query = "SELECT * FROM diseases_info WHERE model_class_index = %s"
        cursor.execute(query, (class_index,))
        result = cursor.fetchone()
        cursor.close()
        cnx.close()
        
        if result:
            # Parse JSON text back into lists so it perfectly matches the frontend format
            result['tags'] = json.loads(result['tags']) if result['tags'] else []
            result['symptoms'] = json.loads(result['symptoms']) if result['symptoms'] else []
            result['treatments'] = json.loads(result['treatments']) if result['treatments'] else []
            
            # The frontend expects 'subtitle' for the scientific name
            result['subtitle'] = result.get('scientific_name', '')
            
            return result
        return None
    except Exception as e:
        print(f"Database error: {e}")
        return None

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
        img_array = tf.keras.applications.mobilenet_v2.preprocess_input(img_array)
        
        # Add batch dimension
        img_array = np.expand_dims(img_array, axis=0)
        
        # Predict
        predictions = model.predict(img_array)
        class_index = int(np.argmax(predictions[0]))
        confidence = float(predictions[0][class_index])
        
        # Fetch disease details from MySQL
        disease_data = get_disease_info(class_index)
        
        return jsonify({
            'class_index': class_index,
            'confidence': round(confidence * 100, 2),
            'disease_info': disease_data
        })
        
    except Exception as e:
        print(f"Error during prediction: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
