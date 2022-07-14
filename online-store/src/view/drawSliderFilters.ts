import { drawCategoriesFilter } from './filters/drawCategoriesFilter';
import { drawCompanyFilter } from './filters/drawCompanyFilter';
import { drawColorFilter } from './filters/drawColorFilter';
import { drawPriceFilter } from './filters/drawPriceFilter';
import { ProductRanges } from '../interfaces/internal';
import { StorageService } from '../core-functions/storage';
import { SliderFilter } from '../handlers/handleSliders';


function drawSliderFilters(productRanges: ProductRanges, sliderFilter: SliderFilter) {
    let startMin = Number(sliderFilter['price'][0]);
    let startMax = Number(sliderFilter['price'][1]);
    const { minPrice, maxPrice } = productRanges.prices;
    drawPriceFilter([minPrice, maxPrice], [startMin, startMax]);
}


export {
    drawSliderFilters, drawPriceFilter
}