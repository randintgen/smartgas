export interface ProductSearch {
    start: number;
    count: number;
    total: number;
    products: {    
        id: number;
        name: string;
        description: string;
        category: string;
        tags: string[];
        withdrawn: boolean;
        extraData;
    }[];
}