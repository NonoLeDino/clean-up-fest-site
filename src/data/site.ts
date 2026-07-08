/**
 * Contenu central du site Clean Up Fest.
 * Modifiez ce fichier pour toucher tout le site (textes, dates, KPIs, partenaires, programme, lineup, news…).
 */

export const site = {
  nom: 'Clean Up Fest',
  organisateur: 'World Cleanup Day',
  ville: 'Lille',
  edition: 'Édition 2026',
  // Date de l'événement — [À REMPLIR : YYYY-MM-DDTHH:mm]
  dateEvent: '2026-09-19T10:00',
  dateAffichee: '19 SEPTEMBRE 2026',
  jourAffiche: 'SAM 19.09.26',
  lieu: 'Grand Place → Citadelle',
  horaires: '10h — 22h',
  valeur:
    "Une marche de 10 km gratuite pour ramasser les déchets ou une course chronométrée au profit du World CleanUp Day. " +
    "Tout le week-end : DJ sets en continu, food trucks locaux et une bière offerte à l'arrivée !",
  manifeste:
    "S'engager en s'ambiançant. Marcher 10 km pour nettoyer, ou courir pour reverser 25 €. " +
    "À l'arrivée : DJ, food, bière offerte.",
  accroche: 'Rejoignez le mouvement !',
  meta: {
    title: "Clean Up Fest — Le festival qui nettoie Lille",
    description:
      "Rejoignez le Clean Up Fest à Lille le 20 septembre 2026 : marchez ou courez au rythme d'un DJ, ramassez les déchets, faites la fête. Organisé avec World Cleanup Day.",
    ogImage: '/logos/clean-up-fest.png',
  },
  // Réseaux officiels de World Cleanup Day (organisation partenaire de l'événement)
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/worldcleanupday/',        handle: '@worldcleanupday',    icon: 'instagram' },
    { label: 'YouTube',   href: 'https://www.youtube.com/@WorldCleanupDay',         handle: 'World Cleanup Day',   icon: 'youtube' },
    { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/world-cleanup-day/', handle: 'World Cleanup Day', icon: 'linkedin' },
  ],
} as const;

/* ============ FORMULES ============ */
export type Formule = {
  id: 'marche' | 'course';
  titre: string;
  prix: string;
  desc: string;
  bullets: string[];
};

export const formules: Formule[] = [
  {
    id: 'marche',
    titre: 'Marche',
    prix: 'Gratuit',
    desc: "Marche citoyenne de 10 km. Ramassez les déchets au rythme d'un DJ set à vélo, en équipe et dans la bonne humeur.",
    bullets: [
      'Inscription gratuite',
      '10 km à travers Lille',
      'Sacs & gants fournis',
      "Bière offerte à l'arrivée",
    ],
  },
  {
    id: 'course',
    titre: 'Course',
    prix: '25 € solidaires',
    desc: "Courez pendant l'événement au rythme d'un DJ set. 100 % de l'inscription est reversée à World Cleanup Day.",
    bullets: [
      'Dossard officiel + chronométrage',
      "100 % de l'inscription reversée",
      'Sacs & gants fournis',
      "Bière offerte à l'arrivée",
    ],
  },
];

/* ============ UNIVERS (à la WLG "Green / Music / Talks / Food / Art / Comedy") ============ */
export type Univers = {
  id: string;
  titre: string;
  desc: string;
  couleur: 'green' | 'pink' | 'dark' | 'cream';
  icon: string;
  photo: string;
};

