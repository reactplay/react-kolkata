// components/ui/ScrollToTopButton.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react'; // Assuming you use lucide-react for icons
import { Button } from './button'; // Assuming your Button component is in this folder

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 1. Set up scroll event listener to track visibility
  useEffect(() => {
    const toggleVisibility = () => {
      // Show button if page Y offset is greater than 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // 2. Scroll to the top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) {
    return null;
  }

  // 3. Render the button (using Tailwind for styling and fixed positioning)
  return (
    <Button
      onClick={scrollToTop}
      size="icon" // Use size="icon" for a standard square/round button size
      aria-label="Scroll to top"
      // Fixed position, bottom-8 and right-8 for margin, high z-index
      className="fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full bg-slate-50 hover:bg-slate-200 text-slate-900 shadow-xl transition-all duration-300"
      // Using a light background for visibility against the dark page theme
      variant="default" 
    >
      <ChevronUp className="h-6 w-6" />
    </Button>
  );
};

export default ScrollToTopButton;