import React, { useState, useEffect } from "react";

function InsightsDisplay({ generatedInsights }) {
  const [displayedHTML, setDisplayedHTML] = useState(""); // Store the displayed HTML content
  const typingSpeed = 50; // Speed of typing in milliseconds

  useEffect(() => {
    if (!generatedInsights) 
      {
        generatedInsights = "<div>An Error Occured While Generating Content, Please Contact An Admin</div>"
      } 
    let currentIndex = 0;
    let currentHTML = ""; // Local state to build the HTML without duplication

    const tagRegex = /(<[^>]+>|[^<]+)/g; // Split content by HTML tags and text
    const parts = generatedInsights.match(tagRegex) || []; // Split into parts

    const typeCharacter = () => {
      if (currentIndex < parts.length) {
        currentHTML += parts[currentIndex]; // Add the next part to the local HTML string
        setDisplayedHTML(currentHTML); // Update state with the latest HTML
        currentIndex++;
        setTimeout(typeCharacter, typingSpeed); // Continue typing effect
      }
    };

    // Clear displayed content and reset variables
    setDisplayedHTML("");
    currentHTML = "";
    currentIndex = 0;

    typeCharacter(); // Start typing animation when component mounts

    return () => {
      setDisplayedHTML(""); // Clean up on unmount or input change
    };
  }, [generatedInsights]);

  return (
    <div className="p-10 rounded-xl bg-white text-gray-700 shadow-md">
      <h4 className="text-2xl font-semibold">AI Insights</h4>
      <div
        className="mt-5"
        dangerouslySetInnerHTML={{ __html: displayedHTML }}
      />
      <span className="animate-blink">|</span> {/* Blinking cursor */}
    </div>
  );
}

export default InsightsDisplay;
