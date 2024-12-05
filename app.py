from flask import Flask, request, jsonify, send_from_directory
import os
import random

app = Flask(__name__, static_folder='static')

# Store ideas
ideas = []

# Secret key for clearing items
SECRET_KEY = "your-secret-key"

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
        ideas.append(idea)
        return jsonify({"message": "Idea submitted successfully!"}), 200
    return jsonify({"error": "No idea provided"}), 400

# Get a random idea
@app.route('/random', methods=['GET'])
def get_random_idea():
    if ideas:
        return jsonify({"idea": random.choice(ideas)})
    return jsonify({"message": "No ideas available"}), 200

# Clear all ideas (protected)
@app.route('/clear', methods=['POST'])
def clear_ideas():
    data = request.json
    key = data.get("key")
    if key == SECRET_KEY:
        ideas.clear()
        return jsonify({"message": "All ideas cleared!"}), 200
    return jsonify({"error": "Unauthorized"}), 403

# Filter ideas by keyword
@app.route('/filter', methods=['GET'])
def filter_ideas():
    keyword = request.args.get("keyword", "").lower()
    filtered = [idea for idea in ideas if keyword in idea.lower()]
    return jsonify({"ideas": filtered}), 200

# Main entry point for local development
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
