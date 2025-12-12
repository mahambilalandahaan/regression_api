# 🧮 Diabetes Regression Model Predictor

[![Python Version](https://img.shields.io/badge/python-3.11-blue)](https://www.python.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Build](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/mahambilalandahaan/regression_api)
[![Deploy on Railway](https://img.shields.io/badge/deploy-railway-purple)](https://railway.app/)

---

## 🚀 Overview

This project is a **FastAPI-based web application** that predicts diabetes progression using **4 regression models**:

- Linear Regression  
- Ridge Regression  
- Lasso Regression  
- ElasticNet  

It allows users to input features like age, sex, BMI, blood pressure, and six blood serum measurements to get **predicted diabetes progression**.  

The app shows **prediction value, intercept, and coefficients** in a styled result box.

---

## 🧩 Features

- ✅ Interactive web interface with real-time predictions  
- ✅ Separate output box for clear results  
- ✅ Uses pre-trained regression models (can be retrained using `train_regression_models.py`)  
- ✅ Mobile-friendly and responsive UI  
- ✅ Easily deployable on **Railway, Heroku, or any Python web host**

---

## 🛠 Installation

1. Clone the repository:
git clone https://github.com/mahambilalandahaan/regression_api.git
cd regression_api
Create a virtual environment:

python -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows


Install dependencies:

pip install -r requirements.txt


Train models (optional if you want to update models):

python train_regression_models.py


Run the app locally:

uvicorn regression_api:app --reload

## 🌐 Usage

Open your browser and go to:

http://127.0.0.1:8000


Select the regression model from the dropdown.

Enter values for all features: age, sex, BMI, BP, S1–S6.

Click Predict.

View results in the styled result box.

## 📦 Folder Structure
regression_api/
│
├─ models/                     # Pre-trained models & feature names
├─ static/                     # CSS & JS files
├─ templates/                  # HTML templates
├─ regression_api.py           # FastAPI application
├─ train_regression_models.py  # Script to train models
├─ requirements.txt
├─ Procfile                     # For deployment on Railway/Heroku
└─ README.md

## 📡 Deployment

This project can be deployed easily on Railway or Heroku. Ensure your repo includes:

Procfile:

web: uvicorn regression_api:app --host 0.0.0.0 --port $PORT


requirements.txt with all dependencies

Then push your repo and deploy!

## ⚖️ License

This project is licensed under the MIT License
.
*Feel free to use, modify, and distribute.*
