const DiscordRPC = require('discord-rpc');

// Using a generic Client ID for testing (VS Code's client ID). 
// The user can replace this with their own Discord Developer Portal App ID later.
const clientId = '1480602599542755503';

module.exports = {
  activate: (context) => {
    let rpc;
    let isReady = false;
    const startTimestamp = new Date();

    try {
      rpc = new DiscordRPC.Client({ transport: 'ipc' });

      rpc.on('ready', () => {
        isReady = true;
        rpc.setActivity({
          details: 'Starting Grim IDE...',
          state: 'Workspace: Unknown',
          startTimestamp,
          largeImageKey: 'vscode',
          largeImageText: 'Grim IDE'
        }).catch(console.error);

        console.log('[Discord Presence] Connected to Discord IPC');
      });

      rpc.login({ clientId }).catch(err => {
        console.log('[Discord Presence] Could not connect to Discord:', err.message);
      });

    } catch (e) {
      console.error('[Discord Presence] Initialization failed:', e);
    }

    return {
      onMessage: (channel, data, reply) => {
        if (channel === 'set-activity') {
          if (!isReady || !rpc) return;

          let languageStr = data.language || 'Unknown Language';
          let largeImageKey = languageStr.toLowerCase();

          // Basic fallback for unknown languages so we don't send garbage image keys
          // The vscode app has specific keys, but if missing it will just not show an image

          rpc.setActivity({
            details: `Editing ${data.fileName || 'a file'}`,
            state: `Workspace: ${data.workspace || 'Unknown'}`,
            startTimestamp,
            largeImageKey: largeImageKey,
            largeImageText: languageStr,
            smallImageKey: 'vscode',
            smallImageText: 'Grim IDE'
          }).catch(err => console.error('[Discord Presence] failed to set activity', err));
        }
      }
    };
  }
};
