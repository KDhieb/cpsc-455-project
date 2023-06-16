# https://flask.palletsprojects.com/en/2.3.x/quickstart/
# https://github.com/pallets/flask/tree/main/examples/tutorial/flaskr
# https://stackabuse.com/how-to-get-and-parse-http-post-body-in-flask-json-and-form-data/

from flask import Flask, request, jsonify
from joblib import load
import pandas as pd

app = Flask(__name__)

# Load in all the models that were trained, song names, & scaled dataset
scaler = load('./recommendation-model/scaler.joblib')
kmeans = load('./recommendation-model/kmeans.joblib')
nearest_neighbors = load('./recommendation-model/nearest_neighbors.joblib')
song_names = pd.read_csv('./recommendation-model/song_names.csv')
data_scaled = pd.read_csv('./recommendation-model/data_scaled.csv')

@app.route("/recommend", methods=['POST'])
def recommend():
    # Data should look like this in the POST request
    """
    {
        "acousticness": 0.991,
        "danceability": 0.598,
        "energy": 0.224,
        "instrumentalness": 0.000522,
        "liveness": 0.379,
        "loudness": -12.628,
        "speechiness": 0.0936,
        "tempo": 149.976,
        "valence": 0.634,
        "popularity": 12,
        "year": 1920
    }
    """
    # The above is the exact data for the song 'Keep A Song In Your Soul'. 
    # The below is an example of the response. We should see the ML model recommend the same song to know NearestNeighbour is working
    """
    [
        "Keep A Song In Your Soul",
        "Neráida, tsámiko",
        "Trombonology",
        "Lullaby Of The Leaves",
        "Black and Tan Fantasy"
    ]
    """

    # TODO: We could do some filtering so by chance we don't recommend the same song that was put in, but it's very unlikely.
    
    data = request.json

    # Pre-process the requested song parameters 
    requested_song = pd.DataFrame(data, index=[0])
    requested_song_scaled = pd.DataFrame(scaler.transform(requested_song), columns=requested_song.columns)

    # Use the Kmeans model to predict what cluster it belongs to
    requested_song_cluster = kmeans.predict(requested_song_scaled)

    # Get all songs in the same cluster as the requested song
    same_cluster_data = data_scaled[kmeans.labels_ == requested_song_cluster[0]]

    # Fit the nearest neighbors model with the data from the same cluster
    nearest_neighbors.fit(same_cluster_data)

    # indices will return up to 'num_recommended_songs' as defined in "./recommendation-model/train_model.ipynb"
    distances, indices = nearest_neighbors.kneighbors(requested_song_scaled)

    # Get the names of the nearest songs
    similar_songs = song_names.iloc[indices[0]]

    print(similar_songs)

    # Return the song names
    result = jsonify(similar_songs['name'].to_list())

    return result