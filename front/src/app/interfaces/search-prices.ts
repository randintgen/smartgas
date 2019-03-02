export interface SearchPrices {
    start: number;
    count: number;
    geoDist: number;
    geoLng: number;
    geoLat: number;
    dateFrom: Date;
    dateTo: Date;
    shops: number[];
    products: number[];
    tags: string[];
    sort: string[];
}
