import { test } from '../fixtures/test.fixtures';
import { expect } from '@playwright/test';

// ============================================
// BASIC PLAYWRIGHT API TEST TEMPLATE
// ============================================
// This file demonstrates patterns for API testing using Playwright.
// API testing focuses on testing backend endpoints without UI.
//
// Key differences from UI tests:
// - Use page.request instead of page.locator
// - Work with JSON responses instead of DOM elements
// - Test status codes, headers, and response structure
// - Mock dependencies and test error scenarios
// - Performance and load considerations
//
// How to use this template:
// 1. Create a new file: tests/api/{feature}.spec.ts
// 2. Import test fixtures and dependencies
// 3. Use test.describe() to group related endpoints
// 4. Create fixtures for common setup (API clients, test data)
// 5. Write tests for happy path and error cases
// ============================================

// ============================================
// PART 1: BASIC API TEST STRUCTURE
// ============================================
// API tests typically test endpoints and their responses.
// You can make API calls directly using page.request
//
// Available HTTP methods:
// - page.request.get(url)      → GET request
// - page.request.post(url)     → POST request
// - page.request.put(url)      → PUT request
// - page.request.patch(url)    → PATCH request
// - page.request.delete(url)   → DELETE request
// - page.request.head(url)     → HEAD request
//
// Each method can take:
// - url: Full endpoint URL or relative path
// - options: { headers, data, queryParams, etc }
// ============================================

