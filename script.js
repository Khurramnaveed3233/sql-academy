/**
 * ==========================================================================
 * SQL FOR DATA ANALYSTS - INTERACTIVE LMS CORE SCRIPT
 * Production-ready Vanilla JavaScript State Engine & Event Listeners
 * Supports full offline persistence via localStorage, custom filters,
 * live query evaluation, and instant dark mode overrides.
 * ==========================================================================
 */

// Global Application Core State
const AppState = {
  activeTopicId: "sql_intro",
  completedTopics: [],
  bookmarkedTopics: [],
  currentScenarioTab: "easy", // options: 'easy', 'medium', 'hard'
  activeFilterLevel: "all",
  searchQuery: "",
  sidebarSearchQuery: "",
  isSidebarCollapsed: false,
  isNotebookCollapsed: false,
  mobileSidebarOpen: false,
};

// Default fallback list of topics structure (will be populated/overwritten by topicsData in topics_content.js)
let activeTopicsList = [];

/**
 * 1. INITIALIZATION & INITIAL CONFIGURATION LOAD
 */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  loadSavedState();
  initializeTopicsData();
  setupEventListeners();
  renderSidebarLinks();
  loadTopicContent(AppState.activeTopicId);
  updateOverallProgress();
  renderBookmarksPanel();
  renderNotes();

  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

/**
 * Loads and initializes topic lists from 'topics_content.js' if available, otherwise sets safe fallbacks.
 */
function initializeTopicsData() {
  if (typeof window.sqlTopicsData !== "undefined") {
    activeTopicsList = window.sqlTopicsData;
  } else {
    // Basic structural fallback to prevent runtime crashes during step-by-step loading
    activeTopicsList = [
      {
        id: "sql_intro",
        title: "SQL Introduction",
        level: "L1",
        label: "SQL Basics Intro",
        whyAnalystsUseThis: "Base understand krna data layers ka",
        definition: "In-depth overview of relational databases and tabular configurations.",
        urduExplanation: "Database se batcheet krne ke liye SQL seekhna zaroori he. Ye har Data Analyst ka pehla tool hota he.",
        syntax: "SELECT columns FROM table_name;",
        businessScenario: "Understanding corporate database schema architecture.",
        scenarios: {
          easy: {
            title: "Basic Data Overview",
            urduExplanation: "Shuruaat krne ke liye hum poora datasets dekh skte hein.",
            sqlQuery: "SELECT * FROM ecommerce_sales;",
            businessInsight: "Provides initial raw transactional insights.",
            expectedOutput: {
              headers: ["order_id", "revenue", "category"],
              rows: [
                ["101", "$540.00", "Electronics"],
                ["102", "$120.50", "Apparel"]
              ]
            }
          },
          medium: {
            title: "Specific Columns extraction",
            urduExplanation: "Analyst poore tables k bajaye sirf relevant headers select krte hen.",
            sqlQuery: "SELECT category, revenue FROM ecommerce_sales;",
            businessInsight: "Reduced storage overhead on query memory execution.",
            expectedOutput: {
              headers: ["category", "revenue"],
              rows: [
                ["Electronics", "$540.00"],
                ["Apparel", "$120.50"]
              ]
            }
          },
          hard: {
            title: "Performance optimization parameters",
            urduExplanation: "Large enterprise warehouse filters optimization parameters.",
            sqlQuery: "SELECT DISTINCT category FROM ecommerce_sales;",
            businessInsight: "Reduces memory consumption of relational joins.",
            expectedOutput: {
              headers: ["category"],
              rows: [["Electronics"], ["Apparel"]]
            }
          }
        },
        commonMistakes: [
          {
            title: "Semicolon missing issues",
            wrong: "SELECT * FROM orders\nSELECT * FROM customers",
            correct: "SELECT * FROM orders;\nSELECT * FROM customers;"
          }
        ],
        interviewQuestions: [
          {
            question: "What is SQL and why do modern Data Analysts prioritize it?",
            answer: "SQL is structured query language used for database communication. Analysts prefer it because Python/Excel struggle with terabytes of data.",
            tip: "Explain standard relational schema paradigms during answer."
          }
        ],
        practice: {
          difficulty: "Beginner",
          task: "Query all logs from the customers schema container.",
          taskUrdu: "Sare customer columns select karein clean look me.",
          hint: "Syntax: SELECT * FROM customers;",
          regexPattern: /select\s+\*\s+from\s+customers/i,
          successMessage: "Boht Khoob! Aapne successfully custom databases se customers data nikal lia."
        }
      }
    ];
  }

  // Ensure first topic is marked as active if state loads invalid id
  if (!activeTopicsList.some(t => t.id === AppState.activeTopicId)) {
    AppState.activeTopicId = activeTopicsList[0].id;
  }
}

/**
 * 2. LOCALSTORAGE STATE PERSISTENCE MANAGERS
 */
function loadSavedState() {
  try {
    const savedCompleted = localStorage.getItem("sql_completed_topics");
    if (savedCompleted) {
      AppState.completedTopics = JSON.parse(savedCompleted);
    }

    const savedBookmarks = localStorage.getItem("sql_bookmarked_topics");
    if (savedBookmarks) {
      AppState.bookmarkedTopics = JSON.parse(savedBookmarks);
    }

    const savedActive = localStorage.getItem("sql_active_topic");
    if (savedActive) {
      AppState.activeTopicId = savedActive;
    }
    
    const savedLayoutSidebar = localStorage.getItem("sql_sidebar_collapsed");
    if (savedLayoutSidebar === "true") {
      AppState.isSidebarCollapsed = true;
      document.getElementById("sidebar").classList.add("collapsed");
    }

    const savedLayoutNotebook = localStorage.getItem("sql_notebook_collapsed");
    if (savedLayoutNotebook === "true") {
      AppState.isNotebookCollapsed = true;
      document.getElementById("notebookPanel").classList.add("collapsed");
    }
  } catch (e) {
    console.error("Localstorage state load settings failed:", e);
  }
}

