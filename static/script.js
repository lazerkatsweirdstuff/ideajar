// List of banned words (should match the backend's list)
const BANNED_WORDS = ["swearword1", "swearword2", "swearword3"];

// Function to check for banned words in a string
function containsBannedWord(text) {
    return BANNED_WORDS.some((word) => text.toLowerCase().includes(word));
}

// Submit an idea
document.getElementById('ideaForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get the idea input
    const ideaInput = document.getElementById('ideaInput');
    const idea = ideaInput.value;

    // Check for banned words
    if (containsBannedWord(idea)) {
        alert("Your idea contains inappropriate language. Please try again.");
        return;
    }

    // Send the idea to the backend
    const response = await fetch('/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea })
    });

    const result = await response.json();

    // Display success or error message
    alert(result.message || result.error);

    // Clear the input field if submission was successful
    if (response.ok) {
        ideaInput.value = '';
    }
});

// Get a random idea
document.getElementById('randomIdeaButton').addEventListener('click', async () => {
    const response = await fetch('/random');
    const data = await response.json();

    const randomIdeaDisplay = document.getElementById('randomIdeaDisplay');

    // Display the random idea or a fallback message
    if (data.idea) {
        randomIdeaDisplay.textContent = `Random Idea: ${data.idea}`;
    } else {
        randomIdeaDisplay.textContent = 'No ideas available!';
    }
});

// Filter ideas (optional functionality, example for completeness)
document.getElementById('filterForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get the keyword for filtering
    const keyword = document.getElementById('filterInput').value;

    const response = await fetch(`/filter?keyword=${encodeURIComponent(keyword)}`);
    const data = await response.json();

    const filteredIdeasList = document.getElementById('filteredIdeasList');
    filteredIdeasList.innerHTML = '';

    // Display filtered ideas or a fallback message
    if (data.ideas.length > 0) {
        data.ideas.forEach((idea) => {
            const listItem = document.createElement('li');
            listItem.textContent = idea;
            filteredIdeasList.appendChild(listItem);
        });
    } else {
        const noResults = document.createElement('li');
        noResults.textContent = 'No ideas match your keyword.';
        filteredIdeasList.appendChild(noResults);
    }
});

// Admin: Clear all ideas (optional functionality for admins)
document.getElementById('clearButton').addEventListener('click', async () => {
    const adminKey = document.getElementById('adminKey').value;

    const response = await fetch('/clear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: adminKey })
    });

    const result = await response.json();

    // Display success or error message
    alert(result.message || result.error);

    // Clear the admin key field if successful
    if (response.ok) {
        document.getElementById('adminKey').value = '';
    }
});
