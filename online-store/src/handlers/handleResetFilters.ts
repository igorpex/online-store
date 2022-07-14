import { getFilteredProducts } from '../core-functions/filterProducts';
import { getSortedProducts } from '../core-functions/sortProducts';
import { StorageService } from '../core-functions/storage';
import { Slider } from '../interfaces/internal';
import { drawFilters } from '../view/drawFilters';
import { drawProducts } from '../view/drawProducts';
import { drawSliderFilters } from '../view/drawSliderFilters';
import { updateCartIcon } from '../view/updateCartIcon';
import { updateFilters } from '../view/updateFilters';
import { handlePriceSliderChange } from './handleSliders';
// import * as noUiSlider from 'nouislider';
//  as noUiSlider.target;

export function handleResetFilters() {
    StorageService.setSearchFilter('');
    StorageService.resetFilter();
    StorageService.resetSliderFilter();

    const productRanges = StorageService.getProductRanges();
    console.log('productRanges:', productRanges);
    StorageService.initSliderFilter(productRanges);
    // drawFilters(productRanges);
    const priceSlider = document.querySelector('.filters__price-range') as Slider;
    priceSlider.noUiSlider.on('change', (values: [], handle: number) => handlePriceSliderChange(values, handle));
    // priceSlider.noUiSlider.set(1,2);
    updateFilters();
    const sliderFilter = StorageService.getSliderFilter();

    // drawSliderFilters(productRanges, sliderFilter);
    // addFiltersListeners();
    // const slider = document.getElementById('.filters__price-range') as target;
    // slider.noUiSlider!.set([minPrice, maxPrice]);

    const sortSettings = StorageService.getSortSettings();
    const filteredPoducts = getFilteredProducts(); //function uses filters info from local storage
    const sortedPoducts = getSortedProducts(filteredPoducts, sortSettings);

    drawProducts(sortedPoducts);

    const cart = StorageService.getCart();
    updateCartIcon(cart);
}

function addFiltersListeners() {
    throw new Error('Function not implemented.');
}
