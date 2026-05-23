const topicsContent = {
  "LEVEL 1: CORE FOUNDATIONS": {
    "SQL Introduction": {
      explanation: "SQL (Structured Query Language) is the standard language for interacting with relational databases. Think of it as the 'bridge' between you and the massive amounts of data stored by companies.",
      urduExplanation: "SQL ek aisi zaban he jis se hum database se baat karte hen. Jab humein company ka data chahiye hota he, toh hum SQL queries likhte hen. Ye bilkul Excel ki tarah he, lekin ye lakhon rows par second mein kaam kar sakta he.",
      syntax: "SELECT column_name FROM table_name;",
      beginnerExample: "SELECT name FROM employees;",
      intermediateExample: "SELECT name, department FROM employees WHERE salary > 50000;",
      advancedExample: "SELECT department, COUNT(id) as total_emp FROM employees GROUP BY department HAVING COUNT(id) > 5;",
      businessUseCase: "Identifying high-performing employees for bonuses.",
      commonMistakes: "Forgetting the semicolon at the end; Typo in table names.",
      interviewQuestions: "What is the difference between SQL and NoSQL?",
      exercises: "Write a query to select all records from 'customers' table.",
      outputExample: "| name | salary |\n|---|---|\n| Ali | 60000 |"
    },
    // ... [Content for other topics follows this pattern]
  },
  "LEVEL 3: ADVANCED ANALYTICS": {
    "Cohort Analysis": {
      explanation: "Cohort Analysis is a subset of behavioral analytics that takes the data from a given dataset and breaks it into related groups for analysis.",
      urduExplanation: "Cohort analysis ka matlab he users ke groups ko track karna jo ek hi waqt mein join huye. Is se hum dekhte hen ke kya purane users wapis aa rahe hen ya nahi (Retention).",
      syntax: "SELECT cohort_month, count(user_id) FROM users GROUP BY cohort_month;",
      beginnerExample: "SELECT month, count(id) FROM orders GROUP BY month;",
      intermediateExample: "SELECT cohort_month, age, count(id) FROM table GROUP BY cohort_month, age;",
      advancedExample: "SELECT cohort_month, DATEDIFF(month, cohort_month, order_month) as tenure, count(DISTINCT user_id) FROM cohorts GROUP BY 1, 2;",
      businessUseCase: "Tracking customer retention rate over 12 months.",
      commonMistakes: "Not correctly identifying the first interaction date.",
      interviewQuestions: "How would you calculate 30-day retention?",
      exercises: "Write a query to group users by their signup month.",
      outputExample: "| cohort | month_1 | month_2 |\n|---|---|---|\n| Jan | 100 | 80 |"
    }
  }
};
