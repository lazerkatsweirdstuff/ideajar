// Submit Idea
document.getElementById('ideaForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const idea = document.getElementById('ideaInput').value;

    const response = await fetch('/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea })
    });

    const result = await response.json();
    alert(result.message || result.error);
    document.getElementById('ideaInput').value = '';
});

// Get Random Idea
document.getElementById('randomIdeaButton').addEventListener('click', async () => {
    const response = await fetch('/random');
    const data = await response.json();

    const randomIdeaDisplay = document.getElementById('randomIdeaDisplay');
    if (data.idea) {
        randomIdeaDisplay.textContent = `Random Idea: ${data.idea}`;
    } else {
        randomIdeaDisplay.textContent = 'No ideas available!';
    }
});

// Clear All Ideas (Admin Only)
document.getElementById('clearButton').addEventListener('click', async () => {
    const adminKey = document.getElementById('adminKey').value;

    const response = await fetch('/clear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: adminKey })
    });

    const result = await response.json();
    alert(result.message || result.error);
    if (result.message) {
        document.getElementById('adminKey').value = '';
    }
});

// Filter Ideas
document.getElementById('filterForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const keyword = document.getElementById('filterInput').value;

    const response = await fetch(`/filter?keyword=${encodeURIComponent(keyword)}`);
    const data = await response.json();

    const filteredIdeasList = document.getElementById('filteredIdeasList');
    filteredIdeasList.innerHTML = '';

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
