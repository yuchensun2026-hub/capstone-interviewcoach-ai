import React, { useMemo, useState } from "react";
import {
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardList,
  Clock3,
  FileQuestion,
  History,
  LayoutDashboard,
  LogIn,
  MessageSquareText,
  Play,
  Plus,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  UserRound,
} from "lucide-react";

// Mock data keeps the first milestone focused on the front-end flow.
// These arrays can later be replaced by Flask API responses from the database.
const roles = [
  "Data Analyst",
  "Software Engineer",
  "Product Manager",
  "Business Analyst",
  "Marketing Associate",
];

const interviewTypes = ["Behavioral", "Technical", "Resume-Based", "Case Interview"];

const mockQuestions = [
  {
    id: 1,
    text: "Tell me about a time you used data to solve a problem.",
    category: "Behavioral",
    focus: "STAR structure and measurable impact",
  },
  {
    id: 2,
    text: "How would you explain a dashboard insight to a non-technical stakeholder?",
    category: "Communication",
    focus: "Clarity and audience awareness",
  },
  {
    id: 3,
    text: "What steps would you take if two data sources showed different results?",
    category: "Technical",
    focus: "Problem solving and validation process",
  },
  {
    id: 4,
    text: "Why are you interested in this role and this organization?",
    category: "Motivation",
    focus: "Role fit and preparation",
  },
  {
    id: 5,
    text: "Describe a project where you had to learn a new tool quickly.",
    category: "Behavioral",
    focus: "Learning agility",
  },
];

const historyItems = [
  {
    id: "S-1042",
    role: "Data Analyst",
    type: "Behavioral",
    date: "Jul 1, 2026",
    score: 84,
    status: "Complete",
  },
  {
    id: "S-1038",
    role: "Software Engineer",
    type: "Technical",
    date: "Jun 29, 2026",
    score: 78,
    status: "Complete",
  },
  {
    id: "S-1027",
    role: "Product Manager",
    type: "Case Interview",
    date: "Jun 25, 2026",
    score: 81,
    status: "Complete",
  },
];

const initialQuestionBank = [
  { role: "Data Analyst", type: "Behavioral", questions: 18, rubric: "STAR + impact" },
  { role: "Software Engineer", type: "Technical", questions: 22, rubric: "Logic + code reasoning" },
  { role: "Product Manager", type: "Case Interview", questions: 14, rubric: "Structure + tradeoffs" },
  { role: "Business Analyst", type: "Resume-Based", questions: 16, rubric: "Relevance + clarity" },
];

// The sidebar is generated from this array so the navigation stays easy to update.
const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "setup", label: "Setup", icon: ClipboardList },
  { id: "interview", label: "Interview", icon: MessageSquareText },
  { id: "feedback", label: "Feedback", icon: Star },
  { id: "history", label: "History", icon: History },
  { id: "admin", label: "Admin", icon: ShieldCheck },
];

function App() {
  // Local state drives the prototype: login, page changes, setup choices,
  // answer text, and interview progress.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [selectedRole, setSelectedRole] = useState("Data Analyst");
  const [selectedType, setSelectedType] = useState("Behavioral");
  const [difficulty, setDifficulty] = useState("Medium");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState(
    "In a class analytics project, I cleaned a sales dataset, built a dashboard, and found that late shipments were concentrated in two regions. I presented the insight to the team and recommended tracking fulfillment time weekly."
  );

  const progress = useMemo(
    () => Math.round(((currentQuestion + 1) / mockQuestions.length) * 100),
    [currentQuestion]
  );

  // Show the authentication screen before the student dashboard.
  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark">
            <Sparkles size={22} />
          </div>
          <div>
            <p className="eyebrow">Capstone Prototype</p>
            <h1>AI InterviewCoach</h1>
          </div>
        </div>

        <nav className="nav-list" aria-label="Primary navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={activePage === item.id ? "nav-item active" : "nav-item"}
                onClick={() => setActivePage(item.id)}
                title={item.label}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-card">
          <p className="eyebrow">MVP Scope</p>
          <p>React front-end with mock interview data. Flask, PostgreSQL, and OpenAI API come next.</p>
        </div>
      </aside>

      <main className="main-panel">
        <TopBar onLogout={() => setIsLoggedIn(false)} />
        {/* activePage decides which main screen is shown after a sidebar click. */}
        {activePage === "dashboard" && <Dashboard onStart={() => setActivePage("setup")} />}
        {activePage === "setup" && (
          <SetupPage
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            onStart={() => {
              setCurrentQuestion(0);
              setActivePage("interview");
            }}
          />
        )}
        {activePage === "interview" && (
          <InterviewPage
            selectedRole={selectedRole}
            selectedType={selectedType}
            difficulty={difficulty}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            answer={answer}
            setAnswer={setAnswer}
            progress={progress}
            onFinish={() => setActivePage("feedback")}
          />
        )}
        {activePage === "feedback" && (
          <FeedbackPage selectedRole={selectedRole} selectedType={selectedType} onHistory={() => setActivePage("history")} />
        )}
        {activePage === "history" && <HistoryPage onReview={() => setActivePage("feedback")} />}
        {activePage === "admin" && <AdminPage />}
      </main>
    </div>
  );
}

