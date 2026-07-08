#!/usr/bin/env node
/**
 * Génération d'images IA via Gemini API (Nano Banana 2.5)
 * ------------------------------------------------------
 * Usage :
 *   1. Récupère une clé API gratuite : https://aistudio.google.com/apikey
 *   2. Ajoute-la dans .env :  GEMINI_API_KEY=xxx
 *   3. npm run generate-images
 *
 * Les images sont sauvegardées dans public/media/photos/ai/
 * Une image déjà présente n'est pas re-générée (idempotent).
 */

import { GoogleGenAI, Modality } from '@google/genai';
import { writeFile, mkdir, access } from 'node:fs/promises';
import { config as loadEnv } from 'dotenv';
import path from 'node:path';

loadEnv();

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error('❌ GEMINI_API_KEY manquant dans .env. Récupère-la sur https://aistudio.google.com/apikey');
  process.exit(1);
}

// Direction artistique commune, injectée dans chaque prompt
const STYLE_TAIL =
  'Photorealistic photo, editorial festival photography, natural lighting, ' +
  'high detail, cinematic composition, real people no watermark, 4:3 aspect ratio, colors muted with subtle green (#315C2B) and hot pink (#FF007F) accents.';

const IMAGES = [
  {
    slug: 'cleanup-crowd-lille',
    aspect: '16:9',
    prompt:
      "Wide angle shot: diverse group of French citizens in casual sportswear ramassing des déchets on the cobbled Grand Place de Lille, blue sky, festival atmosphere with green banners and pink flags, people smiling, some wearing gloves and holding trash bags. " + STYLE_TAIL,
  },
  {
    slug: 'cigarette-butts-hand',
    aspect: '4:3',
    prompt:
      "Extreme close-up: a gloved human hand holding a pile of collected cigarette butts, cinematic shallow depth of field, urban asphalt background out of focus, morning light. " + STYLE_TAIL,
  },
  {
    slug: 'volunteers-team-lille',
    aspect: '4:3',
    prompt:
      "Group of 5 diverse volunteers (mixed genders, ages 20-45) in bright green vests, wearing gloves, working together to pick up trash from a cobbled Lille street, French architecture background, joyful teamwork. " + STYLE_TAIL,
  },
  {
    slug: 'dj-on-bike',
    aspect: '4:3',
    prompt:
      "Creative DJ setup mounted on a colorful cargo bike, DJ mixing on the go while people around dance and pick up litter, city street, sunset golden hour, festival vibe. " + STYLE_TAIL,
  },
  {
    slug: 'coat-to-homeless',
    aspect: '4:3',
    prompt:
      "Warm human moment: a young volunteer handing a modern green puffer jacket to a homeless person sitting near a Lille metro entrance, respectful and dignified, cold winter evening light, subtle pink neon reflection. " + STYLE_TAIL,
  },
  {
    slug: 'runners-lille-street',
    aspect: '4:3',
    prompt:
      "Diverse group of runners passing on the Grand Place de Lille cobbles at sunrise, race bib numbers visible, motion blur, autumn atmosphere, spectators cheering. " + STYLE_TAIL,
  },
  {
    slug: 'foodtruck-festival',
    aspect: '4:3',
    prompt:
      "Local French artisan foodtruck at a city festival with a line of hungry festivalgoers, warm string lights, dusk, chalkboard menu visible, chef preparing food. " + STYLE_TAIL,
  },
  {
    slug: 'beer-finish-line',
    aspect: '4:3',
    prompt:
      "Craft beers in glass bottles being handed out at a finish line, blurred crowd of runners behind, wooden bar, natural late afternoon light, pink accent decorations. " + STYLE_TAIL,
  },
  {
    slug: 'green-puffer-recycled',
    aspect: '4:3',
    prompt:
      "Product photography: a modern eco puffer jacket in olive green hanging on a wooden coat stand in a bright studio, a small paper tag reads 'issu de mégots recyclés', minimalist background, soft daylight. " + STYLE_TAIL,
  },
  {
    slug: 'briefing-volunteers',
    aspect: '4:3',
    prompt:
      "A team leader briefing 15 diverse volunteers in a park, morning, holding a clipboard, everyone attentive, casual sporty clothing, autumn trees background. " + STYLE_TAIL,
  },
  {
    slug: 'aerial-march-grand-place',
    aspect: '16:9',
    prompt:
      "Aerial drone shot of a citizen march departing from Grand Place de Lille, hundreds of participants seen from above with green flags and pink balloons, historic French architecture visible, sunny day. " + STYLE_TAIL,
  },
  {
    slug: 'trash-transformation',
    aspect: '4:3',
    prompt:
      "Split-frame concept photo: on the left, a pile of cigarette butts, on the right, an olive green puffer jacket, connected by a subtle arrow of green light, minimalist studio background, editorial magazine style. " + STYLE_TAIL,
  },
  // ================ Batch 2 : Marche Lille 2025 pour la galerie ================
  {
    slug: 'march-2025-belfry',
    aspect: '4:3',
    prompt:
      "Wide shot of a citizen march passing in front of the iconic Belfry of Lille (Beffroi de Lille), participants holding pink and green flags, autumn morning, warm sunlight, French urban architecture. " + STYLE_TAIL,
  },
  {
    slug: 'march-2025-family',
    aspect: '4:3',
    prompt:
      "Documentary photo: a smiling family with two kids (ages 8 and 10) picking up trash together in a park in Lille, morning light, wearing casual sportswear and gloves, feeling of pride and community. " + STYLE_TAIL,
  },
  {
    slug: 'march-2025-selfie',
    aspect: '4:3',
    prompt:
      "Group of 6 diverse volunteers taking a selfie with their filled trash bags, big smiles, Lille cobblestone street background, warm afternoon light, feeling of achievement. " + STYLE_TAIL,
  },
  {
    slug: 'march-2025-dj-crowd',
    aspect: '4:3',
    prompt:
      "DJ on a mobile bike stage surrounded by a dancing crowd of runners and walkers, everyone smiling and cleaning up as they move, sunny day in Lille, festival vibe. " + STYLE_TAIL,
  },
  {
    slug: 'march-2025-finish',
    aspect: '4:3',
    prompt:
      "Runners crossing a finish line arch marked 'CLEAN UP FEST' at the Citadelle de Lille, arms raised in victory, medals being placed on necks, joyful crowd cheering, golden hour. " + STYLE_TAIL,
  },
  {
    slug: 'march-2025-cleanup',
    aspect: '4:3',
    prompt:
      "Close-up documentary photo: hands picking up a plastic bottle from cobblestone Lille street, filled trash bag beside, morning natural light, gritty realistic texture. " + STYLE_TAIL,
  },
  {
    slug: 'march-2025-beer',
    aspect: '4:3',
    prompt:
      "Group of tired but happy participants clinking beer bottles at the end of the day, wooden picnic tables in a Lille park, string lights, sunset light, casual celebration. " + STYLE_TAIL,
  },
  // ================ Batch 3 : Posts Instagram (square, plus intimate) ================
  {
    slug: 'ig-before-after',
    aspect: '1:1',
    prompt:
      "Photo split diptych of the same Lille cobblestone street: left side dirty with trash and cigarette butts, right side clean and tidy, same angle same time of day, editorial before/after. " + STYLE_TAIL,
  },
  {
    slug: 'ig-team-highfive',
    aspect: '1:1',
    prompt:
      "Two diverse volunteers giving each other a high-five in a Lille street, holding filled trash bags, mid-action photo, joyful energy, editorial lifestyle shot. " + STYLE_TAIL,
  },
  {
    slug: 'ig-portrait-vol',
    aspect: '1:1',
    prompt:
      "Environmental portrait of a young Black female volunteer wearing a Clean Up Fest tshirt, holding a trash grabber tool, Lille street blurred behind, warm smile, golden hour. " + STYLE_TAIL,
  },
  {
    slug: 'ig-medal',
    aspect: '1:1',
    prompt:
      "Close-up macro shot of a Clean Up Fest race medal made of upcycled materials, hanging on a runner's neck, sweat visible, victorious mood, product photography feel. " + STYLE_TAIL,
  },
  {
    slug: 'ig-food-plate',
    aspect: '1:1',
    prompt:
      "Top-down flat lay of a delicious sustainable meal from a foodtruck: quinoa salad, roasted vegetables, herbal tea, wooden serving board, natural light. " + STYLE_TAIL,
  },
  // ================ Batch 4 : Contact background ================
  {
    slug: 'team-behind',
    aspect: '16:9',
    prompt:
      "Warm team photo: 8 diverse young event organizers of Clean Up Fest gathered casually in a bright Lille loft office, laughing together, walls covered with pink and green posters, natural window light, editorial documentary style. " + STYLE_TAIL,
  },
];

