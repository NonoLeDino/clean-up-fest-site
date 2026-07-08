# Logos & médias

Déposez les fichiers ci-dessous dans ce dossier. Les fichiers manquants tombent sur un fallback texte automatiquement (le site ne casse pas).

## Fichiers attendus

| Fichier | Rôle | Dimensions conseillées |
|---|---|---|
| `clean-up-fest.png` (fourni) | Logo principal vert néon (header/footer/hero) | ≥ 1024×1024, fond transparent |
| `clean-up-fest-pink.png` (fourni) | Variante rose néon | ≥ 1024×1024 |
| `favicon.svg` | Favicon | 32×32 min, SVG idéalement |
| `world-cleanup-day.svg` | Logo partenaire bénéficiaire | 200×80 min |
| `tchao-megot.svg` | Logo partenaire recyclage | 200×80 min |
| `we-love-green.svg` | Logo partenaire festival | 200×80 min |
| `partenaire-1.svg` … `partenaire-n.svg` | Slots partenaires additionnels | 200×80 min |

## Médias (dans `public/media/`)

| Fichier | Rôle | Format |
|---|---|---|
| `ambiance.mp4` | Vidéo d'ambiance homepage | MP4 H.264, ≤ 20 s, ≤ 5 Mo |
| `ambiance-poster.jpg` | Poster de la vidéo (fallback) | 1920×1080 |
| `galerie/*.jpg` | Photos galerie | ≥ 1200 px de large |

Une fois vos médias déposés, décommentez la balise `<video>` dans `src/components/VideoAmbiance.astro`.