function saveState(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("Localstorage save action blocked:", e);
  }
}

/**
 * 3. CORE THEME SYSTEM CONTROLLER (Light/Dark Switcher)
 */
function initTheme() {
  const localTheme = localStorage.getItem("sql_app_theme") || "light";
  document.documentElement.setAttribute("data-theme", localTheme);
  updateThemeToggleUi(localTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", nextTheme);
  localStorage.setItem("sql_app_theme", nextTheme);
  updateThemeToggleUi(nextTheme);
}

function updateThemeToggleUi(theme) {
  const sunIcon = document.querySelector(".theme-icon-sun");
  const moonIcon = document.querySelector(".theme-icon-moon");
  if (theme === "dark") {
    if (sunIcon) sunIcon.style.display = "none";
    if (moonIcon) moonIcon.style.display = "block";
  } else {
    if (sunIcon) sunIcon.style.display = "block";
    if (moonIcon) moonIcon.style.display = "none";
  }
}

/**
 * 4. EVENT LISTENERS REGISTER
 */
function setupEventListeners() {
  // Mobile drawer header hamburger
  const mobileToggle = document.getElementById("mobileToggleBtn");
  const sidebar = document.getElementById("sidebar");
  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener("click", () => {
      AppState.mobileSidebarOpen = !AppState.mobileSidebarOpen;
      if (AppState.mobileSidebarOpen) {
        sidebar.classList.add("active-mobile");
      } else {
        sidebar.classList.remove("active-mobile");
      }
    });
  }

  // Squeeze/Collapse Sidebar Controls
  const collapseSidebarBtn = document.getElementById("collapseSidebarBtn");
  if (collapseSidebarBtn && sidebar) {
    collapseSidebarBtn.addEventListener("click", () => {
      AppState.isSidebarCollapsed = !AppState.isSidebarCollapsed;
      if (AppState.isSidebarCollapsed) {
        sidebar.classList.add("collapsed");
      } else {
        sidebar.classList.remove("collapsed");
      }
      localStorage.setItem("sql_sidebar_collapsed", AppState.isSidebarCollapsed);
    });
  }

  // Notebook slide Drawer actions
  const notebookToggleBtn = document.getElementById("notebookToggleBtn");
  const notebookPanel = document.getElementById("notebookPanel");
  if (notebookToggleBtn && notebookPanel) {
    notebookToggleBtn.addEventListener("click", () => {
      AppState.isNotebookCollapsed = !AppState.isNotebookCollapsed;
      if (AppState.isNotebookCollapsed) {
        notebookPanel.classList.add("collapsed");
        notebookPanel.classList.remove("expanded");
      } else {
        notebookPanel.classList.remove("collapsed");
        notebookPanel.classList.add("expanded");
      }
      localStorage.setItem("sql_notebook_collapsed", AppState.isNotebookCollapsed);
    });
  }

  // Dark Mode Toggle Button Listener
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
  }

  // Bookmark Toggle action from Navbar Panel Overlay
  const bookmarksToggleBtn = document.getElementById("bookmarksToggleBtn");
  const bookmarksPanel = document.getElementById("bookmarksPanel");
  if (bookmarksToggleBtn && bookmarksPanel) {
    bookmarksToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isHidden = bookmarksPanel.style.display === "none";
      bookmarksPanel.style.display = isHidden ? "flex" : "none";
    });
  }

  const closeBookmarksBtn = document.getElementById("closeBookmarksBtn");
  if (closeBookmarksBtn && bookmarksPanel) {
    closeBookmarksBtn.addEventListener("click", () => {
      bookmarksPanel.style.display = "none";
    });
  }

  // Hide bookmark overlay on global clicking outside
  document.addEventListener("click", (event) => {
    if (bookmarksPanel && !bookmarksPanel.contains(event.target) && !bookmarksToggleBtn.contains(event.target)) {
      bookmarksPanel.style.display = "none";
    }
  });

  // LEVEL TAB FILTERS (L1, L2, L3, L4, Trends, All)
  const filterTabs = document.querySelectorAll(".level-tab");
  filterTabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      filterTabs.forEach(t => t.classList.remove("active"));
      e.target.classList.add("active");
      AppState.activeFilterLevel = e.target.getAttribute("data-level");
      renderSidebarLinks();
    });
  });

  // Global Quick Search Inputs (Navbar & Sidebar duplicates)
  const searchInput = document.getElementById("topicSearchInput");
  const sidebarSearch = document.getElementById("sidebarSearch");
  const clearSearchBtn = document.getElementById("clearSearchBtn");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const val = e.target.value.trim().toLowerCase();
      AppState.searchQuery = val;
      
      if (val !== "") {
        if (clearSearchBtn) clearSearchBtn.style.display = "block";
        filterAndToggleSearchMode(val);
      } else {
        if (clearSearchBtn) clearSearchBtn.style.display = "none";
        exitSearchMode();
      }
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      if (searchInput) {
        searchInput.value = "";
        AppState.searchQuery = "";
        clearSearchBtn.style.display = "none";
        exitSearchMode();
      }
    });
  }

  if (sidebarSearch) {
    sidebarSearch.addEventListener("input", (e) => {
      const val = e.target.value.trim().toLowerCase();
      AppState.sidebarSearchQuery = val;
      renderSidebarLinks();
    });
  }

  const resetSearchBtn = document.getElementById("resetSearchBtn");
  if (resetSearchBtn) {
    resetSearchBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      if (sidebarSearch) sidebarSearch.value = "";
      AppState.searchQuery = "";
      AppState.sidebarSearchQuery = "";
      if (clearSearchBtn) clearSearchBtn.style.display = "none";
      exitSearchMode();
    });
  }

  // Notebook content writing autosave registers
  const notebookArea = document.getElementById("notebookTextArea");
  if (notebookArea) {
    notebookArea.addEventListener("input", () => {
      saveActiveTopicNote(notebookArea.value);
    });
  }

  const clearNotesBtn = document.getElementById("clearNotesBtn");
  if (clearNotesBtn && notebookArea) {
    clearNotesBtn.addEventListener("click", () => {
      notebookArea.value = "";
      saveActiveTopicNote("");
    });
  }

  // Topic collapsible sections title clickers (Basics, Advanced, etc)
  const sections = ["L1", "L2", "L3", "L4", "Trends"];
  sections.forEach(secName => {
    const btn = document.getElementById(`btnSec${secName}`);
    const div = document.getElementById(`section${secName}`);
    if (btn && div) {
      btn.addEventListener("click", () => {
        div.classList.toggle("collapsed");
      });
    }
  });

  // Prev & Next Topic Navigation actions
  const prevBtn = document.getElementById("prevTopicBtn");
  const nextBtn = document.getElementById("nextTopicBtn");
  if (prevBtn) prevBtn.addEventListener("click", navigatePrevious);
  if (nextBtn) nextBtn.addEventListener("click", navigateNext);

  // Access Keyboard Shortcuts binding (Alt + Directions, Alt + B)
  document.addEventListener("keydown", (e) => {
    if (e.altKey) {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        navigateNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        navigatePrevious();
      } else if (e.key.toLowerCase() === "b") {
        e.preventDefault();
        toggleTopicBookmark(AppState.activeTopicId);
      }
    }
  });
}

