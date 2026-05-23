// ============================================
// SQL ACADEMY - JAVASCRIPT FUNCTIONALITY
// ============================================

// State Management
const state = {
    currentTopic: null,
    currentLevel: null,
    completedTopics: [],
    bookmarkedTopics: [],
    notes: {},
    darkMode: localStorage.getItem('darkMode') === 'true',
    topicIndex: 0,
    allTopics: [],
    filteredTopics: []
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Set dark mode
    if (state.darkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateDarkModeIcon();
    }

    // Load saved data
    loadSavedData();

    // Build sidebar
    buildSidebar();

    // Build all topics list
    buildAllTopicsList();

    // Setup event listeners
    setupEventListeners();

    // Show welcome section
    showWelcomeSection();
}

// ============================================
// DARK MODE
// ============================================

function toggleDarkMode() {
    state.darkMode = !state.darkMode;
    localStorage.setItem('darkMode', state.darkMode);
    
    if (state.darkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    
    updateDarkModeIcon();
}

function updateDarkModeIcon() {
    const icon = document.querySelector('.toggle-icon');
    icon.textContent = state.darkMode ? '☀️' : '🌙';
}

// ============================================
// SIDEBAR MANAGEMENT
// ============================================

function buildSidebar() {
    const sidebarContent = document.getElementById('sidebarContent');
    sidebarContent.innerHTML = '';

    Object.entries(topicsContent).forEach(([level, topics]) => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category';

        const headerDiv = document.createElement('div');
        headerDiv.className = 'category-header';
        headerDiv.innerHTML = `
            <span class="category-title">${level}</span>
            <span class="category-toggle">▼</span>
        `;

        headerDiv.addEventListener('click', () => {
            toggleCategory(headerDiv, itemsDiv);
        });

        const itemsDiv = document.createElement('div');
        itemsDiv.className = 'category-items';

        Object.keys(topics).forEach(topic => {
            const topicItem = document.createElement('div');
            topicItem.className = 'topic-item';
            
            const isCompleted = state.completedTopics.includes(`${level}|${topic}`);
            const isBookmarked = state.bookmarkedTopics.includes(`${level}|${topic}`);
            
            topicItem.innerHTML = `
                ${topic}
                <span class="topic-item-status">
                    ${isCompleted ? '✓' : ''}
                    ${isBookmarked ? '🔖' : ''}
                </span>
            `;

            topicItem.addEventListener('click', () => {
                selectTopic(level, topic, topicItem);
            });

            itemsDiv.appendChild(topicItem);
        });

        categoryDiv.appendChild(headerDiv);
        categoryDiv.appendChild(itemsDiv);
        sidebarContent.appendChild(categoryDiv);
    });
}

function toggleCategory(header, items) {
    header.classList.toggle('active');
    items.classList.toggle('active');
}

function buildAllTopicsList() {
    state.allTopics = [];
    Object.entries(topicsContent).forEach(([level, topics]) => {
        Object.keys(topics).forEach(topic => {
            state.allTopics.push({
                level,
                topic,
                id: `${level}|${topic}`
            });
        });
    });
    state.filteredTopics = [...state.allTopics];
}

// ============================================
// TOPIC SELECTION AND DISPLAY
// ============================================

function selectTopic(level, topic, element) {
    state.currentLevel = level;
    state.currentTopic = topic;

    // Update active state in sidebar
    document.querySelectorAll('.topic-item').forEach(item => {
        item.classList.remove('active');
    });
    if (element) {
        element.classList.add('active');
    }

    // Display topic content
    displayTopicContent(level, topic);

    // Hide welcome section
    document.getElementById('welcomeSection').style.display = 'none';
    document.getElementById('topicContent').style.display = 'block';

    // Update navigation buttons
    updateNavigationButtons();

    // Scroll to top
    window.scrollTo(0, 0);
}

