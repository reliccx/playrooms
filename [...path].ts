import type { VercelRequest, VercelResponse } from '@vercel/node';
import apiHandler from '../server/api';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const protocol = (req.headers['x-forwarded-proto'] as string) || 'https';
  const host = req.headers.host || 'localhost';
  const url = new URL(req.url || '/', `${protocol}://${host}`);
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) headers.set(key, value.join(', '));
    else if (value !== undefined) headers.set(key, value);
  }
  const method = req.method || 'GET';
  const init: RequestInit = { method, headers };
  if (method !== 'GET' && method !== 'HEAD') {
    const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body ?? {});
    init.body = body;
    if (!headers.has('content-type')) headers.set('content-type', 'application/json');
  }
  const request = new Request(url, init);
  const response = await apiHandler(request);
  response.headers.forEach((value, key) => res.setHeader(key, value));
  res.status(response.status).send(await response.text());
}
