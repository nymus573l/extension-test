(function() {
  let currentWorkspace = 'Unknown';
  let lastState = { fileName: 'No file strictly open', language: '' };

  // Listen for workspace setup
  if (window.api && window.api.onStartupTarget) {
    window.api.onStartupTarget((target) => {
      if (target && target.type === 'dir' && target.path) {
        // the target.path is absolute, let's get basename
        const parts = target.path.split(/[/\\]/);
        currentWorkspace = parts[parts.length - 1];
        updatePresence();
      }
    });
  }

  // Listen for file changes
  if (window.api && window.api.onActiveFileChange) {
    window.api.onActiveFileChange((filePath) => {
      if (!filePath) return;
      
      const parts = filePath.split(/[/\\]/);
      const fileName = parts[parts.length - 1];
      
      // Attempt to guess language from extension
      const extMatch = fileName.match(/\.([a-zA-Z0-9]+)$/);
      let language = 'text';
      if (extMatch) {
         const ext = extMatch[1].toLowerCase();
         // map common extensions
         const map = {
            'js': 'JavaScript', 'ts': 'TypeScript', 'html': 'HTML', 'css': 'CSS',
            'json': 'JSON', 'py': 'Python', 'rs': 'Rust', 'md': 'Markdown',
            'cpp': 'C++', 'c': 'C', 'java': 'Java', 'go': 'Go', 'php': 'PHP'
         };
         language = map[ext] || ext.toUpperCase();
      }

      lastState = { fileName, language };
      updatePresence();
    });
  }

  function updatePresence() {
    if (window.api && window.api.sendExtensionMessage) {
      window.api.sendExtensionMessage('discord-presence', 'set-activity', {
        fileName: lastState.fileName,
        language: lastState.language,
        workspace: currentWorkspace
      });
    }
  }

  console.log('[Discord Presence] Extension loaded in renderer.');
})();
