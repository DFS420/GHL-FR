# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GHL-FR is a client-side translation script for GoHighLevel, designed to translate the English interface to French. It's a lightweight, non-intrusive solution that works via CDN delivery through jsDelivr.

## Architecture

This is a simple JavaScript library with CDN distribution:

- **Core Script**: `src/translator.js` - Main translation logic (currently minimal implementation)
- **Integration Examples**: `examples/integration.html` - Complete integration guide and examples
- **Injectable Script**: `src/ghl-inject.html` - Simple HTML wrapper for the script
- **Distribution**: Via jsDelivr CDN at `https://cdn.jsdelivr.net/gh/[USERNAME]/GHL-FR@[VERSION]/src/translator.js`

## Key Features Expected

Based on the README, the translator should include:
- Account filtering (only authorized accounts)
- Automatic translation with dynamic content detection
- Performance optimization (debouncing, lightweight observer)
- Content preservation (no translation of editable content)
- Case preservation (uppercase/lowercase maintained)
- Global API access via `window.GHL_FR`

## Development Workflow

### Current State
The project is in early development - `src/translator.js` contains only a basic console log placeholder.

### Key Development Tasks
1. **Core Translation Engine**: Implement the main translation dictionary and text replacement logic
2. **Account Authorization**: Add account ID filtering system (`allowedAccounts` array)
3. **DOM Observer**: Implement MutationObserver for dynamic content translation
4. **Performance Optimization**: Add debouncing and efficient text scanning
5. **API Implementation**: Create `window.GHL_FR` global object with methods:
   - `translate()` - Manual translation trigger
   - `addTranslations()` - Custom translation additions
   - `version` - Version information

### Versioning and Release
```bash
# Create and push new version
git tag v1.0.1
git push origin v1.0.1
```

jsDelivr automatically picks up new tags and makes them available via CDN.

### Testing
- Test integration using `examples/integration.html`
- Verify CDN loading with different version patterns (@latest, @v1.0.0)
- Test on actual GoHighLevel interface at `app.gohighlevel.com`

## Configuration

### Allowed Accounts
The script should filter by account IDs defined in the `allowedAccounts` array within `src/translator.js`:

```javascript
const allowedAccounts = [
  "oBm42dLMLP3NENViwU51", // Binette Ventilation
  // Add other account IDs here
];
```

### Integration Patterns
The script supports multiple integration methods:
1. Direct script inclusion
2. Conditional loading (GoHighLevel domains only) 
3. Dynamic script injection with error handling

## CDN Distribution

- **Stable**: `@v1.0.0` - Fixed version, never changes
- **Latest**: `@latest` - Always the newest version
- **Cache**: jsDelivr caches files; use version tags for cache control

## Target Environment

- **Platform**: GoHighLevel SaaS platform (`app.gohighlevel.com`)
- **Usage**: Browser extensions, userscripts, or direct web injection
- **Client-side only**: No server-side dependencies