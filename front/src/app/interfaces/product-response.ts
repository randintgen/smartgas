export interface ProductResponse {
    id: number;
    name: string;
    description: string;
    category: string;
    tags: string[];
    withdrawn: boolean;
}
