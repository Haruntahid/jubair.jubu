// Programming Skills
export const programmingSkills = [
  { name: "Java", percentage: 90 },
  { name: "Python", percentage: 85 },
  { name: "JavaScript", percentage: 80 },
  { name: "SQL", percentage: 85 },
  { name: "Shell Scripting", percentage: 75 },
];

// Testing Expertise
export const testingExpertise = [
  { name: "Functional Testing", percentage: 95 },
  { name: "Automation Testing", percentage: 90 },
  { name: "API Testing", percentage: 85 },
  { name: "Performance Testing", percentage: 75 },
  { name: "Security Testing", percentage: 70 },
];

// Tools
export const toolsUsed = [
  { name: "Selenium", icon: "ri-server-line" },
  { name: "Postman", icon: "ri-mail-send-line" },
  { name: "JIRA", icon: "ri-bug-line" },
  { name: "TestRail", icon: "ri-dashboard-line" },
  { name: "Cypress", icon: "ri-braces-line" },
  { name: "Jenkins", icon: "ri-building-line" },
  { name: "Git", icon: "ri-git-branch-line" },
  { name: "SQL Tools", icon: "ri-database-2-line" },
  { name: "Browser Tools", icon: "ri-chrome-line" },
  { name: "JMeter", icon: "ri-speed-line" },
  { name: "Docker", icon: "ri-terminal-box-line" },
  { name: "Appium", icon: "ri-robot-line" },
];

// Testing Process Steps
export const testingProcess = [
  {
    title: "Requirement Analysis",
    description: "Analyze requirements to understand expected functionality and identify testable aspects.",
    icon: "ri-file-search-line",
  },
  {
    title: "Test Planning",
    description: "Develop a comprehensive test strategy, resource planning, and test schedule.",
    icon: "ri-draft-line",
  },
  {
    title: "Test Case Design",
    description: "Create detailed test cases covering all functionality, edge cases, and user scenarios.",
    icon: "ri-tools-line",
  },
  {
    title: "Test Execution",
    description: "Execute test cases systematically, documenting results and evidence for each step.",
    icon: "ri-play-circle-line",
  },
  {
    title: "Defect Logging",
    description: "Log defects with clear reproduction steps, severity ratings, and supporting evidence.",
    icon: "ri-bug-2-line",
  },
  {
    title: "Reporting",
    description: "Generate comprehensive test reports with metrics, coverage analysis, and quality assessment.",
    icon: "ri-bar-chart-box-line",
  },
  {
    title: "Regression/Retesting",
    description: "Verify fixed defects and ensure no new issues were introduced in the process.",
    icon: "ri-restart-line",
  },
  {
    title: "Delivery",
    description: "Final quality assessment and sign-off for production deployment.",
    icon: "ri-ship-line",
  },
];

// Testing Approaches
export const testingApproaches = [
  {
    id: "manual",
    title: "Manual Testing",
    icon: "ri-user-settings-line",
    points: [
      "Exploratory testing to uncover unexpected behavior",
      "Usability testing to ensure intuitive user experience",
      "Ad-hoc testing to catch edge cases",
      "User acceptance testing with stakeholders",
      "Detailed documentation of test execution and results",
    ],
  },
  {
    id: "automation",
    title: "Automation Testing",
    icon: "ri-robot-line",
    points: [
      "Framework design using Page Object Model",
      "Selenium WebDriver for web application testing",
      "Appium for mobile application testing",
      "CI/CD integration with Jenkins and GitHub Actions",
      "Reporting with Allure or ExtentReports",
    ],
  },
  {
    id: "api",
    title: "API Testing",
    icon: "ri-code-s-slash-line",
    points: [
      "RESTful API testing with Postman and RestAssured",
      "Contract testing with Pact or Spring Cloud Contract",
      "Schema validation using JSON Schema",
      "Security testing with OWASP ZAP",
      "Automated API documentation testing",
    ],
  },
  {
    id: "performance",
    title: "Performance Testing",
    icon: "ri-speed-up-line",
    points: [
      "Load testing with JMeter or Gatling",
      "Stress testing to identify breaking points",
      "Endurance testing for long-term stability",
      "Spike testing for sudden traffic surges",
      "Performance monitoring and bottleneck identification",
    ],
  },
];