function displayTopicContent(level, topic) {
    const content = topicsContent[level][topic];

    // Update title and metadata
    document.getElementById('topicTitle').textContent = topic;
    document.getElementById('levelBadge').textContent = `Level: ${level}`;
    document.getElementById('topicBreadcrumb').textContent = `${level} > ${topic}`;

    // Update difficulty badge based on level
    const difficultyMap = {
        'CORE FOUNDATIONS': 'Beginner',
        'INTERMEDIATE QUERYING': 'Intermediate',
        'ADVANCED ANALYTICS': 'Advanced',
        'DATA MODELING & OPTIMIZATION': 'Advanced',
        '2026 SQL TRENDS': 'Expert'
    };
    document.getElementById('difficultyBadge').textContent = difficultyMap[level] || 'Intermediate';

    // Update explanation
    document.getElementById('explanationText').textContent = content.explanation;
    document.getElementById('urduExplanation').textContent = content.explanation;

    // Update syntax
    document.getElementById('syntaxCode').textContent = content.syntax;

    // Update examples
    document.getElementById('beginnerExample').textContent = content.beginnerExample;
    document.getElementById('intermediateExample').textContent = content.intermediateExample;
    document.getElementById('advancedExample').textContent = content.advancedExample;

    // Update use case
    document.getElementById('businessUseCase').textContent = content.businessUseCase;

    // Update common mistakes
    const mistakesList = document.getElementById('commonMistakes');
    mistakesList.innerHTML = '';
    content.commonMistakes.split('\n').forEach(mistake => {
        if (mistake.trim()) {
            const li = document.createElement('li');
            li.textContent = mistake.trim();
            mistakesList.appendChild(li);
        }
    });

    // Update interview questions
    const qaList = document.getElementById('interviewQuestions');
    qaList.innerHTML = '';
    content.interviewQuestions.split('\n').forEach(qa => {
        if (qa.trim()) {
            const qaDiv = document.createElement('div');
            qaDiv.className = 'qa-item';
            if (qa.includes('Q')) {
                const [q, a] = qa.split('?');
                qaDiv.innerHTML = `
                    <div class="qa-question">${q}?</div>
                    <div class="qa-answer">${a || 'Answer coming soon...'}</div>
                `;
            } else {
                qaDiv.innerHTML = `<div class="qa-question">${qa}</div>`;
            }
            qaList.appendChild(qaDiv);
        }
    });

    // Update exercises
    const exercisesList = document.getElementById('exercisesList');
    exercisesList.innerHTML = '';
    content.exercises.split('\n').forEach(exercise => {
        if (exercise.trim()) {
            const li = document.createElement('li');
            li.textContent = exercise.trim();
            exercisesList.appendChild(li);
        }
    });

    // Update output example
    document.getElementById('outputExample').textContent = content.outputExample;

    // Load saved notes
    const topicId = `${level}|${topic}`;
    if (state.notes[topicId]) {
        document.getElementById('notesTextarea').value = state.notes[topicId];
        displaySavedNotes(topicId);
    } else {
        document.getElementById('notesTextarea').value = '';
        document.getElementById('savedNotes').innerHTML = '';
    }

    // Update bookmark button
    updateBookmarkButton(topicId);

    // Update complete button
    updateCompleteButton(topicId);

    // Update related topics
    updateRelatedTopics(level, topic);

    // Reset tabs
    resetTabs();

    // Update progress
    updateProgress();
}

function updateBookmarkButton(topicId) {
    const btn = document.getElementById('bookmarkBtn');
    if (state.bookmarkedTopics.includes(topicId)) {
        btn.classList.add('active');
    } else {
        btn.classList.remove('active');
    }
}

function updateCompleteButton(topicId) {
    const btn = document.getElementById('completeBtn');
    if (state.completedTopics.includes(topicId)) {
        btn.classList.add('active');
    } else {
        btn.classList.remove('active');
    }
}

// ============================================
// RELATED TOPICS
// ============================================

function updateRelatedTopics(level, topic) {
    const relatedList = document.getElementById('relatedTopicsList');
    relatedList.innerHTML = '';

    // Get 3-4 random related topics
    const otherTopics = state.allTopics.filter(t => !(t.level === level && t.topic === topic));
    const related = otherTopics.sort(() => Math.random() - 0.5).slice(0, 4);

    related.forEach(t => {
        const card = document.createElement('div');
        card.className = 'related-topic-card';
        card.innerHTML = `
            <h4>${t.topic}</h4>
            <p>${t.level}</p>
        `;
        card.addEventListener('click', () => {
            selectTopic(t.level, t.topic, null);
            buildSidebar();
        });
        relatedList.appendChild(card);
    });
}

// ============================================
// NAVIGATION
// ============================================

function previousTopic() {
    if (state.topicIndex > 0) {
        state.topicIndex--;
        const topic = state.filteredTopics[state.topicIndex];
        selectTopic(topic.level, topic.topic, null);
        buildSidebar();
    }
}