test.describe('Users API - Basic Example', () => {
  const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';

  // ============================================
  // PART 2: SIMPLE API TEST - GET REQUEST
  // ============================================
  // This is the simplest form of an API test.
  // Test structure (same as UI tests):
  // 1. ARRANGE: Set up any required data
  // 2. ACT: Make the API call
  // 3. ASSERT: Verify the response
  //
  // Common assertions for API tests:
  // - response.status() === 200   → HTTP status code
  // - response.ok()               → Status 200-299 (true/false)
  // - response.statusText()       → "OK", "Created", etc.
  // - response.headers()          → Response headers
  // - await response.json()       → Parse JSON response
  // - await response.text()       → Plain text response
  // ============================================

  test('EXAMPLE: GET - Fetch all users', async ({ request }) => {
    // ACT: Make GET request to fetch users
    const response = await request.get(`${API_BASE_URL}/users`);

    // ASSERT: Verify response status
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    // ASSERT: Parse and verify response body
    const users = await response.json();
    expect(Array.isArray(users)).toBeTruthy();
    expect(users.length).toBeGreaterThan(0);

    // ASSERT: Verify structure of first user
    expect(users[0]).toHaveProperty('id');
    expect(users[0]).toHaveProperty('name');
    expect(users[0]).toHaveProperty('email');
  });

  // ============================================
  // PART 3: API TEST - POST REQUEST (CREATE)
  // ============================================
  // POST requests typically create new resources.
  // Common status codes:
  // - 201: Created (resource successfully created)
  // - 200: OK (sometimes used instead of 201)
  // - 400: Bad Request (invalid data)
  // - 409: Conflict (resource already exists)
  //
  // Always verify:
  // 1. Status code is correct
  // 2. Response contains created resource
  // 3. Response has ID/location for newly created resource
  // 4. Data was actually persisted (verify by fetching it)
  // ============================================

  test('EXAMPLE: POST - Create new user', async ({ request }) => {
    // ARRANGE: Prepare request payload
    const newUser = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'SecurePass123!',
      role: 'user',
    };

    // ACT: Make POST request
    const response = await request.post(`${API_BASE_URL}/users`, {
      data: newUser,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // ASSERT: Verify creation was successful
    expect(response.status()).toBe(201);

    const createdUser = await response.json();
    expect(createdUser).toHaveProperty('id');
    expect(createdUser.name).toBe(newUser.name);
    expect(createdUser.email).toBe(newUser.email);

    // ASSERT: Verify user was actually created (fetch to confirm)
    const getResponse = await request.get(
      `${API_BASE_URL}/users/${createdUser.id}`
    );
    expect(getResponse.ok()).toBeTruthy();
    const fetchedUser = await getResponse.json();
    expect(fetchedUser.id).toBe(createdUser.id);
  });

  // ============================================
  // PART 4: API TEST - PUT REQUEST (FULL UPDATE)
  // ============================================
  // PUT typically replaces entire resource.
  // Difference from PATCH:
  // - PUT: Replace entire resource (must provide all fields)
  // - PATCH: Partial update (only provide fields to change)
  //
  // Common status codes:
  // - 200: OK (update successful)
  // - 204: No Content (update successful, no body returned)
  // - 400: Bad Request (invalid data)
  // - 404: Not Found (resource doesn't exist)
  // ============================================

  test('EXAMPLE: PUT - Update entire user', async ({ request }) => {
    // ARRANGE: Create a user first
    const userPayload = {
      name: 'Original Name',
      email: 'original@example.com',
      password: 'pass123',
      role: 'user',
    };

    const createResponse = await request.post(
      `${API_BASE_URL}/users`,
      { data: userPayload }
    );
    const createdUser = await createResponse.json();
    const userId = createdUser.id;

    // ARRANGE: Prepare updated data (must include all fields)
    const updatedUser = {
      name: 'Updated Name',
      email: 'updated@example.com',
      password: 'newpass123',
      role: 'admin', // Changed role
    };

    // ACT: Make PUT request to update
    const response = await request.put(
      `${API_BASE_URL}/users/${userId}`,
      { data: updatedUser }
    );

    // ASSERT: Verify update was successful
    expect(response.status()).toBe(200);

    const updatedData = await response.json();
    expect(updatedData.name).toBe(updatedUser.name);
    expect(updatedData.email).toBe(updatedUser.email);
    expect(updatedData.role).toBe(updatedUser.role);
  });

  // ============================================
  // PART 5: API TEST - PATCH REQUEST (PARTIAL UPDATE)
  // ============================================
  // PATCH updates only specified fields.
  // Only send fields you want to change.
  // ============================================

  test('EXAMPLE: PATCH - Partially update user', async ({ request }) => {
    // ARRANGE: Create a user
    const userPayload = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'pass123',
      role: 'user',
      department: 'Engineering',
    };

    const createResponse = await request.post(
      `${API_BASE_URL}/users`,
      { data: userPayload }
    );
    const user = await createResponse.json();

    // ACT: Update only the email (PATCH, not PUT)
    const response = await request.patch(
      `${API_BASE_URL}/users/${user.id}`,
      {
        data: {
          email: 'newemail@example.com',
          // Only sending email - other fields remain unchanged
        },
      }
    );

    // ASSERT: Verify only email changed
    expect(response.status()).toBe(200);

    const updated = await response.json();
    expect(updated.email).toBe('newemail@example.com');
    expect(updated.name).toBe('John Doe'); // Unchanged
    expect(updated.role).toBe('user'); // Unchanged
  });

  // ============================================
  // PART 6: API TEST - DELETE REQUEST
  // ============================================
  // DELETE requests remove resources.
  //
  // Common status codes:
  // - 204: No Content (successful deletion, no response body)
  // - 200: OK (successful deletion, may include deleted resource)
  // - 404: Not Found (resource doesn't exist)
  //
  // Best practices:
  // 1. Verify status code is 200 or 204
  // 2. Verify GET request after delete returns 404
  // 3. Handle soft deletes vs hard deletes
  // ============================================

  test('EXAMPLE: DELETE - Remove user', async ({ request }) => {
    // ARRANGE: Create a user first
    const userPayload = { name: 'To Delete', email: 'delete@example.com' };
    const createResponse = await request.post(
      `${API_BASE_URL}/users`,
      { data: userPayload }
    );
    const user = await createResponse.json();

    // ACT: Delete the user
    const deleteResponse = await request.delete(
      `${API_BASE_URL}/users/${user.id}`
    );

    // ASSERT: Verify deletion was successful (204 or 200)
    expect(deleteResponse.status()).toBeOneOf([200, 204]);

    // ASSERT: Verify user is actually deleted
    const getResponse = await request.get(
      `${API_BASE_URL}/users/${user.id}`
    );
    expect(getResponse.status()).toBe(404);
  });
});

// ============================================
// PART 7: API TESTING WITH FIXTURES
// ============================================
// Use fixtures for API clients and reusable data.
//
// Available fixtures:
// - request: Playwright APIRequestContext for making HTTP calls
// - page: Browser page (useful for authentication)
// - authenticatedPage: Page with user already logged in
//
// On freshsales-main branch, additional fixtures:
// - contactsAPI: Pre-configured ContactsAPIClient
// - validContact: Valid contact test data
// - invalidContact: Invalid contact test data
// - createdContact: Contact created during test setup
//
// How fixtures work:
// 1. Test function receives fixtures as parameters
// 2. Playwright auto-initializes them
// 3. They're cleaned up after test
// 4. Same fixture instance used if test needs multiple params
// ============================================

