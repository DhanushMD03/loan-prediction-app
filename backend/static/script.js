async function predict() {
    const resultElement = document.getElementById("result");
    const progressBar = document.getElementById("progressBar");
    const submitBtn = document.getElementById("predictBtn");

    if (resultElement) {
        resultElement.innerText = "Processing...";
        resultElement.style.color = "blue";
    }

    if (submitBtn) submitBtn.disabled = true;

    try {
        const years = parseFloat(document.getElementById("term")?.value) || 30;

        const data = {
            Gender: document.getElementById("gender")?.value || "",
            Married: document.getElementById("married")?.value || "",
            Dependents: document.getElementById("dependents")?.value || "0",
            Education: document.getElementById("education")?.value || "",
            Self_Employed: document.getElementById("self_employed")?.value || "No",
            ApplicantIncome: parseFloat(document.getElementById("income")?.value) || 0,
            CoapplicantIncome: parseFloat(document.getElementById("co_income")?.value) || 0,
            LoanAmount: parseFloat(document.getElementById("loan")?.value) || 0,
            Loan_Amount_Term: years * 12,
            Credit_History: parseInt(document.getElementById("credit")?.value) ?? 1,
            Property_Area: document.getElementById("property")?.value || ""
        };

        const response = await fetch("/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const result = await response.json();
        if (result.error) throw new Error(result.error);

        const isApproved = result.result === "Approved";
        const prob = Number(result.probability ?? 0);

        let risk = "High Risk";
        if (prob >= 80) risk = "Low Risk";
        else if (prob >= 60) risk = "Medium Risk";

        resultElement.innerText = `${result.result} (${prob}%) - ${risk}`;
        resultElement.style.color = isApproved ? "#28a745" : "#dc3545";

        if (progressBar) {
            progressBar.style.width = `${prob}%`;
            progressBar.innerText = `${prob}%`;
            progressBar.className = isApproved
                ? "progress-bar bg-success"
                : "progress-bar bg-danger";
        }

    } catch (error) {
        console.error("Prediction Error:", error);

        if (resultElement) {
            resultElement.innerText = "Something went wrong. Please try again.";
            resultElement.style.color = "red";
        }

        if (progressBar) {
            progressBar.style.width = "0%";
            progressBar.innerText = "0%";
        }

    } finally {
        if (submitBtn) submitBtn.disabled = false;
    }
}