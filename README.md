# 🇫🇷 GHL-FR - Traducteur GoHighLevel

Script de traduction client-side pour GoHighLevel, permettant de traduire l'interface anglaise en français de manière légère et non-intrusive.

## 🚀 Installation rapide (jsDelivr CDN)

Ajoutez simplement cette ligne dans votre extension ou userscript :

```html
<script src="https://cdn.jsdelivr.net/gh/[USERNAME]/GHL-FR@latest/src/translator.js"></script>
```

> 💡 **Note :** Remplacez `[USERNAME]` par votre nom d'utilisateur GitHub

## 📦 Versions disponibles

- **Stable :** `@v1.0.0` - Version fixe, ne change jamais
- **Latest :** `@latest` - Toujours la dernière version

```html
<!-- Version stable (recommandée pour production) -->
<script src="https://cdn.jsdelivr.net/gh/[USERNAME]/GHL-FR@v1.0.0/src/translator.js"></script>

<!-- Version latest (pour développement) -->
<script src="https://cdn.jsdelivr.net/gh/[USERNAME]/GHL-FR@latest/src/translator.js"></script>
```

## 🎯 Fonctionnalités

- ✅ **Filtrage par compte** - Seulement sur les comptes autorisés
- ✅ **Traduction automatique** - Détecte et traduit le contenu dynamique
- ✅ **Performance optimisée** - Debounce et observer léger
- ✅ **Préservation de l'édition** - Ne traduit pas le contenu éditable
- ✅ **Respect de la casse** - Majuscules/minuscules préservées

## 🔧 Configuration

### Comptes autorisés

Modifiez la liste des comptes dans `src/translator.js` :

```javascript
const allowedAccounts = [
  "oBm42dLMLP3NENViwU51", // Binette Ventilation
  // Ajoutez d'autres IDs ici
];
```

### API disponible

```javascript
// Vérifier la version
console.log('Version:', window.GHL_FR.version);

// Forcer une traduction manuelle
window.GHL_FR.translate();

// Ajouter des traductions personnalisées
window.GHL_FR.addTranslations({
    "Custom Term": "Terme personnalisé"
});
```

## 📂 Structure du projet

```
GHL-FR/
├── src/
│   └── translator.js      # Script principal (source et CDN)
├── examples/
│   └── integration.html   # Exemples d'intégration
└── README.md
```

## 🛠️ Développement

### Ajouter des traductions

1. Modifiez le dictionnaire dans `src/translator.js`
2. Commitez et pushez

### Publier une nouvelle version

```bash
# Taguer une nouvelle version
git tag v1.0.1
git push origin v1.0.1

# jsDelivr sera automatiquement mis à jour !
```

## 📖 Exemples d'utilisation

### Extension Chrome/Firefox

```javascript
// content-script.js
if (location.hostname.includes('app.gohighlevel.com')) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/[USERNAME]/GHL-FR@latest/src/translator.js';
    document.head.appendChild(script);
}
```

### Userscript (Tampermonkey)

```javascript
// ==UserScript==
// @name         GHL-FR Translator
// @namespace    http://tampermonkey.net/
// @version      1.0
// @match        https://app.gohighlevel.com/*
// @require      https://cdn.jsdelivr.net/gh/[USERNAME]/GHL-FR@latest/src/translator.js
// ==/UserScript==
```

## 🔗 Liens utiles

- **Voir le fichier en action :** [examples/integration.html](examples/integration.html)
- **jsDelivr Stats :** `https://www.jsdelivr.com/package/gh/[USERNAME]/GHL-FR`
- **Cache Purge :** `https://purge.jsdelivr.net/gh/[USERNAME]/GHL-FR@latest/src/translator.js`

## 📝 Licence

MIT License - Libre d'utilisation et modification. 