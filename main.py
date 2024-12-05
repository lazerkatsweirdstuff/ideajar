from flask import Flask, request, jsonify
import random

app = Flask(__name__)

# A list to store ideas
ideas = []

# Route to submit an idea
@app.route('/submit', methods=['POST'])
def submit_idea():
    data = request.json
    idea = data.get("idea")
    if idea:
        ideas.append(idea)
        return jsonify({"message": "Idea submitted successfully!"}), 200
    return jsonify({"error": "No idea provided"}), 400

# Route to get a random idea
@app.route('/random', methods=['GET'])
def get_random_idea():
    if ideas:
        return jsonify({"idea": random.choice(ideas)})
    return jsonify({"message": "No ideas available"}), 200

if __name__ == '__main__':
    app.run(debug=True)
