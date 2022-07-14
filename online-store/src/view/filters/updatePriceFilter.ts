import { target } from 'nouislider';
export function updatePriceFilter(minPrice: number, maxPrice: number) {
    const valuesDivs = document.querySelectorAll('.filters__price-value');
    valuesDivs[0].innerHTML = `${minPrice / 100}`;
    valuesDivs[1].innerHTML = `${maxPrice / 100}`;

    // const slider = document.getElementById('.filters__price-range') as target;
    // slider.noUiSlider!.set([minPrice, maxPrice]);
}

