import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score
import pickle

# Load dataset
data = pd.read_csv("loan_data_real.csv")

# 🔥 Remove index column if exists
if data.columns[0] == "Unnamed: 0":
    data.drop(columns=[data.columns[0]], inplace=True)

# 🔥 Fix Loan_Status (already 0/1 → no mapping needed)
# If Y/N exists, uncomment below:
# data["Loan_Status"] = data["Loan_Status"].map({"Y": 1, "N": 0})

# 🔥 Handle missing values
data.fillna({
    "Gender": "Male",
    "Married": "Yes",
    "Dependents": 0,
    "Self_Employed": "No",
    "LoanAmount": data["LoanAmount"].mean(),
    "Loan_Amount_Term": 360,
    "Credit_History": 1
}, inplace=True)

# 🔥 Fix Dependents (3+ → 3)
data["Dependents"] = data["Dependents"].replace("3+", 3)
data["Dependents"] = data["Dependents"].astype(float)

# 🔥 Drop ID
data.drop("Loan_ID", axis=1, inplace=True)

# 🔥 Convert categorical
data = pd.get_dummies(data, drop_first=True)

# Split
X = data.drop("Loan_Status", axis=1)
y = data["Loan_Status"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Scale
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Train
model = RandomForestClassifier(
    n_estimators=200,
    max_depth=10,
    random_state=42
)

model.fit(X_train, y_train)
# Evaluate
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print(f"Accuracy: {accuracy*100:.2f}%")
print("Rows:", len(data))

# Save
pickle.dump(model, open("loan_model.pkl", "wb"))
pickle.dump(scaler, open("scaler.pkl", "wb"))
pickle.dump(X.columns.tolist(), open("columns.pkl", "wb"))

print("✅ Clean real dataset model trained!")