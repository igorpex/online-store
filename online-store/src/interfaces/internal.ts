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