export const univers: Univers[] = [
  { id: 'clean',     titre: 'Clean',        desc: 'Ramassage collectif des déchets dans les rues de Lille, 10 km à travers la ville.', couleur: 'green', icon: 'leaf',   photo: '/media/photos/ai/volunteers-team-lille.jpg' },
  { id: 'music',     titre: 'Music',        desc: "Un DJ à vélo qui vous suit toute la journée. La cadence à votre rythme.",           couleur: 'pink',  icon: 'music',  photo: '/media/photos/ai/dj-on-bike.jpg' },
  { id: 'run',       titre: 'Run',          desc: "Une course 10 km chronométrée. 100 % de vos 25 € reversés à l'association.",         couleur: 'dark',  icon: 'run',    photo: '/media/photos/ai/runners-lille-street.jpg' },
  { id: 'food',      titre: 'Food & Drinks',desc: "Foodtrucks locaux et une bière artisanale offerte à l'arrivée.",                    couleur: 'cream', icon: 'cup',    photo: '/media/photos/ai/foodtruck-festival.jpg' },
  { id: 'talks',     titre: 'Talks',        desc: 'Conférences éclair sur le zéro-déchet, le mégot, la mode circulaire.',              couleur: 'green', icon: 'mic',    photo: '/media/photos/ai/briefing-volunteers.jpg' },
  { id: 'community', titre: 'Community',    desc: 'Écoles, entreprises, collectivités, particuliers. Ensemble en même temps.',         couleur: 'pink',  icon: 'people', photo: '/media/photos/ai/cleanup-crowd-lille.jpg' },
];

/* ============ PROGRAMME (créneaux dans la journée) ============ */
export type Creneau = {
  jour: 'Matin' | 'Après-midi' | 'Soir';
  horaires: string;
  titre: string;
  desc: string;
  lieu?: string;
};

export const programme: Creneau[] = [
  { jour: 'Matin', horaires: '09h00', titre: 'Ouverture village', desc: 'Retrait des kits, café, warm-up collectif.', lieu: 'Grand Place' },
  { jour: 'Matin', horaires: '10h00', titre: 'Départ Marche', desc: "3 km au rythme du DJ set — ouvert à tous, sacs & gants fournis.", lieu: 'Grand Place → Vauban' },
  { jour: 'Matin', horaires: '11h00', titre: 'Talk · Tchao Mégot', desc: 'Ce qu\'on fait des mégots après. Recyclage & doudounes solidaires.', lieu: 'Village · scène 1' },
  { jour: 'Après-midi', horaires: '13h00', titre: 'Foodtrucks', desc: 'Cuisine locale, options veggie & sans-gluten.', lieu: 'Village' },
  { jour: 'Après-midi', horaires: '14h30', titre: 'Départ Course', desc: '10 km chronométrés · dossard officiel · DJ live.', lieu: 'Grand Place → Citadelle' },
  { jour: 'Après-midi', horaires: '16h00', titre: 'Pesée collective', desc: 'On pèse ensemble ce qu\'on a ramassé. Chiffres en direct.', lieu: 'Citadelle' },
  { jour: 'Soir', horaires: '18h00', titre: 'Bière offerte', desc: 'À tous les participants — brasserie locale partenaire.', lieu: 'Citadelle' },
  { jour: 'Soir', horaires: '19h00', titre: 'Closing DJ Set', desc: 'Le boss de la journée en live. Set de clôture, ambiance festival.', lieu: 'Citadelle · scène principale' },
  { jour: 'Soir', horaires: '22h00', titre: 'Fin', desc: 'Merci d\'avoir été là. À l\'an prochain.', lieu: '' },
];

/* ============ LINEUP DJ (vignettes carrées à la WLG) ============ */
export type Artiste = {
  id: string;
  nom: string;
  slot: 'Marche' | 'Course' | 'Closing';
  photo: string;
  genre: string;
  headliner?: boolean;
};

export const lineup: Artiste[] = [
  { id: '1', nom: 'Nono',           slot: 'Marche',  photo: '/media/photos/portrait-8.jpg',        genre: 'French House' },
  { id: '2', nom: 'Verdure',        slot: 'Marche',  photo: '/media/photos/portrait-2.jpg',        genre: 'Deep House' },
  { id: '3', nom: 'Ella Cast',      slot: 'Course',  photo: '/media/photos/portrait-1.jpg',        genre: 'Techno' },
  { id: '4', nom: 'BPM Deûle',      slot: 'Course',  photo: '/media/photos/portrait-3.jpg',        genre: 'Progressive' },
  { id: '5', nom: 'Tekno Verdure',  slot: 'Course',  photo: '/media/photos/portrait-mid-woman.jpg',genre: 'Hard Techno' },
  { id: '6', nom: 'Sunset Kids',    slot: 'Closing', photo: '/media/photos/portrait-7.jpg',        genre: 'Disco Edits' },
  { id: '7', nom: 'Green Machine',  slot: 'Closing', photo: '/media/photos/portrait-6.jpg',        genre: 'Electro Live', headliner: true },
  { id: '8', nom: 'MC Alba',        slot: 'Closing', photo: '/media/photos/portrait-4.jpg',        genre: 'Hip-Hop / Spoken' },
];

