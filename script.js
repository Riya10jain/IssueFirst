function saveAnalysis() {
  const repo = document.getElementById("repo").value.trim();
  const link = document.getElementById("link").value.trim();
  const desc = document.getElementById("desc").value.trim();

  if (!repo || !link || !desc) {
    alert("Please fill all fields before saving.");
    return;
  }

  const issueData = {
    repository: repo,
    issueLink: link,
    description: desc,
    savedAt: new Date().toLocaleString(),
  };

  localStorage.setItem("issueAnalysis", JSON.stringify(issueData));

  const status = document.getElementById("status");
  status.style.display = "block";
}

// Markdown Export
document.getElementById("exportBtn").addEventListener("click", exportMarkdown);

function exportMarkdown() {
  const savedData = localStorage.getItem("issueAnalysis");

  if (!savedData) {
    alert("No analysis found. Please save first.");
    return;
  }

  const data = JSON.parse(savedData);

  const markdownContent = `
# Issue Analysis

## Repository
${data.repository}

## Issue Link
${data.issueLink}

## Problem Summary
${data.description}

## Expected Behavior
- Describe what should happen

## Actual Behavior
- Describe what is happening

## Reproduction Steps
- [ ] Step 1
- [ ] Step 2
- [ ] Step 3

## Proposed Solution
- Outline approach
- Mention files or modules

## PR Checklist
- [ ] Issue understood clearly
- [ ] Reproduction verified
- [ ] Solution planned
- [ ] Ready for implementation

---
Generated using IssueFirst
`;

  const blob = new Blob([markdownContent], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "issue-analysis-pr-ready.md";
  a.click();

  URL.revokeObjectURL(url);
}

// Load saved data on refresh
window.onload = () => {
  const saved = localStorage.getItem("issueAnalysis");

  if (!saved) return;

  const data = JSON.parse(saved);

  document.getElementById("repo").value = data.repository || "";
  document.getElementById("link").value = data.issueLink || "";
  document.getElementById("desc").value = data.description || "";
};