test.describe('Contacts API - Using Fixtures', () => {
  // Note: This example assumes you have ContactsAPIClient
  // and fixtures set up like in the framework

  test('EXAMPLE: Use pre-built API client fixture', async ({
    // contactsAPI - Pre-configured API client (if available)
    request,
  }) => {
    // If you have contactsAPI fixture:
    // const contacts = await contactsAPI.getAll();
    // expect(contacts.length).toBeGreaterThan(0);

    // Otherwise, use generic request fixture
    const API_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';
    const response = await request.get(`${API_URL}/contacts`);
    expect(response.ok()).toBeTruthy();
  });

  test('EXAMPLE: Use test data fixtures', async ({ request }) => {
    // If you have validContact fixture:
    // const contact = validContact;
    // const response = await request.post(`${API_URL}/contacts`, {
    //   data: contact
    // });

    // For now, create test data inline
    const testContact = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      phone: '+1234567890',
    };

    const API_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';
    const response = await request.post(`${API_URL}/contacts`, {
      data: testContact,
    });
    expect(response.ok()).toBeTruthy();
  });
});

// ============================================
// PART 8: RESPONSE VALIDATION & ASSERTIONS
// ============================================
// Different ways to validate API responses.
//
// Assertion types:
// 1. Status code assertions
// 2. Header assertions
// 3. Response body assertions
// 4. Schema validation (TypeScript interfaces or JSON Schema)
// 5. Performance assertions
// ============================================

