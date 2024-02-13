import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './App.css'; // Import your CSS file for styling

function App() {
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      convertMarkdownToHtml();
    }, 300); // Adjust the delay according to your needs
    return () => clearTimeout(timer);
  }, [markdown]);

  const convertMarkdownToHtml = () => {
    axios.post('http://localhost:5000/markdown', { markdown })
      .then(res => {
        setHtml(res.data.html);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="app-container">
      <header>
        <nav className="navbar">
          <div className="container">
            <h1 className="logo">Markdown Previewer</h1>
          </div>
        </nav>
      </header>

      <div className="main-content">
        <div className="editor-container">
          <h2 className="pane-title">Markdown Editor</h2>
          <textarea
            className="editor-textarea"
            rows="10"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Enter your markdown here..."
          ></textarea>
        </div>
        
        <div className="preview-container">
          <div className="preview-pane">
            <h2 className="pane-title">Live HTML Preview</h2>
            <div className="preview">
              <ReactMarkdown>{html}</ReactMarkdown>
            </div>
          </div>
          <hr className="divider"></hr>
          <div className="preview-pane">
            <h2 className="pane-title">Live Preview</h2>
            <div className="preview" dangerouslySetInnerHTML={{ __html: html }}></div>
          </div>
        </div>
      </div>

      <footer>
        <div className="container">
          <p>&copy; 2024 Markdown Previewer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
