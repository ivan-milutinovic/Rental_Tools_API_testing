import { APIRequestContext } from "@playwright/test";

import { AuthRequest, AuthResponse } from "@models/auth.model";

import { ENDPOINTS } from "@constants/endpoints";

export class AuthController {
    constructor(private request: APIRequestContext) {}

    async registerClient(data: AuthRequest): Promise<AuthResponse> {
        const response = await this.request.post(ENDPOINTS.AUTH, {
            data: data
        });

        if (!response.ok()) {
            throw new Error(`Error: ${response.statusText()}`);
        }

        return await response.json();

    }
}