/**
 * 5. SEARCH & FILTER CORE FUNCTIONS
 */
function filterAndToggleSearchMode(query) {
  const resultsBanner = document.getElementById("searchModeBanner");
  const searchResultText = document.getElementById("searchResultText");

  // Show banner alert
  if (resultsBanner && searchResultText) {
    resultsBanner.style.display = "flex";
    searchResultText.innerHTML = `Search active for query: "<strong>${query}</strong>"`;
  }

  // Filter the list of links rendered on left side based on titles, keywords, level keywords, and definitions
  renderSidebarLinks(query);
}

function exitSearchMode() {
  const resultsBanner = document.getElementById("searchModeBanner");
  if (resultsBanner) {
    resultsBanner.style.display = "none";
  }
  renderSidebarLinks();
}

/**
 * 6. SIDEBAR GRAPHICS & NAVIGATION RENDERING
 */
function renderSidebarLinks(searchStr = "") {
  // Clear lists for sections L1, L2, L3, L4, Trends
  const buckets = {
    L1: document.getElementById("linksL1"),
    L2: document.getElementById("linksL2"),
    L3: document.getElementById("linksL3"),
    L4: document.getElementById("linksL4"),
    trends: document.getElementById("linksTrends"),
  };

  // Reset UI buckets
  Object.values(buckets).forEach(b => {
    if (b) b.innerHTML = "";
  });

  // Read instantaneous search params
  const filterVal = AppState.activeFilterLevel; // 'all', 'L1' ...
  const textQuery = searchStr ? searchStr.toLowerCase() : AppState.sidebarSearchQuery.toLowerCase();

  activeTopicsList.forEach(topic => {
    // 1. Level tab filter matches check
    if (filterVal !== "all" && topic.level !== filterVal) {
      return; // Skip if level doesn't match tab level
    }

    // 2. Query matches check
    const matchesQuery = 
      topic.title.toLowerCase().includes(textQuery) ||
      topic.level.toLowerCase().includes(textQuery) ||
      (topic.label && topic.label.toLowerCase().includes(textQuery)) ||
      topic.definition.toLowerCase().includes(textQuery) ||
      topic.urduExplanation.toLowerCase().includes(textQuery);

    if (textQuery !== "" && !matchesQuery) {
      return; // Skip if query doesn't match
    }

    // Determine destination output bucket
    let targetBucket = buckets[topic.level];
    if (!targetBucket && topic.level === "trends") {
      targetBucket = buckets["trends"];
    }

    if (!targetBucket) return; // safety boundary

    // Create list item element
    const li = document.createElement("li");
    const isCompleted = AppState.completedTopics.includes(topic.id);
    const isActive = AppState.activeTopicId === topic.id;

    li.innerHTML = `
      <div class="topic-nav-link ${isActive ? 'active' : ''}" data-topic-id="${topic.id}" id="navLink-${topic.id}">
        <div class="link-name-wrapper">
          <div class="topic-checkbox ${isCompleted ? 'completed' : ''}" title="${isCompleted ? 'Topic Complete' : 'Mark Complete'}"></div>
          <span class="link-text" title="${topic.title}">${topic.title}</span>
        </div>
        ${topic.level === "trends" ? '<span class="level-badge badge-trends">AI</span>' : `<span class="level-badge badge-${topic.level.toLowerCase()}">${topic.level}</span>`}
      </div>
    `;

    // Attaching single selective listeners in links directly
    const linkEl = li.querySelector(".topic-nav-link");
    if (linkEl) {
      linkEl.addEventListener("click", () => {
        // Toggle active selection and reload view
        loadTopicContent(topic.id);
        
        // Remove active class from previous highlights
        document.querySelectorAll(".topic-nav-link").forEach(el => el.classList.remove("active"));
        linkEl.classList.add("active");

        // Close mobile drawer if active on phone widths
        const sidebar = document.getElementById("sidebar");
        if (sidebar && sidebar.classList.contains("active-mobile")) {
          sidebar.classList.remove("active-mobile");
          AppState.mobileSidebarOpen = false;
        }
      });
    }

    // Attaching direct click handler on link checkmark inside link container
    const tickEl = li.querySelector(".topic-checkbox");
    if (tickEl) {
      tickEl.addEventListener("click", (e) => {
        e.stopPropagation(); // prevent calling parent link loaders
        toggleTopicComplete(topic.id);
      });
    }

    targetBucket.appendChild(li);
  });

  // Handle completely empty search cases
  Object.keys(buckets).forEach(lvl => {
    const sectionContainer = document.getElementById(`section${lvl}`);
    const b = buckets[lvl];
    if (b && b.children.length === 0) {
      b.innerHTML = `<li style="padding: 12px 24px; font-size: 0.8rem; color: var(--text-muted); font-style: italic;">No topics found in this section.</li>`;
    }
  });

  // Highlight navigation titles logic based on child lists containing loaded contents
  updateTOCCollapsedStates();
}

