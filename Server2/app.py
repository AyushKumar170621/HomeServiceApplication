import json
from textblob import TextBlob
from flask import Flask, request, jsonify
import numpy as np
from keras.models import load_model
import nltk
from nltk.stem import WordNetLemmatizer
import pickle
from flask_cors import CORS

app = Flask(__name__)
cors_config = {
    "origins": ["http://localhost:3000","http://localhost:4000"],  # The origin you want to allow
    "supports_credentials": True
}

CORS(app, resources={
    r"/*": cors_config
})

# Load pre-trained model and other necessary files
model = load_model('chatbot_model.h5')
lemmatizer = WordNetLemmatizer()
words = pickle.load(open('words.pkl', 'rb'))
classes = pickle.load(open('classes.pkl', 'rb'))

# Load intents data
data_file = open('intents.json').read()
intents = json.loads(data_file)

# Preprocess input text
def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]
    return sentence_words

# Return the bag of words: 0 or 1 for each word in the bag that exists in the sentence
def bow(sentence, words, show_details=True):
    sentence_words = clean_up_sentence(sentence)
    bag = [0] * len(words)
    for s in sentence_words:
        for i, w in enumerate(words):
            if w == s:
                bag[i] = 1
                if show_details:
                    print(f"found in bag: {w}")
    return np.array(bag)

# Predict the intent of the user's message
def predict_class(sentence, model):
    p = bow(sentence, words, show_details=False)
    res = model.predict(np.array([p]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({"intent": classes[r[0]], "probability": str(r[1])})
    return return_list

# API endpoint for chatbot
@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        user_message = data['message']
        response = predict_class(user_message, model)

        # Extract the response string from the predicted intent
        reply = next((intent['responses'][0] for intent in intents['intents'] if intent['tag'] == response[0]['intent']), "No answer")

        return jsonify({"reply": reply})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/sentiscore', methods=['POST'])
def analyze_sentiment():
    # Classify the sentiment as positive, negative, or neutral
    try:
        data = request.get_json()
        review = data['review']
        print(review)
        analysis = TextBlob(review)
        if analysis.sentiment.polarity > 0:
            result = 'Positive'
        elif analysis.sentiment.polarity < 0:
            result = 'Negative'
        else:
            result = 'Neutral'
        return jsonify({"reply": result})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
