
function activate(IDE) {
    IDE.log("Registering Cyberpunk Theme...");
    
    IDE.registerTheme("grim-cyberpunk", {
        base: 'vs-dark',
        inherit: true,
        rules: [
            { background: 'f0f1f4' },
            { token: 'keyword', foreground: 'f0f1f4' },
            { token: 'string', foreground: 'f0f1f4' },
            { token: 'comment', foreground: 'f0f1f4', fontStyle: 'italic' },
            { token: 'function', foreground: 'f0f1f4' },
            { token: 'variable', foreground: 'f0f1f4' },
            { token: 'number', foreground: 'f0f1f4' }
        ],
        colors: {
            'editor.background': '#f0f1f4',
            'editor.foreground': '#f0f1f4',
            'editor.selectionBackground': '#f0f1f4',
            'editor.lineHighlightBackground': '#f0f1f4',
            'editorCursor.foreground': '#f0f1f4',
            'editorWhitespace.foreground': '#f0f1f4'
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
