# Daily AI Content Handoff Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish Daily's on-device AI privacy disclosures and acknowledgements at the static URLs used by the mobile app.

**Architecture:** Keep the legal content as self-contained static HTML under `public/daily/`. Add a small Node verification script, following the existing `verify-daily-route.mjs` pattern, to lock down the content contract and ordering without adding a parser dependency.

**Tech Stack:** Semantic HTML5, inline CSS, Node.js ESM verification scripts, Vite production build

## Global Constraints

- The Acknowledgements page must use the same inline visual system as `public/daily/privacy.html`.
- Preserve the handoff's product names, model names, attribution statements, URLs, license notice, and `support@sfng.co` exactly apart from HTML encoding.
- The Privacy Policy effective date must be `2026-08-07`.
- Do not change `public/daily/terms.html`, the React application, navigation, or routing.
- The source of truth for page copy is `/Users/sfung/.codex/attachments/50bbf994-65fa-440d-aa91-277f21567e5d/pasted-text.txt`.

---

## File Map

- Create `public/daily/acknowledgements.html`: self-contained Acknowledgements document and copied legal-page styling.
- Modify `public/daily/privacy.html`: add the AI section, replace the opening Third Party Access paragraph, and update the effective date.
- Create `scripts/verify-daily-content.mjs`: deterministic assertions for both pages' content, ordering, links, and shared visual tokens.
- Modify `package.json`: expose the verifier as `npm run verify:daily-content`.

### Task 1: Privacy Policy Content Contract

**Files:**
- Create: `scripts/verify-daily-content.mjs`
- Modify: `package.json:6-13`
- Modify: `public/daily/privacy.html:92-164`

**Interfaces:**
- Consumes: UTF-8 static HTML at `public/daily/privacy.html`.
- Produces: an `npm run verify:daily-content` command that exits nonzero with a specific missing-content or ordering error.

- [x] **Step 1: Add the failing Privacy Policy verifier**

Create `scripts/verify-daily-content.mjs` with these exact helpers and privacy checks:

```js
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
assertIncludes(privacy, 'The feature does not send this entry content to SFNG LLC, Google, Hugging Face, or another cloud AI service for inference.', 'the local-inference disclosure');
assertIncludes(privacy, 'href="https://huggingface.co/privacy"', 'the Hugging Face Privacy Policy link');
assertIncludes(privacy, 'The Application may contact third-party service providers when needed to deliver particular features', 'the revised Third Party Access paragraph');
assertIncludes(privacy, 'The Application does not send entry terms, draft fields, or AI-generated responses to a third party for cloud AI inference.', 'the third-party inference limitation');
assertIncludes(privacy, 'This privacy policy is effective as of 2026-08-07.', 'the publication date');
assertBefore(privacy, '<h2>On-Device AI Assistant (Beta)</h2>', '<h2>Cookies and Tracking Technologies</h2>', 'the AI section before Cookies and Tracking Technologies');

if (privacy.includes('[publication date]')) {
  throw new Error('Expected the publication-date placeholder to be removed.');
}
```

Add this script after `verify:daily-route` in `package.json`, retaining valid JSON punctuation:

```json
"verify:daily-content": "node scripts/verify-daily-content.mjs"
```

- [x] **Step 2: Run the verifier and confirm the expected failure**

Run: `npm run verify:daily-content`

Expected: FAIL with `Expected the on-device AI privacy heading.`

- [x] **Step 3: Apply the three Privacy Policy edits**

In `public/daily/privacy.html`, transcribe the handoff's complete “On-Device AI Assistant (Beta)” copy immediately after the closing `</ul>` for Information Collection and Use. Encode the Hugging Face link as:

```html
<a href="https://huggingface.co/privacy">Privacy Policy</a>
```

Replace only the first paragraph following `<h2>Third Party Access</h2>` with the handoff's replacement paragraph. Leave `<h2>International Data Transfers</h2>` and every following disclosure unchanged.

Change the effective-date element to:

```html
<p class="effective-date">This privacy policy is effective as of 2026-08-07.</p>
```

- [x] **Step 4: Run the focused verifier**

Run: `npm run verify:daily-content`

Expected: PASS with exit code 0 and no output.

- [x] **Step 5: Review the Privacy diff and commit**

Run: `git diff --check && git diff -- public/daily/privacy.html scripts/verify-daily-content.mjs package.json`

Confirm the existing disclosure list and every section after the first Third Party Access paragraph remain intact.

```bash
git add public/daily/privacy.html scripts/verify-daily-content.mjs package.json
git commit -m "feat: update Daily AI privacy disclosures"
```

### Task 2: Acknowledgements Page

