from flask import Flask, request, jsonify, send_from_directory
import os
import random

app = Flask(__name__, static_folder='static')

# Store ideas
ideas = []

# List of banned words (expand as needed)
BANNED_WORDS = {"swearword1", "swearword2", "swearword3"}

# Serve the static HTML file
@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

# Submit an idea
@app.route('/submit', methods=['POST'])
def submit_idea():
    data = request.json
    idea = data.get("idea")
    if idea:
        # Check for banned words
        if any(banned_word in idea.lower() for banned_word in BANNED_WORDS):
            return jsonify({"error": "Your idea contains inappropriate language."}), 400
        ideas.append(idea)
        return jsonify({"message": "Idea submitted successfully!"}), 200
    return jsonify({"error": "No idea provided"}), 400

# Get a random idea
@app.route('/random', methods=['GET'])
def get_random_idea():
    if ideas:
        return jsonify({"idea": random.choice(ideas)})
    return jsonify({"message": "No ideas available"}), 200

# Main entry point for local development
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
