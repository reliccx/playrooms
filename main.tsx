
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './style.css';

class AppErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; message: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      message: error?.message || 'Unknown error'
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Playroom crashed:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main style={{
          minHeight: '100vh',
          padding: '30px 20px',
          background: '#fff8ec',
          color: '#21152f',
          fontFamily: 'sans-serif'
        }}>
          <h1>Playroom couldn't load</h1>
          <p>We found an error:</p>
          <pre style={{
            whiteSpace: 'pre-wrap',
            overflowWrap: 'anywhere',
            background: '#ffe0eb',
            padding: '16px',
            borderRadius: '12px'
          }}>
            {this.state.message}
          </pre>
          <p>Please take a screenshot and send it to ChatGPT.</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '14px 20px',
              background: '#7352ef',
              color: 'white',
              border: 0,
              borderRadius: '10px'
            }}
          >
            Reload Playroom
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <AppErrorBoundary>
        <App />
      </AppErrorBoundary>
    </React.StrictMode>
  );
} else {
  document.body.innerHTML = 'Playroom error: root element not found.';
}
