// SQL for Data Analysts LMS - Dynamic Controller & Content Synthesizer
// This file coordinates interactions: sidebars, theme toggling, search, bookmarks, progress, notes, hotkeys & dynamic fallback content generation.

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. MASTER TOPICS REGISTER
  // ==========================================
  const TOPIC_REGISTRY = [
    // LEVEL 1
    { id: "sql-intro", level: "Level 1 — Core Foundations", title: "SQL Introduction" },
    { id: "database-basics", level: "Level 1 — Core Foundations", title: "Database Basics" },
    { id: "ddl-dml-dql", level: "Level 1 — Core Foundations", title: "DDL vs DML vs DQL" },
    { id: "select", level: "Level 1 — Core Foundations", title: "SELECT" },
    { id: "from", level: "Level 1 — Core Foundations", title: "FROM" },
    { id: "where", level: "Level 1 — Core Foundations", title: "WHERE" },
    { id: "distinct", level: "Level 1 — Core Foundations", title: "DISTINCT" },
    { id: "order-by", level: "Level 1 — Core Foundations", title: "ORDER BY" },
    { id: "group-by", level: "Level 1 — Core Foundations", title: "GROUP BY" },
    { id: "having", level: "Level 1 — Core Foundations", title: "HAVING" },
    { id: "limit", level: "Level 1 — Core Foundations", title: "LIMIT / TOP" },
    { id: "and-or-not", level: "Level 1 — Core Foundations", title: "AND / OR / NOT" },
    { id: "in-operator", level: "Level 1 — Core Foundations", title: "IN Clause" },
    { id: "between", level: "Level 1 — Core Foundations", title: "BETWEEN" },
    { id: "like", level: "Level 1 — Core Foundations", title: "LIKE Wildcard" },
    { id: "is-null", level: "Level 1 — Core Foundations", title: "IS NULL" },
    { id: "coalesce", level: "Level 1 — Core Foundations", title: "COALESCE" },
    { id: "count", level: "Level 1 — Core Foundations", title: "COUNT" },
    { id: "sum", level: "Level 1 — Core Foundations", title: "SUM" },
    { id: "avg", level: "Level 1 — Core Foundations", title: "AVG" },
    { id: "min", level: "Level 1 — Core Foundations", title: "MIN" },
    { id: "max", level: "Level 1 — Core Foundations", title: "MAX" },

    // LEVEL 2
    { id: "join-inner", level: "Level 2 — Intermediate Querying", title: "INNER JOIN" },
    { id: "join-left", level: "Level 2 — Intermediate Querying", title: "LEFT JOIN" },
    { id: "join-right", level: "Level 2 — Intermediate Querying", title: "RIGHT JOIN" },
    { id: "join-full", level: "Level 2 — Intermediate Querying", title: "FULL OUTER JOIN" },
    { id: "join-self", level: "Level 2 — Intermediate Querying", title: "SELF JOIN" },
    { id: "join-cross", level: "Level 2 — Intermediate Querying", title: "CROSS JOIN" },
    { id: "union", level: "Level 2 — Intermediate Querying", title: "UNION" },
    { id: "union-all", level: "Level 2 — Intermediate Querying", title: "UNION ALL" },
    { id: "intersect", level: "Level 2 — Intermediate Querying", title: "INTERSECT" },
    { id: "case-when", level: "Level 2 — Intermediate Querying", title: "CASE WHEN" },
    { id: "datediff", level: "Level 2 — Intermediate Querying", title: "DATEDIFF" },
    { id: "dateadd", level: "Level 2 — Intermediate Querying", title: "DATEADD" },
    { id: "getdate", level: "Level 2 — Intermediate Querying", title: "GETDATE" },
    { id: "trim", level: "Level 2 — Intermediate Querying", title: "TRIM" },
    { id: "substring", level: "Level 2 — Intermediate Querying", title: "SUBSTRING" },
    { id: "concat", level: "Level 2 — Intermediate Querying", title: "CONCAT" },
    { id: "replace", level: "Level 2 — Intermediate Querying", title: "REPLACE" },

    // LEVEL 3
    { id: "subqueries", level: "Level 3 — Advanced Analytics", title: "Subqueries" },
    { id: "correlated-subqueries", level: "Level 3 — Advanced Analytics", title: "Correlated Subqueries" },
    { id: "ctes", level: "Level 3 — Advanced Analytics", title: "CTEs" },
    { id: "recursive-ctes", level: "Level 3 — Advanced Analytics", title: "Recursive CTEs" },
    { id: "window-functions", level: "Level 3 — Advanced Analytics", title: "Window Functions Intro" },
    { id: "row-number", level: "Level 3 — Advanced Analytics", title: "ROW_NUMBER" },
    { id: "rank", level: "Level 3 — Advanced Analytics", title: "RANK" },
    { id: "dense-rank", level: "Level 3 — Advanced Analytics", title: "DENSE_RANK" },
    { id: "lead", level: "Level 3 — Advanced Analytics", title: "LEAD" },
    { id: "lag", level: "Level 3 — Advanced Analytics", title: "LAG" },
    { id: "sum-over", level: "Level 3 — Advanced Analytics", title: "SUM OVER()" },
    { id: "partition-by", level: "Level 3 — Advanced Analytics", title: "PARTITION BY" },
    { id: "running-totals", level: "Level 3 — Advanced Analytics", title: "Running Totals" },
    { id: "cohort-analysis", level: "Level 3 — Advanced Analytics", title: "Cohort Analysis" },
    { id: "rfm-analysis", level: "Level 3 — Advanced Analytics", title: "RFM Analysis" },
    { id: "retention-analysis", level: "Level 3 — Advanced Analytics", title: "Retention Analysis" },

    // LEVEL 4
    { id: "fact-tables", level: "Level 4 — Data Modeling & Optimization", title: "Fact Tables" },
    { id: "dimension-tables", level: "Level 4 — Data Modeling & Optimization", title: "Dimension Tables" },
    { id: "star-schema", level: "Level 4 — Data Modeling & Optimization", title: "Star Schema" },
    { id: "snowflake-schema", level: "Level 4 — Data Modeling & Optimization", title: "Snowflake Schema" },
    { id: "indexing", level: "Level 4 — Data Modeling & Optimization", title: "Indexing" },
    { id: "query-optimization", level: "Level 4 — Data Modeling & Optimization", title: "Query Optimization" },
    { id: "execution-plans", level: "Level 4 — Data Modeling & Optimization", title: "Execution Plans" },
    { id: "sql-performance-tuning", level: "Level 4 — Data Modeling & Optimization", title: "SQL Performance Tuning" },
    { id: "bigquery-concepts", level: "Level 4 — Data Modeling & Optimization", title: "BigQuery Concepts" },
    { id: "snowflake-concepts", level: "Level 4 — Data Modeling & Optimization", title: "Snowflake Concepts" },
    { id: "semantic-layer", level: "Level 4 — Data Modeling & Optimization", title: "Semantic Layer" },
    { id: "dbt-basics", level: "Level 4 — Data Modeling & Optimization", title: "dbt Basics" },
    { id: "power-bi-semantic", level: "Level 4 — Data Modeling & Optimization", title: "Power BI Semantic Model" },

    // TRENDS
    { id: "ai-assisted-sql", level: "2026 SQL Trends", title: "AI-Assisted SQL & Prompts" },
    { id: "prompt-engineering", level: "2026 SQL Trends", title: "Prompt Engineering for SQL" },
    { id: "sql-debugging-ai", level: "2026 SQL Trends", title: "SQL Debugging with AI" },
    { id: "real-time-analytics", level: "2026 SQL Trends", title: "Real-Time Analytics" },
    { id: "streaming-data", level: "2026 SQL Trends", title: "Streaming Data" },
    { id: "cloud-warehouses", level: "2026 SQL Trends", title: "Cloud Warehouses" },
    { id: "modern-analytics-stack", level: "2026 SQL Trends", title: "Modern Analytics Stack" }
  ];

  // ==========================================
  // 2. DYNAMIC CONTENT SYNTHESIZER
  // ==========================================
  function querySelectedTopic(id) {
    const found = SQL_TOPICS.find(t => t.id === id);
    if (found) return found;

    const meta = TOPIC_REGISTRY.find(t => t.id === id) || { title: id.toUpperCase().replace("-", " "), level: "Core foundations" };
    const title = meta.title;
    const level = meta.level;

    return {
      id: id,
      level: level,
      title: title,
      english_definition: `The SQL ${title} concept represents a standard operational mechanism within SQL frameworks. It allows data analysts to logically manipulate records, structure databases for lightning queries, or format transactional details directly inside executive reporting logs.`,
      roman_urdu: `${title} ka kaam database operations ko aur aasaan aur smooth banana he. Chahay records ko filter karna ho, dates ko modify karna ho, ya table indexing se execution speed badhani ho, is concept ke baghair aap professional reporting dashboards construct nahi kar sakte. Is ko seekhne ke baad aap complex queries asani se compile kar payenge.`,
      syntax: `-- Standard functional representation of ${title}
SELECT 
    column_id,
    ${title}(target_field) AS calculated_${id}
FROM analytics_database.transaction_history
GROUP BY column_id;`,
      beginner_example: {
        query: `SELECT ${title}(revenue) FROM orders WHERE status = 'Completed';`,
        explanation: `Simple aggregate operation finding baseline transactional outputs matching ${title} across active records.`
      },
      intermediate_example: {
        query: `SELECT store_region, ${title}(order_value) AS performance_score 
FROM retail_sales 
GROUP BY store_region 
ORDER BY performance_score DESC;`,
        explanation: "Evaluating regional checkout matrices to rank stores based on high value aggregate columns."
      },
      advanced_example: {
        query: `WITH user_cohorts AS (
    SELECT 
        user_id,
        signup_date,
        ${title}(Monthly_Charge) OVER (PARTITION BY user_id) AS cohort_index
    FROM users_staging_logs
)
SELECT 
    cohort_index,
    COUNT(DISTINCT user_id) AS total_retained_users,
    SUM(cohort_index * 1.5) AS projected_revenue_lift
FROM user_cohorts
GROUP BY cohort_index;`,
        explanation: `Using a Common Table Expression to map cohort matrices, highlighting revenue changes with calculations.`
      },
      why_analysts_use: `Analysts utilize ${title} to simplify calculation pipelines, clean unstructured fields, speed up dashboards, and convert raw transaction records into strategic KPIs before sending them to executive boards.`,
      business_scenario: "The platform's growth unit needs to map user action triggers across active campaigns to find the best customer acquisition options. The analyst uses this command to segment results directly.",
      insights_extraction: "Analyzing performance ranges reveals which product categories have high demand, enabling optimization teams to restock bestsellers.",
      common_mistakes: `Forgetting syntax brackets, comparing strings with numeric indicators without casting, or using wildcards at the start of filters which slows down database searches.`,
      interview_questions: [
        {
          q: `Explain the typical usage of ${title} in standard analytical interview setups.`,
          a: `In SQL query writing tests, candidates use ${title} to partition results, manage missing data with calculations, or group records to calculate financial metrics.`
        }
      ],
      practice_tasks: `Write a SQL query implementing ${title} to extract high value records from client_directory.`,
      expected_output: {
        headers: ["cohort_index", "total_retained_users", "projected_revenue_lift"],
        rows: [
          ["High Tier", "1452", "21780.00"],
          ["Medium Tier", "820", "12300.00"],
          ["Low Tier", "305", "4575.00"]
        ]
      }
    };
  }

  // ==========================================
  // 3. APPLICATION STATE ENGINES
  // ==========================================
  let currentTopicId = localStorage.getItem("sql_current_topic_id") || "sql-intro";
  let completedTopics = JSON.parse(localStorage.getItem("sql_completed")) || [];
  let bookmarkedTopics = JSON.parse(localStorage.getItem("sql_bookmarks")) || [];
  let userTheme = localStorage.getItem("sql_theme") || "light";

  const topicAccordionNode = document.getElementById("topic-accordion");
  const searchInputNode = document.getElementById("topic-search-input");
  const activeLevelTagNode = document.getElementById("active-level-tag");
  const activeTopicTitleNode = document.getElementById("active-topic-title");
  const bookmarkTopicBtnNode = document.getElementById("bookmark-topic-btn");
  const completeTopicBtnNode = document.getElementById("complete-topic-btn");

  const secEnglishDef = document.getElementById("sec-english-def");
  const secRomanUrdu = document.getElementById("sec-roman-urdu");
  const secSyntax = document.getElementById("sec-syntax");
  const secBegDesc = document.getElementById("sec-beg-desc");
  const secBegQuery = document.getElementById("sec-beg-query");
  const secIntDesc = document.getElementById("sec-int-desc");
  const secIntQuery = document.getElementById("sec-int-query");
  const secAdvDesc = document.getElementById("sec-adv-desc");
  const secAdvQuery = document.getElementById("sec-adv-query");
  const secWhyAnalysts = document.getElementById("sec-why-analysts");
  const secBusinessScenario = document.getElementById("sec-business-scenario");
  const secInsights = document.getElementById("sec-insights");
  const secMistakes = document.getElementById("sec-mistakes");
  const secInterview = document.getElementById("sec-interview");
  const secTasks = document.getElementById("sec-tasks");
  const tblHeadersNode = document.getElementById("tbl-headers");
  const tblRowsNode = document.getElementById("tbl-rows");
  const personalTopicNotesNode = document.getElementById("personal-topic-notes");
  const notesStatusNode = document.getElementById("notes-status");

  const progStatTextNode = document.getElementById("prog-stat-text");
  const btnPrevTopic = document.getElementById("btn-prev-topic");
  const btnNextTopic = document.getElementById("btn-next-topic");
  const globalProgressFill = document.getElementById("global-progress-fill");
  const globalProgressPercent = document.getElementById("global-progress-percent");

  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const themeIcon = document.getElementById("theme-icon");
  const cheatsheetToggleBtn = document.getElementById("cheatsheet-toggle-btn");
  const cheatsheetModal = document.getElementById("cheatsheet-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");

  const bookmarksTriggerBtn = document.getElementById("bookmarks-trigger-btn");
  const bookmarksDropdown = document.getElementById("bookmarks-dropdown");
  const bookmarksListNode = document.getElementById("bookmarks-list");
  const mobileSidebarToggle = document.getElementById("mobile-sidebar-toggle");
  const sidebarNode = document.getElementById("sidebar");
  const shortcutsTriggerBtn = document.getElementById("shortcuts-trigger-btn");

  function updateThemeDisplay(themeToSet) {
    document.documentElement.setAttribute("data-theme", themeToSet);
    userTheme = themeToSet;
    localStorage.setItem("sql_theme", themeToSet);
    if (themeToSet === "dark") {
      themeIcon.setAttribute("data-lucide", "moon");
    } else {
      themeIcon.setAttribute("data-lucide", "sun");
    }
    if (window.lucide) window.lucide.createIcons();
  }
  updateThemeDisplay(userTheme);

  themeToggleBtn.addEventListener("click", () => {
    updateThemeDisplay(userTheme === "light" ? "dark" : "light");
  });

  function renderAccordionDirectories(filterText = "") {
    topicAccordionNode.innerHTML = "";
    const categories = [...new Set(TOPIC_REGISTRY.map(t => t.level))];
    
    categories.forEach(category => {
      const categoryTopics = TOPIC_REGISTRY.filter(t => t.level === category && t.title.toLowerCase().includes(filterText.toLowerCase()));
      if (categoryTopics.length === 0) return;

      const folderDiv = document.createElement("div");
      folderDiv.className = "level-folder";
      folderDiv.id = `folder-${category.replace(/\s+/g, '-').toLowerCase()}`;

      const headerDiv = document.createElement("div");
      headerDiv.className = "folder-header";
      headerDiv.innerHTML = `
        <div class="folder-header-left">
          <i data-lucide="folder" style="width: 14px; height: 14px;"></i>
          <span>${category}</span>
        </div>
        <i data-lucide="chevron-down" class="folder-chevron" style="width: 14px; height: 14px;"></i>
      `;

      const contentDiv = document.createElement("div");
      contentDiv.className = "folder-content";

      categoryTopics.forEach(topic => {
        const itemLink = document.createElement("a");
        itemLink.href = `#${topic.id}`;
        itemLink.className = `topic-item ${topic.id === currentTopicId ? 'active' : ''}`;
        const isCompleted = completedTopics.includes(topic.id);

        itemLink.innerHTML = `
          <div class="topic-item-left">
            <span class="topic-check-btn ${isCompleted ? 'completed' : ''}" data-id="${topic.id}"></span>
            <span>${topic.title}</span>
          </div>
          <i data-lucide="${isCompleted ? 'check-circle' : 'circle'}" style="width: 12px; height: 12px; color: ${isCompleted ? 'var(--primary)' : 'var(--text-muted)'};"></i>
        `;

        itemLink.addEventListener("click", (e) => {
          if (e.target.classList.contains("topic-check-btn")) {
            e.preventDefault();
            toggleCompletion(topic.id);
            return;
          }
          currentTopicId = topic.id;
          localStorage.setItem("sql_current_topic_id", currentTopicId);
          renderActiveTopic();
          if (window.innerWidth <= 1024) sidebarNode.classList.remove("active");
        });

        contentDiv.appendChild(itemLink);
      });

      folderDiv.appendChild(headerDiv);
      folderDiv.appendChild(contentDiv);
      topicAccordionNode.appendChild(folderDiv);

      headerDiv.addEventListener("click", () => {
        folderDiv.classList.toggle("collapsed");
      });
    });
    if (window.lucide) window.lucide.createIcons();
  }

  function renderActiveTopic() {
    const topic = querySelectedTopic(currentTopicId);
    activeLevelTagNode.textContent = topic.level;
    activeTopicTitleNode.textContent = topic.title;

    if (bookmarkedTopics.includes(currentTopicId)) {
      bookmarkTopicBtnNode.classList.add("active");
    } else {
      bookmarkTopicBtnNode.classList.remove("active");
    }

    if (completedTopics.includes(currentTopicId)) {
      completeTopicBtnNode.classList.add("active");
    } else {
      completeTopicBtnNode.classList.remove("active");
    }

    secEnglishDef.textContent = topic.english_definition;
    secRomanUrdu.textContent = topic.roman_urdu;
    secSyntax.textContent = topic.syntax;
    secBegDesc.textContent = topic.beginner_example.explanation;
    secBegQuery.textContent = topic.beginner_example.query;
    secIntDesc.textContent = topic.intermediate_example.explanation;
    secIntQuery.textContent = topic.intermediate_example.query;
    secAdvDesc.textContent = topic.advanced_example.explanation;
    secAdvQuery.textContent = topic.advanced_example.query;
    secWhyAnalysts.textContent = topic.why_analysts_use;
    secBusinessScenario.textContent = topic.business_scenario;
    secInsights.textContent = topic.insights_extraction;
    secMistakes.textContent = topic.common_mistakes;
    secTasks.textContent = topic.practice_tasks;

    secInterview.innerHTML = "";
    topic.interview_questions.forEach(q => {
      const qDiv = document.createElement("div");
      qDiv.className = "interview-item";
      qDiv.innerHTML = `
        <div class="interview-question">${q.q}</div>
        <div class="interview-answer">${q.a}</div>
      `;
      secInterview.appendChild(qDiv);
    });

    tblHeadersNode.innerHTML = "";
    tblRowsNode.innerHTML = "";
    const headersRow = document.createElement("tr");
    topic.expected_output.headers.forEach(h => {
      const th = document.createElement("th");
      th.textContent = h;
      headersRow.appendChild(th);
    });
    tblHeadersNode.appendChild(headersRow);

    topic.expected_output.rows.forEach(r => {
      const row = document.createElement("tr");
      r.forEach(val => {
        const td = document.createElement("td");
        td.textContent = val;
        row.appendChild(td);
      });
      tblRowsNode.appendChild(row);
    });

    const cachedNote = localStorage.getItem(`note_${currentTopicId}`) || "";
    personalTopicNotesNode.value = cachedNote;
    notesStatusNode.textContent = cachedNote ? "Notes cached automatically" : "No notes yet for this concept";

    const selfIdx = TOPIC_REGISTRY.findIndex(t => t.id === currentTopicId);
    progStatTextNode.textContent = `Concept ${selfIdx + 1} of ${TOPIC_REGISTRY.length}`;

    updateLMSProgress();
    if (window.lucide) window.lucide.createIcons();
  }

  personalTopicNotesNode.addEventListener("input", () => {
    localStorage.setItem(`note_${currentTopicId}`, personalTopicNotesNode.value);
    notesStatusNode.textContent = "Notes autosaved...";
  });

  function toggleCompletion(id) {
    const idx = completedTopics.indexOf(id);
    if (idx > -1) completedTopics.splice(idx, 1);
    else completedTopics.push(id);
    localStorage.setItem("sql_completed", JSON.stringify(completedTopics));
    renderAccordionDirectories(searchInputNode.value);
    renderActiveTopic();
  }

  completeTopicBtnNode.addEventListener("click", () => toggleCompletion(currentTopicId));

  function toggleBookmark(id) {
    const idx = bookmarkedTopics.indexOf(id);
    if (idx > -1) bookmarkedTopics.splice(idx, 1);
    else bookmarkedTopics.push(id);
    localStorage.setItem("sql_bookmarks", JSON.stringify(bookmarkedTopics));
    renderActiveTopic();
    renderBookmarksPanel();
  }

  bookmarkTopicBtnNode.addEventListener("click", () => toggleBookmark(currentTopicId));

  function renderBookmarksPanel() {
    bookmarksListNode.innerHTML = "";
    if (bookmarkedTopics.length === 0) {
      bookmarksListNode.innerHTML = `<div style="font-size: 0.8rem; color: var(--text-muted); text-align: center; padding: 12px;">No active bookmarks</div>`;
      return;
    }
    bookmarkedTopics.forEach(id => {
      const item = TOPIC_REGISTRY.find(t => t.id === id);
      if (!item) return;
      const link = document.createElement("a");
      link.href = `#${id}`;
      link.className = "bookmark-link";
      link.innerHTML = `<div><span>${item.title}</span></div>`;
      link.addEventListener("click", (e) => {
        e.preventDefault();
        currentTopicId = id;
        localStorage.setItem("sql_current_topic_id", id);
        renderActiveTopic();
        bookmarksDropdown.classList.remove("active");
      });
      bookmarksListNode.appendChild(link);
    });
  }

  bookmarksTriggerBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    bookmarksDropdown.classList.toggle("active");
  });

  function updateLMSProgress() {
    const percent = Math.round((completedTopics.length / TOPIC_REGISTRY.length) * 100);
    globalProgressFill.style.width = `${percent}%`;
    globalProgressPercent.textContent = `${percent}%`;
  }

  searchInputNode.addEventListener("input", () => renderAccordionDirectories(searchInputNode.value));

  function setupCopyToClipboards(btnId, targetId) {
    const btn = document.getElementById(btnId);
    const target = document.getElementById(targetId);
    btn.addEventListener("click", () => {
      navigator.clipboard.writeText(target.textContent).then(() => {
        const orig = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(() => { btn.textContent = orig; }, 1200);
      });
    });
  }

  setupCopyToClipboards("btn-copy-syntax", "sec-syntax");
  setupCopyToClipboards("btn-copy-beg", "sec-beg-query");
  setupCopyToClipboards("btn-copy-int", "sec-int-query");
  setupCopyToClipboards("btn-copy-adv", "sec-adv-query");

  btnNextTopic.addEventListener("click", () => {
    const idx = TOPIC_REGISTRY.findIndex(t => t.id === currentTopicId);
    if (idx < TOPIC_REGISTRY.length - 1) {
      currentTopicId = TOPIC_REGISTRY[idx + 1].id;
      localStorage.setItem("sql_current_topic_id", currentTopicId);
      renderActiveTopic();
    }
  });

  btnPrevTopic.addEventListener("click", () => {
    const idx = TOPIC_REGISTRY.findIndex(t => t.id === currentTopicId);
    if (idx > 0) {
      currentTopicId = TOPIC_REGISTRY[idx - 1].id;
      localStorage.setItem("sql_current_topic_id", currentTopicId);
      renderActiveTopic();
    }
  });

  cheatsheetToggleBtn.addEventListener("click", () => cheatsheetModal.classList.add("active"));
  modalCloseBtn.addEventListener("click", () => cheatsheetModal.classList.remove("active"));
  shortcutsTriggerBtn.addEventListener("click", () => {
    alert("shortcuts guide loaded!");
  });

  renderAccordionDirectories();
  renderActiveTopic();
  renderBookmarksPanel();
});
