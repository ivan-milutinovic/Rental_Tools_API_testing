import { APIRequestContext } from "@playwright/test";

import { Tool, ToolParams } from "@models/tool.model";

import { ENDPOINTS } from "@constants/endpoints";

export class ToolController {
    constructor(private request: APIRequestContext) {}

    async getAllTools(params?: ToolParams): Promise<Tool[]> {
        const response = await this.request.get(ENDPOINTS.TOOLS, {
            params: params as { [key: string]: string | number | boolean }
        })

        if(!response.ok()) {
            throw new Error(`Failed to fetch tools: ${response.statusText()}`)
        }
        return await response.json();
    }

    async getToolById(toolId: number): Promise<Tool> {
        const response = await this.request.get(`${ENDPOINTS.TOOLS}/${toolId}`);

        if(!response.ok()) {
            throw new Error(`Failed to fetch tool with ID ${toolId}: ${response.statusText()}`);
        }
        return await response.json();
    }
}