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
