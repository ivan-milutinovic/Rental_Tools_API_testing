import { APIRequestContext } from '@playwright/test';

import { StatusResponse } from '@models/status.model';

import { ENDPOINTS } from "@constants/endpoints";

export class StatusController {
    constructor(private request: APIRequestContext) {}

    async getStatus(): Promise<StatusResponse> {
        const response = await this.request.get(ENDPOINTS.STATUS);
        return await response.json();
    }
}