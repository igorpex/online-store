
import { drawProducts } from '../view/drawProducts';
import { updateSearchFilter } from '../view/filters/updateSearchFilter';
import { getFilteredProducts } from '../core-functions/filterProducts';
import { getSortedProducts } from '../core-functions/sortProducts';
import { StorageService } from '../core-functions/storage';
export function handleSearchFilter(e: Event) {
    console.log('handleSearchFilter: event: ', e);
    let searchValue;
    if ((e.target as HTMLElement).classList.contains("filters__search-clear")) {
        searchValue = ''
    } else searchValue = (e.target as HTMLInputElement).value;

    StorageService.setSearchFilter(searchValue);

    //Get existing sort settings. Get default by name asc if not exist yet.
    const sortSettings = StorageService.getSortSettings();
    const filteredProducts = getFilteredProducts(); //function uses filters info from local storage
    const sortedPoducts = getSortedProducts(filteredProducts, sortSettings);
    drawProducts(sortedPoducts);
    updateSearchFilter(searchValue);
}