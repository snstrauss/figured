import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createApp } from './http.mjs';

const port = Number(process.env.PORT ?? 3001);
if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error('PORT must be an integer between 0 and 65535.');
const profilesDirectory = process.env.FIGURED_PROFILES_DIR
  ? resolve(process.env.FIGURED_PROFILES_DIR)
  : fileURLToPath(new URL('../../data/profiles/', import.meta.url));
const server = createApp({ profilesDirectory });
server.on('error', (error) => {
  console.error(`Figured could not start: ${error.message}`);
  process.exitCode = 1;
});
server.listen(port, '127.0.0.1', () => console.log(`Figured: http://127.0.0.1:${server.address().port}`));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close());
