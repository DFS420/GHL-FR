(function () {
  'use strict';
  
  // Translation dictionary
  const translations = {
    "OpportunitéS": "Opportunités"
  };
  
  let isTranslating = false;
  
  // Function to translate text content
  function translateText(text) {
    let translatedText = text;
    for (const [original, translation] of Object.entries(translations)) {
      translatedText = translatedText.replace(new RegExp(original, 'g'), translation);
    }
    return translatedText;
  }
  
  // Function to translate all text nodes
  function translatePage() {
    if (isTranslating) return;
    isTranslating = true;
    
    console.log('🔄 Running translation...');
    
    const walker = document.createTreeWalker(
      document.body || document,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    
    let node;
    const textNodes = [];
    while (node = walker.nextNode()) {
      textNodes.push(node);
    }
    
    let translatedCount = 0;
    textNodes.forEach(textNode => {
      const originalText = textNode.textContent;
      if (originalText && originalText.trim()) {
        const newText = translateText(originalText);
        if (newText !== originalText) {
          textNode.textContent = newText;
          translatedCount++;
          console.log(`✅ Translated: "${originalText.trim()}" → "${newText.trim()}"`);
        }
      }
    });
    
    console.log(`🎯 Translation complete: ${translatedCount} texts translated`);
    isTranslating = false;
  }
  
  // Debounced translate function for MutationObserver
  let translateTimeout;
  function debouncedTranslate() {
    clearTimeout(translateTimeout);
    translateTimeout = setTimeout(translatePage, 100);
  }
  
  // Set up MutationObserver to watch for dynamic content
  const observer = new MutationObserver((mutations) => {
    let shouldTranslate = false;
    mutations.forEach(mutation => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        shouldTranslate = true;
      }
    });
    if (shouldTranslate) {
      debouncedTranslate();
    }
  });
  
  // Start observing when ready
  function startTranslation() {
    // Initial translation
    translatePage();
    
    // Watch for dynamic changes
    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
      console.log('👀 MutationObserver started - watching for dynamic content');
    }
  }
  
  // Run translation when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startTranslation);
  } else {
    startTranslation();
  }
  
  // Also run after a short delay to catch late-loading content
  setTimeout(translatePage, 1000);
  setTimeout(translatePage, 3000);
  
  // Create global API
  window.GHL_FR = {
    version: '1.1.0',
    translate: translatePage,
    addTranslations: function(newTranslations) {
      Object.assign(translations, newTranslations);
      translatePage(); // Re-translate with new additions
    },
    translations: translations // For debugging
  };
  
  console.log("✅ Script GHL-FR chargé avec succès depuis GitHub via CDN !");
})();
