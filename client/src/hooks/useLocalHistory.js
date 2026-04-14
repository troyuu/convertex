import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'convertex_history';
const MAX_HISTORY = 50;

function loadHistory() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveHistory(history) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // localStorage may be full or unavailable
  }
}

export function useLocalHistory() {
  const [history, setHistory] = useState(loadHistory);

  useEffect(() => {
    saveHistory(history);
  }, [history]);

  const addEntry = useCallback((entry) => {
    const id = Date.now().toString();
    setHistory((prev) => {
      const newEntry = {
        ...entry,
        id,
        date: new Date().toISOString(),
      };
      const updated = [newEntry, ...prev].slice(0, MAX_HISTORY);
      return updated;
    });
    return id;
  }, []);

  const updateEntry = useCallback((id, updates) => {
    setHistory((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, ...updates } : entry))
    );
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { history, addEntry, updateEntry, clearHistory };
}
