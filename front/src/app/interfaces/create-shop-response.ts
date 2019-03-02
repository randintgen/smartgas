export class CreateShopResponse {
    success: boolean;
    shop: {
        address: string;
        id: number;
        lat: number;
        lng: number;
        name: string;
        tags: string[];
        withdrawn: boolean;
    }
}