function nextTopic() {
    if (state.topicIndex < state.filteredTopics.length - 1) {
        state.topicIndex++;
        const topic = state.filteredTopics[state.topicIndex];
        selectTopic(topic.level, topic.topic, null);
        buildSidebar();
    }
}

function updateNavigationButtons() {
    const currentId = `${state.currentLevel}|${state.currentTopic}`;
    state.topicIndex = state.filteredTopics.findIndex(t => t.id === currentId);

    document.getElementById('prevBtn').disabled = state.topicIndex === 0;
    document.getElementById('nextBtn').disabled = state.topicIndex === state.filteredTopics.length - 1;
}

// ============================================
// BOOKMARKS AND COMPLETION
// ============================================

function toggleBookmark() {
    const topicId = `${state.currentLevel}|${state.currentTopic}`;
    const index = state.bookmarkedTopics.indexOf(topicId);

    if (index > -1) {
        state.bookmarkedTopics.splice(index, 1);
    } else {
        state.bookmarkedTopics.push(topicId);
    }

    localStorage.setItem('bookmarkedTopics', JSON.stringify(state.bookmarkedTopics));
    updateBookmarkButton(topicId);
    buildSidebar();
}

function toggleComplete() {
    const topicId = `${state.currentLevel}|${state.currentTopic}`;
    const index = state.completedTopics.indexOf(topicId);

    if (index > -1) {
        state.completedTopics.splice(index, 1);
    } else {
        state.completedTopics.push(topicId);
    }

    localStorage.setItem('completedTopics', JSON.stringify(state.completedTopics));
    updateCompleteButton(topicId);
    buildSidebar();
    updateProgress();
}

// ============================================
// NOTES MANAGEMENT
// ============================================

function saveNotes() {
    const topicId = `${state.currentLevel}|${state.currentTopic}`;
    const notesText = document.getElementById('notesTextarea').value;

    if (notesText.trim()) {
        state.notes[topicId] = notesText;
        localStorage.setItem('notes', JSON.stringify(state.notes));
        displaySavedNotes(topicId);
        showNotification('Notes saved successfully!');
    }
}

function displaySavedNotes(topicId) {
    const savedNotesDiv = document.getElementById('savedNotes');
    const notes = state.notes[topicId];

    if (notes) {
        savedNotesDiv.innerHTML = `
            <div class="note-item">
                <div class="note-timestamp">Last saved: ${new Date().toLocaleString()}</div>
                <p>${notes}</p>
            </div>
        `;
    }
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

function setupSearch() {
    const topicSearch = document.getElementById('topicSearch');
    const sidebarSearch = document.getElementById('sidebarSearch');

    topicSearch.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        filterTopics(query);
    });

    sidebarSearch.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        filterSidebarTopics(query);
    });
}

function filterTopics(query) {
    if (!query) {
        state.filteredTopics = [...state.allTopics];
    } else {
        state.filteredTopics = state.allTopics.filter(t => 
            t.topic.toLowerCase().includes(query) || 
            t.level.toLowerCase().includes(query)
        );
    }
}

function filterSidebarTopics(query) {
    const topicItems = document.querySelectorAll('.topic-item');
    const categories = document.querySelectorAll('.category');

    if (!query) {
        topicItems.forEach(item => item.style.display = 'flex');
        categories.forEach(cat => cat.style.display = 'block');
        return;
    }

    let visibleCategories = new Set();

    topicItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
            item.style.display = 'flex';
            // Find parent category and mark as visible
            const category = item.closest('.category');
            if (category) {
                visibleCategories.add(category);
                const header = category.querySelector('.category-header');
                const items = category.querySelector('.category-items');
                header.classList.add('active');
                items.classList.add('active');
            }
        } else {
            item.style.display = 'none';
        }
    });

    categories.forEach(cat => {
        if (visibleCategories.has(cat)) {
            cat.style.display = 'block';
        } else {
            cat.style.display = 'none';
        }
    });
}

// ============================================
// TABS MANAGEMENT
// ============================================

function resetTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => btn.classList.remove('active'));
    tabPanes.forEach(pane => pane.classList.remove('active'));

    tabBtns[0].classList.add('active');
    tabPanes[0].classList.add('active');
}

