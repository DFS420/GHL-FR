/**
 * GHL-FR v1.0.0 – Traduction client-side légère pour GoHighLevel
 * Compatible jsDelivr CDN
 * 
 * Usage via CDN:
 * <script src="https://cdn.jsdelivr.net/gh/[username]/GHL-FR@latest/src/translator.js"></script>
 */

(function() {
  'use strict';

  /* ─── Configuration ─── */
  const VERSION = '1.0.0';
  const allowedAccounts = ["oBm42dLMLP3NENViwU51"]; // Binette Ventilation
  
  /* ─── Vérification du sous-compte ─── */
  const match = location.pathname.match(/\/location\/([^/]+)/);
  if (!match || !allowedAccounts.includes(match[1])) {
    console.log('GHL-FR: Sous-compte non autorisé ou URL invalide');
    return;
  }
  
  console.log(`✅ GHL-FR v${VERSION} activé pour:`, match[1]);

  /* ─── Dictionnaire de traductions ─── */
  const translations = {
    /* Tableaux, CRM — principaux */
    "Ajouter Company": "Ajouter une entreprise",
    "Companies":       "Entreprises",
    "Company":         "Entreprise",
    "All":             "Tous",
    "Entreprise Name": "Nom d'entreprise",
    "Phone":           "Téléphone",
    "Email":           "Courriel",
    "Website":         "Site web",
    "Address":         "Adresse",
    "State":           "Province",
    "City":            "Ville",
    "Description":     "Description",
    "Postal Code":     "Code postal",
    "Country":         "Pays",
    "Name":            "Nom",
    "Body":            "Texte",
    "Created Date":    "Date de création",
    "Business Name":   "Nom d'entreprise",
    "Company Name":    "Nom d'entreprise",
    "Street Address":  "Adresse",
    "Created By":      "Créé par",

    /* Snippets */
    "Snippets":            "Extraits",
    "All Snippets":        "Tous les extraits",
    "Folders":             "Dossiers",
    "Search Snippets":     "Chercher des extraits",
    "Filters":             "Filtres",
    "Add Snippet":         "Ajouter un extrait",
    "Add Folder":          "Ajouter un dossier",
    "Folder":              "Dossier",
    "No Data":             "Aucune donnée",
    "Create snippets":     "Créez des modèles",
    "to":                  "pour",
    "quickly insert":      "insérer rapidement",
    "predefined content":  "du contenu pré-défini",
    "into messages":       "dans les messages",
    "for":                 "pour",
    "faster, consistent communication": "des communications rapides et efficaces",

    /* Conversations */
    "Unread":  "Non lu",
    "Recents": "Récents",
    "Starred": "Favoris",

    /* Opportunités / Paiements */
    "OpportunitéS": "Opportunités",
    "Paiements":    "Soumissions",

    /* États vides */
    "No unread conversations found": "Aucune conversation non lue trouvée",
    "No conversation selected":      "Aucune conversation sélectionnée",
    "No contact selected":           "Aucun contact sélectionné",

    /* Divers */
    "Dashboard": "Tableau de bord"
  };

  /* ─── Helpers ─── */
  const adaptCase = (src, tgt) =>
    src === src.toUpperCase() ? tgt.toUpperCase() :
    src[0] === src[0].toUpperCase() ? tgt[0].toUpperCase() + tgt.slice(1) :
    tgt;

  const isEditable = node => {
    for (let el = node.parentElement; el; el = el.parentElement) {
      if (
        ["INPUT","TEXTAREA","SELECT"].includes(el.tagName) ||
        el.isContentEditable ||
        el.getAttribute("role") === "textbox" ||
        el.classList.contains("ql-editor") ||
        el.classList.contains("ProseMirror")
      ) return true;
    }
    return false;
  };

  /* ─── Remplacement mot-à-mot ─── */
  function replaceWords(text) {
    for (const [src, tgt] of Object.entries(translations)
                                   .sort((a, b) => b[0].length - a[0].length)) {
      text = text.replace(
        new RegExp(`\\b${src}\\b`, "gi"),
        m => adaptCase(m, tgt)
      );
    }
    return text;
  }

  /* ─── Balayage & traduction ─── */
  function translateSubtree(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let n; (n = walker.nextNode());) {
      const p = n.parentElement;
      if (!p || p.dataset.translated === "true" || isEditable(n)) continue;
      const newText = replaceWords(n.textContent);
      if (newText !== n.textContent) {
        n.textContent = newText;
        p.dataset.translated = "true";
      }
    }
  }

  /* ─── MutationObserver léger ─── */
  let debounce;
  const observer = new MutationObserver(() => {
    clearTimeout(debounce);
    debounce = setTimeout(() => translateSubtree(document.body), 160);
  });
  observer.observe(document.body, { childList: true, subtree: true });

  /* ─── Initialisation ─── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => translateSubtree(document.body));
  } else {
    translateSubtree(document.body);
  }
  
  // Rattrapage pour les éléments chargés dynamiquement
  setTimeout(() => translateSubtree(document.body), 1200);

  /* ─── API globale (optionnelle) ─── */
  window.GHL_FR = {
    version: VERSION,
    translate: () => translateSubtree(document.body),
    addTranslations: (newTranslations) => Object.assign(translations, newTranslations)
  };

})(); 