/* ============ TÉMOIGNAGES ============ */
export type Temoignage = { nom: string; role: string; photo: string; quote: string };
export const temoignages: Temoignage[] = [
  {
    nom: 'Léa M.',
    role: 'Participante 2025 · Marche',
    photo: '/media/photos/portrait-4.jpg',
    quote: "J'étais venue pour la marche entre potes. Je suis repartie avec 12 kilos de mégots ramassés et une bière offerte. Sourire toute la journée.",
  },
  {
    nom: 'Karim B.',
    role: 'Coureur 10km · Podium H30',
    photo: '/media/photos/portrait-3.jpg',
    quote: "Une course sérieuse avec chrono, mais l'ambiance festival au milieu du parcours. On oublie la douleur, on danse un peu, on repart.",
  },
  {
    nom: 'F. R.',
    role: 'Responsable RSE · grande distribution, Lille',
    photo: '/media/photos/portrait-6.jpg',
    quote: "On a inscrit 40 salariés. Zéro relance interne. Le team building qui remplit vraiment sa promesse : le lien, la cause, la fête.",
  },
];

/* ============ FAQ ============ */
export type Faq = { q: string; a: string };
export const faqs: Faq[] = [
  { q: "C'est vraiment gratuit ?", a: "La marche est 100 % gratuite. Seule la course est payante (dossard + chronométrage + 100 % des bénéfices reversés à World Cleanup Day)." },
  { q: "Il faut apporter quelque chose ?", a: "Non — sacs, gants, dossard et gilet sont fournis sur place. Prévoyez des chaussures fermées, de l'eau et de la crème solaire selon la météo." },
  { q: "Je peux venir avec mon chien ?", a: "Oui pour la marche, tenu en laisse et hors zone de départ course. Une poche à eau canine sera disponible au village." },
  { q: "Et si je ne cours pas ?", a: "La marche est ouverte à tous, sans niveau requis. 3 km à vitesse tranquille, avec DJ set pour donner le rythme." },
  { q: "L'événement est accessible PMR ?", a: "Oui — le parcours de marche est accessible aux fauteuils et poussettes. Un accompagnant peut être demandé au moment de l'inscription." },
  { q: "Qui reçoit l'argent des dossards ?", a: "100 % des bénéfices sont reversés à l'association World Cleanup Day. Compte-rendu financier public publié 30 jours après l'événement." },
  { q: "Comment ma boîte peut participer ?", a: "Passez par le formulaire entreprise. On vous propose un pack team (10 à 200 salariés) avec brief interne, kits nominatifs et bilan carbone remis à la direction." },
  { q: "Il y aura à manger ?", a: "Foodtrucks locaux, options veggie et sans-gluten. Une bière artisanale offerte à l'arrivée pour tous les participants majeurs." },
];

/* ============ PRESS ============ */
export const press = [
  { nom: 'La Voix du Nord', citation: '« Un format qui rassemble sans moraliser. »', date: 'Édition 2025' },
  { nom: 'France Bleu Nord', citation: '« Le rendez-vous éco le plus fun de la métropole. »', date: 'Août 2025' },
  { nom: 'Konbini', citation: '« On aimerait que toutes les villes copient. »', date: 'Sept. 2025' },
  { nom: 'Grand Lille TV', citation: '« Un modèle qui essaime déjà. »', date: 'Oct. 2025' },
];

/* ============ AUDIENCES ============ */
export type Audience = {
  id: 'ecole' | 'entreprise' | 'collectivite' | 'particulier';
  titre: string;
  pitch: string;
  cta: string;
};

