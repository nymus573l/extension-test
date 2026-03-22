/**
 * Grim Sidebar Right Extension!
 */
function activate(IDE) {
    IDE.log("Activating Sidebar Right Extension...");
    
    // Natively flip the IDE flex-direction layout!
    IDE.setSidebarPosition('right');
    
    IDE.log("Sidebar moved to the right!");
}

function deactivate(IDE) {
    console.log("Deactivating Sidebar Right Extension...");
    
    // Return to default
    IDE.setSidebarPosition('left');
}

IDE.registerExtension({
    id: "grim.ui.sidebarRight",
    name: "Grim Sidebar Right",
    activate,
    deactivate
});
