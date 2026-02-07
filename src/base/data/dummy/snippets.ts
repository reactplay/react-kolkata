import { CodeSnippet } from "@/types/playground";

export const snippets: CodeSnippet[] = [
  {
    id: "1",
    title: "Custom useDebounce Hook",
    description: "A powerful debounce hook to optimize performance by delaying function execution",
    code: `import { useEffect, useState } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log('Searching for:', debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Search with Debounce</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Type to search..."
        style={{ padding: '10px', width: '300px', fontSize: '16px' }}
      />
      <p>Debounced value: {debouncedSearchTerm}</p>
    </div>
  );
}

export default App;`,
    language: "jsx",
    author: {
      name: "Priya Sharma",
      id: "user1",
    },
    tags: ["hooks", "performance", "utils"],
    createdAt: "2026-01-28T10:00:00Z",
    updatedAt: "2026-01-28T10:00:00Z",
    isPublic: true,
    likes: 45,
    views: 320,
    bookmarks: 28,
    featured: true,
  },
  {
    id: "2",
    title: "Dark Mode Toggle",
    description: "Simple dark mode implementation using Context API and local storage",
    code: `import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) setIsDark(saved === 'dark');
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const newTheme = !prev;
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function App() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div style={{
      padding: '40px',
      background: isDark ? '#1a1a1a' : '#ffffff',
      color: isDark ? '#ffffff' : '#000000',
      minHeight: '100vh',
      transition: 'all 0.3s ease'
    }}>
      <h1>Dark Mode Demo</h1>
      <button
        onClick={toggleTheme}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          background: isDark ? '#4a90e2' : '#2196F3',
          color: 'white',
          border: 'none',
          borderRadius: '8px'
        }}
      >
        Toggle to {isDark ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  );
}

export default () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);`,
    language: "jsx",
    author: {
      name: "Rahul Das",
      id: "user2",
    },
    tags: ["state-management", "hooks", "components"],
    createdAt: "2026-01-27T14:30:00Z",
    updatedAt: "2026-01-27T14:30:00Z",
    isPublic: true,
    likes: 62,
    views: 450,
    bookmarks: 41,
    featured: true,
  },
  {
    id: "3",
    title: "Infinite Scroll List",
    description: "Implement infinite scrolling with intersection observer",
    code: `import { useState, useEffect, useRef } from 'react';

function App() {
  const [items, setItems] = useState(Array.from({ length: 20 }, (_, i) => i + 1));
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setItems(prev => [
        ...prev,
        ...Array.from({ length: 20 }, (_, i) => prev.length + i + 1)
      ]);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Infinite Scroll Demo</h2>
      <div>
        {items.map(item => (
          <div
            key={item}
            style={{
              padding: '15px',
              margin: '10px 0',
              background: '#f0f0f0',
              borderRadius: '8px'
            }}
          >
            Item #{item}
          </div>
        ))}
      </div>
      <div ref={loaderRef} style={{ padding: '20px', textAlign: 'center' }}>
        {loading && <p>Loading more...</p>}
      </div>
    </div>
  );
}

export default App;`,
    language: "jsx",
    author: {
      name: "Ananya Roy",
      id: "user3",
    },
    tags: ["performance", "hooks", "api"],
    createdAt: "2026-01-26T09:15:00Z",
    updatedAt: "2026-01-26T09:15:00Z",
    isPublic: true,
    likes: 38,
    views: 275,
    bookmarks: 22,
  },
  {
    id: "4",
    title: "Animated Counter",
    description: "Smooth counting animation with easing function",
    code: `import { useState, useEffect, useRef } from 'react';

function useCountUp(end, duration = 2000) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration;

    const easeOutQuad = (t) => t * (2 - t);

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = easeOutQuad(progress);
      
      countRef.current = Math.floor(easedProgress * end);
      setCount(countRef.current);

      if (now < endTime) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [end, duration]);

  return count;
}

function App() {
  const [target, setTarget] = useState(100);
  const count = useCountUp(target);

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '72px', color: '#3b82f6', margin: '20px 0' }}>
        {count}
      </h1>
      <button
        onClick={() => setTarget(prev => prev + 100)}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Add 100
      </button>
    </div>
  );
}

export default App;`,
    language: "jsx",
    author: {
      name: "Vikram Mehta",
      id: "user4",
    },
    tags: ["animations", "hooks", "utils"],
    createdAt: "2026-01-25T16:45:00Z",
    updatedAt: "2026-01-25T16:45:00Z",
    isPublic: true,
    likes: 29,
    views: 198,
    bookmarks: 15,
  },
  {
    id: "5",
    title: "Form Validation Hook",
    description: "Reusable form validation with custom rules",
    code: `import { useState } from 'react';

function useFormValidation(initialValues, validationRules) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    const rules = validationRules[name];
    if (!rules) return '';

    for (const rule of rules) {
      const error = rule(value, values);
      if (error) return error;
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    const error = validate(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(validationRules).forEach(name => {
      const error = validate(name, values[name]);
      if (error) newErrors[name] = error;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      callback(values);
    }
  };

  return { values, errors, handleChange, handleSubmit };
}

function App() {
  const { values, errors, handleChange, handleSubmit } = useFormValidation(
    { email: '', password: '' },
    {
      email: [
        (value) => !value && 'Email is required',
        (value) => !/\\S+@\\S+\\.\\S+/.test(value) && 'Email is invalid'
      ],
      password: [
        (value) => !value && 'Password is required',
        (value) => value.length < 6 && 'Password must be at least 6 characters'
      ]
    }
  );

  const onSubmit = (data) => {
    alert('Form submitted: ' + JSON.stringify(data));
  };

  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '20px' }}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
          />
          {errors.email && <p style={{ color: 'red', fontSize: '14px' }}>{errors.email}</p>}
        </div>
        <div style={{ marginBottom: '20px' }}>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
          />
          {errors.password && <p style={{ color: 'red', fontSize: '14px' }}>{errors.password}</p>}
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;`,
    language: "jsx",
    author: {
      name: "Sneha Gupta",
      id: "user5",
    },
    tags: ["forms", "hooks", "utils"],
    createdAt: "2026-01-24T11:20:00Z",
    updatedAt: "2026-01-24T11:20:00Z",
    isPublic: true,
    likes: 51,
    views: 389,
    bookmarks: 35,
  },
];