export const audiences: Audience[] = [
  {
    id: 'ecole',
    titre: 'École',
    pitch:
      "Fédérez vos élèves autour d'une action concrète. Journée banalisée, bonne humeur garantie.",
    cta: "Inscrire mon école",
  },
  {
    id: 'entreprise',
    titre: 'Entreprise',
    pitch:
      "Organisez un événement solidaire avec vos salariés, dans une ambiance festival.",
    cta: "Inscrire mon entreprise",
  },
  {
    id: 'collectivite',
    titre: 'Collectivité',
    pitch:
      "Impliquez vos administrés dans un événement civique fédérateur au cœur de Lille.",
    cta: "Devenir partenaire",
  },
  {
    id: 'particulier',
    titre: 'Particulier',
    pitch:
      "Agissez pour une ville plus propre — en marchant ou en courant, entre potes et en musique.",
    cta: "Je m'inscris",
  },
];

/* ============ KPI ============ */
export type Kpi = { valeur: string; label: string; sub?: string };

export const kpis: Kpi[] = [
  { valeur: '2340', label: 'kg de déchets ramassés', sub: 'édition 2025' },
  { valeur: '1500', label: 'participants',           sub: 'marcheurs & coureurs' },
  { valeur: '8250', label: 'euros reversés',         sub: 'à World Cleanup Day' },
  { valeur: '42800', label: 'mégots recyclés',       sub: 'par Tchao Mégot' },
];

/* ============ PARTENAIRES ============ */
export type Partenaire = { nom: string; logo: string; role: string; href?: string };

export const partenaires: Partenaire[] = [
  { nom: 'World Cleanup Day', logo: '/logos/world-cleanup-day.webp', role: 'Association bénéficiaire',        href: 'https://www.worldcleanupday.fr' },
  { nom: 'Tchao Mégot',       logo: '/logos/tchao-megot.png',        role: 'Recyclage & doudounes solidaires', href: 'https://tchaomegot.com' },
  { nom: 'We love Green',     logo: '/logos/we-love-green.png',      role: 'Partenaire festival',              href: 'https://www.welovegreen.fr' },
  { nom: 'Ville de Lille',    logo: '/logos/ville-lille.png',        role: 'Ville hôte',                       href: 'https://www.lille.fr' },
  { nom: 'MEL',               logo: '/logos/mel.jpg',                role: 'Métropole Européenne de Lille',    href: 'https://www.lillemetropole.fr' },
  { nom: 'Décathlon',         logo: '/logos/decathlon.svg',          role: 'Équipement course',                href: 'https://www.decathlon.fr' },
];

/* ============ ACTUALITÉS ============ */
export type News = {
  titre: string;
  chapo: string;
  date: string;
  tag: 'Partenaire' | 'Programme' | 'Édition' | 'Coulisses';
  image?: string;
  href?: string;
};

export const news: News[] = [
  { titre: 'Tchao Mégot rejoint le Clean Up Fest',       chapo: 'Tous les mégots ramassés seront recyclés en matière première ou en doudounes solidaires.', date: '2026-06-14', tag: 'Partenaire', image: '/media/photos/ai/cigarette-butts-hand.jpg',     href: '#' },
  { titre: "La brasserie La Choulette offre les bières", chapo: "Une bière artisanale du Nord offerte à tous les participants à l'arrivée à la Citadelle.", date: '2026-05-22', tag: 'Partenaire', image: '/media/photos/ai/beer-finish-line.jpg',         href: '#' },
  { titre: 'Le programme du 19 septembre est en ligne',  chapo: 'Marche, course, talks, foodtrucks, closing set. Tout est prêt.',                            date: '2026-05-10', tag: 'Programme',  image: '/media/photos/ai/aerial-march-grand-place.jpg', href: '#' },
  { titre: 'Édition 2025 : les chiffres',                chapo: 'Retour sur une première édition qui a dépassé toutes nos attentes.',                         date: '2026-04-02', tag: 'Édition',    image: '/media/photos/ai/cleanup-crowd-lille.jpg',      href: '#' },
];

/* ============ MAP / PARCOURS ============ */
export type MapPoint = {
  id: string;
  x: number;   // % 0-100
  y: number;   // % 0-100
  titre: string;
  horaires: string;
  desc: string;
  type: 'start' | 'checkpoint' | 'finish' | 'village';
};

export type Route = {
  id: 'marche' | 'course';
  label: string;
  distance: string;
  duree: string;
  denivele: string;
  prix: string;
  couleur: string;
  path: string;     // SVG path (0-100 based)
  points: MapPoint[];
};

