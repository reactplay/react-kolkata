"use client";

import { useState, useEffect } from "react";
import { PlaygroundState } from "@/types/playground";

interface CodeEditorProps {
  initialCode?: string;
  language?: "javascript" | "typescript" | "jsx" | "tsx";
  onChange?: (code: string) => void;
  readOnly?: boolean;
}

export default function CodeEditor({
  initialCode = "",
  language = "jsx",
  onChange,
  readOnly = false,
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [lineNumbers, setLineNumbers] = useState<number[]>([]);

  useEffect(() => {
    const lines = code.split("\n").length;
    setLineNumbers(Array.from({ length: lines }, (_, i) => i + 1));
  }, [code]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    onChange?.(newCode);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newCode = code.substring(0, start) + "  " + code.substring(end);
      setCode(newCode);
      onChange?.(newCode);
      
      // Set cursor position after tab
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div className="relative h-full w-full bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-xs text-gray-400 uppercase">{language}</span>
      </div>

      {/* Code Editor */}
      <div className="flex h-[calc(100%-40px)]">
        {/* Line Numbers */}
        <div className="flex-shrink-0 w-12 bg-gray-800 text-gray-500 text-right py-4 pr-2 text-sm font-mono select-none overflow-hidden">
          {lineNumbers.map((num) => (
            <div key={num} className="leading-6">
              {num}
            </div>
          ))}
        </div>

        {/* Code Area */}
        <textarea
          value={code}
          onChange={handleCodeChange}
          onKeyDown={handleKeyDown}
          readOnly={readOnly}
          spellCheck={false}
          className="flex-1 bg-gray-900 text-gray-100 p-4 font-mono text-sm leading-6 resize-none outline-none"
          style={{
            tabSize: 2,
            fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
          }}
        />
      </div>
    </div>
  );
}
