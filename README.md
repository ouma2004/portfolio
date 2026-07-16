# Portfolio — EDDARDARI Oumayma (v2)

## 📂 Structure
```
portfolio/
├── index.html   → Structure HTML complète
├── style.css    → Design dark élégant (Playfair Display)
├── main.js      → Interactions JS (filtres corrigés, curseur natif)
├── photo.jpg    → ⚠️ Ta photo (à ajouter toi-même)
└── README.md
```

## 📸 Ajouter ta photo
1. Copie ton image dans le dossier `portfolio/`
2. Renomme-la exactement `photo.jpg`
3. Elle apparaît automatiquement dans le hero et la section À propos
> Si pas de photo → les initiales "OE" s'affichent en doré

## 🚀 Déploiement GitHub + Netlify

### 1 — Push sur GitHub
```bash
git init
git add .
git commit -m "Portfolio Oumayma v2"
git remote add origin https://github.com/TON_USERNAME/portfolio.git
git push -u origin main
```

### 2 — Connecter Netlify
- https://netlify.com → New site from Git → GitHub → ton repo
- Build command : laisser vide
- Publish directory : `.`
- Deploy ✅

### 3 — Recevoir les emails du formulaire
Netlify → Forms → contact → Settings → activer notifications email

## 🔗 À personnaliser dans index.html
- `your.email@example.com` → ton vrai email (2 occurrences)
- LinkedIn href="#" → ton vrai lien
- GitHub href="#" → ton vrai lien
- Boutons "Voir le projet" → tes liens GitHub/démos