// Google Maps waypoints (adresses réelles à Lille) pour matcher 10 km / durée annoncée
export const gmapWaypoints = {
  marche: {
    origin: 'Grand Place, Lille',
    // Grande boucle festive et touristique dans Lille (~10 km à pied)
    waypoints: [
      'Vieux Lille, Lille',
      'Porte de Roubaix, Lille',
      'Gare Lille Flandres, Lille',
      'Parc Jean-Baptiste Lebas, Lille',
      'Wazemmes, Lille',
      'Boulevard Vauban, Lille',
      'Bois de Boulogne, Lille',
    ],
    destination: 'Citadelle de Lille',
  },
  course: {
    origin: 'Grand Place, Lille',
    // Boucle sportive plus rectiligne
    waypoints: [
      'Gare Lille Flandres, Lille',
      'Boulevard Louis XIV, Lille',
      'Parc Jean-Baptiste Lebas, Lille',
      'Wazemmes, Lille',
      'Bois de Boulogne, Lille',
      'Champ de Mars, Lille',
    ],
    destination: 'Citadelle de Lille',
  },
} as const;

export const routes: Route[] = [
  {
    id: 'marche',
    label: 'Marche · 10 km',
    distance: '10 km',
    duree: '~3h00',
    denivele: '+35 m',
    prix: 'Gratuit',
    couleur: '#315C2B',
    path: 'M 15 78 C 22 70, 35 74, 42 62 S 58 48, 70 42 S 84 30, 88 22',
    points: [
      { id: 'm1', x: 15, y: 78, type: 'start',      titre: 'Départ · Grand Place',    horaires: '10h00', desc: "Village d'accueil, café, kits & briefing équipes." },
      { id: 'm2', x: 42, y: 62, type: 'village',    titre: 'Village · Rihour',        horaires: '10h45', desc: 'Foodtrucks, pause boisson, DJ à vélo qui vous suit.' },
      { id: 'm3', x: 70, y: 42, type: 'checkpoint', titre: 'Ramassage · Vauban',      horaires: '11h30', desc: 'Zone de ramassage collectif, tri sur place.' },
      { id: 'm4', x: 88, y: 22, type: 'finish',     titre: 'Arrivée · Citadelle',     horaires: '13h00', desc: "Pesée, bière offerte, closing set jusqu'à 22h." },
    ],
  },
  {
    id: 'course',
    label: 'Course · 10 km',
    distance: '10 km',
    duree: '~50 min',
    denivele: '+42 m',
    prix: '25 €',
    couleur: '#FF007F',
    path: 'M 15 78 C 30 82, 45 70, 55 78 S 78 82, 82 66 S 60 52, 50 50 S 30 42, 32 30 S 55 28, 68 34 S 82 26, 88 22',
    points: [
      { id: 'c1', x: 15, y: 78, type: 'start',      titre: 'Départ · Grand Place',    horaires: '14h30', desc: 'Retrait dossards & chronomètre. Sas départ 14h15.' },
      { id: 'c2', x: 55, y: 78, type: 'checkpoint', titre: 'Km 2 · Wazemmes',          horaires: '14h45', desc: 'Premier ravito eau + fruits.' },
      { id: 'c3', x: 82, y: 66, type: 'checkpoint', titre: 'Km 4 · Moulins',          horaires: '14h55', desc: 'Boucle sud, ambiance quartier.' },
      { id: 'c4', x: 50, y: 50, type: 'village',    titre: 'Km 5 · Village central',  horaires: '15h05', desc: 'DJ live + supporters. Ambiance festival.' },
      { id: 'c5', x: 32, y: 30, type: 'checkpoint', titre: 'Km 7 · Bois de Boulogne', horaires: '15h15', desc: 'Ravitaillement 2, zone verte.' },
      { id: 'c6', x: 68, y: 34, type: 'checkpoint', titre: 'Km 9 · Vauban',           horaires: '15h25', desc: 'Dernière ligne droite, cheerleaders.' },
      { id: 'c7', x: 88, y: 22, type: 'finish',     titre: 'Arrivée · Citadelle',     horaires: '15h30', desc: 'Chronomètre + médaille + bière offerte.' },
    ],
  },
];

