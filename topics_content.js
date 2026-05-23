// SQL for Data Analysts - Premium Content Database Engine
const SQL_TOPICS = [
  {
    id: "sql-intro",
    level: "Level 1 — Core Foundations",
    title: "SQL Introduction",
    desc: "SQL stands for Structured Query Language, the default language for relational databases.",
    english_definition: "SQL (Structured Query Language) is a specialized language designed for managing, querying, and retrieving structured relational data in RDBMS. It represents the foundational bridge between engineering databases and business visualization layers.",
    roman_urdu: "SQL (jisay 'Sequel' bhi kehte hain) database se baat karne ka tarika hai. Socho ke databases ek bohot bari automated excel sheet hain. Ab millions of rows se data ko dhoond kar nikalna manual Excel me impossible he par SQL query se ye seconds me ho jata ha.",
    syntax: `SELECT column1, column2 FROM table_name;`,
    beginner_example: {
      query: "SELECT name, role FROM employees;",
      explanation: "Employees table se simple columns like 'name' aur 'role' fetch karna."
    },
    intermediate_example: {
      query: "SELECT name, salary FROM employees WHERE department = 'Data Science';",
      explanation: "Data Science team ke technical employees ko list out karna."
    },
    advanced_example: {
      query: "SELECT department, COUNT(id) AS total, AVG(salary) FROM employees GROUP BY department;",
      explanation: "Har department ki strength aur average pay summarize karna."
    },
    why_analysts_use: "Essential because BI tools like power BI or Tableau pull data using internal optimized queries, handling billions of rows effortlessly.",
    business_scenario: "Auditing transaction history drops when total sales charts dip inside dashboard logs.",
    insights_extraction: "Spotting customer churn before patterns hit critical limits.",
    common_mistakes: "Expecting query to run sequential top-to-bottom. SQL actually runs FROM clause first, then filters WHERE, and compiles SELECT fields last.",
    interview_questions: [{ q: "What is SQL?", a: "Structured Query Language used globally to retrieve metrics from enterprise relational systems." }],
    practice_tasks: "Examine customer register records and list distinct cities.",
    expected_output: {
      headers: ["department", "total", "avg_salary"],
      rows: [["Data Science", "15", "110000.00"], ["Engineering", "45", "92000.00"]]
    }
  },
  {
    id: "database-basics",
    level: "Level 1 — Core Foundations",
    title: "Database Basics",
    desc: "Understanding Tables, Keys, and relational structures.",
    english_definition: "In relational architectures, data is structured into Tables. Foreign and Primary keys represent relational vectors linking entities securely.",
    roman_urdu: "relational databases lockers ki tarah hoti hain jahan har table columns aur rows se bani hoti hai. Primary key unique roll number ki tarah har entry ko unique pehchan deti hai.",
    syntax: `CREATE TABLE customers (id INT PRIMARY KEY, name VARCHAR(100));`,
    beginner_example: {
      query: "SELECT * FROM customers;",
      explanation: "Locker se customers ki poori list ko verify karna."
    },
    intermediate_example: {
      query: "SELECT id, name FROM customers WHERE id IS NOT NULL;",
      explanation: "Un records ko nikalna jinki key valid standard indexes me registered ho."
    },
    advanced_example: {
      query: "SELECT c.name, SUM(o.value) FROM customers c JOIN orders o ON c.id = o.customer_id GROUP BY c.name;",
      explanation: "Order relationship matching customers to lifetime purchases ledger."
    },
    why_analysts_use: "Enables joining files safely without creating broken columns, duplicates, or corrupted analytics reports.",
    business_scenario: "E-Commerce order items tracing database schema relations accurately to generate invoices.",
    insights_extraction: "Identifying active customer regions that drive seasonal cashflow shifts.",
    common_mistakes: "Adding orphan records whose foreign key doesn't resolve inside the original master register table.",
    interview_questions: [{ q: "Primary key vs Foreign Key?", a: "Primary Key table me har entry ko uniquely save karti ha. Foreign key un properties ko foreign tables se jodti ha." }],
    practice_tasks: "Outline standard customer dimensions structure for orders matching.",
    expected_output: {
      headers: ["customer_id", "email", "total_purchases"],
      rows: [["1022", "ali@company.com", "425.50"], ["4011", "zain@domain.com", "125.00"]]
    }
  }
];
