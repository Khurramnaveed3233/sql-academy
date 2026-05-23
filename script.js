// Enhanced State Management
const appState = {
    currentTopic: null,
    completed: JSON.parse(localStorage.getItem('completed')) || [],
    theme: localStorage.getItem('theme') || 'dark'
};

function renderTopic(level, topic) {
    const data = topicsContent[level][topic];
    document.getElementById('topicTitle').innerText = topic;
    document.getElementById('explanationText').innerText = data.explanation;
    document.getElementById('urduExplanation').innerText = data.urduExplanation;
    document.getElementById('syntaxCode').innerText = data.syntax;
    // ... logic to update other DOM elements
    
    // Log progress
    if (!appState.completed.includes(topic)) {
        appState.completed.push(topic);
        localStorage.setItem('completed', JSON.stringify(appState.completed));
    }
}

// Event Listeners for Tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
        document.getElementById(`${e.target.dataset.tab}-tab`).classList.add('active');
    });
});
