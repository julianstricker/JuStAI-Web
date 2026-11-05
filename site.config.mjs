// Single place for deployment settings. Served from the custom domain (CNAME in public/), so base is empty.
export const site = 'https://justai.naxeu.com';
export const base = '';
export const repo = 'naxeu/justai';
export const installCommand = `curl -fsSL https://raw.githubusercontent.com/${repo}/main/scripts/install.sh | bash`;
// Self-hosted Plausible (cookie-free). Empty string disables tracking.
export const analyticsScript = 'https://analytics.julianstricker.com/js/pa-IGqfiiqeQwtRDo14p2A8Q.js';
