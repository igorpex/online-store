import { target } from 'nouislider';
import * as noUiSlider from 'nouislider';
import { SetSlider, Slider } from '../../interfaces/internal';
//  as noUiSlider.target;
export function updatePriceFilter(minPrice: number, maxPrice: number) {
    const valuesDivs = document.querySelectorAll('.filters__price-value');
    valuesDivs[0].innerHTML = `${minPrice / 100}`;
    valuesDivs[1].innerHTML = `${maxPrice / 100}`;

    const priceSlider = document.querySelector('.filters__price-range') as SetSlider;
    // priceSlider.noUiSlider.on('change', (values: [], handle: number) => handlePriceSliderChange(values, handle));
    priceSlider.noUiSlider.set([minPrice, maxPrice]);

    // const slider = document.getElementById('.filters__price-range') as target;
    // slider.noUiSlider!.set([minPrice, maxPrice]);
}

