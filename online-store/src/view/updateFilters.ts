import { ProductRanges } from '../interfaces/internal';
import { updateCompanyFilter } from './filters/updateCompanyFilter';
import { StorageService } from '../core-functions/storage';
import { updateCategoryFilter } from './filters/updateCategoryFilter';
import { updateColorFilter } from './filters/updateColorFilter';
import { updateSearchFilter } from './filters/updateSearchFilter';
import { updatePriceFilter } from './filters/updatePriceFilter';

export function updateFilters() {
    const filteredCategories = StorageService.getFilterByName('categories');
    const filteredCompanies = StorageService.getFilterByName('companies');
    const filteredColors = StorageService.getFilterByName('colors');
    const searchValue = StorageService.getSearchFilter();
    const minPrice = StorageService.getSliderFilterByName('price')[0];
    const maxPrice = StorageService.getSliderFilterByName('price')[1];

    updateSearchFilter(searchValue);
    updateCompanyFilter(Array.from(filteredCompanies));
    updateCategoryFilter(Array.from(filteredCategories));
    updateColorFilter(Array.from(filteredColors));
    updatePriceFilter(Number(minPrice), Number(maxPrice));
}