// Projects
export const projects = [
  {
    title: "DummyJSON API Testing",
    icon: "ri-code-s-slash-line",
    tag: "API Testing",
    tagColor: "bg-blue-500",
    technologies: [
      { name: "Postman", bgColor: "bg-blue-100", textColor: "text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
      { name: "JSON", bgColor: "bg-green-100", textColor: "text-green-800 dark:bg-green-900 dark:text-green-300" },
      { name: "REST API", bgColor: "bg-purple-100", textColor: "text-purple-800 dark:bg-purple-900 dark:text-purple-300" },
      { name: "Testing", bgColor: "bg-gray-100", textColor: "text-gray-800 dark:bg-gray-700 dark:text-gray-300" },
    ],
    description: "Comprehensive API testing project using DummyJSON endpoints. Implemented various test scenarios including CRUD operations, authentication, and data validation.",
    metric: "Full API Coverage",
    metricIcon: "ri-shield-check-line",
    duration: "2 weeks",
    githubUrl: "https://github.com/JubairRahman/DummyJSON_API",
  },
  {
    title: "LinkedIn Article Editor Testing",
    icon: "ri-edit-line",
    tag: "Manual Testing",
    tagColor: "bg-green-500",
    technologies: [
      { name: "Manual Testing", bgColor: "bg-blue-100", textColor: "text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
      { name: "Test Cases", bgColor: "bg-green-100", textColor: "text-green-800 dark:bg-green-900 dark:text-green-300" },
      { name: "UI/UX", bgColor: "bg-purple-100", textColor: "text-purple-800 dark:bg-purple-900 dark:text-purple-300" },
      { name: "Documentation", bgColor: "bg-yellow-100", textColor: "text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" },
    ],
    description: "Manual testing of LinkedIn's article editor functionality. Created comprehensive test cases covering text formatting, media upload, and publishing workflow.",
    metric: "50+ Test Cases",
    metricIcon: "ri-file-list-3-line",
    duration: "1 week",
    githubUrl: "https://github.com/JubairRahman/linkedin-article-editor-testing",
  },
  {
    title: "JSONPlaceholder API Testing",
    icon: "ri-mail-send-line",
    tag: "API Testing",
    tagColor: "bg-orange-500",
    technologies: [
      { name: "Postman", bgColor: "bg-blue-100", textColor: "text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
      { name: "Collections", bgColor: "bg-green-100", textColor: "text-green-800 dark:bg-green-900 dark:text-green-300" },
      { name: "Automation", bgColor: "bg-purple-100", textColor: "text-purple-800 dark:bg-purple-900 dark:text-purple-300" },
      { name: "Newman", bgColor: "bg-red-100", textColor: "text-red-800 dark:bg-red-900 dark:text-red-300" },
    ],
    description: "API testing using JSONPlaceholder endpoints with Postman collections. Implemented automated test scripts and collection runners for continuous validation.",
    metric: "Automated Suite",
    metricIcon: "ri-robot-line",
    duration: "1 week",
    githubUrl: "https://github.com/JubairRahman/postman-jsonplaceholder-api",
  },
  {
    title: "Login Automation with Cypress",
    icon: "ri-login-circle-line",
    tag: "Automation Testing",
    tagColor: "bg-purple-500",
    technologies: [
      { name: "Cypress", bgColor: "bg-blue-100", textColor: "text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
      { name: "JavaScript", bgColor: "bg-yellow-100", textColor: "text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" },
      { name: "E2E Testing", bgColor: "bg-green-100", textColor: "text-green-800 dark:bg-green-900 dark:text-green-300" },
      { name: "CI/CD", bgColor: "bg-gray-100", textColor: "text-gray-800 dark:bg-gray-700 dark:text-gray-300" },
    ],
    description: "End-to-end automation testing for login functionality using Cypress. Implemented test scenarios for valid/invalid credentials, form validation, and user flows.",
    metric: "100% Coverage",
    metricIcon: "ri-checkbox-circle-line",
    duration: "3 days",
    githubUrl: "https://github.com/JubairRahman/Login-automation-cypress",
  },
  {
    title: "Cypress Gist Downloader",
    icon: "ri-download-cloud-line",
    tag: "Automation Testing",
    tagColor: "bg-indigo-500",
    technologies: [
      { name: "Cypress", bgColor: "bg-blue-100", textColor: "text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
      { name: "GitHub API", bgColor: "bg-green-100", textColor: "text-green-800 dark:bg-green-900 dark:text-green-300" },
      { name: "Node.js", bgColor: "bg-yellow-100", textColor: "text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" },
      { name: "File Handling", bgColor: "bg-purple-100", textColor: "text-purple-800 dark:bg-purple-900 dark:text-purple-300" },
    ],
    description: "Automated testing tool for downloading GitHub Gists using Cypress. Implemented file download validation, API interaction testing, and data verification.",
    metric: "API Integration",
    metricIcon: "ri-download-line",
    duration: "1 week",
    githubUrl: "https://github.com/JubairRahman/cypress-gist-downloader",
  },
  {
    title: "AutoCare BD Manual Testing",
    icon: "ri-car-line",
    tag: "Manual Testing",
    tagColor: "bg-red-500",
    technologies: [
      { name: "Manual Testing", bgColor: "bg-blue-100", textColor: "text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
      { name: "Test Planning", bgColor: "bg-green-100", textColor: "text-green-800 dark:bg-green-900 dark:text-green-300" },
      { name: "Bug Reports", bgColor: "bg-red-100", textColor: "text-red-800 dark:bg-red-900 dark:text-red-300" },
      { name: "User Experience", bgColor: "bg-purple-100", textColor: "text-purple-800 dark:bg-purple-900 dark:text-purple-300" },
    ],
    description: "Comprehensive manual testing of AutoCare BD automotive service platform. Conducted functional testing, usability testing, and created detailed bug reports.",
    metric: "25+ Bug Reports",
    metricIcon: "ri-bug-line",
    duration: "2 weeks",
    githubUrl: "https://github.com/JubairRahman/AutoCare-BD",
  },
];

// Blog Posts (GitHub Gists)
export const blogPosts = [
  {
    title: "GitHub Gists Collection",
    description: "A collection of useful code snippets, testing utilities, and QA resources shared on GitHub Gists.",
    url: "https://gist.github.com/JubairRahman",
    date: "2024",
    category: "Code Snippets",
    icon: "ri-github-fill",
  },
];

// Certifications
export const certifications = [
  {
    title: "ISTQB Certified Tester",
    issuer: "Foundation Level",
    description: "International certification for software testing fundamentals and best practices.",
    year: "2019",
    icon: "ri-award-line",
    bgColor: "bg-blue-100 dark:bg-blue-900",
    iconColor: "text-primary",
  },
  {
    title: "ISTQB Agile Tester",
    issuer: "Extension Level",
    description: "Specialized certification for testing in agile development environments.",
    year: "2020",
    icon: "ri-agile-line",
    bgColor: "bg-green-100 dark:bg-green-900",
    iconColor: "text-green-600 dark:text-green-400",
  },
  {
    title: "Selenium WebDriver",
    issuer: "Advanced Certification",
    description: "Advanced automation testing using Selenium WebDriver and testing frameworks.",
    year: "2021",
    icon: "ri-robot-line",
    bgColor: "bg-purple-100 dark:bg-purple-900",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "API Testing Professional",
    issuer: "Postman University",
    description: "Comprehensive training in API testing methodologies and tools.",
    year: "2021",
    icon: "ri-file-code-line",
    bgColor: "bg-orange-100 dark:bg-orange-900",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
  {
    title: "Quality Excellence Award",
    issuer: "Enterprise Innovation",
    description: "Recognized for implementing innovative testing solutions that increased efficiency by 40%.",
    year: "2022",
    icon: "ri-trophy-line",
    bgColor: "bg-yellow-100 dark:bg-yellow-900",
    iconColor: "text-yellow-600 dark:text-yellow-400",
  },
  {
    title: "Conference Speaker",
    issuer: "TestCon 2023",
    description: "Featured speaker on 'Building Scalable Test Automation Frameworks' at a leading QA conference.",
    year: "2023",
    icon: "ri-presentation-line",
    bgColor: "bg-red-100 dark:bg-red-900",
    iconColor: "text-red-600 dark:text-red-400",
  },
];
