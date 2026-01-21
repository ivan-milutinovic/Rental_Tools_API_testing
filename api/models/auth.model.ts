export interface AuthRequest {
    clientName: string;
    clientEmail: string;
}

export interface AuthResponse {
    accessToken: string;
}