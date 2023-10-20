
from flask import Flask
from flask import request,jsonify
from keras.models import load_model
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import numpy as np
from flask_cors import CORS

import pickle
app = Flask(__name__)
CORS(app)
deepLearningModel = load_model("./Model/deepLearning_model_BDA.h5")

with open("./Model/DeepLearning_Model_tokenizer.pkl","rb") as token_file:
    deepLearningModelTokenizer = pickle.load(token_file)

print(deepLearningModelTokenizer)

@app.route("/")
def hello():
    return "Hello World"

def deepLearningPreprocessing(tweet):
    maxLen = 50
    # sequence = deepLearningModelTokenizer.texts_to_sequences(tweet)
    tokenizer = deepLearningModelTokenizer
    sequence = tokenizer.texts_to_sequences([tweet])
    print(sequence)
    padded = pad_sequences(sequence,truncating="post",padding="post",maxlen=maxLen)
    # print(padded)
    return padded

classList = {
    "0" : "Sadness",
    "1" : "Joy",
    "2" : "Love",
    "3" : "Anger",
    "4" : "Fear",
    "5" : "Surprice"
}

@app.route("/predict",methods=['POST'])
def predict():
    data = request.get_json()
    tweet = data["text"]
    print(tweet)
    padded_tweet = deepLearningPreprocessing(tweet)
    print(padded_tweet , len(padded_tweet))
    predictions = deepLearningModel.predict(np.expand_dims(padded_tweet[0],axis=0))[0].tolist()
    
    pred_class = str(np.argmax(predictions).astype("uint8"))
    print(pred_class)
    print("predictions",predictions)
    response_data = {
        "error" : False,
        "predictions" : predictions,
        "prediction_class" : classList[pred_class]
    }
    # return jsonify({"prediction_class" : classList[pred_class], "predictions" : predictions})
    return jsonify(response_data)

if __name__ == "__main__":
    app.run(debug=True)