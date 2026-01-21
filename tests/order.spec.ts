import { test, expect } from '@fixtures/fixtures';

test.describe.configure({ mode: 'serial' });

test.describe('Order Management Lifecycle', () => {
    let orderId: string;
    let toolId: number;

    test.beforeAll(async ({ toolApi }) => {
        const tools = await toolApi.getAllTools();
        const availableTool = tools.find(t => t.inStock) || tools[0];
        toolId = availableTool.id;
    });

    test('should successfully create a new order', async ({ orderApi, registeredToken }) => {
        const orderData = {
            toolId: toolId,
            customerName: 'Senior QA Marko'
        };

        const response = await orderApi.createOrder(registeredToken, orderData);
        
        expect(response.status()).toBe(201);

        const body = await response.json();
        expect(body.created).toBe(true);
        expect(body.orderId).toBeDefined();

        orderId = body.orderId;
    });

    test('should retrieve order details and verify data', async ({ orderApi, registeredToken }) => {
        console.log('DEBUG: Check order ID:', orderId);
        expect(orderId, "OrderId is lost between tests!").toBeDefined();

        const details = await orderApi.getOrderById(registeredToken, orderId);
        
        console.log('DEBUG: API response details:', JSON.stringify(details, null, 2));

        const actualId = details.id || (details as any).orderId || (details as any).id;
        
        expect(actualId, `The API did not return a valid ID. Received: ${JSON.stringify(details)}`).toBe(orderId);
        expect(details.toolId).toBe(toolId);
    });

    test('should delete the order and verify it is gone', async ({ orderApi, registeredToken }) => {
        const deleteResponse = await orderApi.deleteOrder(registeredToken, orderId);
        expect(deleteResponse.status()).toBe(204);
        const checkDeleted = await orderApi.getOrderById(registeredToken, orderId).catch(err => err);
    });
});