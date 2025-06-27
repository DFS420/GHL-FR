# GHL-FR - Projet de Traduction GoHighLevel

## 🎯 Objectif
Script de traduction client-side pour GoHighLevel, permettant de traduire l'interface anglaise en français de manière légère et non-intrusive.

## 🏗️ Architecture

### Structure du projet
```
GHL-FR/
├── dist/               # Version minifiée pour production
│   ├── ghl-translator.min.js
│   └── ghl-translator.js
├── src/                # Code source
│   ├── translator.js   # Script principal
│   └── translations.js # Dictionnaire de traductions
├── examples/           # Exemples d'utilisation
│   └── integration.html
└── README.md          # Documentation
```

## 🚀 Méthodes de déploiement

1. **GitHub Pages** - Hébergement gratuit via GitHub
2. **jsDelivr CDN** - CDN gratuit basé sur GitHub
3. **Netlify** - Déploiement automatique

## 🎨 Style & Conventions

- Code JavaScript moderne (ES6+)
- Pas de dépendances externes
- Performance optimisée (debounce, observer léger)
- Support multi-comptes via liste blanche

## 🔧 Fonctionnalités

- Filtrage par sous-comptes autorisés
- Traduction des nœuds texte non-éditables
- Observer de mutations avec debounce
- Préservation de la casse (majuscules/minuscules)
- Protection contre l'édition de contenu utilisateur 