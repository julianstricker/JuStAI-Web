// Single place for deployment settings. For a custom domain set base to '' and change site.
export const site = 'https://julianstricker.github.io';
export const base = '/JuStAI-Web';
export const repo = 'julianstricker/JuStAI5';
export const installCommand = `curl -fsSL https://raw.githubusercontent.com/${repo}/main/scripts/install.sh | bash`;
// Self-hosted Plausible (cookie-free). Empty string disables tracking.
export const analyticsScript = 'https://analytics.julianstricker.com/js/pa-IGqfiiqeQwtRDo14p2A8Q.js';