function LoginPage({ onLogin }) {
  const [authMode, setAuthMode] = useState("login");
  const isRegistering = authMode === "register";

  return (
    <div className="login-page">
      <section className="login-card">
        <div className="brand-block center">
          <div className="brand-mark">
            <Sparkles size={24} />
          </div>
          <div>
            <h1>AI InterviewCoach</h1>
          </div>
        </div>

        <div className="auth-tabs" aria-label="Authentication mode">
          <button
            type="button"
            className={authMode === "login" ? "active" : ""}
            onClick={() => setAuthMode("login")}
          >
            Login
          </button>
          <button
            type="button"
            className={isRegistering ? "active" : ""}
            onClick={() => setAuthMode("register")}
          >
            Register
          </button>
        </div>

        {/* This form is mock-only for now; backend authentication comes later. */}
        <div className="login-grid">
          {isRegistering && (
            <label>
              Full Name
              <input type="text" defaultValue="Northwestern Student" />
            </label>
          )}
          <label>
            Email
            <input type="email" defaultValue="student@northwestern.edu" />
          </label>
          <label>
            Password
            <input type="password" defaultValue="capstone" />
          </label>
          {isRegistering && (
            <label>
              Confirm Password
              <input type="password" defaultValue="capstone" />
            </label>
          )}
        </div>
        <button className="primary-button wide" onClick={onLogin}>
          <LogIn size={18} />
          {isRegistering ? "Create Account and Continue" : "Login to Dashboard"}
        </button>
        <p className="auth-note">
          Prototype note: authentication is simulated for Milestone 1 and will connect
          to the backend in a later milestone.
        </p>
      </section>
    </div>
  );
}

function TopBar({ onLogout }) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Milestone 1</p>
        <h2>Front-End Component</h2>
      </div>
      <div className="topbar-actions">
        <span className="status-pill">
          <CheckCircle2 size={16} />
          Mock data active
        </span>
        <button className="ghost-button" onClick={onLogout} title="Logout">
          <UserRound size={17} />
          Student
        </button>
      </div>
    </header>
  );
}

function Dashboard({ onStart }) {
  return (
    <section className="page-stack">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Student Dashboard</p>
          <h2>Practice smarter before the real interview.</h2>
        </div>
        <button className="primary-button" onClick={onStart}>
          <Play size={18} />
          Start Mock Interview
        </button>
      </div>

      <div className="metric-grid">
        <MetricCard icon={MessageSquareText} label="Completed Sessions" value="3" note="This quarter" />
        <MetricCard icon={BarChart3} label="Average Score" value="81%" note="Up 6 points" />
        <MetricCard icon={Clock3} label="Practice Time" value="42m" note="Across sessions" />
        <MetricCard icon={BookOpen} label="Focus Area" value="STAR" note="Add stronger results" />
      </div>

      <div className="two-column">
        <article className="panel">
          <div className="panel-header">
            <h3>Recommended Practice Flow</h3>
            <span className="tag">MVP</span>
          </div>
          <ol className="step-list">
            <li>Select a target role and interview type.</li>
            <li>Answer five role-specific mock interview questions.</li>
            <li>Review sample feedback and category scores.</li>
            <li>Compare the session with mock history over time.</li>
          </ol>
        </article>
        <article className="panel">
          <div className="panel-header">
            <h3>Latest Feedback Summary</h3>
            <span className="tag success">Complete</span>
          </div>
          <p className="large-score">84%</p>
          <p>
            Strong business context and clear project example. Improve by adding measurable
            results and making the action step more specific.
          </p>
        </article>
      </div>
    </section>
  );
}

