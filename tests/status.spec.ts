import { test, expect } from "@fixtures/fixtures";

test.describe('API Health Check', () => {

    test('server should be UP and running', async ({ statusApi }) => {
        const response = await statusApi.getStatus();

        expect(response.status).toBe('UP');
    })

});