/**
 * Helps toggle collapsing states based on filters and selections
 */
function updateTOCCollapsedStates() {
  const sections = ["L1", "L2", "L3", "L4", "Trends"];
  sections.forEach(secName => {
    const container = document.getElementById(`section${secName}`);
    if (!container) return;
    
    // Automatically open sections if search active
    if (AppState.searchQuery !== "" || AppState.sidebarSearchQuery !== "") {
      container.classList.remove("collapsed");
    }
  });
}

/**
 * 7. LOAD DYNAMIC LECTURE & PRESENTATION CONTENT SHEETS
 */
function loadTopicContent(topicId) {
  AppState.activeTopicId = topicId;
  localStorage.setItem("sql_active_topic", topicId);

  // Synchronize highlights in navigation tree links
  document.querySelectorAll(".topic-nav-link").forEach(link => {
    const id = link.getAttribute("data-topic-id");
    if (id === topicId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  const topicObj = activeTopicsList.find(t => t.id === topicId);
  if (!topicObj) return;

  const presentationDiv = document.getElementById("topicPresentation");
  if (!presentationDiv) return;

  // Render Skeleton loading spinner instantly
  const loadingDiv = document.getElementById("topicLoading");
  if (loadingDiv) loadingDiv.style.display = "flex";

  // Create formatted content template
  const isBookmarked = AppState.bookmarkedTopics.includes(topicId);
  const isCompleted = AppState.completedTopics.includes(topicId);

  // Parse Syntax keywords helper
  const parsedSyntaxCode = colorizeSQLKeywords(topicObj.syntax);

  // Generate Scenario markup blocks
  const easyScenario = topicObj.scenarios.easy;
  const mediumScenario = topicObj.scenarios.medium;
  const hardScenario = topicObj.scenarios.hard;

  // Pre-load content page templates
  presentationDiv.innerHTML = `
    <!-- MAIN PRESENTATION SHEET HEADER -->
    <div class="topic-header" id="topicHeaderSection">
      <div class="topic-title-area">
        <span class="topic-level-indicator badge-${topicObj.level.toLowerCase()}">Level ${topicObj.level} Mode</span>
        <h2 class="topic-headline" id="topicHeadline">${topicObj.title}</h2>
        <div class="topic-meta-stats">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" role="img" class="lucide lucide-clock"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            15 mins read pace
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" class="lucide lucide-target"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
            Analyst Interview Core Topic
          </span>
        </div>
      </div>

      <!-- Action Button Pill Controls -->
      <div class="topic-controls">
        <button class="action-pill-btn ${isBookmarked ? 'bookmarked' : ''}" id="btnBookmarkTopic" aria-label="Bookmark this topic">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bookmark"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
          <span id="bookmarkBtnText">${isBookmarked ? 'Bookmarked' : 'Add Bookmark'}</span>
        </button>

        <button class="action-pill-btn ${isCompleted ? 'completed' : ''}" id="btnCompleteTopic" aria-label="Toggle Complete status">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          <span id="completeBtnText">${isCompleted ? 'Finished!' : 'Mark Completed'}</span>
        </button>
      </div>
    </div>

    <!-- CORE LEARNING PLAT MODULE -->
    <div class="lecture-block">
      <!-- Double column glassmorphism concept card grids -->
      <div class="concept-grid">
        <div class="concept-card english">
          <span class="card-lang-tag">English Definition</span>
          <p>${topicObj.definition}</p>
        </div>
        <div class="concept-card urdu">
          <span class="card-lang-tag">Roman Urdu Explanation</span>
          <p>${topicObj.urduExplanation}</p>
        </div>
      </div>

      <!-- Why Data Analyst utilizes this query module -->
      <div class="analyst-usecase-highlight">
        <div class="insight-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lightbulb"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .6 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
        </div>
        <div class="insight-body">
          <h4>Why Analysts Use This? (Analyst perspective)</h4>
          <p>${topicObj.whyAnalystsUseThis}</p>
        </div>
      </div>

      <!-- Syntax block card -->
      <h3 class="section-headline" style="margin-top: 32px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-terminal"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>
        SQL Syntax Rules
      </h3>
      <div class="syntax-card">
        <div class="syntax-header">
          <span class="syntax-title">STRUCTURE RULES</span>
          <button class="copy-btn" id="copySyntaxBtn">Copy SQL</button>
        </div>
        <pre><code>${parsedSyntaxCode}</code></pre>
      </div>

      <!-- BUSINESS ANALYTICS DATASET SCENARIOS (EASY / MEDIUM / ADVANCED) -->
      <h3 class="section-headline" style="margin-top: 36px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-presentation"><path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="m7 21 5-5 5 5"/></svg>
        Interactive Business Scenarios
      </h3>
      <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 12px;">
        Niche businesses datasets (Ecommerce, Customer profiles, SaaS subscriptions) me is topic ke practical uses ko asan scenarios me dekhein.
      </p>

      <div class="scenario-box">
        <div class="scenario-tabs">
          <button class="tab-btn ${AppState.currentScenarioTab === 'easy' ? 'active' : ''}" id="tabEasyBtn" data-tab-name="easy">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: #10b981;"></span>
            Beginner Case
          </button>
          <button class="tab-btn ${AppState.currentScenarioTab === 'medium' ? 'active' : ''}" id="tabMedBtn" data-tab-name="medium">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: #3b82f6;"></span>
            Intermediate Case
          </button>
          <button class="tab-btn ${AppState.currentScenarioTab === 'hard' ? 'active' : ''}" id="tabHardBtn" data-tab-name="hard">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: #f59e0b;"></span>
            Advanced Analytics
          </button>
        </div>

        <div class="tab-contents-pane">
          <!-- EASY PANEL SCENARIO -->
          <div class="tab-pane ${AppState.currentScenarioTab === 'easy' ? 'active' : ''}" id="panelEasy">
            <div class="scenario-desc">
              <h4>${easyScenario.title}</h4>
              <p><strong>Real Business Setup:</strong> ${easyScenario.businessScenario || topicObj.businessScenario}</p>
            </div>
            <div class="urdu-explanation-block">
              <strong>Urdu Explanation:</strong> ${easyScenario.urduExplanation}
            </div>
            <div class="syntax-card">
              <div class="syntax-header">
                <span class="syntax-title">BEGINNER SQL QUERY</span>
                <button class="copy-btn" id="copyQueryEasy">Copy Code</button>
              </div>
              <pre><code>${colorizeSQLKeywords(easyScenario.sqlQuery)}</code></pre>
            </div>
            <div class="business-insights-block">
              <div class="insights-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
              </div>
              <div class="insights-content">
                <h5>Business Insights Extraction</h5>
                <p>${easyScenario.businessInsight}</p>
              </div>
            </div>
            ${renderExpectedTableMarkup(easyScenario.expectedOutput)}
          </div>

          <!-- MEDIUM PANEL SCENARIO -->
          <div class="tab-pane ${AppState.currentScenarioTab === 'medium' ? 'active' : ''}" id="panelMedium">
            <div class="scenario-desc">
              <h4>${mediumScenario.title}</h4>
              <p><strong>Real Business Setup:</strong> ${mediumScenario.businessScenario || topicObj.businessScenario}</p>
            </div>
            <div class="urdu-explanation-block">
              <strong>Urdu Explanation:</strong> ${mediumScenario.urduExplanation}
            </div>
            <div class="syntax-card">
              <div class="syntax-header">
                <span class="syntax-title">INTERMEDIATE SQL QUERY</span>
                <button class="copy-btn" id="copyQueryMedium">Copy Code</button>
              </div>
              <pre><code>${colorizeSQLKeywords(mediumScenario.sqlQuery)}</code></pre>
            </div>
            <div class="business-insights-block">
              <div class="insights-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
              </div>
              <div class="insights-content">
                <h5>Business Insights Extraction</h5>
                <p>${mediumScenario.businessInsight}</p>
              </div>
            </div>
            ${renderExpectedTableMarkup(mediumScenario.expectedOutput)}
          </div>

          <!-- HARD PANEL SCENARIO -->
          <div class="tab-pane ${AppState.currentScenarioTab === 'hard' ? 'active' : ''}" id="panelHard">
            <div class="scenario-desc">
              <h4>${hardScenario.title}</h4>
              <p><strong>Real Business Setup:</strong> ${hardScenario.businessScenario || topicObj.businessScenario}</p>
            </div>
            <div class="urdu-explanation-block">
              <strong>Urdu Explanation:</strong> ${hardScenario.urduExplanation}
            </div>
            <div class="syntax-card">
              <div class="syntax-header">
                <span class="syntax-title">ADVANCED SQL QUERY</span>
                <button class="copy-btn" id="copyQueryHard">Copy Code</button>
              </div>
              <pre><code>${colorizeSQLKeywords(hardScenario.sqlQuery)}</code></pre>
            </div>
            <div class="business-insights-block">
              <div class="insights-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
              </div>
              <div class="insights-content">
                <h5>Business Insights Extraction</h5>
                <p>${hardScenario.businessInsight}</p>
              </div>
            </div>
            ${renderExpectedTableMarkup(hardScenario.expectedOutput)}
          </div>
        </div>
      </div>

      <!-- COMMON ANALYST MISTAKES BLOCK -->
      <div class="mistakes-container">
        <div class="mistakes-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alert-triangle"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
          Ghaltiyan Jo Sabse Hoti Hein (Common Mistakes)
        </div>
        <ul class="mistakes-list">
          ${topicObj.commonMistakes.map(m => `
            <li class="mistakes-item">
              <span class="mistakes-item-title">${m.title}</span>
              <div class="mistake-comparison">
                <div class="wrong-code">
                  <span class="comparison-label">❌ Incorrect way</span>
                  <code>${m.wrong.replace(/\n/g, "<br>")}</code>
                </div>
                <div class="correct-code">
                  <span class="comparison-label">✅ Optimal Correct way</span>
                  <code>${m.correct.replace(/\n/g, "<br>")}</code>
                </div>
              </div>
            </li>
          `).join("")}
        </ul>
      </div>

      <!-- INTERVIEW PREPARATION MODULE -->
      <div class="interview-section">
        <h3 class="section-headline">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-messages-square"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>
          Cracking Raw SQL Interview Questions
        </h3>
        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 12px;">
          Yeh sawal FAANG aur top startups ke interviews me puche jaate hain:
        </p>
        <div class="interview-list">
          ${topicObj.interviewQuestions.map((q, idx) => `
            <div class="interview-card" id="interviewCard-${idx}">
              <div class="interview-question-header" onclick="toggleInterviewCard(${idx})">
                <div class="question-text-area">
                  <span class="interview-badge">Q ${idx + 1}</span>
                  <span class="question-title">${q.question}</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="lucide lucide-chevron-down toggle-arrow"><path d="m6 9 6 6 6-6"/></svg>
              </div>
              <div class="interview-answer-body">
                <h5 class="answer-subtitle">Optimal Analyst Answer:</h5>
                <p style="font-size: 0.92rem; color: var(--text-secondary); margin-bottom: 14px;">${q.answer}</p>
                <div class="analytical-tips">
                  <h6 style="font-size: 0.78rem; font-weight: 700; color: var(--emerald-800); margin-bottom: 2px;">📈 PRO ANALYST TIP:</h6>
                  <p style="font-size: 0.85rem; color: var(--text-secondary);">${q.tip}</p>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- PRACTICE SANDBOX SIMULATION CONTAINER -->
      <div class="practice-container">
        <div class="practice-header">
          <div class="practice-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="lucide lucide-terminal"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>
            Interactive Analyst Challenge
          </div>
          <span class="practice-difficulty">${topicObj.practice.difficulty} Challenge</span>
        </div>
        <div class="practice-task-card">
          <p><strong>Challenge Objective:</strong> ${topicObj.practice.task}</p>
          <div class="practice-desc-urdu">
            <strong>Roman Urdu task description:</strong> ${topicObj.practice.taskUrdu}
          </div>

          <div class="practice-simulator-input">
            <label for="practiceTextarea" style="font-size: 0.8rem; font-weight: 600; color: var(--text-secondary);">Write your SQL solution query here:</label>
            <textarea id="practiceTextarea" class="practice-textarea" placeholder="SELECT * FROM customers_db ..."></textarea>
            
            <div class="practice-simulator-actions">
              <button class="sim-btn sim-btn-hint" id="hintTriggerBtn">Show Hint</button>
              <button class="sim-btn sim-btn-submit" id="evalQueryBtn">Run Query Sandbox</button>
            </div>
            
            <!-- Dynamic sandboxed query response block -->
            <div class="sandbox-feedback" id="sandboxFeedbackBox">
              <div id="sandboxFeedbackMessage">Test logs</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  `;

  // Bind local logic to buttons and widgets dynamically
  bindLocalPresentationListeners(topicObj);

  // Load selected notes to notebook sliding panel
  loadActiveTopicNotesToUi(topicId);

  // Sync bottom pagination footer targets
  updateNavFooterTitles(topicId);

  // Hide Skeleton spinner safely
  if (loadingDiv) loadingDiv.style.display = "none";
}

/**
 * Parses and replaces SQL queries keywords to highlight them inside code pre tags.
 */
function colorizeSQLKeywords(code) {
  if (!code) return "";
  const keywords = /\b(SELECT|FROM|WHERE|GROUP BY|HAVING|ORDER BY|DISTINCT|COUNT|SUM|AVG|LEFT JOIN|RIGHT JOIN|INNER JOIN|UNION|CASE|WHEN|THEN|ELSE|END|AS|WITH|RANK|ROW_NUMBER|LEAD|LAG|OVER|PARTITION BY|DATE|SUBSTR|AND|OR|ON|IN|NOT|NULL|LIMIT|DESC|ASC)\b/gi;
  let cleanHTML = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  cleanHTML = cleanHTML.replace(keywords, `<span class="token-keyword">$1</span>`);
  cleanHTML = cleanHTML.replace(/(["'])(.*?)\1/g, `<span class="token-string">"$2"</span>`);
  cleanHTML = cleanHTML.replace(/(--.*?$)/gm, `<span class="token-comment">$1</span>`);
  return cleanHTML;
}

/**
 * Returns HTML layout tables string safely from topic properties block.
 */
function renderExpectedTableMarkup(outputObj) {
  if (!outputObj || !outputObj.headers) return "";
  return `
    <div class="table-wrapper">
      <div class="table-title">Expected Query Output Structure</div>
      <table class="styled-table">
        <thead>
          <tr>
            ${outputObj.headers.map(h => `<th>${h}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${outputObj.rows.map(row => `
            <tr>
              ${row.map(val => `<td>${val}</td>`).join("")}
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

/**
 * 8. DYNAMIC ADAPTER BINDERS FOR ACTIVE PRESENTATIONS
 */
function bindLocalPresentationListeners(topicObj) {
  // Bind copy button functions
  setupCopyHelper("copySyntaxBtn", topicObj.syntax);
  setupCopyHelper("copyQueryEasy", topicObj.scenarios.easy.sqlQuery);
  setupCopyHelper("copyQueryMedium", topicObj.scenarios.medium.sqlQuery);
  setupCopyHelper("copyQueryHard", topicObj.scenarios.hard.sqlQuery);

  // Bind dynamic Bookmark toggle inside content sheet
  const btnBookmark = document.getElementById("btnBookmarkTopic");
  const bkText = document.getElementById("bookmarkBtnText");
  if (btnBookmark) {
    btnBookmark.addEventListener("click", () => {
      toggleTopicBookmark(topicObj.id);
    });
  }

  // Bind complete logic actions inside content cards
  const btnComplete = document.getElementById("btnCompleteTopic");
  if (btnComplete) {
    btnComplete.addEventListener("click", () => {
      toggleTopicComplete(topicObj.id);
    });
  }

  // Bind inside Scenario level TAB Buttons
  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const tabTarget = e.currentTarget.getAttribute("data-tab-name");
      AppState.currentScenarioTab = tabTarget;

      // sync tab classes
      tabButtons.forEach(b => b.classList.remove("active"));
      e.currentTarget.classList.add("active");

      // reveal target pane slide views
      document.getElementById("panelEasy").style.display = tabTarget === "easy" ? "block" : "none";
      document.getElementById("panelMedium").style.display = tabTarget === "medium" ? "block" : "none";
      document.getElementById("panelHard").style.display = tabTarget === "hard" ? "block" : "none";
    });
  });

  // EVALUATE SANDBOX CHANNELS
  const evalBtn = document.getElementById("evalQueryBtn");
  const hintBtn = document.getElementById("hintTriggerBtn");
  const feedbackBox = document.getElementById("sandboxFeedbackBox");
  const feedbackMsg = document.getElementById("sandboxFeedbackMessage");
  const queryArea = document.getElementById("practiceTextarea");

  if (evalBtn && feedbackBox && feedbackMsg && queryArea) {
    evalBtn.addEventListener("click", () => {
      const uQuery = queryArea.value.trim().toLowerCase();
      if (!uQuery) {
        feedbackBox.className = "sandbox-feedback error";
        feedbackMsg.innerText = "Error: Input query space cannot be completely empty!";
        feedbackBox.style.display = "flex";
        return;
      }

      // Check against practice regex matches criteria
      const cleanRegex = topicObj.practice.regexPattern;
      const isValid = cleanRegex.test(uQuery);

      if (isValid) {
        feedbackBox.className = "sandbox-feedback success";
        feedbackMsg.innerHTML = `🌟 <strong>Subhan Allah! Perfect SQL Statement!</strong><br>${topicObj.practice.successMessage}`;
        feedbackBox.style.display = "flex";
        
        // Mark topic as automatically complete when challenge is solved
        if (!AppState.completedTopics.includes(topicObj.id)) {
          toggleTopicComplete(topicObj.id);
        }
      } else {
        feedbackBox.className = "sandbox-feedback error";
        feedbackMsg.innerHTML = `⚠️ <strong>Kuch parameters ghalat hein!</strong> Apni syntax evaluate krein ya 'Show Hint' k button pe click karein.`;
        feedbackBox.style.display = "flex";
      }
    });
  }

  if (hintBtn && queryArea) {
    hintBtn.addEventListener("click", () => {
      if (queryArea) {
        queryArea.value = topicObj.practice.hint;
        // Trigger focus feedback
        queryArea.focus();
      }
    });
  }
}

/**
 * Handles copy-to-clipboard functionalities beautifully
 */
function setupCopyHelper(btnId, rawText) {
  const btn = document.getElementById(btnId);
  if (!btn) return;

  btn.addEventListener("click", () => {
    navigator.clipboard.writeText(rawText).then(() => {
      const oldText = btn.innerText;
      btn.innerText = "Copied! ✅";
      btn.style.background = "#059669";
      btn.style.color = "#ffffff";
      setTimeout(() => {
        btn.innerText = oldText;
        btn.style.background = "";
        btn.style.color = "";
      }, 1500);
    }).catch(e => {
      console.warn("Copy operation failed or blocked by secure frame settings:", e);
    });
  });
}

/**
 * 9. COLLAPSIBLE ACCORDION FOR INTERVIEW ANSWERS
 */
window.toggleInterviewCard = function (cardIndex) {
  const card = document.getElementById(`interviewCard-${cardIndex}`);
  if (card) {
    card.classList.toggle("open");
  }
};

/**
 * 10. SYSTEM PERSISTENCE STATUS SYNCHRONIZERS
 */
function toggleTopicBookmark(topicId) {
  const index = AppState.bookmarkedTopics.indexOf(topicId);
  const topicObj = activeTopicsList.find(t => t.id === topicId);

  if (index === -1) {
    AppState.bookmarkedTopics.push(topicId);
  } else {
    AppState.bookmarkedTopics.splice(index, 1);
  }

  saveState("sql_bookmarked_topics", AppState.bookmarkedTopics);
  renderBookmarksPanel();

  // Sync current layout button configurations
  const btnBookmark = document.getElementById("btnBookmarkTopic");
  const bkText = document.getElementById("bookmarkBtnText");

  if (btnBookmark && bkText) {
    const isNowBookmarked = AppState.bookmarkedTopics.includes(topicId);
    if (isNowBookmarked) {
      btnBookmark.classList.add("bookmarked");
      bkText.innerText = "Bookmarked";
    } else {
      btnBookmark.classList.remove("bookmarked");
      bkText.innerText = "Add Bookmark";
    }
  }
}

function toggleTopicComplete(topicId) {
  const index = AppState.completedTopics.indexOf(topicId);
  if (index === -1) {
    AppState.completedTopics.push(topicId);
  } else {
    AppState.completedTopics.splice(index, 1);
  }

  // Update states
  saveState("sql_completed_topics", AppState.completedTopics);
  updateOverallProgress();

  // Reload current navbar link checkbox statuses
  const relativeLinkCheckbox = document.querySelector(`#navLink-${topicId} .topic-checkbox`);
  if (relativeLinkCheckbox) {
    if (AppState.completedTopics.includes(topicId)) {
      relativeLinkCheckbox.classList.add("completed");
    } else {
      relativeLinkCheckbox.classList.remove("completed");
    }
  }

  // Reload internal Presentation button states if we are looking at this topic
  if (AppState.activeTopicId === topicId) {
    const btnComplete = document.getElementById("btnCompleteTopic");
    const cmpText = document.getElementById("completeBtnText");
    if (btnComplete && cmpText) {
      const isNowCompleted = AppState.completedTopics.includes(topicId);
      if (isNowCompleted) {
        btnComplete.classList.add("completed");
        cmpText.innerText = "Finished! 🎉";
      } else {
        btnComplete.classList.remove("completed");
        cmpText.innerText = "Mark Completed";
      }
    }
  }
}

/**
 * Re-evaluate master learning progress track levels
 */
function updateOverallProgress() {
  const totalCount = activeTopicsList.length || 1;
  const completedCount = AppState.completedTopics.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  const fill = document.getElementById("progressFill");
  const text = document.getElementById("progressPercentage");

  if (fill) fill.style.width = `${percentage}%`;
  if (text) text.innerText = `${percentage}%`;
}

/**
 * 11. SIDEBAR BOOKMARK DROPDOWN BUILDER
 */
function renderBookmarksPanel() {
  const listElement = document.getElementById("bookmarksList");
  const badgeElement = document.getElementById("bookmarkCountBadge");
  if (!listElement) return;

  const savedCount = AppState.bookmarkedTopics.length;
  if (badgeElement) {
    badgeElement.innerText = savedCount;
    badgeElement.style.display = savedCount > 0 ? "flex" : "none";
  }

  if (savedCount === 0) {
    listElement.innerHTML = `<li class="empty-bookmarks">No bookmarks saved yet.</li>`;
    return;
  }

  listElement.innerHTML = "";
  AppState.bookmarkedTopics.forEach(id => {
    const topic = activeTopicsList.find(t => t.id === id);
    if (!topic) return;

    const li = document.createElement("li");
    li.className = "bookmark-item";
    li.innerHTML = `
      <div class="bookmark-info" id="bookmarkLoad-${id}">
        <span class="bookmark-info-title">${topic.title}</span>
        <span class="bookmark-info-level">Level ${topic.level} Mode</span>
      </div>
      <button class="remove-bookmark-btn" id="bookmarkDel-${id}" title="Delete Bookmark">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
      </button>
    `;

    // Bind quick loaded triggers inside bookmarks
    li.querySelector(`#bookmarkLoad-${id}`).addEventListener("click", () => {
      loadTopicContent(id);
      document.getElementById("bookmarksPanel").style.display = "none";
    });

    li.querySelector(`#bookmarkDel-${id}`).addEventListener("click", (e) => {
      e.stopPropagation();
      toggleTopicBookmark(id);
    });

    listElement.appendChild(li);
  });
}

/**
 * 12. NAVIGATION FOOTER PAGES SWITCHER
 */
function updateNavFooterTitles(topicId) {
  const currentIndex = activeTopicsList.findIndex(t => t.id === topicId);
  const prevBtn = document.getElementById("prevTopicBtn");
  const nextBtn = document.getElementById("nextTopicBtn");
  const prevTitle = document.getElementById("prevTopicTitle");
  const nextTitle = document.getElementById("nextTopicTitle");

  if (currentIndex === -1) return;

  // Set previous topic
  if (currentIndex > 0) {
    if (prevBtn) prevBtn.style.visibility = "visible";
    const prevTopic = activeTopicsList[currentIndex - 1];
    if (prevTitle) prevTitle.innerText = prevTopic.title;
  } else {
    if (prevBtn) prevBtn.style.visibility = "hidden";
  }

  // Set next topic
  if (currentIndex < activeTopicsList.length - 1) {
    if (nextBtn) nextBtn.style.visibility = "visible";
    const nextTopic = activeTopicsList[currentIndex + 1];
    if (nextTitle) nextTitle.innerText = nextTopic.title;
  } else {
    if (nextBtn) nextBtn.style.visibility = "hidden";
  }
}

function navigateNext() {
  const currentIndex = activeTopicsList.findIndex(t => t.id === AppState.activeTopicId);
  if (currentIndex !== -1 && currentIndex < activeTopicsList.length - 1) {
    loadTopicContent(activeTopicsList[currentIndex + 1].id);
    // Auto-scroll content viewer wrapper to top
    document.getElementById("contentArea").scrollTop = 0;
  }
}

function navigatePrevious() {
  const currentIndex = activeTopicsList.findIndex(t => t.id === AppState.activeTopicId);
  if (currentIndex > 0) {
    loadTopicContent(activeTopicsList[currentIndex - 1].id);
    // Auto-scroll content viewer wrapper to top
    document.getElementById("contentArea").scrollTop = 0;
  }
}

/**
 * 13. NOTEBOOK WORKSPACE AUTOSAVE MODULE
 */
function loadActiveTopicNotesToUi(topicId) {
  const displayTitle = document.getElementById("activeNotesTopicName");
  const textInput = document.getElementById("notebookTextArea");
  const topic = activeTopicsList.find(t => t.id === topicId);

  if (displayTitle && topic) {
    displayTitle.innerText = `✏️ ${topic.title}`;
  }

  if (textInput) {
    const savedNotes = localStorage.getItem(`sql_note_${topicId}`) || "";
    textInput.value = savedNotes;
  }
}

function saveActiveTopicNote(text) {
  const topicId = AppState.activeTopicId;
  localStorage.setItem(`sql_note_${topicId}`, text);

  // Update save message flash feedback
  const msgEl = document.getElementById("saveStatusMsg");
  if (msgEl) {
    msgEl.innerText = "Draft Autosaved ... ✓";
    msgEl.style.color = "#10b981";
    setTimeout(() => {
      msgEl.innerText = "Saves automatically";
      msgEl.style.color = "";
    }, 1200);
  }

  renderNotes();
}

function renderNotes() {
  const listElement = document.getElementById("savedNotesSummaryList");
  if (!listElement) return;

  listElement.innerHTML = "";
  let itemsRendered = 0;

  activeTopicsList.forEach(topic => {
    const noteText = localStorage.getItem(`sql_note_${topic.id}`);
    if (noteText && noteText.trim() !== "") {
      itemsRendered++;
      const li = document.createElement("li");
      li.className = "summary-note-item";
      li.innerHTML = `
        <div class="summary-note-title">${topic.title}</div>
        <div class="summary-note-preview">${noteText.substring(0, 50)}${noteText.length > 50 ? '...' : ''}</div>
      `;
      li.addEventListener("click", () => {
        loadTopicContent(topic.id);
        const notebookPanel = document.getElementById("notebookPanel");
        if (notebookPanel && notebookPanel.classList.contains("collapsed")) {
          notebookPanel.classList.remove("collapsed");
          notebookPanel.classList.add("expanded");
        }
      });
      listElement.appendChild(li);
    }
  });

  if (itemsRendered === 0) {
    listElement.innerHTML = `<li style="font-size: 0.8rem; color: var(--text-muted); font-style: italic; text-align: center; padding: 12px 0;">No active workspace notes.</li>`;
  }
}
