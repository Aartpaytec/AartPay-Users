import app from '../artifacts/api-server/dist/index.mjs';

export default async function handler(req, res) {
  await app.ready();
  app.server.emit('request', req, res);
}
