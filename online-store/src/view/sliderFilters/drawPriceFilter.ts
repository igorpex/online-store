import { target } from 'nouislider';
import { StorageService } from '../../core-functions/storage';
import noUiSlider from '../../nouislider/nouislider';

export function drawPriceFilter(maximums: [number, number], starts: [number, number]) {
    const [startMin, startMax] = starts;
    const [minPrice, maxPrice] = maximums;
    // slider
    // let values = StorageService.getSliderFilterByName('price');
    const valuesDivs = document.querySelectorAll('.filters__price-value');
    // const sliderValues = StorageService.getSliderFilterByName('price');
    // const min = sliderValues[0];
    // const max = sliderValues[1]
    valuesDivs[0].innerHTML = `${Number(minPrice) / 100}`;
    valuesDivs[1].innerHTML = `${Number(maxPrice) / 100}`;

    const slider = document.getElementById('filters__price-range') as target;
    let step = Number(maxPrice) / 100 > 1 ? Math.trunc(Number(maxPrice) / 200) : 1;
    noUiSlider.create(slider, {
        start: [startMin, startMax],
        connect: true,
        step: step,
        range: {
            'min': Number(minPrice),
            'max': Number(maxPrice)
        },
    }
    );
}
