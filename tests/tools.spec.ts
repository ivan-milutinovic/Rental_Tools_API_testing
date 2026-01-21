import { test, expect } from '@fixtures/fixtures';

test.describe('Tools Catalog API', () => {

    test('should fetch all tools and verify their structure', async ({ toolApi }) => {
        const tools = await toolApi.getAllTools();

        expect(tools.length).toBeGreaterThan(0);
        
        const firstTool = tools[0];
        expect(firstTool).toHaveProperty('id');
        expect(firstTool).toHaveProperty('name');
        expect(typeof firstTool.inStock).toBe('boolean');
    });

    test('should filter tools by category "ladders"', async ({ toolApi }) => {
        const filter = { category: 'ladders' };
        const tools = await toolApi.getAllTools(filter);

        expect(tools.length).toBeGreaterThan(0);
        
        for (const tool of tools) {
            expect(tool.category).toBe('ladders');
        }
    });

    test('should fetch a single tool by its ID', async ({ toolApi }) => {
        const allTools = await toolApi.getAllTools();
        const targetId = allTools[0].id;

        const tool = await toolApi.getToolById(targetId);
        
        expect(tool.id).toBe(targetId);
        expect(tool).toHaveProperty('name');
    });

});