function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');

            // Remove active class from all tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked tab
            btn.classList.add('active');
            document.getElementById(`${tabName}-tab`).classList.add('active');
        });
    });
}

// ============================================
// CODE COPY FUNCTIONALITY
// ============================================

function copyCode(button) {
    const codeBlock = button.closest('.code-block');
    const code = codeBlock.querySelector('code').textContent;

    navigator.clipboard.writeText(code).then(() => {
        const originalText = button.textContent;
        button.textContent = '✓ Copied!';
        button.classList.add('copied');

        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
    });
}

// ============================================
// CHEATSHEET MODAL
// ============================================

function openCheatsheet() {
    const modal = document.getElementById('cheatsheetModal');
    const content = document.getElementById('cheatsheetContent');

    content.innerHTML = `
        <div class="cheatsheet-section">
            <h3>Basic SELECT Queries</h3>
            <div class="cheatsheet-item">
                <strong>SELECT all columns:</strong><br>
                SELECT * FROM table_name;
            </div>
            <div class="cheatsheet-item">
                <strong>SELECT specific columns:</strong><br>
                SELECT column1, column2 FROM table_name;
            </div>
            <div class="cheatsheet-item">
                <strong>WHERE clause:</strong><br>
                SELECT * FROM table_name WHERE condition;
            </div>
        </div>

        <div class="cheatsheet-section">
            <h3>Aggregate Functions</h3>
            <div class="cheatsheet-item">
                <strong>COUNT:</strong> SELECT COUNT(*) FROM table_name;
            </div>
            <div class="cheatsheet-item">
                <strong>SUM:</strong> SELECT SUM(column) FROM table_name;
            </div>
            <div class="cheatsheet-item">
                <strong>AVG:</strong> SELECT AVG(column) FROM table_name;
            </div>
            <div class="cheatsheet-item">
                <strong>MIN/MAX:</strong> SELECT MIN(column), MAX(column) FROM table_name;
            </div>
        </div>

        <div class="cheatsheet-section">
            <h3>JOINs</h3>
            <div class="cheatsheet-item">
                <strong>INNER JOIN:</strong><br>
                SELECT * FROM table1 INNER JOIN table2 ON table1.id = table2.id;
            </div>
            <div class="cheatsheet-item">
                <strong>LEFT JOIN:</strong><br>
                SELECT * FROM table1 LEFT JOIN table2 ON table1.id = table2.id;
            </div>
            <div class="cheatsheet-item">
                <strong>FULL JOIN:</strong><br>
                SELECT * FROM table1 FULL JOIN table2 ON table1.id = table2.id;
            </div>
        </div>

        <div class="cheatsheet-section">
            <h3>GROUP BY & HAVING</h3>
            <div class="cheatsheet-item">
                <strong>GROUP BY:</strong><br>
                SELECT column, COUNT(*) FROM table_name GROUP BY column;
            </div>
            <div class="cheatsheet-item">
                <strong>HAVING:</strong><br>
                SELECT column, COUNT(*) FROM table_name GROUP BY column HAVING COUNT(*) > 5;
            </div>
        </div>

        <div class="cheatsheet-section">
            <h3>Window Functions</h3>
            <div class="cheatsheet-item">
                <strong>ROW_NUMBER:</strong><br>
                SELECT ROW_NUMBER() OVER (ORDER BY column) FROM table_name;
            </div>
            <div class="cheatsheet-item">
                <strong>RANK:</strong><br>
                SELECT RANK() OVER (ORDER BY column DESC) FROM table_name;
            </div>
            <div class="cheatsheet-item">
                <strong>SUM OVER:</strong><br>
                SELECT SUM(column) OVER (ORDER BY date) FROM table_name;
            </div>
        </div>
    `;

    modal.classList.add('active');
}

function closeCheatsheet() {
    document.getElementById('cheatsheetModal').classList.remove('active');
}

// ============================================
// BOOKMARKS MODAL
// ============================================

