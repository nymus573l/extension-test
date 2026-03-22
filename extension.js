// ─── GRIM IDE CUSTOM THEME EXTENSION ──────────────────────────────────────
// ID: synthwave-theme
console.log("[Grim Extension] Injecting SynthWave '84 Theme...");

// 1. Inject the IDE global UI CSS variables 
// These will map flawlessly when `data-theme-id="synthwave-84"` is active.
const aestheticStyle = document.createElement('style');
aestheticStyle.id = "ext-synthwave-styles";
aestheticStyle.innerHTML = `
  [data-theme-id="synthwave-84"] {
    --bg-main: #262335;
    --bg-elevated: #1e1b2e;
    --bg-hover: #34294f;
    --border-normal: #49306b;
    --border-subtle: #34294f;
    --text-primary: #f9f8fe;
    --text-secondary: #a69bb8;
    --text-muted: #695e7c;
    --accent: #f92aad;
    --accent-hover: #ff40ba;
    --text-accent: #f92aad;
    --selection: rgba(249, 42, 173, 0.4);
    --error: #fe4450;
    --warning: #f3e70f;
    --success: #72f1b8;
  }
`;
document.head.appendChild(aestheticStyle);

// 2. Register the true Monaco Token Colors explicitly
function mountMonacoTheme() {
  // Poll until Monaco is bootstrapped by the IDE internally
  if (!window.monaco || !window.monaco.editor) {
    setTimeout(mountMonacoTheme, 150);
    return;
  }

  // Register the theme via the safe `grim` Extension Bridge
  window.grim.editor.registerTheme('synthwave-84', {
    name: "SynthWave '84", // What appears in the Settings dropdown
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '848bbd', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'f92aad', fontStyle: 'bold' },
      { token: 'string', foreground: 'ff8b39' },
      { token: 'number', foreground: 'f97e72' },
      { token: 'type', foreground: 'fdfdfd' },
      { token: 'function', foreground: '36f9f6' },
      { token: 'variable', foreground: 'f6f6f4' },
      { token: 'operator', foreground: 'fdfdfd' }
    ],
    colors: {
      'editor.background': '#262335',
      'editor.foreground': '#f9f8fe',
      'editor.lineHighlightBackground': '#34294f55',
      'editorCursor.foreground': '#f3e70f',
      'editor.selectionBackground': '#f92aad44',
      'editorIndentGuide.background': '#49306b',
      'editorIndentGuide.activeBackground': '#f92aad'
    }
  });

  // Inject it manually into the raw HTML drop-down settings selection
  const themeSelect = document.getElementById('s-theme');
  if (themeSelect) {
    // Make sure we didn't inject it already on script reloads
    const existing = Array.from(themeSelect.options).find(o => o.value === 'synthwave-84');
    if (!existing) {
      const opt = document.createElement('option');
      opt.value = 'synthwave-84';
      opt.textContent = "SynthWave '84 (Ext)";
      themeSelect.appendChild(opt);
    }
  }

  console.log("[Grim Extension] SynthWave '84 Monaco bindings registered!");
}

mountMonacoTheme();
