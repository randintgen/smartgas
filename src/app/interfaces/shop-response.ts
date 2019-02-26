export class ShopResponse {
    start: number;
    count: number;
    total: number;
    products: {
        id?: number;
        name?: string;
        address?: string;
        lng?: number;
        lat?: number;
        tags?: string[];
        withdrawn?: boolean;
    }[];
}