test.describe('Response Validation', () => {
  const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';

  test('EXAMPLE: Status code assertions', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/users`);

    // Multiple ways to check status
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy(); // 200-299
    expect(response.statusText()).toBe('OK');
  });

  test('EXAMPLE: Header assertions', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/users`);

    // Check response headers
    const headers = response.headers();
    expect(headers['content-type']).toContain('application/json');
    expect(headers).toHaveProperty('date');
    expect(headers).toHaveProperty('server');
  });

  test('EXAMPLE: Response body assertions', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/users`, {
      data: {
        name: 'Test User',
        email: 'test@example.com',
      },
    });

    const body = await response.json();

    // Property existence
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('email');
    expect(body).toHaveProperty('createdAt');

    // Property values
    expect(body.name).toBe('Test User');
    expect(body.email).toBe('test@example.com');

    // Type checking
    expect(typeof body.id).toBe('number');
    expect(typeof body.createdAt).toBe('string');

    // Array assertions
    expect(body.tags).toBeInstanceOf(Array);
    expect(body.tags.length).toBeGreaterThanOrEqual(0);
  });

  test('EXAMPLE: Nested object assertions', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/users/1`);
    const user = await response.json();

    // Check nested properties
    expect(user.address).toBeDefined();
    expect(user.address.street).toBe('123 Main St');
    expect(user.address.city).toBe('New York');

    // Check array of objects
    expect(user.roles).toBeDefined();
    user.roles.forEach((role: any) => {
      expect(role).toHaveProperty('id');
      expect(role).toHaveProperty('name');
    });
  });

  test('EXAMPLE: JSON schema validation', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/users`, {
      data: { name: 'John', email: 'john@example.com' },
    });

    const body = await response.json();

    // If you created ContactSchema or UserSchema (like in Phase 7)
    // You can validate the response matches the schema
    // import { ContactSchema } from '../../src/schemas/ContactSchema';
    //
    // const isValidContact = (data: any): data is ContactSchema => {
    //   return data && typeof data.id === 'number' && typeof data.name === 'string';
    // };
    //
    // expect(isValidContact(body)).toBeTruthy();

    // For now, just verify structure
    expect(body.id).toBeDefined();
    expect(body.name).toBe('John');
  });
});

// ============================================
// PART 9: ERROR HANDLING & NEGATIVE TESTS
// ============================================
// Test error scenarios and edge cases.
// Always test:
// - Invalid input → 400 Bad Request
// - Missing fields → 400 Bad Request
// - Unauthorized access → 401 Unauthorized
// - Forbidden access → 403 Forbidden
// - Not found → 404 Not Found
// - Conflict → 409 Conflict
// - Server error → 500 Internal Server Error
// ============================================

test.describe('Error Handling Tests', () => {
  const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';

  test('EXAMPLE: Invalid request data', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/users`, {
      data: {
        // Missing required fields
        email: 'invalid@example.com',
        // name is missing - required field
      },
    });

    // Should return 400 Bad Request
    expect(response.status()).toBe(400);

    const error = await response.json();
    expect(error).toHaveProperty('error');
    expect(error.error).toContain('name');
  });

  test('EXAMPLE: Invalid email format', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/users`, {
      data: {
        name: 'John Doe',
        email: 'not-an-email', // Invalid format
      },
    });

    expect(response.status()).toBe(400);
    const error = await response.json();
    expect(error.error).toContain('email');
  });

  test('EXAMPLE: Duplicate resource', async ({ request }) => {
    const userData = {
      name: 'Unique User',
      email: 'unique@example.com',
    };

    // Create user first time
    await request.post(`${API_BASE_URL}/users`, { data: userData });

    // Try to create with same email
    const response = await request.post(`${API_BASE_URL}/users`, {
      data: userData,
    });

    // Should return 409 Conflict
    expect(response.status()).toBe(409);
  });

  test('EXAMPLE: Not found', async ({ request }) => {
    const response = await request.get(
      `${API_BASE_URL}/users/99999`
    );

    expect(response.status()).toBe(404);
    const error = await response.json();
    expect(error).toHaveProperty('error');
  });

  test('EXAMPLE: Unauthorized access', async ({ request }) => {
    // Try to access without auth token
    const response = await request.get(
      `${API_BASE_URL}/users/1/private-data`,
      {
        // No Authorization header
      }
    );

    expect(response.status()).toBe(401);
  });
});

// ============================================
// PART 10: AUTHENTICATION & AUTHORIZATION
// ============================================
// Many APIs require authentication (tokens, API keys).
//
// Common auth methods:
// 1. Bearer token: Authorization: Bearer <token>
// 2. API key: Authorization: ApiKey <key> or X-API-Key: <key>
// 3. Basic auth: Authorization: Basic <base64>
// 4. Cookie: Sent automatically by browser
// 5. OAuth: More complex, often requires browser context
//
// How to add headers to requests:
//   await request.get(url, {
//     headers: {
//       'Authorization': 'Bearer <token>',
//       'X-Custom-Header': 'value'
//     }
//   });
// ============================================

test.describe('Authentication Tests', () => {
  const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';
  const AUTH_TOKEN = process.env.API_AUTH_TOKEN || 'test-token-12345';

  test('EXAMPLE: Request with Bearer token', async ({ request }) => {
    const response = await request.get(
      `${API_BASE_URL}/users`,
      {
        headers: {
          'Authorization': `Bearer ${AUTH_TOKEN}`,
        },
      }
    );

    expect(response.ok()).toBeTruthy();
  });

  test('EXAMPLE: Request with API key', async ({ request }) => {
    const apiKey = process.env.API_KEY || 'test-api-key-123';

    const response = await request.get(
      `${API_BASE_URL}/users`,
      {
        headers: {
          'X-API-Key': apiKey,
        },
      }
    );

    expect(response.ok()).toBeTruthy();
  });

  test('EXAMPLE: Login and use session token', async ({ request }) => {
    // Login to get token
    const loginResponse = await request.post(
      `${API_BASE_URL}/auth/login`,
      {
        data: {
          email: 'user@example.com',
          password: 'password123',
        },
      }
    );

    expect(loginResponse.ok()).toBeTruthy();

    const loginData = await loginResponse.json();
    const token = loginData.token;

    // Use token for subsequent requests
    const usersResponse = await request.get(
      `${API_BASE_URL}/users`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    expect(usersResponse.ok()).toBeTruthy();
  });

  test('EXAMPLE: Logout and verify token is invalid', async ({ request }) => {
    // After logout, old token should be invalid
    const response = await request.get(
      `${API_BASE_URL}/users`,
      {
        headers: {
          'Authorization': 'Bearer invalid-token',
        },
      }
    );

    expect(response.status()).toBe(401);
  });
});

// ============================================
// PART 11: QUERY PARAMETERS & FILTERING
// ============================================
// Many APIs support filtering, pagination, sorting.
//
// Query parameter patterns:
// - GET /users?page=1&limit=10     → Pagination
// - GET /users?search=john         → Search
// - GET /users?sort=name&order=asc → Sorting
// - GET /users?role=admin          → Filtering
// - GET /users?fields=id,name      → Field selection
//
// How to add query params:
//   await request.get(url, {
//     queryParams: {
//       page: '1',
//       limit: '10'
//     }
//   });
// ============================================

test.describe('Query Parameters & Filtering', () => {
  const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';

  test('EXAMPLE: Pagination', async ({ request }) => {
    // Fetch page 2 with 10 items per page
    const response = await request.get(
      `${API_BASE_URL}/users`,
      {
        params: {
          page: '2',
          limit: '10',
        },
      }
    );

    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(Array.isArray(data.items)).toBeTruthy();
    expect(data.items.length).toBeLessThanOrEqual(10);
    expect(data.pagination.page).toBe(2);
    expect(data.pagination.limit).toBe(10);
  });

  test('EXAMPLE: Search filter', async ({ request }) => {
    const response = await request.get(
      `${API_BASE_URL}/users`,
      {
        params: {
          search: 'john',
        },
      }
    );

    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    data.items.forEach((user: any) => {
      const lowerName = (user.name + user.email).toLowerCase();
      expect(lowerName).toContain('john');
    });
  });

  test('EXAMPLE: Sorting', async ({ request }) => {
    const response = await request.get(
      `${API_BASE_URL}/users`,
      {
        params: {
          sort: 'name',
          order: 'asc',
        },
      }
    );

    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    // Verify results are sorted
    for (let i = 0; i < data.items.length - 1; i++) {
      expect(
        data.items[i].name.localeCompare(data.items[i + 1].name)
      ).toBeLessThanOrEqual(0);
    }
  });

  test('EXAMPLE: Multiple filters', async ({ request }) => {
    const response = await request.get(
      `${API_BASE_URL}/users`,
      {
        params: {
          role: 'admin',
          status: 'active',
          limit: '20',
        },
      }
    );

    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    data.items.forEach((user: any) => {
      expect(user.role).toBe('admin');
      expect(user.status).toBe('active');
    });
  });
});

// ============================================
// PART 12: CHAINING API CALLS
// ============================================
// Often you need to make multiple API calls in sequence.
// Examples:
// - Create resource A, then create resource B linked to A
// - Fetch resource, update it, verify update
// - Create resource, verify it appears in list, delete it
// ============================================

test.describe('Chaining API Calls', () => {
  const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';

  test('EXAMPLE: Create, read, update, delete (CRUD)', async ({ request }) => {
    // CREATE
    const createResponse = await request.post(`${API_BASE_URL}/users`, {
      data: {
        name: 'CRUD Test User',
        email: 'crud@example.com',
      },
    });
    expect(createResponse.ok()).toBeTruthy();
    const createdUser = await createResponse.json();
    const userId = createdUser.id;

    // READ
    const readResponse = await request.get(`${API_BASE_URL}/users/${userId}`);
    expect(readResponse.ok()).toBeTruthy();
    const readUser = await readResponse.json();
    expect(readUser.id).toBe(userId);

    // UPDATE
    const updateResponse = await request.patch(
      `${API_BASE_URL}/users/${userId}`,
      {
        data: {
          name: 'Updated Name',
        },
      }
    );
    expect(updateResponse.ok()).toBeTruthy();

    // VERIFY UPDATE
    const verifyResponse = await request.get(`${API_BASE_URL}/users/${userId}`);
    const updated = await verifyResponse.json();
    expect(updated.name).toBe('Updated Name');

    // DELETE
    const deleteResponse = await request.delete(
      `${API_BASE_URL}/users/${userId}`
    );
    expect(deleteResponse.status()).toBeOneOf([200, 204]);

    // VERIFY DELETE
    const deletedResponse = await request.get(`${API_BASE_URL}/users/${userId}`);
    expect(deletedResponse.status()).toBe(404);
  });

  test('EXAMPLE: Create parent and child resources', async ({ request }) => {
    // Create organization (parent)
    const orgResponse = await request.post(`${API_BASE_URL}/organizations`, {
      data: {
        name: 'Test Corp',
      },
    });
    const org = await orgResponse.json();

    // Create team under organization (child)
    const teamResponse = await request.post(
      `${API_BASE_URL}/organizations/${org.id}/teams`,
      {
        data: {
          name: 'Engineering',
        },
      }
    );
    expect(teamResponse.ok()).toBeTruthy();
    const team = await teamResponse.json();

    // Create user in team
    const userResponse = await request.post(
      `${API_BASE_URL}/organizations/${org.id}/teams/${team.id}/members`,
      {
        data: {
          name: 'John Doe',
          email: 'john@example.com',
        },
      }
    );
    expect(userResponse.ok()).toBeTruthy();

    // Verify hierarchy
    const verifyResponse = await request.get(
      `${API_BASE_URL}/organizations/${org.id}/teams/${team.id}/members`
    );
    const members = await verifyResponse.json();
    expect(members.some((m: any) => m.email === 'john@example.com')).toBeTruthy();
  });
});

// ============================================
// PART 13: PERFORMANCE & LOAD TESTING
// ============================================
// Test API performance and behavior under load.
//
// Metrics to measure:
// - Response time (should be < 1s typically)
// - Throughput (requests per second)
// - Error rate under load
// - Memory/CPU usage
//
// Tools:
// - Measure response time with Date.now() or performance APIs
// - Use test.only() to run load tests separately
// - Monitor system resources during test
// ============================================

test.describe('Performance Tests', () => {
  const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';

  test('@performance Measure response time', async ({ request }) => {
    const startTime = Date.now();

    const response = await request.get(`${API_BASE_URL}/users`);

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    expect(response.ok()).toBeTruthy();

    // Assert response time is acceptable (< 1 second)
    expect(responseTime).toBeLessThan(1000);

    console.log(`Response time: ${responseTime}ms`);
  });

  test('@performance Parallel requests', async ({ request }) => {
    // Make multiple requests in parallel
    const startTime = Date.now();

    const requests = Array.from({ length: 10 }, () =>
      request.get(`${API_BASE_URL}/users`)
    );

    const responses = await Promise.all(requests);

    const endTime = Date.now();
    const totalTime = endTime - startTime;

    // All should succeed
    responses.forEach((response) => {
      expect(response.ok()).toBeTruthy();
    });

    // 10 requests in parallel should be faster than sequential
    console.log(`10 parallel requests: ${totalTime}ms`);
  });

  test('@performance Load test with retries', async ({ request }) => {
    const iterations = 50;
    const responseTimes: number[] = [];

    for (let i = 0; i < iterations; i++) {
      const startTime = Date.now();

      const response = await request.get(`${API_BASE_URL}/users`);

      const endTime = Date.now();
      responseTimes.push(endTime - startTime);

      expect(response.ok()).toBeTruthy();
    }

    // Calculate statistics
    const avgTime = responseTimes.reduce((a, b) => a + b) / responseTimes.length;
    const maxTime = Math.max(...responseTimes);
    const minTime = Math.min(...responseTimes);

    console.log(`Average: ${avgTime}ms, Min: ${minTime}ms, Max: ${maxTime}ms`);

    // Assert performance is acceptable
    expect(avgTime).toBeLessThan(500);
  });
});

// ============================================
// PART 14: PARAMETERIZED API TESTS
// ============================================
// Test multiple endpoints or data variations with same test logic.
// ============================================

test.describe('Parameterized API Tests', () => {
  const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';

  const endpoints = [
    { path: '/users', expectedStatus: 200 },
    { path: '/teams', expectedStatus: 200 },
    { path: '/organizations', expectedStatus: 200 },
  ];

  endpoints.forEach(({ path, expectedStatus }) => {
    test(`EXAMPLE: GET ${path} returns ${expectedStatus}`, async ({ request }) => {
      const response = await request.get(`${API_BASE_URL}${path}`);
      expect(response.status()).toBe(expectedStatus);
    });
  });

  const invalidEmails = [
    'not-an-email',
    'missing@domain',
    '@nodomain.com',
    'spaces in@email.com',
  ];

  invalidEmails.forEach((email) => {
    test(`EXAMPLE: Reject invalid email: ${email}`, async ({ request }) => {
      const response = await request.post(`${API_BASE_URL}/users`, {
        data: {
          name: 'Test User',
          email: email,
        },
      });

      expect(response.status()).toBe(400);
    });
  });
});

// ============================================
// ADDITIONAL RESOURCES
// ============================================
// Playwright API Testing: https://playwright.dev/docs/api-testing
// HTTP Status Codes: https://httpwg.org/specs/rfc9110.html#status.codes
// REST API Best Practices: https://restfulapi.net/
// Testing Best Practices: https://playwright.dev/docs/best-practices
//
// Tips for API testing:
// 1. Test both happy path and error scenarios
// 2. Verify status codes match your API contract
// 3. Check response structure and data types
// 4. Test with invalid inputs
// 5. Consider authentication and authorization
// 6. Test pagination, filtering, sorting
// 7. Monitor response times
// 8. Clean up created resources (delete after create)
// 9. Use fixtures for common setup
// 10. Keep tests independent and isolated
// 11. Mock external dependencies when possible
// 12. Use meaningful assertion messages
// ============================================
