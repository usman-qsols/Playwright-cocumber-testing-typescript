const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "test-results",
  reportPath: "./",
  reportName: "Playwright Automation Report",
  pageTitle: "Bookcart app test report",
  displayDuration: false,
  metadata: {
    browser: {
      name: "chrome",
      version: "112",
    },
    device: "URK-PC",
    platform: {
      name: "Windows",
      version: "10",
    },
  },
  customData: {
    title: "Test info",
    data: [
      { label: "Project", value: "Book Cart Application" },
      { label: "Release", value: "1.2.3" },
      { label: "Cycle", value: "Smoke-1" },
    ],
  },
});
