import { target } from 'nouislider';
import { StorageService } from '../../core-functions/storage';
import noUiSlider from '../../nouislider/nouislider';

export function drawCountFilter(maximums: [number, number], starts: [number, number]) {
    const [startMin, startMax] = starts;
    const [minCount, maxCount] = maximums;
    // slider
    // let values = StorageService.getSliderFilterByName('count');
    const valuesDivs = document.querySelectorAll('.filters__count-value');
    // const sliderValues = StorageService.getSliderFilterByName('count');
    // const min = sliderValues[0];
    // const max = sliderValues[1]
    valuesDivs[0].innerHTML = `${minCount}`;
    valuesDivs[1].innerHTML = `${maxCount}`;

    const slider = document.getElementById('filters__count-range') as target;
    let step = 1;
    noUiSlider.create(slider, {
        start: [startMin, startMax],
        connect: true,
        step: step,
        range: {
            'min': minCount,
            'max': maxCount
        },
    }
    );
}
