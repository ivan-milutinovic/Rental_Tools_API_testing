import { test, expect } from "@fixtures/fixtures";

test.describe('Authentication and Authorization', () => {

    test('should successfully register a new API client', async ({ authApi }) => {
        const payload = {
            clientName: 'Manual Registration',
            clientEmail: `manual.${Date.now()}@example.com`
        };

        const response = await authApi.registerClient(payload);

        expect(response.accessToken).toBeDefined();
        expect(typeof response.accessToken).toBe('string');
    });

    test('should automatically receive token via fixture', async({ registeredToken }) => {
        console.log('Token: ', registeredToken);
        expect(registeredToken).toBeDefined();
        expect(registeredToken.length).toBeGreaterThan(10);
    })

});