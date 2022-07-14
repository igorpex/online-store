export interface Filter {
    filterName: {
        type: string;
        containerSelectors: string[];
        function: Function;
    }
}

export interface Slider extends HTMLDivElement {
    noUiSlider: { on: Function };
}


export interface ProductRanges {
    categories: string[];
    companies: string[];
    colors: string[];
    prices: { minPrice: number, maxPrice: number };
}

export interface SortSettings {
    type: string;
    direction: string;
}