import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: '',
    topic: '',
    questionCount: 10,
    difficulty: 'medium',
    questionType: 'mcq'
  });
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulated question generation
    setTimeout(() => {
      const sampleQuestions = [
        {
          id: 1,
          question: `What is the main concept of ${formData.topic || formData.subject}?`,
          options: ['Option A - Correct answer', 'Option B', 'Option C', 'Option D'],
          correctAnswer: 0,
          type: 'mcq'
        },
        {
          id: 2,
          question: `Which of the following best describes ${formData.topic || formData.subject}?`,
          options: ['First choice', 'Second choice - Correct', 'Third choice', 'Fourth choice'],
          correctAnswer: 1,
          type: 'mcq'
        },
        {
          id: 3,
          question: `In the context of ${formData.subject}, what is the significance of ${formData.topic}?`,
          options: ['Not significant', 'Somewhat important', 'Very important - Correct', 'Critical'],
          correctAnswer: 2,
          type: 'mcq'
        },
        {
          id: 4,
          question: `True or False: ${formData.topic} is an essential part of ${formData.subject}.`,
          options: ['True', 'False'],
          correctAnswer: 0,
          type: 'truefalse'
        },
        {
          id: 5,
          question: `Explain the relationship between ${formData.topic} and its applications in ${formData.subject}.`,
          type: 'essay'
        }
      ];
      
      setGeneratedQuestions(sampleQuestions.slice(0, formData.questionCount));
      setIsGenerating(false);
    }, 1500);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="sidebar-icon">📝</span>
          <span className="sidebar-title">QGen</span>
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="nav-item active">
            <span className="nav-icon">🏠</span>
            Dashboard
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">📄</span>
            My Papers
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">📚</span>
            Question Bank
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">⚙️</span>
            Settings
          </a>
        </nav>
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <span className="nav-icon">🚪</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="dashboard-header">
          <div className="header-left">
            <h1>Question Generator</h1>
            <p>Create professional question papers in seconds</p>
          </div>
          <div className="header-right">
            <button className="create-paper-btn" onClick={() => navigate('/create-paper')}>
              <span>📄</span> Create Paper
            </button>
            <div className="user-avatar">
              <span>U</span>
            </div>
          </div>
        </header>

        <div className="dashboard-grid">
          {/* Generator Panel */}
          <section className="generator-panel">
            <h2>Generate New Questions</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label>Subject</label>
                <select 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange}
                >
                  <option value="">Select Subject</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>
                  <option value="English">English</option>
                  <option value="Computer Science">Computer Science</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Topic</label>
                <input
                  type="text"
                  name="topic"
                  placeholder="Enter specific topic"
                  value={formData.topic}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Number of Questions</label>
                <input
                  type="number"
                  name="questionCount"
                  min="1"
                  max="50"
                  value={formData.questionCount}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label>Difficulty Level</label>
                <select 
                  name="difficulty" 
                  value={formData.difficulty} 
                  onChange={handleChange}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                  <option value="mixed">Mixed</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Question Type</label>
              <div className="question-types">
                <label className={`type-option ${formData.questionType === 'mcq' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="questionType"
                    value="mcq"
                    checked={formData.questionType === 'mcq'}
                    onChange={handleChange}
                  />
                  <span className="type-icon">📋</span>
                  <span>MCQ</span>
                </label>
                <label className={`type-option ${formData.questionType === 'truefalse' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="questionType"
                    value="truefalse"
                    checked={formData.questionType === 'truefalse'}
                    onChange={handleChange}
                  />
                  <span className="type-icon">✓✗</span>
                  <span>True/False</span>
                </label>
                <label className={`type-option ${formData.questionType === 'short' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="questionType"
                    value="short"
                    checked={formData.questionType === 'short'}
                    onChange={handleChange}
                  />
                  <span className="type-icon">📝</span>
                  <span>Short Answer</span>
                </label>
                <label className={`type-option ${formData.questionType === 'mixed' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="questionType"
                    value="mixed"
                    checked={formData.questionType === 'mixed'}
                    onChange={handleChange}
                  />
                  <span className="type-icon">🔀</span>
                  <span>Mixed</span>
                </label>
              </div>
            </div>

            <button 
              className="generate-btn" 
              onClick={handleGenerate}
              disabled={!formData.subject || isGenerating}
            >
              {isGenerating ? (
                <>
                  <span className="spinner"></span>
                  Generating...
                </>
              ) : (
                <>
                  <span>⚡</span>
                  Generate Questions
                </>
              )}
            </button>
          </section>

          {/* Preview Panel */}
          <section className="preview-panel">
            <div className="preview-header">
              <h2>Question Preview</h2>
              {generatedQuestions.length > 0 && (
                <div className="preview-actions">
                  <button className="action-btn">
                    <span>📥</span> Export PDF
                  </button>
                  <button className="action-btn">
                    <span>💾</span> Save
                  </button>
                </div>
              )}
            </div>

            <div className="preview-content">
              {generatedQuestions.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📄</div>
                  <h3>No Questions Generated Yet</h3>
                  <p>Configure your settings and click "Generate Questions" to see a preview here.</p>
                </div>
              ) : (
                <div className="question-list">
                  <div className="paper-header">
                    <h3>{formData.subject} - {formData.topic || 'General'}</h3>
                    <p>Total Questions: {generatedQuestions.length} | Difficulty: {formData.difficulty}</p>
                  </div>
                  
                  {generatedQuestions.map((q, index) => (
                    <div key={q.id} className="question-item">
                      <div className="question-number">Q{index + 1}</div>
                      <div className="question-content">
                        <p className="question-text">{q.question}</p>
                        {q.options && (
                          <div className="options-list">
                            {q.options.map((opt, i) => (
                              <div 
                                key={i} 
                                className={`option ${i === q.correctAnswer ? 'correct' : ''}`}
                              >
                                <span className="option-letter">
                                  {String.fromCharCode(65 + i)}
                                </span>
                                {opt}
                              </div>
                            ))}
                          </div>
                        )}
                        {q.type === 'essay' && (
                          <div className="answer-space">
                            <p>Answer: ________________________________</p>
                            <p>________________________________</p>
                            <p>________________________________</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
