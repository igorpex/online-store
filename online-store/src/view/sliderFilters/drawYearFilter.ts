import { target } from 'nouislider';
import { StorageService } from '../../core-functions/storage';
import noUiSlider from '../../nouislider/nouislider';

export function drawYearFilter(maximums: [number, number], starts: [number, number]) {
    const [startMin, startMax] = starts;
    const [minYear, maxYear] = maximums;
    // slider
    // let values = StorageService.getSliderFilterByName('year');
    const valuesDivs = document.querySelectorAll('.filters__year-value');
    // const sliderValues = StorageService.getSliderFilterByName('year');
    // const min = sliderValues[0];
    // const max = sliderValues[1]
    valuesDivs[0].innerHTML = `${Number(minYear)}`;
    valuesDivs[1].innerHTML = `${Number(maxYear)}`;

    const slider = document.getElementById('filters__year-range') as target;
    let step = 1;
    noUiSlider.create(slider, {
        start: [startMin, startMax],
        connect: true,
        step: step,
        range: {
            'min': Number(minYear),
            'max': Number(maxYear)
        },
    }
    );
}
