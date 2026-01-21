import { APIRequestContext } from "@playwright/test";

import { OrderRequest, OrderResponse, OrderDetails } from "@models/order.model";

import { ENDPOINTS } from "@constants/endpoints";

export class OrderController {
    constructor(private request: APIRequestContext) {}

    async createOrder(token: string, data: OrderRequest) {
        return await this.request.post(ENDPOINTS.ORDERS, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: data
        });
    }

    async getOrderById(token: string, orderId: string): Promise<OrderDetails> {
        const response = await this.request.get(`${ENDPOINTS.ORDERS}/${orderId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const body = await response.json();
        return Array.isArray(body) ? body[0] : body;
    }

    async deleteOrder(token: string, orderId: string) {
        return await this.request.delete(`${ENDPOINTS.ORDERS}/${orderId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
}