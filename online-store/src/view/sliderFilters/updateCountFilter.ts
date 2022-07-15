import { target } from 'nouislider';
import * as noUiSlider from 'nouislider';
import { SetSlider, Slider } from '../../interfaces/internal';
//  as noUiSlider.target;
export function updateCountFilter(minCount: number, maxCount: number) {
    const valuesDivs = document.querySelectorAll('.filters__count-value');
    valuesDivs[0].innerHTML = `${Math.trunc(minCount)}`;
    valuesDivs[1].innerHTML = `${Math.trunc(maxCount)}`;

    const priceSlider = document.querySelector('.filters__count-range') as SetSlider;
    priceSlider.noUiSlider.set([minCount, maxCount]);
}

