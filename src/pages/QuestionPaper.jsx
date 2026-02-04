import { useState } from 'react';
import './QuestionPaper.css';

const QuestionPaper = () => {
  const [paperDetails, setPaperDetails] = useState({
    instituteName: 'Your Institute',
    paperTitle: 'New Activity 1',
    subject: 'Science',
    class: 'Class X',
    time: 60,
    maxMarks: 100,
    showLogo: false,
  });

  const [instructions, setInstructions] = useState([
    'Read the questions carefully before answering.',
    'All questions are compulsory.',
  ]);

  const [sections, setSections] = useState([
    {
      id: 1,
      name: 'Section A',
      type: 'FILL IN THE BLANKS',
      marks: 2,
      questions: [
        { id: 1, text: 'Aqua regia is a mixture of concentrated hydrochloric acid and ___ that can dissolve noble metals like gold.', marks: 1 },
        { id: 2, text: 'Unlike other dilute acids, dilute nitric acid does not produce ___ gas when it reacts with active metals because it acts as a strong oxidizing agent.', marks: 1 },
      ],
    },
    {
      id: 2,
      name: 'Section B',
      type: 'SHORT ANSWER',
      marks: 2,
      questions: [
        { id: 3, text: 'What is the property by which metals can be drawn into thin wires?', marks: 1 },
        { id: 4, text: 'Describe a characteristic physical property of alkali metals such as potassium and sodium, which can be observed using a common kitchen utensil, and name this property.', marks: 1 },
      ],
    },
    {
      id: 3,
      name: 'Section C',
      type: 'TRUE/FALSE',
      marks: 2,
      questions: [],
    },
  ]);

  const [activeTab, setActiveTab] = useState('paper');
  const [zoom, setZoom] = useState(90);
  const [editingField, setEditingField] = useState(null);
  const [expandedSections, setExpandedSections] = useState([1, 2, 3]);
  const [newInstruction, setNewInstruction] = useState('');

  const handleDetailChange = (field, value) => {
    setPaperDetails(prev => ({ ...prev, [field]: value }));
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const addInstruction = () => {
    if (newInstruction.trim()) {
      setInstructions(prev => [...prev, newInstruction]);
      setNewInstruction('');
    }
  };

  const removeInstruction = (index) => {
    setInstructions(prev => prev.filter((_, i) => i !== index));
  };

  const addSection = () => {
    const newId = sections.length + 1;
    setSections(prev => [...prev, {
      id: newId,
      name: `Section ${String.fromCharCode(64 + newId)}`,
      type: 'MULTIPLE CHOICE',
      marks: 0,
      questions: [],
    }]);
    setExpandedSections(prev => [...prev, newId]);
  };

  const removeSection = (sectionId) => {
    setSections(prev => prev.filter(s => s.id !== sectionId));
    setExpandedSections(prev => prev.filter(id => id !== sectionId));
  };

  const getTotalQuestions = () => {
    return sections.reduce((total, section) => total + section.questions.length, 0);
  };

  const EditableField = ({ value, field, label }) => {
    const isEditing = editingField === field;
    
    return (
      <div className="editable-field">
        <label>{label}</label>
        <div className="field-content">
          {isEditing ? (
            <input
              type={typeof value === 'number' ? 'number' : 'text'}
              value={value}
              onChange={(e) => handleDetailChange(field, typeof value === 'number' ? parseInt(e.target.value) || 0 : e.target.value)}
              onBlur={() => setEditingField(null)}
              autoFocus
            />
          ) : (
            <>
              <span className="field-value">{value}</span>
              <button className="edit-btn" onClick={() => setEditingField(field)}>
                ✏️
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="question-paper-container">
      {/* Left Panel - Editor */}
      <div className="editor-panel">
        {/* Paper Details Section */}
        <div className="paper-details-section">
          <div className="section-header">
            <h2>Paper Details</h2>
            <button className="collapse-btn">▲</button>
          </div>
          
          <div className="details-grid">
            <EditableField value={paperDetails.instituteName} field="instituteName" label="Institute Name" />
            <EditableField value={paperDetails.paperTitle} field="paperTitle" label="Paper Title" />
            <EditableField value={paperDetails.subject} field="subject" label="Subject" />
            <EditableField value={paperDetails.class} field="class" label="Class" />
            <EditableField value={paperDetails.time} field="time" label="Time (mins)" />
            <EditableField value={paperDetails.maxMarks} field="maxMarks" label="Max Marks" />
          </div>

          <div className="toggle-row">
            <span>SHOW LOGO ON PAPER</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={paperDetails.showLogo}
                onChange={(e) => handleDetailChange('showLogo', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>

          {/* General Instructions */}
          <div className="instructions-section">
            <div className="instructions-header">
              <span>GENERAL INSTRUCTIONS</span>
              <button className="add-btn" onClick={() => setNewInstruction(' ')}>+ Add</button>
            </div>
            {instructions.map((instruction, index) => (
              <div key={index} className="instruction-item">
                <span>{instruction}</span>
                <div className="instruction-actions">
                  <button className="action-btn">✏️</button>
                  <button className="action-btn delete" onClick={() => removeInstruction(index)}>🗑️</button>
                </div>
              </div>
            ))}
            {newInstruction !== '' && (
              <div className="instruction-input">
                <input
                  type="text"
                  placeholder="Enter instruction..."
                  value={newInstruction}
                  onChange={(e) => setNewInstruction(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addInstruction()}
                />
                <button onClick={addInstruction}>Add</button>
              </div>
            )}
          </div>
        </div>

        {/* Sections Panel */}
        <div className="sections-panel">
          <div className="sections-header">
            <h2>Sections</h2>
            <div className="draft-progress">
              <span>Draft Progress:</span>
              <span className="progress-badge">{getTotalQuestions()} / {getTotalQuestions()} in Draft</span>
            </div>
          </div>

          <div className="sections-toolbar">
            <button className="toolbar-btn">+ Add Question</button>
            <button className="toolbar-btn">📤 Import</button>
            <button className="toolbar-btn" onClick={addSection}>+ Add Section</button>
          </div>

          <div className="sections-list">
            {sections.map((section) => (
              <div key={section.id} className="section-card">
                <div className="section-card-header">
                  <div className="section-left">
                    <span className="drag-handle">⋮⋮</span>
                    <button 
                      className="expand-btn"
                      onClick={() => toggleSection(section.id)}
                    >
                      {expandedSections.includes(section.id) ? '▼' : '▶'}
                    </button>
                    <span className="section-name">{section.name}</span>
                    <span className="question-count">({section.questions.length})</span>
                    <button className="edit-btn">✏️</button>
                  </div>
                  <div className="section-right">
                    <button className="collapse-section-btn">▲</button>
                    <button className="delete-section-btn" onClick={() => removeSection(section.id)}>🗑️</button>
                  </div>
                </div>

                {expandedSections.includes(section.id) && (
                  <div className="section-content">
                    {section.questions.length === 0 ? (
                      <p className="no-questions">No questions in this section</p>
                    ) : (
                      <div className="questions-list">
                        {section.questions.map((q, idx) => (
                          <div key={q.id} className="question-item">
                            <span className="q-number">{idx + 1}.</span>
                            <span className="q-text">{q.text}</span>
                            <span className="q-marks">[{q.marks}]</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <button className="add-custom-btn">+ Add custom question</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Preview */}
      <div className="preview-panel">
        <div className="preview-toolbar">
          <div className="preview-tabs">
            <button 
              className={`tab-btn ${activeTab === 'paper' ? 'active' : ''}`}
              onClick={() => setActiveTab('paper')}
            >
              📄 Paper
            </button>
            <button 
              className={`tab-btn ${activeTab === 'answers' ? 'active' : ''}`}
              onClick={() => setActiveTab('answers')}
            >
              ✅ Answers
            </button>
          </div>
          
          <div className="zoom-controls">
            <button onClick={() => setZoom(prev => Math.max(50, prev - 10))}>🔍-</button>
            <input 
              type="range" 
              min="50" 
              max="150" 
              value={zoom}
              onChange={(e) => setZoom(parseInt(e.target.value))}
            />
            <button onClick={() => setZoom(prev => Math.min(150, prev + 10))}>🔍+</button>
            <span>{zoom}%</span>
          </div>

          <button className="download-btn">
            📥 Download
          </button>
        </div>

        <div className="preview-container">
          <div className="paper-preview" style={{ transform: `scale(${zoom / 100})` }}>
            <div className="paper-header">
              <h1 className="institute-name">{paperDetails.instituteName.toUpperCase()}</h1>
              <h2 className="paper-title">{paperDetails.paperTitle}</h2>
              <div className="paper-meta">
                <div className="meta-left">
                  <p>Subject: .................</p>
                  <p>Class: .................</p>
                </div>
                <div className="meta-right">
                  <p>Max. Marks: {paperDetails.maxMarks}</p>
                  <p>Duration: {paperDetails.time} mins</p>
                </div>
              </div>
            </div>

            <div className="paper-instructions">
              <p className="instructions-title">General Instructions:</p>
              <ol>
                {instructions.map((instruction, idx) => (
                  <li key={idx}>{instruction}</li>
                ))}
              </ol>
            </div>

            <hr className="divider" />

            {sections.map((section, sectionIdx) => (
              <div key={section.id} className="paper-section">
                <h3 className="section-title">{section.name.toUpperCase()}</h3>
                
                {section.type && (
                  <div className="section-type-header">
                    <span>SECTION - {section.type}</span>
                    <span className="section-marks">[{section.marks}]</span>
                  </div>
                )}

                <div className="section-questions">
                  {section.questions.map((q, qIdx) => {
                    const globalQNum = sections
                      .slice(0, sectionIdx)
                      .reduce((sum, s) => sum + s.questions.length, 0) + qIdx + 1;
                    
                    return (
                      <div key={q.id} className="preview-question">
                        <span className="question-number">{globalQNum}.</span>
                        <span className="question-text">{q.text}</span>
                        <span className="question-marks">[{q.marks}]</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionPaper;