function MetricCard({ icon: Icon, label, value, note }) {
  return (
    <article className="metric-card">
      <div className="metric-icon">
        <Icon size={20} />
      </div>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        <span>{note}</span>
      </div>
    </article>
  );
}

function SetupPage({
  selectedRole,
  setSelectedRole,
  selectedType,
  setSelectedType,
  difficulty,
  setDifficulty,
  onStart,
}) {
  return (
    <section className="page-stack">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Interview Setup</p>
          <h2>Choose the practice session.</h2>
        </div>
      </div>

      <div className="setup-layout">
        <article className="panel">
          <h3>Target Role</h3>
          <div className="option-grid">
            {/* Role buttons are rendered from data so they can come from the database later. */}
            {roles.map((role) => (
              <button
                key={role}
                className={selectedRole === role ? "option-card selected" : "option-card"}
                onClick={() => setSelectedRole(role)}
              >
                <BriefcaseBusiness size={19} />
                {role}
              </button>
            ))}
          </div>
        </article>

        <article className="panel">
          <h3>Interview Type</h3>
          <div className="segmented">
            {interviewTypes.map((type) => (
              <button
                key={type}
                className={selectedType === type ? "selected" : ""}
                onClick={() => setSelectedType(type)}
              >
                {type}
              </button>
            ))}
          </div>
          <label className="range-label">
            Difficulty
            <select value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </label>
          <button className="primary-button wide" onClick={onStart}>
            <Play size={18} />
            Begin Interview
          </button>
        </article>
      </div>
    </section>
  );
}

function InterviewPage({
  selectedRole,
  selectedType,
  difficulty,
  currentQuestion,
  setCurrentQuestion,
  answer,
  setAnswer,
  progress,
  onFinish,
}) {
  const question = mockQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === mockQuestions.length - 1;

  return (
    <section className="page-stack">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Mock Interview</p>
          <h2>{selectedRole} - {selectedType} - {difficulty}</h2>
        </div>
        <span className="status-pill">{progress}% complete</span>
      </div>

      <article className="interview-card">
        <div className="progress-track">
          <span style={{ width: `${progress}%` }} />
        </div>
        <div className="question-meta">
          <span>Question {currentQuestion + 1} of {mockQuestions.length}</span>
          <span>{question.category}</span>
        </div>
        <h3>{question.text}</h3>
        <p className="helper-text">Evaluation focus: {question.focus}</p>
        <label className="answer-box">
          Your Answer
          {/* The answer is stored in React state so it can be submitted later. */}
          <textarea value={answer} onChange={(event) => setAnswer(event.target.value)} />
        </label>
        <div className="button-row">
          <button
            className="ghost-button"
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion((value) => Math.max(value - 1, 0))}
          >
            Previous
          </button>
          <button
            className="primary-button"
            onClick={() => {
              if (isLastQuestion) {
                onFinish();
              } else {
                setCurrentQuestion((value) => value + 1);
              }
            }}
          >
            {isLastQuestion ? "Generate Feedback" : "Next Question"}
          </button>
        </div>
      </article>
    </section>
  );
}

function FeedbackPage({ selectedRole, selectedType, onHistory }) {
  return (
    <section className="page-stack">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Feedback Report</p>
          <h2>{selectedRole} {selectedType} Session</h2>
        </div>
        <button className="ghost-button" onClick={onHistory}>
          <History size={18} />
          View History
        </button>
      </div>

      <div className="feedback-layout">
        <article className="score-panel">
          <p className="eyebrow">Overall Score</p>
          <strong>84</strong>
          <span>out of 100</span>
        </article>
        <article className="panel">
          <h3>Sample Feedback</h3>
          <div className="feedback-list">
            <FeedbackItem label="Strength" text="Your answer gives a specific project example and explains the business problem clearly." />
            <FeedbackItem label="Improve" text="Add a measurable result, such as reduced time, increased accuracy, or a clear stakeholder impact." />
            <FeedbackItem label="Next Practice" text="Practice one more behavioral question using the STAR method and end with a stronger result statement." />
          </div>
        </article>
      </div>

      <article className="panel">
        <h3>Category Scores</h3>
        <div className="score-bars">
          <ScoreBar label="Communication" value={88} />
          <ScoreBar label="Structure" value={82} />
          <ScoreBar label="Role Relevance" value={86} />
          <ScoreBar label="Specific Evidence" value={76} />
        </div>
      </article>
    </section>
  );
}

function FeedbackItem({ label, text }) {
  return (
    <div className="feedback-item">
      <span>{label}</span>
      <p>{text}</p>
    </div>
  );
}

