import { drawProducts } from '../view/drawProducts';
import { getFilteredProducts } from '../core-functions/filterProducts';
import { StorageService } from '../core-functions/storage'

export interface SliderFilterChange {
    sliderName: string;
    values: number[];
    handle: number;
}

export interface SliderFilter {
    sliderName: string;
    [sliderName: string]: string | number[];
    values: number[];
}

function updateSliderFiltersState({ sliderName, values }: SliderFilter) {
    let sliderFilter = JSON.parse(localStorage.getItem('sliderFilters')!);
    // Check filter exist in local storage, if not, make empty object.
    if (sliderFilter === null || sliderFilter === undefined) { sliderFilter = {} };
    sliderFilter[sliderName] = values;
    localStorage.setItem('sliderFilter', JSON.stringify(sliderFilter));
}

function handleSliderFiltersChange({ sliderName, values, handle }: SliderFilterChange) {
    // updateSliderFiltersState({ sliderName, values });
    StorageService.setSliderFilterByName({ sliderName, values });
    const filteredProducts = getFilteredProducts();
    // drawFilters()
    drawProducts(filteredProducts);
}

function handlePriceSliderChange(values: [], handle: number) {
    const valuesDivs = document.querySelectorAll('.filters__price-value');
    valuesDivs[handle].innerHTML = `${values[handle] / 100}`;
    handleSliderFiltersChange({ sliderName: 'price', values, handle })
}

function handleCountSliderChange(values: [], handle: number) {
    const valuesDivs = document.querySelectorAll('.filters__count-value');
    valuesDivs[handle].innerHTML = `${Math.trunc(values[handle])}`;
    handleSliderFiltersChange({ sliderName: 'count', values, handle })
}

function handleYearSliderChange(values: [], handle: number) {
    const valuesDivs = document.querySelectorAll('.filters__year-value');
    valuesDivs[handle].innerHTML = `${Math.trunc(values[handle])}`;
    handleSliderFiltersChange({ sliderName: 'year', values, handle })
}

export {
    handlePriceSliderChange, handleCountSliderChange, handleYearSliderChange
}