export default async function handler(req, res) {
  try {
    let mod;
    try {
      mod = await import('../dist/server/entry.mjs');
    } catch (e) {
      try {
        mod = await import('../dist/server/entry.js');
      } catch (e2) {
        mod = await import('../dist/_astro/entry.mjs');
      }
    }
    const h = mod.handler || mod.default || mod;
    return h(req, res);
  } catch (err) {
    return res.status(500).json({ error: 'API boot failed', details: String(err), stack: err.stack });
  }
}
