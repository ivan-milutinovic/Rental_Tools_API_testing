export interface OrderRequest {
    toolId: number;
    customerName: string;
}

export interface OrderResponse {
    created: boolean;
    orderId: string;
}

export interface OrderDetails {
    id: string;
    toolId: number;
    customerName: string;
    quantity: number;
    timestamp: number;
}