**Files:**
- Create: `public/daily/acknowledgements.html`
- Modify: `scripts/verify-daily-content.mjs`

**Interfaces:**
- Consumes: the exact Acknowledgements copy in the handoff and visual tokens from `public/daily/privacy.html`.
- Produces: `/daily/acknowledgements.html` as a standalone static document; expands `npm run verify:daily-content` to cover it.

- [x] **Step 1: Expand the verifier before creating the page**

Append these checks to `scripts/verify-daily-content.mjs`:

```js
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
```

- [x] **Step 2: Run the verifier and confirm the expected failure**

Run: `npm run verify:daily-content`

Expected: FAIL because `public/daily/acknowledgements.html` does not exist.

- [x] **Step 3: Create the standalone Acknowledgements page**

Create `public/daily/acknowledgements.html` by copying the complete document shell and `<style>` block from `public/daily/privacy.html`. Make these structural changes:

```html
<title>Daily Acknowledgements</title>
<article>
  <h1>Acknowledgements</h1>
  <h2>Gemma 4</h2>
  <h2>LiteRT-LM</h2>
  <h2>FlutterGemma</h2>
  <h3>MIT License</h3>
  <h2>Contact</h2>
  <footer>
  </footer>
</article>
```

Transcribe all text and links between `# Acknowledgements` and the closing horizontal rule in the handoff into the structural positions above. Use one unordered list per link group. Encode quotation marks in the MIT disclaimer as `&quot;` so the verifier and rendered text agree. Preserve the empty styled `<footer>` used by the existing legal pages.

Add this subordinate-heading rule immediately after the copied `h2` rule so the MIT License hierarchy remains visually consistent rather than inheriting browser-default `h3` styling:

```css
h3 {
  margin: 24px 0 8px;
  font-size: 1rem;
  line-height: 1.3;
}
```

- [x] **Step 4: Run focused content and build verification**

Run: `npm run verify:daily-content`

Expected: PASS with exit code 0 and no output.

Run: `npm run build`

Expected: PASS and `dist/daily/acknowledgements.html` plus `dist/daily/privacy.html` exist.

Run: `cmp public/daily/acknowledgements.html dist/daily/acknowledgements.html && cmp public/daily/privacy.html dist/daily/privacy.html`

Expected: PASS, confirming Vite copied both static documents unchanged.

- [x] **Step 5: Review the Acknowledgements diff and commit**

Run: `git diff --check && git diff -- public/daily/acknowledgements.html scripts/verify-daily-content.mjs`

Confirm the copy ends at Contact and does not include the handoff's internal “Verified Source Facts” or “Publication Check” sections.

```bash
git add public/daily/acknowledgements.html scripts/verify-daily-content.mjs
git commit -m "feat: add Daily acknowledgements page"
```

### Task 3: Integrated and Visual Verification

**Files:**
- Verify: `public/daily/privacy.html`
- Verify: `public/daily/acknowledgements.html`
- Verify: `dist/daily/privacy.html`
- Verify: `dist/daily/acknowledgements.html`

**Interfaces:**
- Consumes: the completed static pages and repository verification commands.
- Produces: evidence that the source contract, production artifacts, and responsive presentation are correct.

- [x] **Step 1: Run all repository checks**

Run these commands separately, using the repository's established npm invocation pattern:

```bash
npm run verify:daily-route
npm run verify:daily-content
npm run lint
npm run build
git diff --check
```

Expected: every command exits 0. The build emits both Daily static content pages under `dist/daily/`.

- [x] **Step 2: Serve the production build**

Run: `npm run preview -- --host 127.0.0.1`

Keep the preview process running for browser inspection.

- [x] **Step 3: Inspect the Acknowledgements page at two viewport widths**

Open `http://127.0.0.1:4173/daily/acknowledgements.html` at approximately 1280×900 and 390×844.

At both sizes, confirm:

- the page uses the same gray canvas, white bordered card, typography, link color, and spacing as Privacy;
- headings and link lists remain within the card;
- long URLs wrap without horizontal overflow;
- the MIT License is readable and does not clip;
- the narrow layout retains 16-pixel outer gutters.

- [x] **Step 4: Inspect the updated Privacy page**

Open `http://127.0.0.1:4173/daily/privacy.html`. Confirm the AI section appears after Information Collection and Use, the Hugging Face link is visibly styled like existing links, and the effective date reads `2026-08-07`.

- [x] **Step 5: Review final scope and status**

Run: `git status --short && git log -3 --oneline`

Expected: only the implementation-plan file remains uncommitted unless it was intentionally included in a documentation commit; recent history contains the two Conventional Commits from Tasks 1 and 2. Confirm no Terms, React, routing, or unrelated files changed.
