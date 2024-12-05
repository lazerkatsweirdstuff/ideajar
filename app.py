from flask import Flask, request, jsonify
import random

app = Flask(__name__)

# Store ideas
ideas = []

@app.route('/')
def home():
    return "Welcome to the Idea Generator API!"

@app.route('/submit', methods=['POST'])
def submit_idea():
    data = request.json
    idea = data.get("idea")
    if idea:
        ideas.append(idea)
        return jsonify({"message": "Idea submitted successfully!"}), 200
    return jsonify({"error": "No idea provided"}), 400

@app.route('/random', methods=['GET'])
def get_random_idea():
    if ideas:
        return jsonify({"idea": random.choice(ideas)})
    return jsonify({"message": "No ideas available"}), 200

if __name__ == '__main__':
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
