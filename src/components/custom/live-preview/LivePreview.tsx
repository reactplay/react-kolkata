"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle } from "lucide-react";

interface LivePreviewProps {
  code: string;
  error?: string;
}

export default function LivePreview({ code, error }: LivePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    setPreviewError(null);

    const iframeDoc = iframeRef.current.contentDocument;
    if (!iframeDoc) return;

    // Create the preview HTML
    const previewHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: system-ui, -apple-system, sans-serif;
      overflow-x: hidden;
    }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    try {
      ${code}
      
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(<App />);
    } catch (error) {
      window.parent.postMessage({ 
        type: 'PREVIEW_ERROR', 
        error: error.message 
      }, '*');
      
      const root = document.getElementById('root');
      root.innerHTML = \`
        <div style="padding: 20px; background: #fee; color: #c00; border-left: 4px solid #c00;">
          <strong>Error:</strong> \${error.message}
        </div>
      \`;
    }
  </script>
</body>
</html>
    `;

    iframeDoc.open();
    iframeDoc.write(previewHTML);
    iframeDoc.close();
  }, [code]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "PREVIEW_ERROR") {
        setPreviewError(event.data.error);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="relative h-full w-full bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
      {/* Preview Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Live Preview
        </span>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs text-gray-500">Running</span>
        </div>
      </div>

      {/* Error Display */}
      {(error || previewError) && (
        <div className="absolute top-12 left-4 right-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 z-10">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-red-900 dark:text-red-100 mb-1">
                Execution Error
              </h4>
              <p className="text-sm text-red-700 dark:text-red-300 font-mono">
                {error || previewError}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Preview Frame */}
      <iframe
        ref={iframeRef}
        title="Code Preview"
        sandbox="allow-scripts"
        className="w-full h-[calc(100%-40px)] bg-white"
      />
    </div>
  );
}
