import pandas as pd
import random

rows = []

for i in range(100):
    row = {
        "Loan_ID": f"LP00{i+100}",
        "Gender": random.choice(["Male", "Female"]),
        "Married": random.choice(["Yes", "No"]),
        "Dependents": random.choice([0, 1, 2, 3]),
        "Education": random.choice(["Graduate", "Not Graduate"]),
        "Self_Employed": random.choice(["Yes", "No"]),
        "ApplicantIncome": random.randint(1500, 15000),
        "CoapplicantIncome": random.randint(0, 8000),
        "LoanAmount": random.randint(50, 400),
        "Loan_Amount_Term": random.choice([360, 180, 120]),
        "Credit_History": random.choice([0, 1]),
        "Property_Area": random.choice(["Urban", "Rural", "Semiurban"]),
        "Loan_Status": random.choice(["Y", "N"])
    }
    rows.append(row)

df = pd.DataFrame(rows)

# Save new data
df.to_csv("generated_data.csv", index=False)

print("100 rows generated!")