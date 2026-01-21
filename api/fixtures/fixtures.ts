import { test as base } from '@playwright/test';

import { StatusController } from '@controllers/StatusController';
import { AuthController } from '@controllers/AuthController'
import { ToolController } from '@controllers/ToolController';
import { OrderController } from '@controllers/OrderController';

let sharedToken: string;

type MyFixtures = {
    statusApi: StatusController;
    authApi: AuthController;
    registeredToken: string;
    toolApi: ToolController;
    orderApi: OrderController;
};

export const test = base.extend<MyFixtures>({
    statusApi: async ({ request }, use) => {
        await use(new StatusController(request));
    },
    authApi: async ({ request }, use) => {
        await use(new AuthController(request));
    },
    registeredToken: async ({ authApi }, use) => {
        if (!sharedToken) {
            const payload = {
                clientName: 'Senior QA Marko',
                clientEmail: `test.qa.${Date.now()}@example.com`
            };
            const authResponse = await authApi.registerClient(payload);
            sharedToken = authResponse.accessToken;
        }
        await use(sharedToken);
    },
    toolApi: async ({ request }, use) => {
        await use(new ToolController(request));
    },
    orderApi: async ({ request }, use) => {
        await use(new OrderController(request));
    }
});

export { expect } from '@playwright/test';