(function () {
  'use strict';
  
  // Translation dictionary
  const translations = {
    "OpportunitéS": "Opportunités"
  };
  
  // Function to translate text content
  function translateText(text) {
    let translatedText = text;
    for (const [original, translation] of Object.entries(translations)) {
      // Handle text with surrounding whitespace
      translatedText = translatedText.replace(new RegExp(`\\s*${original}\\s*`, 'g'), ` ${translation} `);
      // Handle exact matches
      translatedText = translatedText.replace(new RegExp(original, 'g'), translation);
    }
    return translatedText;
  }
  
  // Function to translate all text nodes
  function translatePage() {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    
    let node;
    const textNodes = [];
    while (node = walker.nextNode()) {
      textNodes.push(node);
    }
    
    textNodes.forEach(textNode => {
      const originalText = textNode.textContent;
      if (originalText) {
        const newText = translateText(originalText);
        if (newText !== originalText) {
          textNode.textContent = newText;
        }
      }
    });
  }
  
  // Run translation when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', translatePage);
  } else {
    translatePage();
  }
  
  // Create global API
  window.GHL_FR = {
    version: '1.0.0',
    translate: translatePage,
    addTranslations: function(newTranslations) {
      Object.assign(translations, newTranslations);
    }
  };
  
  console.log("✅ Script GHL-FR chargé avec succès depuis GitHub via CDN !");
})();
