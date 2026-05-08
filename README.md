# Loan Prediction App

A Machine Learning based Loan Prediction Web Application built using Flask, Scikit-learn, HTML, CSS, JavaScript, and Bootstrap.

## 🚀 Live Demo

https://loan-prediction-app-nv6q.onrender.com

---

# 📌 Features

- Predict loan approval status
- Probability-based approval prediction
- Risk analysis (Low / Medium / High Risk)
- Responsive web interface
- Machine Learning integration
- Flask backend API
- Render deployment support

---

# 🛠️ Technologies Used

## Backend
- Python
- Flask
- Scikit-learn
- Pandas
- NumPy

## Frontend
- HTML
- CSS
- JavaScript
- Bootstrap

## Deployment
- Render
- GitHub

---

# 📂 Project Structure

```text
loan-prediction-app/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── model/
│   │   ├── loan_model.pkl
│   │   ├── scaler.pkl
│   │   └── columns.pkl
│   │
│   ├── templates/
│   │   └── index.html
│   │
│   └── static/
│       └── script.js
│
├── README.md
├── LICENSE
└── .gitignore

⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/DhanushMD03/loan-prediction-app.git
2️⃣ Open Project Folder
cd loan-prediction-app
3️⃣ Create Virtual Environment
python -m venv venv
4️⃣ Activate Virtual Environment
Windows
venv\Scripts\activate
Linux / Mac
source venv/bin/activate
5️⃣ Install Dependencies
pip install -r backend/requirements.txt
6️⃣ Run Flask App
cd backend
python app.py
🌐 Open in Browser
http://127.0.0.1:5000
📊 Machine Learning Model

The model was trained using Scikit-learn for loan approval prediction based on:

Applicant Income
Coapplicant Income
Loan Amount
Credit History
Property Area
Employment Status
Education
Dependents
Marital Status

📷 Application Preview
Home Page
User enters loan details
Clicks Predict button
Receives approval prediction with risk score.

🔥 Future Improvements
User Authentication
Loan EMI Calculator
Data Visualization Dashboard
Database Integration
Model Accuracy Improvements
Mobile App Version

👨‍💻 Author
Dhanush MD
GitHub:
https://github.com/DhanushMD03

📄 License

This project is licensed under the MIT License.
