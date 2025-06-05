import { beforeEach } from 'vitest';

// Setup environment variables for tests
beforeEach(() => {
  process.env.GOOGLE_API_KEY = 'test-api-key';
});