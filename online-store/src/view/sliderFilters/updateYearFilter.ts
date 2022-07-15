import { target } from 'nouislider';
import * as noUiSlider from 'nouislider';
import { SetSlider, Slider } from '../../interfaces/internal';
//  as noUiSlider.target;
export function updateYearFilter(minYear: number, maxYear: number) {
    const valuesDivs = document.querySelectorAll('.filters__year-value');
    valuesDivs[0].innerHTML = `${Math.trunc(minYear)}`;
    valuesDivs[1].innerHTML = `${Math.trunc(maxYear)}`;

    const priceSlider = document.querySelector('.filters__year-range') as SetSlider;
    priceSlider.noUiSlider.set([minYear, maxYear]);

}

