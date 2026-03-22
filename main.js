
function activate(IDE) {
    IDE.log("Registering Cyberpunk Theme...");
    
    IDE.registerTheme("grim-cyberpunk", {
        base: 'vs-dark',
        inherit: true,
        rules: [
            { background: '0d0914' },
            { token: 'keyword', foreground: 'ff7edb' },
            { token: 'string', foreground: '00ff99' },
            { token: 'comment', foreground: '848cb5', fontStyle: 'italic' },
            { token: 'function', foreground: '36f9f6' },
            { token: 'variable', foreground: 'ff2a6d' },
            { token: 'number', foreground: 'f9c80e' }
        ],
        colors: {
            'editor.background': '#0d0914',
            'editor.foreground': '#fdfdfd',
            'editor.selectionBackground': '#ff2a6d40',
            'editor.lineHighlightBackground': '#1f1633',
            'editorCursor.foreground': '#00ff99',
            'editorWhitespace.foreground': '#2d2145'
        }
    });

    IDE.log("Grim Cyberpunk Theme registered successfully!");
}

function deactivate() {
    console.log("Cyberpunk theme extension unloaded.");
}

IDE.registerExtension({
    id: "grim.theme.cyberpunk",
    name: "Grim Cyberpunk Theme",
    activate,
    deactivate
});