const OUT_DIR = path.resolve('public/media/photos/ai');

async function fileExists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function generateOne(ai, item) {
  const outputPath = path.join(OUT_DIR, `${item.slug}.jpg`);
  if (await fileExists(outputPath)) {
    console.log(`⏭️  ${item.slug}.jpg déjà présent, skip.`);
    return { skipped: true };
  }
  console.log(`🎨  Génération de ${item.slug}.jpg ...`);
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: item.prompt,
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });
    const parts = response.candidates?.[0]?.content?.parts ?? [];
    const imgPart = parts.find((p) => p.inlineData?.data);
    if (!imgPart) {
      const textPart = parts.find((p) => p.text);
      throw new Error(`Pas d'image dans la réponse. Text: ${textPart?.text?.slice(0, 200) ?? '(aucun)'}`);
    }
    const buf = Buffer.from(imgPart.inlineData.data, 'base64');
    await writeFile(outputPath, buf);
    console.log(`✅  ${item.slug}.jpg (${(buf.length / 1024).toFixed(1)} Ko)`);
    return { ok: true, bytes: buf.length };
  } catch (err) {
    console.error(`❌  ${item.slug}: ${err.message}`);
    return { ok: false, error: err.message };
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const ai = new GoogleGenAI({ apiKey: API_KEY });

  console.log(`\n🖼️   Génération de ${IMAGES.length} images via Gemini 2.5 Flash Image\n   → ${OUT_DIR}\n`);

  let ok = 0, skipped = 0, fail = 0;
  for (const item of IMAGES) {
    const r = await generateOne(ai, item);
    if (r.ok) ok++;
    else if (r.skipped) skipped++;
    else fail++;
    // petit délai pour éviter rate limit sur free tier
    await new Promise((r) => setTimeout(r, 800));
  }
  console.log(`\n📊  ${ok} générées · ${skipped} déjà présentes · ${fail} échecs`);
  if (fail > 0) process.exitCode = 1;
}

main().catch((e) => { console.error(e); process.exit(1); });
