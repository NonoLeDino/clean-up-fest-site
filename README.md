# Clean Up Fest — site web

Site événementiel du **Clean Up Fest**, festival engagé en plein air à Lille organisé autour du **World Cleanup Day**. Stack : **Astro + Tailwind + TypeScript**, statique, déployable sur Vercel/Netlify.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # build statique dans ./dist
npm run preview    # servir le build local
```

## Arborescence

```
clean-up-fest-site/
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
├── public/
│   ├── logos/
│   │   ├── clean-up-fest.png          # logo principal (fourni)
│   │   ├── clean-up-fest-pink.png     # variante rose (fourni)
│   │   ├── favicon.svg
│   │   ├── world-cleanup-day.svg      # à déposer
│   │   ├── tchao-megot.svg            # à déposer
│   │   ├── we-love-green.svg          # à déposer
│   │   └── README.md
│   └── media/                          # vidéo d'ambiance, photos galerie
├── src/
│   ├── components/
│   │   ├── AudienceCards.astro
│   │   ├── Countdown.astro
│   │   ├── DjBlock.astro
│   │   ├── Footer.astro
│   │   ├── FormuleToggle.astro
│   │   ├── Gallery.astro
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── InscriptionForm.astro
│   │   ├── KpiBlock.astro
│   │   ├── Logo.astro
│   │   ├── MapPreview.astro
│   │   ├── PartnersRow.astro
│   │   ├── SectionExplain.astro
│   │   └── VideoAmbiance.astro
│   ├── data/
│   │   └── site.ts                     # 🎯 CONTENU CENTRAL (textes, KPIs, dates…)
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro                 # Accueil
│   │   ├── le-festival.astro
│   │   ├── participer.astro
│   │   ├── parcours.astro
│   │   ├── galerie.astro
│   │   ├── partenaires.astro
│   │   └── inscription.astro
│   └── styles/
│       ├── theme.css                   # 🎨 CHARTE GRAPHIQUE (couleurs, typo)
│       └── global.css
└── README.md
```

## Où éditer quoi ?

| Besoin | Fichier |
|---|---|
| **Changer une couleur / typo** | `src/styles/theme.css` — variables CSS, Tailwind branché dessus |
| **Textes, KPIs, partenaires, dates** | `src/data/site.ts` |
| **Fixer la date de l'événement** | `dateEvent` dans `src/data/site.ts` (format ISO `YYYY-MM-DDTHH:mm`) |
| **Ajouter un partenaire** | Ajoutez une entrée dans `partenaires` (`site.ts`) + déposez son SVG dans `public/logos/` |
| **Vidéo d'ambiance** | Déposez `public/media/ambiance.mp4` puis décommentez la `<video>` dans `VideoAmbiance.astro` |
| **Photos galerie** | `public/media/galerie/*.jpg` puis adaptez `Gallery.astro` |
| **Endpoint formulaire** | Constante `FORM_ENDPOINT` dans `src/data/site.ts` (Formspree/Tally/Brevo…) |

## Charte graphique

Toutes les couleurs passent par des variables CSS définies dans `src/styles/theme.css`. Tailwind est branché sur ces variables (`bg-primary`, `text-accent`, etc.) via `tailwind.config.mjs`. **Changer de charte = éditer `theme.css` uniquement.**

Palette actuelle (fournie) :
- **Vert principal** `#315C2B`
- **Rose accent** `#FF007F`
- Fond blanc chaud `#FFFAF7`
- Section sombre `#14211A`

Typographie :
- **Fredoka** (display, headings) — matche le côté bubble/néon du logo
- **Inter** (body) — clean & lisible

## Formulaire d'inscription

Le formulaire (`/inscription`) est un placeholder frontend. Tant que la constante `FORM_ENDPOINT` vaut `[À REMPLIR]`, la soumission déclenche uniquement un message de confirmation simulé — aucun `POST` réel n'est effectué. Pour le brancher :

1. Créez un endpoint (Formspree, Tally, Brevo, Google Forms…)
2. Renseignez son URL dans `FORM_ENDPOINT` (`src/data/site.ts`)
3. Décommentez le `fetch` dans `InscriptionForm.astro`

## Accessibilité & perf

- Contrastes AA (WCAG 2.1)
- Navigation clavier + focus visibles
- `prefers-reduced-motion` respecté
- Zéro JS sur les sections statiques (îlots seulement où utile : countdown, toggle formule, menu mobile, form)
- Images en `loading="lazy"` sauf hero

## Déploiement

Le site est **100% statique**. Après `npm run build`, le dossier `dist/` est publiable sur Vercel, Netlify, Cloudflare Pages, GitHub Pages…

## À remplir plus tard

Cherchez `[À REMPLIR]` dans le repo :
- `dateEvent` (déjà fixée provisoirement au 2026-09-20, à ajuster)
- Valeurs des KPIs
- Endpoint formulaire
- Éventuellement les pitchs École/Collectivité si vous voulez les enrichir
