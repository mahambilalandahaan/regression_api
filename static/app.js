
document.addEventListener("DOMContentLoaded", () => {
    const featureNames = ["age","sex","bmi","bp","s1","s2","s3","s4","s5","s6"];
    let coefChart = null;

    const sendButton = document.getElementById("predict-btn"); 
    const inputs = featureNames.map(f => document.getElementById(f));

    // Enter key triggers predict
    inputs.forEach(input => {
        input.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                sendButton.click();
            }
        });
    });

    async function predict() {
        const model = document.getElementById("model").value;
        const resultDiv = document.getElementById("result");
        resultDiv.innerText = "Predicting...";

        // Build features
        const features = {};
        featureNames.forEach(f => {
            const val = document.getElementById(f).value;
            features[f] = f === "sex" ? parseInt(val || "0") : parseFloat(val || "0");
        });

        // Normal ranges (skip age & sex)
        const normalRanges = {
            bmi: [18.5, 24.9],
            bp: [80, 120],
            s1: [100, 150],
            s2: [80, 120],
            s3: [20, 50],
            s4: [70, 100],
            s5: [0.5, 1.5],
            s6: [0.2, 0.7]
        };

        // Build table
        let tableHTML = `
        <strong>Normal Ranges:</strong>
        <table style="width:100%; border-collapse:collapse; margin-top:10px;">
        <tr>
        <th style="border-bottom:1px solid #ccc; text-align:left; padding:4px;">Test</th>
        <th style="border-bottom:1px solid #ccc; text-align:left; padding:4px;">Value</th>
        <th style="border-bottom:1px solid #ccc; text-align:left; padding:4px;">Normal Range</th>
        <th style="border-bottom:1px solid #ccc; text-align:left; padding:4px;">Status</th>
        </tr>
        `;

        Object.keys(normalRanges).forEach(f => {
            const val = features[f];
            const [min, max] = normalRanges[f];

            let status;
            if (val < min) status = `<span style="color:green;">Low</span>`;
            else if (val > max) status = `<span style="color:red;">High</span>`;
            else status = `<span style="color:black;">Normal</span>`;

            tableHTML += `
            <tr>
                <td style="padding:4px;">${f.toUpperCase()}</td>
                <td style="padding:4px;">${val}</td>
                <td style="padding:4px;">${min} – ${max}</td>
                <td style="padding:4px;">${status}</td>
            </tr>`;
        });

        tableHTML += `</table>`;

        try {
            const response = await fetch("/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ model, features })
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.detail || `HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            // Prediction + Coefs
            let resultText = `
            Prediction (${data.model}): ${data.prediction.toFixed(2)}<br>
            Intercept: ${data.intercept.toFixed(2)}<br><br>
            <strong>Coefficients:</strong><br>
            `;

            data.coefficients.forEach((coef, i) => {
                resultText += `${featureNames[i]}: ${coef.toFixed(3)}<br>`;
            });

            // Final output
            resultDiv.innerHTML = resultText + "<br>" + tableHTML;
            resultDiv.scrollIntoView({ behavior: "smooth" });

            drawChart(featureNames, data.coefficients);

        } catch (error) {
            resultDiv.innerHTML = `<strong>Error:</strong> ${error.message}`;
        }
    }

    function drawChart(labels, values) {
        const ctx = document.getElementById("coefChart").getContext("2d");
        if (coefChart !== null) coefChart.destroy();

        const colors = labels.map(() => 'rgba(75, 192, 192, 0.6)');
        const borderColors = labels.map(() => 'rgba(75, 192, 192, 1)');

        coefChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [{
                    label: "Model Coefficients",
                    data: values,
                    backgroundColor: colors,
                    borderColor: borderColors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    window.predict = predict;
});
