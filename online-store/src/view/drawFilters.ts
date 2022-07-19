import { drawCategoriesFilter } from './filters/drawCategoriesFilter';
import { drawCompanyFilter } from './filters/drawCompanyFilter';
import { drawColorFilter } from './filters/drawColorFilter';
import { ProductRanges } from '../interfaces/internal';


function drawFilters(productRanges: ProductRanges) {
    // let productRanges = StorageService.getProductRanges();
    // let productRanges = getProductRanges(productList);
    const { minPrice, maxPrice } = productRanges.prices;
    const colors: Array<string> = productRanges.colors;
    const categories = productRanges.categories;
    const companies = productRanges.companies;
    // drawSearchFilter();
    drawCategoriesFilter(categories);
    drawCompanyFilter(companies);
    drawColorFilter(colors);
}


export {
    drawFilters, drawCategoriesFilter, drawCompanyFilter, drawColorFilter
}