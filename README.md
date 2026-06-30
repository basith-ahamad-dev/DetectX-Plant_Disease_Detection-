# DetectX: Plant Disease Detection

DetectX is an AI-powered web application that identifies plant diseases from images of leaves. It uses a deep learning neural network (MobileNetV2) trained on 38 different plant/disease classes to instantly diagnose crop health and provide organic treatment plans.

## 🚀 How to Run the Application

### 1. Activate the Virtual Environment
Before running the backend, ensure your virtual environment is active. Open a terminal in the project directory and run:
```powershell
.\venv\Scripts\Activate.ps1
```
*(If you are using Command Prompt instead of PowerShell, run `.\venv\Scripts\activate.bat`)*

### 2. Start the Backend Server
Once the virtual environment is active, start the Flask web server by running:
```bash
python app.py
```
*You should see output indicating that the Keras model is loading and that the server is running on `http://127.0.0.1:5000`.*

### 3. Open the Website
Open your web browser and navigate to:
[http://localhost:5000](http://localhost:5000)

## 🧠 How It Works

### The Architecture
1. **The Frontend (`index.html` & `disease_data.js`)**
   - The user interface is built with standard HTML/JS and styled using Tailwind CSS.
   - When you drop an image into the upload box and click "Analyze Image", the frontend creates a `FormData` object and securely sends the image via an asynchronous `fetch()` POST request to the backend.
   - It also contains `disease_data.js`, a comprehensive dictionary containing all 38 possible classifications, their associated symptoms, severity tags, and treatment plans.

2. **The Backend (`app.py`)**
   - Built with **Flask**, this lightweight server listens for incoming images on the `/predict` API endpoint.
   - When an image arrives, it is loaded into memory using Pillow (`PIL`) and resized to exactly `224x224` pixels (the required input dimension for our specific neural network).
   - The image is converted into a mathematical array and preprocessed (scaling pixel values to a range of -1 to 1).

3. **The Model (`Plant_Disease_Classification.keras`)**
   - The preprocessed image is passed into the pre-trained Keras model.
   - The model calculates the probability of the image belonging to each of the 38 plant/disease classes it was trained on.
   - The backend identifies the class with the highest probability (e.g., class index `29`) and returns that number, along with the confidence score, back to the frontend.

4. **The Results Engine**
   - The frontend receives the class index from the server.
   - It looks up index `29` in the `disease_data.js` mapping, discovering that it translates to **Tomato Early Blight**.
   - Finally, the UI dynamically injects the appropriate diagnosis, symptoms, and organic treatment plans into the Results screen and displays them to the user.
