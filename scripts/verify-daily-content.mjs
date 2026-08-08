import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';

const root = resolve(import.meta.dirname, '..');

function readPage(relativePath) {
  return readFileSync(resolve(root, relativePath), 'utf8');
}

function assertIncludes(document, value, label) {
  if (!document.includes(value)) {
    throw new Error(`Expected ${label}.`);
  }
}

function assertBefore(document, first, second, label) {
  const firstIndex = document.indexOf(first);
  const secondIndex = document.indexOf(second);
  if (firstIndex === -1 || secondIndex === -1 || firstIndex >= secondIndex) {
    throw new Error(`Expected ${label}.`);
  }
}

const privacy = readPage('public/daily/privacy.html');

assertIncludes(privacy, '<h2>On-Device AI Assistant (Beta)</h2>', 'the on-device AI privacy heading');
assertIncludes(privacy, 'When you request a suggestion, the text already entered is processed by the AI model on your device.', 'the generalized on-device input disclosure');
assertIncludes(privacy, 'The feature does not send this entry content to SFNG LLC, Google, Hugging Face, or another cloud AI service for inference.', 'the local-inference disclosure');
assertIncludes(privacy, 'href="https://huggingface.co/privacy"', 'the Hugging Face Privacy Policy link');
assertIncludes(privacy, 'The Application may contact third-party service providers when needed to deliver particular features', 'the revised Third Party Access paragraph');
assertIncludes(privacy, 'The Application does not send entry terms, draft fields, or AI-generated responses to a third party for cloud AI inference.', 'the third-party inference limitation');
assertIncludes(privacy, 'This privacy policy is effective as of 2026-08-07.', 'the publication date');
assertBefore(privacy, '<h2>On-Device AI Assistant (Beta)</h2>', '<h2>Cookies and Tracking Technologies</h2>', 'the AI section before Cookies and Tracking Technologies');

if (privacy.includes('[publication date]')) {
  throw new Error('Expected the publication-date placeholder to be removed.');
}

if (privacy.includes('part-of-speech, definition, and note fields')) {
  throw new Error('Expected the on-device input disclosure to remain field-agnostic.');
}

const acknowledgements = readPage('public/daily/acknowledgements.html');

for (const [value, label] of [
  ['<title>Daily Acknowledgements</title>', 'the Acknowledgements document title'],
  ['<h1>Acknowledgements</h1>', 'the Acknowledgements page heading'],
  ['<h2>Gemma 4</h2>', 'the Gemma 4 section'],
  ['<h2>LiteRT-LM</h2>', 'the LiteRT-LM section'],
  ['<h2>FlutterGemma</h2>', 'the FlutterGemma section'],
  ['<h3>MIT License</h3>', 'the MIT License heading'],
  ['Gemma 4 E4B', 'the E4B model attribution'],
  ['Gemma 4 E2B', 'the E2B model attribution'],
  ['Daily is not affiliated with or endorsed by Google.', 'the Google non-affiliation statement'],
  ['Copyright © 2024 Sasha Denisov', 'the FlutterGemma copyright notice'],
  ['THE SOFTWARE IS PROVIDED &quot;AS IS&quot;', 'the MIT warranty disclaimer'],
  ['href="mailto:support@sfng.co"', 'the support email link'],
]) {
  assertIncludes(acknowledgements, value, label);
}

for (const url of [
  'https://ai.google.dev/gemma/docs/core/model_card_4',
  'https://ai.google.dev/gemma/apache_2',
  'https://huggingface.co/litert-community/gemma-4-E4B-it-litert-lm',
  'https://huggingface.co/litert-community/gemma-4-E2B-it-litert-lm',
  'https://github.com/google-ai-edge/LiteRT-LM',
  'https://www.apache.org/licenses/LICENSE-2.0',
  'https://github.com/DenisovAV/flutter_gemma',
  'https://pub.dev/packages/flutter_gemma',
  'https://pub.dev/packages/flutter_gemma_litertlm',
]) {
  assertIncludes(acknowledgements, `href="${url}"`, `the acknowledgement link ${url}`);
}

for (const token of [
  '--background: #f8f9fa;',
  '--surface: #ffffff;',
  '--text: #171717;',
  '--muted: #575757;',
  '--border: #dedede;',
  '--accent: #0047ff;',
  'width: min(760px, calc(100% - 32px));',
  'padding: clamp(24px, 5vw, 48px);',
]) {
  assertIncludes(acknowledgements, token, `the shared visual token ${token}`);
}
