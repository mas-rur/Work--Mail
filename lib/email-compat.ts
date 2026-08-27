export type CompatNote = {
  label: string;
  ok: boolean;
  note: string;
};

// Outlook desktop renders HTML email with Word's engine, not a browser
// engine — these are the patterns most likely to break there. This is
// pattern-matching, not a real multi-client rendering test.
export function checkClientCompatibility(html: string): CompatNote[] {
  const has = (pattern: RegExp) => pattern.test(html);

  return [
    {
      label: "No flexbox or grid layout",
      ok: !has(/display\s*:\s*(flex|grid)/i),
      note: "Outlook desktop ignores display:flex and display:grid — use tables for layout instead.",
    },
    {
      label: "No background images",
      ok: !has(/background(-image)?\s*:\s*url\(/i),
      note: "Outlook desktop strips CSS background-image. Use an <img> tag if the image matters.",
    },
    {
      label: "No absolute/fixed positioning",
      ok: !has(/position\s*:\s*(absolute|fixed)/i),
      note: "Positioned elements often collapse or overlap unpredictably in Outlook desktop.",
    },
    {
      label: "No embedded SVG",
      ok: !has(/<svg[\s>]/i),
      note: "Inline SVG isn't supported in Outlook desktop — use a PNG/JPG fallback.",
    },
    {
      label: "No box-shadow",
      ok: !has(/box-shadow\s*:/i),
      note: "box-shadow is silently ignored in Outlook desktop — harmless, but won't show.",
    },
  ];
}
