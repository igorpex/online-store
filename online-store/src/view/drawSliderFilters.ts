import { drawCategoriesFilter } from './filters/drawCategoriesFilter';
import { drawCompanyFilter } from './filters/drawCompanyFilter';
import { drawColorFilter } from './filters/drawColorFilter';
import { drawPriceFilter } from './sliderFilters/drawPriceFilter';
import { ProductRanges } from '../interfaces/internal';
import { StorageService } from '../core-functions/storage';
import { SliderFilter } from '../handlers/handleSliders';
import { drawCountFilter } from './sliderFilters/drawCountFilter';
import { drawYearFilter } from './sliderFilters/drawYearFilter';



function drawSliderFilters(productRanges: ProductRanges, sliderFilter: SliderFilter) {

    let startMinPrice = Number(sliderFilter['price'][0]);
    let startMaxPrice = Number(sliderFilter['price'][1]);
    const { minPrice, maxPrice } = productRanges.prices;
    drawPriceFilter([minPrice, maxPrice], [startMinPrice, startMaxPrice]);


    let startMinCount = Number(sliderFilter['count'][0]);
    let startMaxCount = Number(sliderFilter['count'][1]);
    const { minCount, maxCount } = productRanges.counts;
    drawCountFilter([minCount, maxCount], [startMinCount, startMaxCount]);


    let startMinYear = Number(sliderFilter['year'][0]);
    let startMaxYear = Number(sliderFilter['year'][1]);
    const { minYear, maxYear } = productRanges.years;
    drawYearFilter([minYear, maxYear], [startMinYear, startMaxYear]);

}


export {
    drawSliderFilters, drawPriceFilter
}