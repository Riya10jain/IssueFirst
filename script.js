const { useState } = React;

function App() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    repo: "",
    link: "",
    desc: "",
  });

  const stepText = {
    1: "Understand the issue clearly before writing any code.",
    2: "Analyze the root cause, edge cases, and expected behavior.",
    3: "Implement the solution cleanly and efficiently.",
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveAnalysis = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "issueAnalysis",
      JSON.stringify({
        ...form,
        step,
        time: new Date().toLocaleString(),
      })
    );

    alert("Analysis saved successfully!");
  };

  return (
    <div className="card">
      <h1>IssueFirst</h1>
      <p className="subtitle">Understand before you implement</p>

      {/* STEP BUTTONS */}
      <div className="steps">
        <button
          className={step === 1 ? "active" : ""}
          onClick={() => setStep(1)}
        >
          1. Understand
        </button>

        <button
          className={step === 2 ? "active" : ""}
          onClick={() => setStep(2)}
        >
          2. Analyze
        </button>

        <button
          className={step === 3 ? "active" : ""}
          onClick={() => setStep(3)}
        >
          3. Implement
        </button>
      </div>

      {/* INFO */}
      <div className="info">{stepText[step]}</div>

      {/* FORM */}
      <form onSubmit={saveAnalysis}>
        <label>Repository Name</label>
        <input
          name="repo"
          placeholder="e.g. kubernetes/kubernetes"
          onChange={handleChange}
          required
        />

        <label>Issue Link</label>
        <input
          name="link"
          placeholder="https://github.com/..."
          onChange={handleChange}
          required
        />

        <label>Issue Description</label>
        <textarea
          name="desc"
          rows="4"
          placeholder="What is the problem? What is expected?"
          onChange={handleChange}
          required
        />

        <button className="submit" type="submit">
          Save Analysis
        </button>
      </form>

      <div className="footer">Built for learning open-source • IssueFirst</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
