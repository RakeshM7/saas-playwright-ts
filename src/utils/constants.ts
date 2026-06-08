/**
 * Framework constants.
 * Technical constants for HTTP status codes and polling behavior.
 * Note: Test data goes in fixtures/data/testData.json or factories (Phase 6)
 * Note: User-facing messages go in utils/messages.ts (Phase 12)
 */

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
}

// Polling & retry settings
export const POLLING = {
  INTERVAL_MS: 500,
  MAX_ATTEMPTS: 3,
}
