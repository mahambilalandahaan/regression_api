const featureNames = ["age","sex","bmi","bp","s1","s2","s3","s4","s5","s6"];

async function predict() {
    const model = document.getElementById("model").value;
    const resultDiv = document.getElementById("result");
    resultDiv.innerText = "Predicting...";

    // Build features object
    const features = {};
    featureNames.forEach(f => {
        const val = document.getElementById(f).value;
        features[f] = f === "sex" ? parseInt(val || "0") : parseFloat(val || "0");
    });

    try {
        const response = await fetch("/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model, features })
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();

        // Format result nicely
        let resultText = `Prediction (${data.model}): ${data.prediction.toFixed(2)}\n`;
        resultText += `Intercept: ${data.intercept.toFixed(2)}\n`;
        resultText += "Coefficients:\n";
        data.coefficients.forEach((coef, i) => {
            resultText += `${featureNames[i]}: ${coef.toFixed(3)}\n`;
        });

        // Display result
        resultDiv.innerText = resultText;
        resultDiv.scrollIntoView({ behavior: "smooth" });

    } catch (error) {
        resultDiv.innerHTML = `<strong>Error:</strong> ${error.message}`;
    }
}
