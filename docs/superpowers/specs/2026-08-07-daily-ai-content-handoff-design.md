# Daily AI Content Handoff Design

## Goal

Publish the complete Daily website content handoff by updating the existing Privacy Policy and adding an Acknowledgements page at the URL already used by the Daily mobile app.

## Scope

- Update `public/daily/privacy.html` with the supplied on-device AI disclosure, revised third-party access language, and an effective date of August 7, 2026.
- Add `public/daily/acknowledgements.html` containing the supplied acknowledgements and license copy.
- Preserve the existing Daily legal-page aesthetics and static deployment model.
- Do not modify the Terms page, React application, navigation, routing, or unrelated content.

## Page Structure and Presentation

The Acknowledgements page will be a standalone semantic HTML document. It will copy the inline visual system from `public/daily/privacy.html`: the same color variables, system font stack, centered 760-pixel content width, responsive padding, white bordered article surface, heading scale, list spacing, link color, and footer treatment.

The content hierarchy will use one `h1` for the page title, `h2` elements for Gemma 4, LiteRT-LM, FlutterGemma, and Contact, and an `h3` for the embedded MIT License. The supplied attribution links will be rendered as unordered lists. The MIT License will use ordinary paragraphs so it remains readable and visually consistent with the existing legal pages.

## Privacy Policy Changes

The supplied “On-Device AI Assistant (Beta)” section will appear immediately after the existing Information Collection and Use section and its list, before Cookies and Tracking Technologies.

Only the first paragraph under Third Party Access will be replaced. The following international-transfer language, disclosure introduction, and disclosure list will remain unchanged.

The effective-date sentence will be updated to `This privacy policy is effective as of 2026-08-07.` No publication-date placeholder will remain.

## Content Fidelity

The handoff copy will be preserved except for HTML encoding and structural markup. Product names, model names, license notices, non-affiliation wording, URLs, and `support@sfng.co` will not be paraphrased.

External links will use ordinary anchors, and the support address will use a `mailto:` link. The page will not claim affiliation with or endorsement by Google or Hugging Face.

## Verification

- Run the production build and confirm both static pages are emitted under `dist/daily/`.
- Check that all required headings, model links, license text, privacy language, and the publication date are present.
- Confirm that `[publication date]` does not appear in the source or built page.
- Check the changed files for malformed HTML using the repository's available tooling.
- Inspect the Acknowledgements page at desktop and narrow viewport widths to confirm it retains the Privacy page's responsive layout and readable long-form text.
- Run `git diff --check` and review the final diff for unrelated changes.
