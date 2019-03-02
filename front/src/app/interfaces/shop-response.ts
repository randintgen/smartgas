export class ShopResponse {
    start: number;
    count: number;
    total: number;
    product: {
        id?: number;
        name?: string;
        address?: string;
        lng?: number;
        lat?: number;
        tags?: string[];
        withdrawn?: boolean;
    }[];
}
