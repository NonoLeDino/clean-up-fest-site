#!/usr/bin/env node
/**
 * Génération vidéo aftermovie via Google Veo (Gemini API)
 * -------------------------------------------------------
 * Usage : npm run generate-video
 * Sortie : public/media/video/aftermovie.mp4
 * Note : Veo peut nécessiter un compte payant. Si échec, fallback YouTube embed.
 */

import { GoogleGenAI } from '@google/genai';
import { writeFile, mkdir, access } from 'node:fs/promises';
import { config as loadEnv } from 'dotenv';
import path from 'node:path';

loadEnv();

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) { console.error('❌ GEMINI_API_KEY manquant'); process.exit(1); }

const PROMPT =
  "Aerial drone view of a citizen march through the historic Grand Place of Lille, France. " +
  "Hundreds of participants holding pink and green flags walk down cobblestone streets, some picking up litter along the way. " +
  "A DJ on a colorful cargo bike leads the parade. Warm afternoon light, cinematic, joyful festival atmosphere, " +
  "smooth drone tracking shot from above, editorial documentary style, color grade with subtle green (#315C2B) and hot pink (#FF007F) accents.";

const OUT = path.resolve('public/media/video/aftermovie.mp4');
const OUT_DIR = path.dirname(OUT);

// Try multiple Veo models in order
const MODELS = ['veo-3.1-lite-generate-preview', 'veo-3.1-fast-generate-preview', 'veo-3.1-generate-preview'];

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  try { await access(OUT); console.log('⏭️  aftermovie.mp4 déjà présent, skip.'); return; } catch {}

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  for (const model of MODELS) {
    console.log(`\n🎬  Tentative avec ${model} ...`);
    try {
      let op = await ai.models.generateVideos({
        model,
        prompt: PROMPT,
        config: { numberOfVideos: 1, aspectRatio: '16:9', durationSeconds: 8 },
      });
      console.log('   ⏳ opération lancée, poll toutes les 10 s ...');
      while (!op.done) {
        await new Promise((r) => setTimeout(r, 10_000));
        op = await ai.operations.getVideosOperation({ operation: op });
        process.stdout.write('.');
      }
      const video = op.response?.generatedVideos?.[0];
      if (!video?.video?.uri) throw new Error('Pas de vidéo dans la réponse');
      console.log('\n   ⏬ téléchargement ...');
      await ai.files.download({ file: video.video, downloadPath: OUT });
      console.log(`✅  aftermovie.mp4 sauvegardé (${model})`);
      return;
    } catch (err) {
      console.log(`   ❌ ${model} : ${err.message?.slice(0, 200)}`);
    }
  }
  console.error('\n💥 Aucun modèle Veo disponible. Utiliser YouTube embed fallback.');
  process.exit(1);
}

main().catch((e) => { console.error(e); process.exit(1); });
