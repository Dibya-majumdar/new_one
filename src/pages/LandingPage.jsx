import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="landing-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">📝</span>
          <span className="logo-text">QGen</span>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#pricing">Pricing</a>
          <button className="login-btn" onClick={() => navigate('/login')}>
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Generate Questions <span className="highlight">Instantly</span></h1>
          <p className="hero-subtitle">
            Create professional question papers in minutes. Perfect for teachers, 
            trainers, and educators who want to save time and create better assessments.
          </p>
          <div className="hero-buttons">
            <button className="primary-btn" onClick={handleGetStarted}>
              Get Started Free
            </button>
            <button className="secondary-btn">
              Watch Demo
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Questions Generated</span>
            </div>
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Happy Users</span>
            </div>
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Subjects Covered</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="preview-card">
            <div className="preview-header">
              <span className="preview-dot red"></span>
              <span className="preview-dot yellow"></span>
              <span className="preview-dot green"></span>
            </div>
            <div className="preview-content">
              <div className="preview-question">
                <span className="q-number">Q1.</span> What is the capital of France?
              </div>
              <div className="preview-options">
                <div className="option">A) London</div>
                <div className="option correct">B) Paris</div>
                <div className="option">C) Berlin</div>
                <div className="option">D) Madrid</div>
              </div>
              <div className="preview-question">
                <span className="q-number">Q2.</span> Solve: 2x + 5 = 15
              </div>
              <div className="preview-options">
                <div className="option correct">A) x = 5</div>
                <div className="option">B) x = 10</div>
                <div className="option">C) x = 7</div>
                <div className="option">D) x = 3</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/* <section className="features" id="features">
        <h2>Why Choose QGen?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>Generate complete question papers in seconds with our AI-powered engine.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Customizable</h3>
            <p>Adjust difficulty levels, question types, and topics to match your needs.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Multiple Formats</h3>
            <p>MCQs, short answers, true/false, and essay questions all supported.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💾</div>
            <h3>Export Anywhere</h3>
            <p>Download as PDF, Word, or print directly from the platform.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👁️</div>
            <h3>Live Preview</h3>
            <p>See your question paper as you build it with real-time preview.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure</h3>
            <p>Your questions and data are encrypted and stored securely.</p>
          </div>
        </div>
      </section>

      {/* How It Works 
      <section className="how-it-works" id="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Choose Your Subject</h3>
            <p>Select the subject and topic for your question paper.</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Customize Settings</h3>
            <p>Set difficulty, number of questions, and question types.</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Generate & Preview</h3>
            <p>Click generate and preview your question paper instantly.</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Download & Share</h3>
            <p>Export in your preferred format and share with students.</p>
          </div>
        </div>
      </section>

      {/* CTA Section 
      <section className="cta">
        <h2>Ready to Create Amazing Question Papers?</h2>
        <p>Join thousands of educators who trust QGen for their assessment needs.</p>
        <button className="primary-btn large" onClick={handleGetStarted}>
          Start Generating Questions
        </button>
      </section> 
      */}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="logo-icon">📝</span>
            <span className="logo-text">QGen</span>
            <p>Making question paper generation simple and efficient.</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#">API</a>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Blog</a>
              <a href="#">Careers</a>
            </div>
            <div className="footer-column">
              <h4>Support</h4>
              <a href="#">Help Center</a>
              <a href="#">Contact</a>
              <a href="#">Privacy</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 QGen. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
