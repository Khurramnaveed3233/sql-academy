/**
 * ==========================================================================
 * SQL FOR DATA ANALYSTS - INTERACTIVE LMS CONTENT DATABASE (topics_content.js)
 * Production-Ready bilingual (English & Roman Urdu) learning curriculum.
 * Hand-crafted with high-fidelity corporate SQL scenarios, exact answers,
 * regex evaluation constraints, and optimal analyst insights.
 * ==========================================================================
 */

window.sqlTopicsData = [
  // ------------------------------------------------------------------------
  // LEVEL 1: BASICS & FOUNDATIONS (L1)
  // ------------------------------------------------------------------------
  {
    id: "sql_intro",
    title: "SQL Introduction",
    level: "L1",
    label: "SQL Basics Intro",
    whyAnalystsUseThis: "Base understand krna data layers ka. Analysts use SQL to fetch millions of transaction rows directly from databases since Excel crashes at 1M rows limit.",
    definition: "An overview of relational database management systems (RBDMS) and Structured Query Language, the global industry standard for communicating with clean databases.",
    urduExplanation: "Database se batcheet krne ke liye SQL seekhna zaroori he. Ye har Data Analyst ka pehla aor sabse taqatwar tool hota he jo unhein large tables se data nikalne aor analyze krne me madad deta he.",
    syntax: "SELECT columns FROM tableName;",
    businessScenario: "Understanding retail schema layouts inside high-growth e-commerce ventures.",
    scenarios: {
      easy: {
        title: "Basic Data Overview",
        urduExplanation: "Shuruaat krne ke liye hum poora datasets dekh skte hein SELECT * query ke sath.",
        sqlQuery: "SELECT * FROM ecommerce_sales;",
        businessInsight: "Gives a raw tabular view of every single order processed, serving as the starting pipeline for financial audits.",
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
        urduExplanation: "Analyst poore tables k bajaye sirf relevant columns select krte hen taake visualization engine (PowerBI/Tableau) slow na ho.",
        sqlQuery: "SELECT category, revenue FROM ecommerce_sales;",
        businessInsight: "Reduces memory payload when pulling specific key values like transaction value over product segments.",
        expectedOutput: {
          headers: ["category", "revenue"],
          rows: [
            ["Electronics", "$540.00"],
            ["Apparel", "$120.50"]
          ]
        }
      },
      hard: {
        title: "Distinct Category Listing",
        urduExplanation: "Unique categories nikalne ke liye DISTINCT query use hoti hai.",
        sqlQuery: "SELECT DISTINCT category FROM ecommerce_sales;",
        businessInsight: "Helps identify high-level product catalogues without processing duplicated rows.",
        expectedOutput: {
          headers: ["category"],
          rows: [["Electronics"], ["Apparel"]]
        }
      }
    },
    commonMistakes: [
      {
        title: "Duplicated commands or missing semicolons",
        wrong: "SELECT * FROM orders\nSELECT * FROM customers",
        correct: "SELECT * FROM orders;\nSELECT * FROM customers;"
      }
    ],
    interviewQuestions: [
      {
        question: "Why do Analysts prefer SQL over standard MS Excel for analysis?",
        answer: "Excel is limited to exactly 1,048,576 rows. Relational relational databases handle terabytes of data effortlessly without freezing, ensuring consistent analytical pipelines.",
        tip: "Talk about row limit limits and memory cache optimizations."
      }
    ],
    practice: {
      difficulty: "Beginner",
      task: "Query all logs from the customers schema container.",
      taskUrdu: "Sare customer data select karein clean look me.",
      hint: "Syntax: SELECT * FROM customers;",
      regexPattern: /select\s+\*\s+from\s+customers/i,
      successMessage: "Boht Khoob! Aapne customers data successfully extract kia."
    }
  },
  {
    id: "select_statement",
    title: "SELECT Statement",
    level: "L1",
    label: "SELECT Statement Fundamentals",
    whyAnalystsUseThis: "To cherry-pick key performance metrics like CTR, revenue, and product names dynamically from data-warehouses.",
    definition: "The SELECT statement is used to retrieve specific columns of data from an existing table structure.",
    urduExplanation: "SELECT statement k zariye hum pooray relational database table me se sirf apnay kaam k headers aur dimensions ko filter out kr sakte hen.",
    syntax: "SELECT col1, col2 AS aliasName FROM tableName;",
    businessScenario: "Selecting user cohorts to run targeted marketing drop campaigns.",
    scenarios: {
      easy: {
        title: "Extracting Customer Contact Details",
        urduExplanation: "Marketing department ke liye customers ke naam aur emails nikalne ki asan query.",
        sqlQuery: "SELECT first_name, email FROM customers;",
        businessInsight: "Extracts contact pools directly for bulk newsletter automation systems.",
        expectedOutput: {
          headers: ["first_name", "email"],
          rows: [
            ["Ali", "ali@datamail.com"],
            ["Sana", "sana@datamail.com"]
          ]
        }
      },
      medium: {
        title: "Applying Custom Names (Aliases)",
        urduExplanation: "Headers ko readable banane ke liye AS keyword use kr ke temporary alias lagaya jata hai.",
        sqlQuery: "SELECT first_name AS user_name, total_spent AS revenue FROM customers;",
        businessInsight: "Cleans up physical table layout headers directly for BI dashboard rendering requirements.",
        expectedOutput: {
          headers: ["user_name", "revenue"],
          rows: [
            ["Ali", "$850.00"],
            ["Sana", "$1200.00"]
          ]
        }
      },
      hard: {
        title: "Retrieving Unique Multi-locations",
        urduExplanation: "Multiple entries ke darmiyan se unique locations nikalne ke liye dynamic distinct filtering apply hoti hai.",
        sqlQuery: "SELECT DISTINCT country, city FROM customer_addresses;",
        businessInsight: "Lists geographic distributions perfectly to locate regional expansion opportunities.",
        expectedOutput: {
          headers: ["country", "city"],
          rows: [
            ["Pakistan", "Lahore"],
            ["Pakistan", "Karachi"]
          ]
        }
      }
    },
    commonMistakes: [
      {
        title: "Missing comma separation between target variables",
        wrong: "SELECT first_name email FROM customers;",
        correct: "SELECT first_name, email FROM customers;"
      }
    ],
    interviewQuestions: [
      {
        question: "Does the AS keyword permanently rename the columns in the database?",
        answer: "No. The AS keyword only renames the output header temporarily for that particular run statement. The physical schema columns remain unaffected.",
        tip: "Emphasize temporary runtime mapping vs permanent DDL schema alters."
      }
    ],
    practice: {
      difficulty: "Beginner",
      task: "Query the email address column and rename it to 'customer_email' from the table named accounts.",
      taskUrdu: "Email column select karein aur use rename karein 'customer_email' name se, table name accounts hai.",
      hint: "Syntax: SELECT email AS customer_email FROM accounts;",
      regexPattern: /select\s+email\s+as\s+customer_email\s+from\s+accounts/i,
      successMessage: "Behtareen! Aapne column rename optimization alias seekh li hai."
    }
  },
  {
    id: "where_clause",
    title: "WHERE Clause",
    level: "L1",
    label: "Advanced Filtering with WHERE",
    whyAnalystsUseThis: "To trim out noisy rows and evaluate high-paying users, churn rates, or specific timestamps.",
    definition: "The WHERE clause is applied to restrict or filter rows returned in the output based on custom conditional evaluations.",
    urduExplanation: "WHERE clause se hum criteria set krte hen k database table se sirf wo rows return hon jo de gai shart ko poora krte hon.",
    syntax: "SELECT * FROM tableName WHERE condition1 AND/OR condition2;",
    businessScenario: "Filtering out transactions above $500 that were rejected due to payment failures.",
    scenarios: {
      easy: {
        title: "Filtering Premium Categories",
        urduExplanation: "Electronics product categories ke sub-tables banane ka filter.",
        sqlQuery: "SELECT product_name, price FROM products WHERE category = 'Electronics';",
        businessInsight: "Enables segment-focused competitive optimization studies.",
        expectedOutput: {
          headers: ["product_name", "price"],
          rows: [
            ["SmartPhone Pro", "$799.00"],
            ["BT HeadSet", "$120.00"]
          ]
        }
      },
      medium: {
        title: "Combining Multioperators (AND/BETWEEN)",
        urduExplanation: "Products filter krein jinkii keemat $100 aur $500 ke beech mein ho aur in-stock hon.",
        sqlQuery: "SELECT product_name, price FROM products WHERE price BETWEEN 100 AND 500 AND stock_status = 'In-Stock';",
        businessInsight: "Pinpoints optimal middle-tier commodities currently ready for dispatch campaigns.",
        expectedOutput: {
          headers: ["product_name", "price"],
          rows: [
            ["Studio Mic", "$340.00"],
            ["Ergonomic Mouse", "$150.00"]
          ]
        }
      },
      hard: {
        title: "String pattern matching with LIKE operator",
        urduExplanation: "Un customers ko search krein jinka email address host default 'gmail.com' domain par ho.",
        sqlQuery: "SELECT user_id, email FROM users WHERE email LIKE '%@gmail.com';",
        businessInsight: "Identifies personal profile segments versus official business profiles.",
        expectedOutput: {
          headers: ["user_id", "email"],
          rows: [
            ["9021", "kasim_analyst@gmail.com"],
            ["4542", "zainab_work@gmail.com"]
          ]
        }
      }
    },
    commonMistakes: [
      {
        title: "Using wrong quotes or case comparisons in string filters",
        wrong: "SELECT * FROM users WHERE status = Active; -- Missing quotes\nSELECT * FROM users WHERE status = 'active'; -- Case matching issues if db is case-sensitive",
        correct: "SELECT * FROM users WHERE status = 'Active';"
      }
    ],
    interviewQuestions: [
      {
        question: "What is the difference between LIKE '%abc' and LIKE 'abc%'?",
        answer: "LIKE '%abc' matches any string that ends with 'abc' (e.g., '123abc'). LIKE 'abc%' matches strings starting with 'abc' (e.g., 'abcdef'). This is crucial for wildcard operations.",
        tip: "Discuss index scanning effects of leading percent wildcard characters."
      }
    ],
    practice: {
      difficulty: "Beginner",
      task: "Query all active accounts from the users table where user level status is 'Gold'.",
      taskUrdu: "Sare columns query karein users table se jahan status 'Gold' ho.",
      hint: "Syntax: SELECT * FROM users WHERE status = 'Gold';",
      regexPattern: /select\s+\*\s+from\s+users\s+where\s+status\s*=\s*['"]gold['"]/i,
      successMessage: "Zabardast! Aapne WHERE logical filtering complete karli."
    }
  },

  // ------------------------------------------------------------------------
  // LEVEL 2: JOINS & AGGREGATIONS PLUS (L2)
  // ------------------------------------------------------------------------
  {
    id: "aggregations",
    title: "Aggregations",
    level: "L2",
    label: "Group By & Aggregate Computations",
    whyAnalystsUseThis: "Used to calculate KPIs like total product gross merchandise value (GMV), daily active users, or average shopping baskets.",
    definition: "Aggregations perform mathematical summaries over multiple data-points and group elements systematically using the GROUP BY rule.",
    urduExplanation: "Aggregations k zariye hum aggregate functions (SUM, AVG, COUNT, MIN, MAX) use kr k data ko specific groupings k mutabiq summarize krte hein.",
    syntax: "SELECT col1, SUM(col2) FROM table GROUP BY col1 HAVING SUM(col2) > val;",
    businessScenario: "Aggregating sales totals by global business units and screening low performers.",
    scenarios: {
      easy: {
        title: "Counting users geographically",
        urduExplanation: "Har mulk me maujood users ki total tadad count krne ka query model.",
        sqlQuery: "SELECT country, COUNT(user_id) AS total_users FROM regular_users GROUP BY country;",
        businessInsight: "Determines geographical coverage and focus areas.",
        expectedOutput: {
          headers: ["country", "total_users"],
          rows: [
            ["Pakistan", "18400"],
            ["United Kingdom", "5120"]
          ]
        }
      },
      medium: {
        title: "Computing Financial Average order limits",
        urduExplanation: "Different stores ke mutabiq items ki average price aur sales measure karna.",
        sqlQuery: "SELECT store_id, AVG(order_value) AS avg_price, SUM(order_value) AS total_revenue FROM custom_orders GROUP BY store_id;",
        businessInsight: "Shows average conversion tickets along with total absolute revenue flows across stores.",
        expectedOutput: {
          headers: ["store_id", "avg_price", "total_revenue"],
          rows: [
            ["Gulberg_01", "$150.25", "$1,450,230.00"],
            ["Clifton_04", "$280.90", "$2,104,500.00"]
          ]
        }
      },
      hard: {
        title: "Filtering Groups with HAVING checks",
        urduExplanation: "Sirf un brands ko select krein jinki total monthly transactions 500 se zyada hon. Remember, WHERE filters before grouping, HAVING filters after.",
        sqlQuery: "SELECT brand_name, COUNT(transaction_id) AS total_sales FROM sales_record GROUP BY brand_name HAVING COUNT(transaction_id) > 500;",
        businessInsight: "Helps pinpoint high-velocity operations and dismiss outlier low-volume trends.",
        expectedOutput: {
          headers: ["brand_name", "total_sales"],
          rows: [
            ["Asim Jofa", "1240"],
            ["AlKaram Studio", "982"]
          ]
        }
      }
    },
    commonMistakes: [
      {
        title: "Applying WHERE over aggregated columns",
        wrong: "SELECT category, SUM(sales) FROM items GROUP BY category WHERE SUM(sales) > 1000; -- Invalid SQL execution",
        correct: "SELECT category, SUM(sales) FROM items GROUP BY category HAVING SUM(sales) > 1000;"
      }
    ],
    interviewQuestions: [
      {
        question: "What is the core structural difference between WHERE and HAVING?",
        answer: "WHERE filters rows before any aggregate functions are calculated. HAVING filters grouped rows after aggregation calculations have been completed.",
        tip: "Always link WHERE to raw data filtration and HAVING to metric evaluations after GROUP BY."
      }
    ],
    practice: {
      difficulty: "Intermediate",
      task: "Query the total inventory sum of items grouped by category from goods table having total items above 50.",
      taskUrdu: "Goods table se SUM(items) aor category select karein, group by category use karein aor total items 50 se zyada hon.",
      hint: "Syntax: SELECT category, SUM(items) FROM goods GROUP BY category HAVING SUM(items) > 50;",
      regexPattern: /select\s+category\s*,\s*sum\s*\(\s*items\s*\)\s+from\s+goods\s+group\s+by\s+category\s+having\s+sum\s*\(\s*items\s*\)\s*>\s*50/i,
      successMessage: "Behtareen! Group by aor Having filters ka command structure perfect hai."
    }
  },
  {
    id: "joins_intro",
    title: "SQL Joins",
    level: "L2",
    label: "SQL JOINs Foundations",
    whyAnalystsUseThis: "Relational databases use normalized schemas. Joins are required to merge order metrics with user details from separate tables.",
    definition: "Joins are used to combine matching rows from two or more transactional tables based on a related common key variable.",
    urduExplanation: "Ek typical normalized database me customer details aor transactions alag tables me hoti hein. In dono ko aapas me interconnect krne ke liye hum JOINs use krte hein.",
    syntax: "SELECT a.col, b.col FROM tableA a LEFT JOIN tableB b ON a.key = b.key;",
    businessScenario: "Mapping order histories to active user profile categories.",
    scenarios: {
      easy: {
        title: "Simple INNER JOIN matching values",
        urduExplanation: "Sirf un orders ka data nikalna jin ke relevant active customer profiles exist krti hon.",
        sqlQuery: "SELECT o.order_id, c.customer_name FROM orders o INNER JOIN customers c ON o.customer_id = c.customer_id;",
        businessInsight: "Retrieves only verified transacting users, eliminating data discrepancies from the summary datasets.",
        expectedOutput: {
          headers: ["order_id", "customer_name"],
          rows: [
            ["3001", "Kamran Akmal"],
            ["3002", "Babar Azam"]
          ]
        }
      },
      medium: {
        title: "LEFT JOIN for Churn insights",
        urduExplanation: "Saaray clients listing plus purchases status (chahe unhone kuch khareeda ho ya nahi) check krna taake empty carts evaluate kiye jaskein.",
        sqlQuery: "SELECT c.customer_name, o.order_value FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id;",
        businessInsight: "Enables analysts to track inactive users (where order_value IS NULL) to trigger personalized SMS vouchers.",
        expectedOutput: {
          headers: ["customer_name", "order_value"],
          rows: [
            ["Kamran Akmal", "$450.00"],
            ["Shadab Khan", "NULL"]
          ]
        }
      },
      hard: {
        title: "Multi-Table Relational Joining",
        urduExplanation: "Three tables mapping: Customers, orders, aur logistics partners tracking database rows aggregation.",
        sqlQuery: "SELECT c.customer_name, o.order_id, s.provider_name FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id INNER JOIN shippers s ON o.shipper_id = s.shipper_id;",
        businessInsight: "Maps the complete distribution pipeline from customer details to logistics providers.",
        expectedOutput: {
          headers: ["customer_name", "order_id", "provider_name"],
          rows: [
            ["Kamran Akmal", "3001", "TCS Express"],
            ["Babar Azam", "3002", "Leopards Courier"]
          ]
        }
      }
    },
    commonMistakes: [
      {
        title: "Ambiguous Column Name Error (no table prefixes)",
        wrong: "SELECT customer_id, order_value FROM customers LEFT JOIN orders ON customer_id = customer_id;",
        correct: "SELECT c.customer_id, o.order_value FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id;"
      }
    ],
    interviewQuestions: [
      {
        question: "What is the key difference between an INNER JOIN and a LEFT JOIN?",
        answer: "INNER JOIN returns only rows with matching values in both tables. LEFT JOIN returns all rows from the left table, and matched rows from the right table. If no match is found, NULL is filled.",
        tip: "Quickly mention unmatched row handling and NULL values logic."
      }
    ],
    practice: {
      difficulty: "Intermediate",
      task: "Perform a INNER JOIN on users 'u' and orders 'o' tables on user_id and return u.username and o.amount.",
      taskUrdu: "Users table name 'u' aor orders 'o' ka inner join likhein, matching variable user_id ho.",
      hint: "Syntax: SELECT u.username, o.amount FROM users u INNER JOIN orders o ON u.user_id = o.user_id;",
      regexPattern: /select\s+u\.username\s*,\s*o\.amount\s+from\s+users\s+u\s+inner\s+join\s+orders\s+o\s+on\s+u\.user_id\s*=\s*o\.user_id/i,
      successMessage: "Aala! Aapne multi-table normalization connectivity framework execute kr liya."
    }
  },
  {
    id: "subqueries",
    title: "Subqueries",
    level: "L2",
    label: "Nested Subqueries & EXIST Checks",
    whyAnalystsUseThis: "Subqueries allow analysts to perform dynamic multi-stage filtering without storing intermediate tables.",
    definition: "A subquery or nested query is a query within another SQL query, frequently embedded inside a WHERE clause.",
    urduExplanation: "Subquery ek aesa statement hota he jo kisi dosray parent query ke andr nested ho. Iska output automatic nested filter ke taur pr parent parameters me utilize hota he.",
    syntax: "SELECT * FROM orders WHERE amount > (SELECT AVG(amount) FROM orders);",
    businessScenario: "Selecting transactional entries where expenditures are greater than average standard margins.",
    scenarios: {
      easy: {
        title: "Retrieving above-average performance indexes",
        urduExplanation: "Un sales deals ko query krna jin ki output total segment average value se zyada ho.",
        sqlQuery: "SELECT order_id, amount FROM transactions WHERE amount > (SELECT AVG(amount) FROM transactions);",
        businessInsight: "Isolates high-spending customer cohorts directly for targeted rewards.",
        expectedOutput: {
          headers: ["order_id", "amount"],
          rows: [
            ["403", "$980.00"],
            ["405", "$1,210.00"]
          ]
        }
      },
      medium: {
        title: "Scalar user checking with IN operator",
        urduExplanation: "Sirf un brands ka product stock check krna jo custom location 'Europe' me operating conditions me hon.",
        sqlQuery: "SELECT product_name FROM items WHERE brand_id IN (SELECT DISTINCT brand_id FROM active_brands WHERE headquarters = 'Europe');",
        businessInsight: "Enables fast cross-entity geographical supply chain audits.",
        expectedOutput: {
          headers: ["product_name"],
          rows: [
            ["Premium Alpine Coffee"],
            ["Euro Bag Standard"]
          ]
        }
      },
      hard: {
        title: "Correlated Subqueries checking via EXISTS keys",
        urduExplanation: "EXISTS conditional operator check karna un customer accounts ke liye jinka transaction history records database validation status complete ho.",
        sqlQuery: "SELECT client_id, name FROM corporate_clients c WHERE EXISTS (SELECT 1 FROM operations_leads o WHERE o.client_id = c.client_id AND o.priority = 'Critical');",
        businessInsight: "Secures instant visual validation lists mapping high-importance corporate clients.",
        expectedOutput: {
          headers: ["client_id", "name"],
          rows: [
            ["8001", "Faysal Bank Ltd"],
            ["8004", "Engro Polymer"]
          ]
        }
      }
    },
    commonMistakes: [
      {
        title: "Subquery returning multiple rows with unique row operators",
        wrong: "SELECT * FROM sales WHERE id = (SELECT brand_id FROM brands WHERE region = 'Asia'); -- Fails if subquery returns multiple rows",
        correct: "SELECT * FROM sales WHERE id IN (SELECT brand_id FROM brands WHERE region = 'Asia');"
      }
    ],
    interviewQuestions: [
      {
        question: "When should we prefer IN over EXISTS operator in subqueries?",
        answer: "IN works best for smaller data volumes or static values. EXISTS evaluates correlated subqueries efficiently because it returns immediately upon locating the first match, saving database execution memory.",
        tip: "Explain lazy matching optimization properties of EXISTS keys."
      }
    ],
    practice: {
      difficulty: "Intermediate",
      task: "Query all products from the store table where weight is lower than the aggregate average weight.",
      taskUrdu: "Sare columns select karein table store se jahan weight < average weight ho via subquery.",
      hint: "Syntax: SELECT * FROM store WHERE weight < (SELECT AVG(weight) FROM store);",
      regexPattern: /select\s+\*\s+from\s+store\s+where\s+weight\s*<\s*\(\s*select\s+avg\s*\(\s*weight\s*\)\s+from\s+store\s*\)/i,
      successMessage: "Shukriya! Subqueries ke complex hierarchy control checks clear hein."
    }
  },

  // ------------------------------------------------------------------------
  // LEVEL 3: ADVANCED ANALYTICS SQL (L3)
  // ------------------------------------------------------------------------
  {
    id: "ctes",
    title: "CTEs",
    level: "L3",
    label: "Common Table Expressions CTE",
    whyAnalystsUseThis: "CTEs replace nested subqueries with a clean, readable layout, allowing analysts to write self-contained temporary views.",
    definition: "A Common Table Expression (CTE) is a temporary named result set defined within the script execution scope using the WITH statement.",
    urduExplanation: "CTEs (WITH statements) ke zariye hum temporary readable tables bana skte hein jo query run hone tak memory me rehte hein. Is se complex dynamic joins boht asan lagte hein.",
    syntax: "WITH custom_cte_name AS (SELECT * FROM rawTable) SELECT * FROM custom_cte_name;",
    businessScenario: "Breaking down customer acquisition funnel stages sequentially in web logging analytics portals.",
    scenarios: {
      easy: {
        title: "Clean High-Spender Isolation CTE",
        urduExplanation: "Pehle top clients filter kr ke temporary view bnayen aor phr clean final extraction pull krein.",
        sqlQuery: "WITH high_sales AS (SELECT * FROM invoices WHERE invoice_total > 1000) SELECT customer_id, invoice_total FROM high_sales;",
        businessInsight: "Keeps tracking data isolated cleanly from main schemas, ensuring clean query formats.",
        expectedOutput: {
          headers: ["customer_id", "invoice_total"],
          rows: [
            ["9982", "$1,450.00"],
            ["1120", "$3,300.00"]
          ]
        }
      },
      medium: {
        title: "Multi-Staged Analytical Calculations",
        urduExplanation: "Double CTE structures: Pehle store wise sum calculate krein, aur phr doosre CTE me un me se national average scale evaluate krein.",
        sqlQuery: "WITH sales_summary AS (SELECT branch_id, SUM(amount) AS total_sales FROM sales GROUP BY branch_id), averages AS (SELECT AVG(total_sales) AS national_avg FROM sales_summary) SELECT branch_id, total_sales FROM sales_summary, averages WHERE total_sales > national_avg;",
        businessInsight: "Allows deep layered benchmarking metrics across national divisions in logical execution groups.",
        expectedOutput: {
          headers: ["branch_id", "total_sales"],
          rows: [
            ["KHI_HQ", "$12,450,000.00"],
            ["LHE_S01", "$9,850,000.00"]
          ]
        }
      },
      hard: {
        title: "Joining multiple CTE abstractions",
        urduExplanation: "Two separate CTEs joining: user registration timestamps linked directly with billing accounts details.",
        sqlQuery: "WITH cohorts AS (SELECT user_id FROM signups WHERE signup_year = 2026), payments AS (SELECT user_id, SUM(to_pay) AS gmv FROM bills GROUP BY user_id) SELECT c.user_id, p.gmv FROM cohorts c LEFT JOIN payments p ON c.user_id = p.user_id;",
        businessInsight: "Tracks specific cohort performance metrics like customer lifetime value (LTV).",
        expectedOutput: {
          headers: ["user_id", "gmv"],
          rows: [
            ["U_0029", "$120.00"],
            ["U_0055", "$45.50"]
          ]
        }
      }
    },
    commonMistakes: [
      {
        title: "Missing WITH keyword prefix for sequential blocks",
        wrong: "WITH cte1 AS (SELECT * FROM orders), cte2 AS (SELECT * FROM users) ... -- Actually correct\n-- Wrong way:\nWITH cte1 AS (SELECT * FROM orders), WITH cte2 AS (SELECT * FROM users) -- Duplicating 'WITH' keyword",
        correct: "WITH cte1 AS (SELECT * FROM orders), cte2 AS (SELECT * FROM users) SELECT * FROM cte1 INNER JOIN cte2 ON cte1.id = cte2.id;"
      }
    ],
    interviewQuestions: [
      {
        question: "Does a CTE run faster than a Temporary Table?",
        answer: "CTEs are mainly readability sugar tags. They are compiled inline, so their speed matches nested subqueries. They do not store physical data in storage disk indexes unlike real temp tables ($temp or CREATE TEMP TABLE).",
        tip: "Differentiate CTEs based on structure layout readability value versus storage index files."
      }
    ],
    practice: {
      difficulty: "Advanced",
      task: "Write a CTE named 'sales_cte' selecting all entries from invoices, and query customer_id and total from it.",
      taskUrdu: "With statement use kr ke CTE named 'sales_cte' banayen, inside values select orders logic from invoices, select query main columns customer_id aor total.",
      hint: "Syntax: WITH sales_cte AS (SELECT customer_id, total FROM invoices) SELECT customer_id, total FROM sales_cte;",
      regexPattern: /with\s+sales_cte\s+as\s*\(\s*select\s+customer_id\s*,\s*total\s+from\s+invoices\s*\)\s+select\s+customer_id\s*,\s*total\s+from\s+sales_cte/i,
      successMessage: "Great Job! CTE syntax standard blocks completely functional."
    }
  },
  {
    id: "window_functions",
    title: "Window Functions",
    level: "L3",
    label: "Dynamic Analytical Window OVER Functions",
    whyAnalystsUseThis: "Essential for metrics requiring context like daily running totals, month-over-month growth, and customer tier rankings.",
    definition: "Window functions perform tabular value calculations across a set of table rows that are related to the current row.",
    urduExplanation: "Window functions (ROW_NUMBER, RANK, LEAD, LAG) dynamic parameters generate krte hen rows k darmiyan baghair standard tabular rows ko collapse (aggregate) kiye.",
    syntax: "SELECT col1, ROW_NUMBER() OVER(PARTITION BY col2 ORDER BY col3 DESC) FROM table;",
    businessScenario: "Ranking top spending users per shopping category segment dynamically.",
    scenarios: {
      easy: {
        title: "Generating Sequential Row Numbers",
        urduExplanation: "Sales values ko price wise sequential rows structure assignments pass krna.",
        sqlQuery: "SELECT item_name, price, ROW_NUMBER() OVER(ORDER BY price DESC) AS item_rank FROM store_goods;",
        businessInsight: "Enables stable alphabetical or value-based custom sorting grids.",
        expectedOutput: {
          headers: ["item_name", "price", "item_rank"],
          rows: [
            ["Leather Coat Premium", "$450.00", "1"],
            ["Designer Shirt", "$120.00", "2"]
          ]
        }
      },
      medium: {
        title: "Ranking users with partitions",
        urduExplanation: "Category groups ke mutabiq items ko ascending or descending orders me value based rank asign karna.",
        sqlQuery: "SELECT category, brand, salary, DENSE_RANK() OVER(PARTITION BY category ORDER BY salary DESC) AS category_salary_rank FROM employee_db;",
        businessInsight: "Identifies top-earning employees in each department, highlighting budget distributions.",
        expectedOutput: {
          headers: ["category", "brand", "salary", "category_salary_rank"],
          rows: [
            ["Engineering", "Aamir", "145000", "1"],
            ["Engineering", "Sajjad", "120000", "2"]
          ]
        }
      },
      hard: {
        title: "MoM Growth calculation with LAG/LEAD offsets",
        urduExplanation: "Monthly total financial inputs are processed with previous row elements of index via LAG function constraints mapping.",
        sqlQuery: "WITH monthly_revenue AS (SELECT order_month, SUM(revenue) AS current_rev FROM sales GROUP BY order_month) SELECT order_month, current_rev, LAG(current_rev, 1) OVER (ORDER BY order_month) AS previous_month_rev FROM monthly_revenue;",
        businessInsight: "Tracks month-over-month (MoM) user growth rates directly in standard relational views.",
        expectedOutput: {
          headers: ["order_month", "current_rev", "previous_month_rev"],
          rows: [
            ["2026-01", "$540,250.00", "NULL"],
            ["2026-02", "$598,300.00", "$540,250.00"]
          ]
        }
      }
    },
    commonMistakes: [
      {
        title: "Using Window Functions inside the WHERE constraint directly",
        wrong: "SELECT name FROM employee WHERE ROW_NUMBER() OVER(ORDER BY salary) = 1; -- Syntax Error",
        correct: "WITH ranked AS (SELECT name, ROW_NUMBER() OVER(ORDER BY salary) AS rn FROM employee) SELECT name FROM ranked WHERE rn = 1;"
      }
    ],
    interviewQuestions: [
      {
        question: "What is the key difference between RANK() and DENSE_RANK()?",
        answer: "RANK() skips rank numbers after a tie (e.g., 1, 2, 2, 4). DENSE_RANK() leaves no gaps, assigning the next sequential rank (e.g., 1, 2, 2, 3). This is essential for accurate analytics reports.",
        tip: "Explain tie behaviors using numeric sequence examples."
      }
    ],
    practice: {
      difficulty: "Advanced",
      task: "Query the row number sorted by high salary using OVER() partitioned by department from staff table returning name and rn.",
      taskUrdu: "ROW_NUMBER() OVER(PARTITION BY department ORDER BY salary DESC) select departments logic inside staff database structure.",
      hint: "Syntax: SELECT name, ROW_NUMBER() OVER(PARTITION BY department ORDER BY salary DESC) AS rn FROM staff;",
      regexPattern: /select\s+name\s*,\s*row_number\s*\(\s*\)\s+over\s*\(\s*partition\s+by\s+department\s+order\s+by\s+salary\s+desc\s*\)\s+as\s+rn\s+from\s+staff/i,
      successMessage: "Aala Tareen! Window analytical queries standard mappings understand karli hain."
    }
  },
  {
    id: "case_when",
    title: "CASE WHEN",
    level: "L3",
    label: "CASE WHEN Conditional Logic",
    whyAnalystsUseThis: "Used to clean up messy user profiles, categorize prices, or bucket users into segments.",
    definition: "The CASE WHEN statement is SQL's conditional logic mechanism, mimicking IF-THEN rules directly in execution views.",
    urduExplanation: "CASE WHEN statement database logic flows trigger krta he. is se hum tabular outputs generate krte hen specific boundaries ke mutabiq.",
    syntax: "CASE WHEN condition1 THEN val1 WHEN condition2 THEN val2 ELSE val0 END",
    businessScenario: "Categorizing order values into segmented price ranges.",
    scenarios: {
      easy: {
        title: "Bucketing prices into simple tiers",
        urduExplanation: "Item prices ko easy labels base logic 'Expensive', 'Middle' aur 'Affordable' groups me categorise krna.",
        sqlQuery: "SELECT item_name, price, CASE WHEN price > 200 THEN 'Expensive' WHEN price BETWEEN 50 AND 200 THEN 'Middle' ELSE 'Affordable' END AS price_tier FROM products;",
        businessInsight: "Enables analysts to run localized price elasticity simulations.",
        expectedOutput: {
          headers: ["item_name", "price", "price_tier"],
          rows: [
            ["Mechanical Chair", "$290.00", "Expensive"],
            ["Cotton Sheet", "$12.00", "Affordable"]
          ]
        }
      },
      medium: {
        title: "Categorizing checkout statuses",
        urduExplanation: "Boolean registers values ko dynamic readable text strings mappings dynamically evaluate krana.",
        sqlQuery: "SELECT order_id, CASE WHEN is_shipped = 1 AND is_delivered = 1 THEN 'Closed' WHEN is_shipped = 1 AND is_delivered = 0 THEN 'In-Transit' ELSE 'Pending Warehouse' END AS shipping_summary FROM ship_logs;",
        businessInsight: "Feeds customer support portals with automated shipment status updates.",
        expectedOutput: {
          headers: ["order_id", "shipping_summary"],
          rows: [
            ["00451", "Closed"],
            ["00452", "In-Transit"]
          ]
        }
      },
      hard: {
        title: "Complex aggregations inside pivoted tables",
        urduExplanation: "CASE WHEN inside SUM aggregation matching rows to transform row data into clean horizontal column views directly.",
        sqlQuery: "SELECT year, SUM(CASE WHEN quarter = 'Q1' THEN sales ELSE 0 END) AS Q1_Sales, SUM(CASE WHEN quarter = 'Q2' THEN sales ELSE 0 END) AS Q2_Sales FROM annual_records GROUP BY year;",
        businessInsight: "Secures quarterly performance ratios instantly in a single readable row matrix.",
        expectedOutput: {
          headers: ["year", "Q1_Sales", "Q2_Sales"],
          rows: [
            ["2025", "$4,510,200.00", "$6,120,400.00"],
            ["2026", "$5,100,500.00", "$3,400,000.00"]
          ]
        }
      }
    },
    commonMistakes: [
      {
        title: "Forgetting END statement at closing margins",
        wrong: "SELECT name, CASE WHEN status = 1 THEN 'Active' ELSE 'Inactive' AS parsed_status FROM users; -- Syntax error: No END",
        correct: "SELECT name, CASE WHEN status = 1 THEN 'Active' ELSE 'Inactive' END AS parsed_status FROM users;"
      }
    ],
    interviewQuestions: [
      {
        question: "Can we use aggregate functions like SUM/AVG inside CASE WHEN statements?",
        answer: "Yes, you can nested check conditions like 'CASE WHEN SUM(sales) > 100 THEN0' inside final groupings or construct pivot matrices using aggregate wrappers outside raw case structures.",
        tip: "Explain structural grouping behavior of CASE logic nested aggregates vs raw value categorizers."
      }
    ],
    practice: {
      difficulty: "Intermediate",
      task: "Query client_name and a parsed tier using CASE WHEN where total_spent > 1000 is 'Elite' else 'Standard' from corporate accounts table.",
      taskUrdu: "Select corporate accounts and tier: CASE WHEN total_spent > 1000 THEN 'Elite' ELSE 'Standard' END AS tier.",
      hint: "Syntax: SELECT client_name, CASE WHEN total_spent > 1000 THEN 'Elite' ELSE 'Standard' END AS tier FROM corporate;",
      regexPattern: /select\s+client_name\s*,\s*case\s+when\s+total_spent\s*>\s*1000\s+then\s*['"]elite['"]\s+else\s*['"]standard['"]\s+end\s+as\s+tier\s+from\s+corporate/i,
      successMessage: "Great! Conditional branch mapping in SQL works perfectly."
    }
  },

  // ------------------------------------------------------------------------
  // LEVEL 4: ARCHITECTURE & WAREHOUSING (L4)
  // ------------------------------------------------------------------------
  {
    id: "data_types",
    title: "SQL Data Types",
    level: "L4",
    label: "Data Types & Schema Modifiers",
    whyAnalystsUseThis: "Choosing the correct data types prevents truncation errors, reduces query costs, and accelerates analytical execution.",
    definition: "Data types define what kind of value a column can hold (e.g. text characters, numeric decimals, datetime entries or JSON keys).",
    urduExplanation: "Data types ye decide krte hein k kisi database column me kis tarah ki information safe ho sakti he. Ghalat data type se database ka processing time aor costs dono barh jati hein.",
    syntax: "CREATE TABLE metrics (id INT, price DECIMAL(10,2), logged_at TIMESTAMP);",
    businessScenario: "Configuring a optimized logs table structure in raw transactional systems.",
    scenarios: {
      easy: {
        title: "Understanding standard alphanumeric storage sizes",
        urduExplanation: "Characters storage models definitions: VARCHAR is dynamic and saves unnecessary space, while CHAR is fixed size.",
        sqlQuery: "SELECT CAST(order_id AS VARCHAR(20)) AS parsed_text, price FROM sales_log;",
        businessInsight: "Enables secure data type compatibility when piping transaction streams to web dashboards.",
        expectedOutput: {
          headers: ["parsed_text", "price"],
          rows: [
            ["ID_0410", "$90.50"],
            ["ID_0411", "$120.00"]
          ]
        }
      },
      medium: {
        title: "Exact financial data formats with DECIMAL keys",
        urduExplanation: "FLOAT approximate decimals values store krta he is lye financial auditing accurate records details database rules decimals (10, 2) patterns specify krke run krte hen.",
        sqlQuery: "SELECT order_id, CAST(market_valuation AS DECIMAL(12,2)) AS precise_revenue FROM stock_ledgers;",
        businessInsight: "Secures penny-accurate calculations across high-frequency finance reports.",
        expectedOutput: {
          headers: ["order_id", "precise_revenue"],
          rows: [
            ["S_908", "456120300.52"],
            ["S_909", "12502100.00"]
          ]
        }
      },
      hard: {
        title: "JSON parsing structures natively under SQL queries",
        urduExplanation: "Modern warehouses handle loosely structured metadata natively using JSON query interfaces.",
        sqlQuery: "SELECT user_id, JSON_EXTRACT_SCALAR(device_payload, '$.device_model') AS smartphone_type FROM interactive_mobile_sessions;",
        businessInsight: "Extracts deep granular client diagnostic metrics dynamically without parsing raw text logs offline.",
        expectedOutput: {
          headers: ["user_id", "smartphone_type"],
          rows: [
            ["9982", "iPhone 15 Pro Max"],
            ["1120", "Galaxy S24 Ultra"]
          ]
        }
      }
    },
    commonMistakes: [
      {
        title: "Treating numeric timestamps directly as standard integers",
        wrong: "SELECT * FROM registrations WHERE signup_time > 2026-01-01; -- Fails, interpreted as a mathematical calculation (2026 minus 1 minus 1)",
        correct: "SELECT * FROM registrations WHERE signup_time > '2026-01-01 00:00:00';"
      }
    ],
    interviewQuestions: [
      {
        question: "Why should we use DECIMAL instead of standard FLOAT for cash flow balances?",
        answer: "FLOAT is a variable-precision data type that can introduce small rounding errors due to binary representation limits. DECIMAL is fixed-precision, ensuring absolute calculations for banking schemas.",
        tip: "Emphasize strict compliance requirements of accounting audit sheets."
      }
    ],
    practice: {
      difficulty: "Advanced",
      task: "Query CAST of salary to SIGNED integer from staff database return name and parsed_salary.",
      taskUrdu: "CAST(salary AS INT) or name select criteria parameters logic apply write query.",
      hint: "Syntax: SELECT name, CAST(salary AS INT) AS parsed_salary FROM staff;",
      regexPattern: /select\s+name\s*,\s*cast\s*\(\s*salary\s+as\s+int\s*\)\s+as\s+parsed_salary\s+from\s+staff/i,
      successMessage: "Boht Ala! Data Type formats and conversions successfully verified."
    }
  },
  {
    id: "bigquery_concepts",
    title: "SQL Performance Tuning (Partitioning)",
    level: "L4",
    label: "Modern BigQuery & Storage Modifiers",
    whyAnalystsUseThis: "Partitioning and clustering can reduce query scans by over 95%, saving thousands of dollars on cloud costs.",
    definition: "Partitioning splits a table into smaller segments based on a key column like a date timestamp.",
    urduExplanation: "BigQuery aor Snowflake jaise modern data-warehouses scan-volume par pay-per-query bills charge krte hein. Partitioning ke zariye pooray table ko scan krne ke bajaye hum sirf target segments check krte hein.",
    syntax: "CREATE TABLE partitionTable (id INT, day DATE) PARTITION BY day;",
    businessScenario: "Optimizing petabyte-scale event tables inside Google Cloud Platform.",
    scenarios: {
      easy: {
        title: "Pruning tables seamlessly using partition days",
        urduExplanation: "Filtering logs specifically targeting partition date range to limit scanned megabytes.",
        sqlQuery: "SELECT user_id, event_type FROM mobile_logs WHERE activation_date = '2026-05-23';",
        businessInsight: "Reduces pipeline processing costs by focusing storage scans solely on selected partitions.",
        expectedOutput: {
          headers: ["user_id", "event_type"],
          rows: [
            ["8842", "App_Launch"],
            ["2101", "Order_Payment"]
          ]
        }
      },
      medium: {
        title: "Partitioning vs Clustering combined optimizations",
        urduExplanation: "Sorting partitions using clustering variables to keep organized blocks grouped securely.",
        sqlQuery: "SELECT country, campaign, SUM(clicks) AS total_clicks FROM organic_growth_logs WHERE signup_day = '2026-05-01' AND country = 'Pakistan' GROUP BY country, campaign;",
        businessInsight: "Pairs partitioning (signup_day) with clustering (country) for rapid and cheap query performance.",
        expectedOutput: {
          headers: ["country", "campaign", "total_clicks"],
          rows: [
            ["Pakistan", "Facebook_Influencers", "14502"],
            ["Pakistan", "Google_SEO_Organic", "4210"]
          ]
        }
      },
      hard: {
        title: "Dynamic Slot allocation audits via BigQuery Information Schemas",
        urduExplanation: "Query execution times patterns inside Google Cloud analytics platforms schema logs validations tracking.",
        sqlQuery: "SELECT query_id, total_bytes_billed / (1024 * 1024) AS megabytes_processed, query_sql FROM `region-us`.INFORMATION_SCHEMA.JOBS_BY_PROJECT WHERE creation_time > TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 DAY) ORDER BY total_bytes_billed DESC LIMIT 10;",
        businessInsight: "Enables database admins to audit and block high-cost query patterns.",
        expectedOutput: {
          headers: ["query_id", "megabytes_processed", "query_sql"],
          rows: [
            ["job_908fa1", "1,240,510.50", "SELECT * FROM billing_raw_payloads;"],
            ["job_451dd9", "12,450.10", "SELECT COUNT(1) FROM daily_signups;"]
          ]
        }
      }
    },
    commonMistakes: [
      {
        title: "Scanning full history timestamps on partitioned databases",
        wrong: "SELECT * FROM massive_traffic_logs; -- Scans petabytes of data, running up massive cloud bills",
        correct: "SELECT * FROM massive_traffic_logs WHERE partition_calendar_day = CURRENT_DATE();"
      }
    ],
    interviewQuestions: [
      {
        question: "What is the technical difference between Table Partitioning and Table Clustering in BigQuery?",
        answer: "Partitioning splits tables into distinct segments based on dates or ranges. Clustering sorts rows within those partitions based on specified column values. Always partition by high-level segments (e.g. Day) and cluster recursively by filtered keys (e.g. Country).",
        tip: "Explain cost metrics and memory optimization paradigms during solutions."
      }
    ],
    practice: {
      difficulty: "Advanced",
      task: "Query all rows from audit_logs table specifying partition_date as '2026-05-23'.",
      taskUrdu: "Select all from audit_logs table where partition_date = '2026-05-23'.",
      hint: "Syntax: SELECT * FROM audit_logs WHERE partition_date = '2026-05-23';",
      regexPattern: /select\s+\*\s+from\s+audit_logs\s+where\s+partition_date\s*=\s*['"]2026-05-23['"]/i,
      successMessage: "Excelent work! Partition optimization strategies completely checked!"
    }
  },

  // ------------------------------------------------------------------------
  // TRENDS: 2026 AI-ASSISTED SQL (trends)
  // ------------------------------------------------------------------------
  {
    id: "ai_sql_trends",
    title: "AI-Assisted SQL & Vector Databases",
    level: "trends",
    label: "2026 Generative AI Querying",
    whyAnalystsUseThis: "AI integrations allow analysts to run semantic searches directly within database warehouses.",
    definition: "2026 architectures leverage vector embeddings alongside standard SQL to compute cosine similarities inside the database.",
    urduExplanation: "2026 me modern SQL systems me semantic matching features direct databases me embed kiye gaye hein. Is se hum multi-dimensional embeddings store krte hein taake customer behavior matches direct aggregate ho sakein.",
    syntax: "SELECT content, COSINE_DISTANCE(embedding_col, [0.12, -0.45, 0.98]) AS similarity FROM embeddings_table ORDER BY similarity DESC LIMIT 5;",
    businessScenario: "Executing semantic reviews matches over customer reviews database arrays.",
    scenarios: {
      easy: {
        title: "Calling GenAI models inside analytical workflows",
        urduExplanation: "Standard SQL queries me dynamic AI prompt parameters utilize krna content processing models ke liye.",
        sqlQuery: "SELECT review_text, ML.GENERATE_TEXT(MODEL `enterprise_models.gemini-3.5`, (review_text), STRUCT('summarize' as task)) AS ai_summary FROM user_comments;",
        businessInsight: "Enables analysts to process customer reviews in bulk directly inside SQL warehouses.",
        expectedOutput: {
          headers: ["review_text", "ai_summary"],
          rows: [
            ["I ordered customized apparel item, shipping delayed heavily", "Summary: Customer complaints on shipment latency issues."],
            ["Amazing UI interface details perfectly compiled", "Summary: Positive customer ratings on application layout."]
          ]
        }
      },
      medium: {
        title: "Semantic reviews search via Vector Embeddings",
        urduExplanation: "Product embeddings map kr ke numerical similarity vectors compare krna customer parameters validation limits ke mutabiq.",
        sqlQuery: "SELECT item_id, item_title, VECTOR_DISTANCE(item_embedding, (SELECT query_embedding FROM user_inputs WHERE query_id = 'user_q89'), 'COSINE') AS distance FROM catalog_embeddings ORDER BY distance DESC LIMIT 5;",
        businessInsight: "Drives recommendation systems directly inside SQL views based on customer search intent.",
        expectedOutput: {
          headers: ["item_id", "item_title", "distance"],
          rows: [
            ["ITM_451", "Premium Studio Mic Set", "0.985"],
            ["ITM_112", "Wireless Podcast Headset", "0.891"]
          ]
        }
      },
      hard: {
        title: "RAG Pipeline setups completely natively under modern SQL engines",
        urduExplanation: "Retrieval-Augmented Generation processes integrating knowledge-bases mapping tables variables.",
        sqlQuery: "SELECT k.document_snippet, c.customer_query FROM vector_knowledge_base k INNER JOIN user_chat_tickets c ON VECTOR_DISTANCE(k.embedding, c.query_embedding, 'COSINE') < 0.25 WHERE c.ticket_status = 'Unresolved';",
        businessInsight: "Supplies context-aware solution logs directly to customer service agents in near-real-time.",
        expectedOutput: {
          headers: ["document_snippet", "customer_query"],
          rows: [
            ["Shipments are dispatched via TCS on Monday, Wed & Thursday.", "My package package hasn't cleared Clifton warehouses yet."],
            ["Returns are free within exactly 30 calendar days limit.", "Who can help me process a refund on apparel orders?"]
          ]
        }
      }
    },
    commonMistakes: [
      {
        title: "Treating multi-dimensional vectors as simple numbers",
        wrong: "SELECT * FROM vectors WHERE embedding_col = 'text_embedding'; -- Vectors match using similarity math, not standard string constraints",
        correct: "SELECT * FROM vectors WHERE COSINE_SIMILARITY(embedding_col, [0.1, -0.2, 0.9]) > 0.85;"
      }
    ],
    interviewQuestions: [
      {
        question: "How does vector search inside database indexes improve analyst roles in 2026?",
        answer: "Standard SQL matches keywords exactly. Vector search uses math matrices (embeddings) matching human intent, semantic query meanings and emotional patterns cleanly.",
        tip: "Explain semantic distance formulas like cosine, L2 euclidean, and dot product behaviors."
      }
    ],
    practice: {
      difficulty: "Advanced",
      task: "Query item_id from vector_db table using COSINE_DISTANCE comparing embedding to [0.12, 0.45, 0.9].",
      taskUrdu: "COSINE_DISTANCE mapping select query structures: value larger than 0.8 from vector_db.",
      hint: "Syntax: SELECT item_id FROM vector_db WHERE COSINE_DISTANCE(embedding, [0.12, 0.45, 0.9]) > 0.8;",
      regexPattern: /select\s+item_id\s+from\s+vector_db\s+where\s+cosine_distance\s*\(\s*embedding\s*,\s*\[\s*0\.12\s*,\s*0\.45\s*,\s*0\.9\s*\]\s*\)\s*>\s*0\.8/i,
      successMessage: "Mubarak ho! 2026 Modern AI-assisted SQL query paradigms understand krne ka complete level achieve kr liya hai."
    }
  }
];