/* ============ INSTAGRAM WALL ============ */
export type IgPost = { image: string; caption: string; likes: number; days: number };
export const igPosts: IgPost[] = [
  { image: '/media/photos/ai/ig-before-after.jpg',      caption: "Avant / après : la rue du Molinel. Merci à celles et ceux qui rendent Lille plus propre.",  likes: 4508, days: 2 },
  { image: '/media/photos/ai/ig-team-highfive.jpg',     caption: "High-five d'équipe après 4h de ramassage. On est raccord. #CleanUpFest2025",              likes: 3120, days: 5 },
  { image: '/media/photos/ai/march-2025-belfry.jpg',    caption: "Le Beffroi nous a vus passer. 1 500 pas engagés dans le silence puis la fête.",           likes: 2412, days: 7 },
  { image: '/media/photos/ai/ig-portrait-vol.jpg',      caption: "Portrait · Amina, bénévole depuis 2024. « J'en fais mon rendez-vous annuel. »",           likes: 2201, days: 10 },
  { image: '/media/photos/ai/ig-medal.jpg',             caption: "La médaille officielle 10K — faite en matière recyclée. Sur chaque cou d'arrivant.",       likes: 2778, days: 12 },
  { image: '/media/photos/ai/ig-food-plate.jpg',        caption: "La cuisine nomade nous régale. Bio, local, savoureux. 🍽️ #foodtruck",                     likes: 1620, days: 14 },
  { image: '/media/photos/ai/dj-on-bike.jpg',           caption: "Merci @dj_verdure pour ce set incroyable ✨ Un DJ à vélo, c'était pas gagné.",             likes: 3455, days: 18 },
  { image: '/media/photos/ai/coat-to-homeless.jpg',     caption: "Doudounes offertes aux maraudes du Nord — mégots récoltés = chaleur redistribuée. ❤️",     likes: 1876, days: 21 },
  { image: '/media/photos/ai/march-2025-finish.jpg',    caption: "Arrivée du 10K solidaire — 8 250 € reversés à @worldcleanupday 🏃‍♀️",                     likes: 1892, days: 25 },
];
export const pratique = [
  { titre: 'Lieu',      valeur: 'Grand Place, Lille',       sub: 'Départ village · retrait des kits'                    , icon: 'map' },
  { titre: 'Date',      valeur: '20 septembre 2026',        sub: 'De 10h à 22h · Dimanche'                              , icon: 'calendar' },
  { titre: 'Accès',     valeur: 'Métro Rihour',             sub: 'Ligne 1 · Vélib\' · Parkings à proximité'             , icon: 'metro' },
  { titre: 'Kit',       valeur: 'Sacs, gants, dossards',    sub: 'Fournis sur place, retrait dès 9h00'                  , icon: 'kit' },
  { titre: 'Restauration', valeur: 'Foodtrucks locaux',     sub: 'Options veggie & sans-gluten · bière offerte'         , icon: 'food' },
  { titre: 'Contact',   valeur: 'hello@cleanupfest.fr',     sub: 'Réponse sous 48h'                                     , icon: 'mail' },
];

/* ============ STORYBOARD ============ */
export const storyboard: string[] = [
  'Des habitants de la métropole constatent que les rues sont sales et cherchent une action à mener.',
  'Des sportifs cherchent une course à pied dans Lille.',
  'Des entreprises veulent organiser un événement solidaire avec leurs salariés.',
  'Ils arrivent sur le site pour participer au Clean Up Fest et découvrent le parcours du festival.',
  "Ils participent dans une ambiance festive : marche et ramassage au rythme d'un DJ set, ou course payante. L'argent est reversé à World Cleanup Day, des bières sont offertes.",
  'Les déchets sont recyclés par Tchao Mégot (matière première ou doudounes pour des causes caritatives).',
  "Les participants partagent l'événement, en parlent et reviennent aux prochaines éditions.",
];

/* ============ NAV ============ */
export const nav = [
  { label: 'Programme',   href: '/#programme' },
  { label: 'Participer',  href: '/participer' },
  { label: 'Galerie',     href: '/galerie' },
  { label: 'Partenaires', href: '/partenaires' },
  { label: 'Contact',     href: '/#contact' },
] as const;

// Point d'intégration formulaire — à brancher plus tard (Formspree/Tally/Brevo)
export const FORM_ENDPOINT = '[À REMPLIR]';
