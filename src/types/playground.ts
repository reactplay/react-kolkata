export interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  code: string;
  language: "javascript" | "typescript" | "jsx" | "tsx";
  author: {
    name: string;
    avatar?: string;
    id: string;
  };
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  likes: number;
  views: number;
  bookmarks: number;
  featured?: boolean;
}

export interface PlaygroundState {
  code: string;
  language: "javascript" | "typescript" | "jsx" | "tsx";
  output?: string;
  error?: string;
  isRunning: boolean;
}

export interface PlaygroundFilters {
  tag?: string;
  language?: string;
  sortBy: "recent" | "popular" | "most-liked";
}

export const PLAYGROUND_TAGS = {
  HOOKS: "hooks",
  COMPONENTS: "components",
  STATE_MANAGEMENT: "state-management",
  ROUTING: "routing",
  FORMS: "forms",
  ANIMATIONS: "animations",
  API: "api",
  PERFORMANCE: "performance",
  TESTING: "testing",
  UTILS: "utils",
} as const;

export type PlaygroundTag = (typeof PLAYGROUND_TAGS)[keyof typeof PLAYGROUND_TAGS];

export const PLAYGROUND_LANGUAGES = {
  JAVASCRIPT: "javascript",
  TYPESCRIPT: "typescript",
  JSX: "jsx",
  TSX: "tsx",
} as const;

export const DEFAULT_REACT_CODE = `import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <h1>React Kolkata Playground</h1>
      <p>Edit this code and see the magic! ✨</p>
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={() => setCount(count + 1)}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px'
          }}
        >
          Count: {count}
        </button>
      </div>
    </div>
  );
}

export default App;`;
