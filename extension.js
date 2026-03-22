// ─── GRIM IDE EXTENSION ──────────────────────────────────────────────────────────
// ID: right-sidebar-mod
// Description: Moves the Activity Bar and Sidebar to the right using CSS flex ordering.

console.log("[Grim Extension] Loading Right Sidebar Mod...");

// 1. Inject custom CSS overriding the layout structure
const style = document.createElement('style');
style.id = "ext-right-sidebar-styles";
style.innerHTML = `
  /* The main app container holds the activity bar, sidebar, and main content */
  .app-container {
    display: flex;
    flex-direction: row; /* Default is row, but we enforce it */
  }

  /* 
   * Reorder the layout from Left->Right:
   * 1. Main Editor (Code)
   * 2. Sidebar Resize Handle
   * 3. Sidebar (Explorer/Search)
   * 4. Activity Bar (Icons)
   */
  .main-content {
    order: 1 !important;
  }
  .sidebar-resize-handle {
    order: 2 !important;
  }
  .sidebar {
    order: 3 !important;
    border-right: none !important;
    border-left: 1px solid var(--border-normal) !important;
  }
  .activity-bar {
    order: 4 !important;
    border-right: none !important;
    border-left: 1px solid var(--border-subtle) !important;
  }
`;
document.head.appendChild(style);

// 2. We can optionally use the safe `grim` API to apply color tweaks or register commands!
window.grim.commands.registerCommand('my-extension.sayHello', 'Say Hello', () => {
    alert("Hello from the Right Sidebar Test Extension!");
});

console.log("[Grim Extension] Right Sidebar Mod initialized successfully.");
