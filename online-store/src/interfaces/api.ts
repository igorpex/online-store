export interface Product {
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
}