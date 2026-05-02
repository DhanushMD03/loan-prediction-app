from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import pickle
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

# Base directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load model files
model = pickle.load(open(os.path.join(BASE_DIR, "model/loan_model.pkl"), "rb"))
scaler = pickle.load(open(os.path.join(BASE_DIR, "model/scaler.pkl"), "rb"))
columns = pickle.load(open(os.path.join(BASE_DIR, "model/columns.pkl"), "rb"))

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        df = pd.DataFrame([data])

        # Fix Dependents
        if "Dependents" in df.columns:
            df["Dependents"] = df["Dependents"].replace("3+", 3)

        # Numeric columns
        num_cols = [
            "ApplicantIncome",
            "CoapplicantIncome",
            "LoanAmount",
            "Loan_Amount_Term",
            "Credit_History",
            "Dependents"
        ]

        for col in num_cols:
            if col in df.columns:
                df[col] = pd.to_numeric(df[col], errors="coerce").fillna(0)

        # One-hot encoding
        df = pd.get_dummies(df)

        # Add missing columns
        for col in columns:
            if col not in df.columns:
                df[col] = 0

        # Ensure correct order
        df = df[columns]

        # Scale
        df_scaled = scaler.transform(df)

        # Predict
        pred = model.predict(df_scaled)[0]
        proba = model.predict_proba(df_scaled)[0][1]

        result = "Approved" if pred == 1 else "Rejected"

        return jsonify({
            "result": result,
            "probability": round(float(proba) * 100, 2)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))