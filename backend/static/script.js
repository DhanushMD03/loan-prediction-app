async function predict() {
    // 1. Convert years → months
    const yearsInput = document.getElementById("term").value;
    const years = parseFloat(yearsInput) || 30;
    const termInMonths = years * 12;

    // 2. Prepare Data payload
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
        // 3. API Call
        const response = await fetch("/predict", {   // ✅ FIXED path
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("Server error");
        }

        const result = await response.json();
        const resultElement = document.getElementById("result");
        const progressBar = document.getElementById("progressBar");

        if (result.error) {
            resultElement.innerText = `Error: ${result.error}`;
            resultElement.style.color = "red";
            return;
        }

        // 🎨 Color logic
        resultElement.style.color = result.result === "Approved" ? "green" : "red";

        // 📊 Risk assessment logic
        let risk = "";
        if (result.probability >= 80) risk = "Low Risk";
        else if (result.probability >= 60) risk = "Medium Risk";
        else risk = "High Risk";

        // Update result text using template literals
        resultElement.innerText = `${result.result} (${result.probability}%) - ${risk}`;

        // 📈 Update Progress bar
        if (progressBar) {
            progressBar.style.width = `${result.probability}%`;
            progressBar.innerText = `${result.probability}%`;
            
            // Set color based on approval status
            progressBar.className = result.result === "Approved" 
                ? "progress-bar bg-success" 
                : "progress-bar bg-danger";
        }

    } catch (error) {
        console.error("Error:", error);
        document.getElementById("result").innerText = "Server connection failed.";
    }
}