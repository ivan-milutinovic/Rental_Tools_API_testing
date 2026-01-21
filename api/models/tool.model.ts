export interface Tool {
    id: number;
    category: string;
    name: string;
    inStock: boolean;
}
export interface ToolParams {
    category?: string;
    results?: number;
    [key: string]: string | number | boolean | undefined;
}