function ScoreBar({ label, value }) {
  return (
    <div className="score-row">
      <div>
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>
      <div className="score-track">
        <span style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function HistoryPage({ onReview }) {
  return (
    <section className="page-stack">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Practice History</p>
          <h2>Saved interview sessions.</h2>
        </div>
      </div>

      <div className="table-panel">
        <table>
          <thead>
            <tr>
              <th>Session</th>
              <th>Role</th>
              <th>Type</th>
              <th>Date</th>
              <th>Score</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {historyItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.role}</td>
                <td>{item.type}</td>
                <td>{item.date}</td>
                <td>{item.score}%</td>
                <td><span className="tag success">{item.status}</span></td>
                <td>
                  <button className="table-button" onClick={onReview}>Review</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function AdminPage() {
  const [questions, setQuestions] = useState(initialQuestionBank);
  const [showForm, setShowForm] = useState(false);
  const [draftQuestion, setDraftQuestion] = useState({
    role: roles[0],
    type: interviewTypes[0],
    questions: 1,
    rubric: "Communication + clarity",
  });

  const totalQuestions = questions.reduce((sum, item) => sum + item.questions, 0);

  function handleAddQuestion() {
    const newCount = Math.max(Number(draftQuestion.questions) || 1, 1);

    setQuestions((items) => {
      const existingItem = items.find(
        (item) => item.role === draftQuestion.role && item.type === draftQuestion.type
      );

      if (!existingItem) {
        return [...items, { ...draftQuestion, questions: newCount }];
      }

      return items.map((item) =>
        item.role === draftQuestion.role && item.type === draftQuestion.type
          ? { ...item, questions: item.questions + newCount, rubric: draftQuestion.rubric }
          : item
      );
    });

    setDraftQuestion({
      role: roles[0],
      type: interviewTypes[0],
      questions: 1,
      rubric: "Communication + clarity",
    });
    setShowForm(false);
  }

  return (
    <section className="page-stack">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Admin Dashboard</p>
          <h2>Manage roles, question templates, and usage.</h2>
        </div>
        <button className="primary-button" onClick={() => setShowForm((value) => !value)}>
          <Plus size={18} />
          {showForm ? "Close Form" : "Add Question"}
        </button>
      </div>

      <div className="metric-grid">
        <MetricCard icon={UserRound} label="Users" value="42" note="Mock users" />
        <MetricCard icon={FileQuestion} label="Questions" value={totalQuestions} note="Across roles" />
        <MetricCard icon={Settings} label="Roles" value="5" note="Configured" />
        <MetricCard icon={BarChart3} label="Avg Score" value="81%" note="All sessions" />
      </div>

      {showForm && (
        <article className="panel admin-form">
          <h3>Add Question Template</h3>
          {/* The admin form updates local state now and can become a database insert later. */}
          <div className="form-grid">
            <label>
              Role
              <select
                value={draftQuestion.role}
                onChange={(event) =>
                  setDraftQuestion((value) => ({ ...value, role: event.target.value }))
                }
              >
                {roles.map((role) => (
                  <option key={role}>{role}</option>
                ))}
              </select>
            </label>
            <label>
              Interview Type
              <select
                value={draftQuestion.type}
                onChange={(event) =>
                  setDraftQuestion((value) => ({ ...value, type: event.target.value }))
                }
              >
                {interviewTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </label>
            <label>
              Number of Questions
              <input
                min="1"
                type="number"
                value={draftQuestion.questions}
                onChange={(event) =>
                  setDraftQuestion((value) => ({ ...value, questions: event.target.value }))
                }
              />
            </label>
            <label>
              Rubric Focus
              <input
                type="text"
                value={draftQuestion.rubric}
                onChange={(event) =>
                  setDraftQuestion((value) => ({ ...value, rubric: event.target.value }))
                }
              />
            </label>
          </div>
          <div className="form-actions">
            <button className="primary-button" onClick={handleAddQuestion}>
              Add to Question Bank
            </button>
          </div>
        </article>
      )}

      <div className="table-panel">
        <table>
          <thead>
            <tr>
              <th>Role</th>
              <th>Interview Type</th>
              <th>Questions</th>
              <th>Rubric</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((item) => (
              <tr key={`${item.role}-${item.type}`}>
                <td>{item.role}</td>
                <td>{item.type}</td>
                <td>{item.questions}</td>
                <td>{item.rubric}</td>
                <td><span className="tag success">Active</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default App;
