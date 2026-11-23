import { createServer } from 'node:http';
import { createProfileStore, ProfileError } from './profiles.mjs';

export function createApp({ profilesDirectory }) {
  const store = createProfileStore(profilesDirectory);
  return createServer(async (request, response) => {
    const json = (status, data) => {
      response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
      response.end(JSON.stringify(data));
    };
    try {
      const path = new URL(request.url, 'http://localhost').pathname;
      if (request.method === 'GET' && path === '/api/profiles') return json(200, { profiles: await store.list() });
      if (request.method === 'POST' && path === '/api/profiles') {
        request.setEncoding('utf8');
        let body = '';
        for await (const part of request) body += part;
        let data;
        try { data = JSON.parse(body); } catch { throw new ProfileError(400, 'invalid_request', 'Invalid JSON.'); }
        return json(201, await store.create(data.name));
      }
      const state = path.match(/^\/api\/profiles\/([^/]+)\/state$/);
      if (request.method === 'GET' && state) return json(200, await store.load(state[1]));
      json(404, { error: { code: 'not_found', message: 'Not found.' } });
    } catch (error) {
      if (error instanceof ProfileError) return json(error.status, { error: { code: error.code, message: error.message } });
      json(500, { error: { code: 'storage_error', message: 'Could not access profile storage. Check the local files and permissions, then try again.' } });
    }
  });
}
