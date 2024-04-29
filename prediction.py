import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline
import joblib


df = pd.read_excel("generated_data.xlsx")


X = df.drop(columns=["Price"])
y = df["Price"]

categorical_features = ["Weather", "City", "Service", "Subservice"]
categorical_transformer = Pipeline(steps=[
    ('onehot', OneHotEncoder(handle_unknown='ignore'))
])

preprocessor = ColumnTransformer(
    transformers=[
        ('cat', categorical_transformer, categorical_features)
    ])


model = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', LinearRegression())
])


model.fit(X, y)

joblib.dump(model, "price_prediction_model.joblib")


model = joblib.load("price_prediction_model.joblib")


def predict_price(weather, city, service, subservice):
    input_data = pd.DataFrame({
        "Weather": [weather],
        "City": [city],
        "Service": [service],
        "Subservice": [subservice]
    })
    predicted_price = model.predict(input_data)
    return predicted_price[0]


weather = input("Enter weather (Extreme/Fine): ").strip()
city = input("Enter city: ").strip()
service = input("Enter service: ").strip()
subservice = input("Enter subservice: ").strip()


predicted_price = predict_price(weather, city, service, subservice)


print("Predicted price:", predicted_price)