function openBookmarks() {
    const modal = document.getElementById('bookmarkModal');
    const list = document.getElementById('bookmarksList');

    if (state.bookmarkedTopics.length === 0) {
        list.innerHTML = '<p>No bookmarks yet. Start bookmarking topics!</p>';
    } else {
        list.innerHTML = '';
        state.bookmarkedTopics.forEach(topicId => {
            const [level, topic] = topicId.split('|');
            const item = document.createElement('div');
            item.className = 'bookmark-item';
            item.innerHTML = `
                <div onclick="selectTopic('${level}', '${topic}', null); buildSidebar(); closeBookmarks();">
                    <strong>${topic}</strong><br>
                    <small>${level}</small>
                </div>
                <button class="bookmark-remove" onclick="removeBookmark('${topicId}')">Remove</button>
            `;
            list.appendChild(item);
        });
    }

    modal.classList.add('active');
}

function closeBookmarks() {
    document.getElementById('bookmarkModal').classList.remove('active');
}

function removeBookmark(topicId) {
    const index = state.bookmarkedTopics.indexOf(topicId);
    if (index > -1) {
        state.bookmarkedTopics.splice(index, 1);
        localStorage.setItem('bookmarkedTopics', JSON.stringify(state.bookmarkedTopics));
        openBookmarks();
        buildSidebar();
    }
}

// ============================================
// PROGRESS TRACKING
// ============================================

function updateProgress() {
    const total = state.allTopics.length;
    const completed = state.completedTopics.length;
    const percentage = Math.round((completed / total) * 100);

    document.getElementById('progressFill').style.width = percentage + '%';
    document.getElementById('progressText').textContent = percentage + '%';
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function showWelcomeSection() {
    document.getElementById('welcomeSection').style.display = 'block';
    document.getElementById('topicContent').style.display = 'none';
}

function startLearning() {
    if (state.allTopics.length > 0) {
        const firstTopic = state.allTopics[0];
        selectTopic(firstTopic.level, firstTopic.topic, null);
        buildSidebar();
    }
}

function showNotification(message) {
    // Simple notification (can be enhanced with a toast library)
    console.log(message);
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// HAMBURGER MENU
// ============================================

function setupHamburgerMenu() {
    const hamburger = document.getElementById('hamburgerMenu');
    const sidebar = document.querySelector('.sidebar');

    hamburger.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Close sidebar when a topic is clicked
    document.addEventListener('click', (e) => {
        if (e.target.closest('.topic-item')) {
            sidebar.classList.remove('active');
        }
    });
}

// ============================================
// EVENT LISTENERS SETUP
// ============================================

function setupEventListeners() {
    // Dark mode toggle
    document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);

    // Search
    setupSearch();

    // Tabs
    setupTabs();

    // Bookmark button
    document.getElementById('bookmarkBtn').addEventListener('click', toggleBookmark);

    // Complete button
    document.getElementById('completeBtn').addEventListener('click', toggleComplete);

    // Cheatsheet button
    document.getElementById('cheatsheetBtn').addEventListener('click', openCheatsheet);

    // Modal close on background click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // Hamburger menu
    setupHamburgerMenu();
}

// ============================================
// SAVED DATA MANAGEMENT
// ============================================

function loadSavedData() {
    const saved = {
        completedTopics: localStorage.getItem('completedTopics'),
        bookmarkedTopics: localStorage.getItem('bookmarkedTopics'),
        notes: localStorage.getItem('notes')
    };

    if (saved.completedTopics) {
        state.completedTopics = JSON.parse(saved.completedTopics);
    }

    if (saved.bookmarkedTopics) {
        state.bookmarkedTopics = JSON.parse(saved.bookmarkedTopics);
    }

    if (saved.notes) {
        state.notes = JSON.parse(saved.notes);
    }
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('topicSearch').focus();
    }

    // Ctrl/Cmd + D for dark mode
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        toggleDarkMode();
    }

    // Left arrow for previous topic
    if (e.key === 'ArrowLeft' && state.currentTopic) {
        previousTopic();
    }

    // Right arrow for next topic
    if (e.key === 'ArrowRight' && state.currentTopic) {
        nextTopic();
    }
});

// ============================================
// EXPORT FUNCTIONALITY (Optional)
// ============================================

function exportProgress() {
    const data = {
        completedTopics: state.completedTopics,
        bookmarkedTopics: state.bookmarkedTopics,
        notes: state.notes,
        exportDate: new Date().toISOString()
    };

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sql-academy-progress.json';
    a.click();
}

// ============================================
// RESPONSIVE ADJUSTMENTS
// ============================================

window.addEventListener('resize', () => {
    const sidebar = document.querySelector('.sidebar');
    if (window.innerWidth > 768) {
        sidebar.classList.remove('active');
    }
});
