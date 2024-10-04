import React, { useState, useEffect } from "react";

function InsightsDisplay({ generatedInsights }) {
  const [displayedHTML, setDisplayedHTML] = useState(""); // Store the displayed HTML content
  const typingSpeed = 50; // Speed of typing in milliseconds

  useEffect(() => {
    if (!generatedInsights) return "An Error Occured While Generating Insights. Please Contact an admin."; 
    let currentIndex = 0;
    const tagRegex = /(<[^>]+>|[^<]+)/g; // Split content by HTML tags
    const parts = generatedInsights.match(tagRegex); // Split HTML and text parts

    const typeCharacter = () => {
      if (currentIndex < parts.length) {
        setDisplayedHTML((prev) => prev + parts[currentIndex]); // Append the next part (tag or text)
        currentIndex++;
        setTimeout(typeCharacter, typingSpeed); // Continue typing
      }
    };

    setDisplayedHTML(""); // Clear the displayed content on new input
    typeCharacter(); // Start typing animation when component mounts
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
