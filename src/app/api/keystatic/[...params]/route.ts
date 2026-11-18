import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../../keystatic.config';

/**
 * Sign-in with GitHub and reading/saving posts for the editor at /keystatic.
 *
 * In GitHub mode Keystatic throws while the site is being built if its keys
 * (KEYSTATIC_GITHUB_CLIENT_ID, KEYSTATIC_GITHUB_CLIENT_SECRET, KEYSTATIC_SECRET)
 * are not set — which would stop every deploy until the editor is connected.
 * Until they are set, the editor's API answers 503 instead and the rest of the
 * site builds as usual. (In `next dev` Keystatic runs its own setup wizard.)
 */
const connected =
  config.storage.kind !== 'github' ||
  process.env.NODE_ENV === 'development' ||
  Boolean(
    process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
      process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
      process.env.KEYSTATIC_SECRET,
  );

function notConnected() {
  return new Response('Panel bloga nie jest jeszcze połączony z GitHubem.', { status: 503 });
}

export const { GET, POST } = connected
  ? makeRouteHandler({ config })
  : { GET: notConnected, POST: notConnected };
