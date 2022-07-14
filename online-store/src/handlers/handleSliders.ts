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
    // console.log('updateFilterState:changedField: ', changedField, 'values: ', values, 'handle: ', handle);

    let sliderFilter = JSON.parse(localStorage.getItem('sliderFilters')!);
    // Check filter exist in local storage, if not, make empty object.
    if (sliderFilter === null || sliderFilter === undefined) { sliderFilter = {} };
    console.log('sliderFilter after it is undefined:', sliderFilter);
    sliderFilter[sliderName] = values;
    localStorage.setItem('sliderFilter', JSON.stringify(sliderFilter));
}

function handleSliderFiltersChange({ sliderName, values, handle }: SliderFilterChange) {
    // updateSliderFiltersState({ sliderName, values });
    StorageService.setSliderFilterByName({ sliderName, values });
    const filteredProducts = getFilteredProducts();
    // drawFilters()
    console.log('filteredProducts Length:', filteredProducts.length);
    drawProducts(filteredProducts);
}

function handlePriceSliderChange(values: [], handle: number) {
    const valuesDivs = document.querySelectorAll('.filters__price-value');
    // console.log('values change:', values);
    // console.log('handle change:', handle);
    valuesDivs[handle].innerHTML = `${values[handle] / 100}`;
    handleSliderFiltersChange({ sliderName: 'price', values, handle })
}

export {
    handlePriceSliderChange,
}