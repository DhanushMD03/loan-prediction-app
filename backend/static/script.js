async function predict() {

// Convert years → months
let years = parseFloat(document.getElementById("term").value) || 30;
let termInMonths = years * 12;

const data = {
    Gender: document.getElementById("gender").value,
    Married: document.getElementById("married").value,
    Dependents: document.getElementById("dependents").value,
    Education: document.getElementById("education").value,
    Self_Employed: document.getElementById("self_employed").value,
    ApplicantIncome: parseFloat(document.getElementById("income").value) || 0,
    CoapplicantIncome: parseFloat(document.getElementById("co_income").value) || 0,
    LoanAmount: parseFloat(document.getElementById("loan").value) || 0,
    Loan_Amount_Term: termInMonths,
    Credit_History: parseInt(document.getElementById("credit").value),
    Property_Area: document.getElementById("property").value
};

try {
    const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    const resultElement = document.getElementById("result");
    const progressBar = document.getElementById("progressBar");

    if (result.error) {
        resultElement.innerText = "Error: " + result.error;
        resultElement.style.color = "red";
        return;
    }

    // 🎨 Result color
    resultElement.style.color = result.result === "Approved" ? "green" : "red";

    // 📊 Risk level
    let risk = "";
    if (result.probability >= 80) risk = "Low Risk";
    else if (result.probability >= 60) risk = "Medium Risk";
    else risk = "High Risk";

    resultElement.innerText =
        result.result + " (" + result.probability + "%) - " + risk;

    // 📈 Progress bar
    progressBar.style.width = result.probability + "%";
    progressBar.innerText = result.probability + "%";

    if (result.result === "Approved") {
        progressBar.classList.remove("bg-danger");
        progressBar.classList.add("bg-success");
    } else {
        progressBar.classList.remove("bg-success");
        progressBar.classList.add("bg-danger");
    }

} catch (error) {
    console.error("Error:", error);
    document.getElementById("result").innerText = "Server connection failed.";
}


}
