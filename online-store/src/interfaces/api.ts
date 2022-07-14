export interface Product {
    [key: string]: string | boolean | string[] | number | undefined;
    "id": string;
    "name": string;
    "price": number;
    // [key: number]: string;
    // [price: number]: string;
    "image": string;
    "colors": string[];
    "company": string;
    "description": string;
    "category": string;
    "shipping"?: boolean;
    "featured"?: boolean;
    "year": number;
    "count": number;
    "popular"?: boolean;
}