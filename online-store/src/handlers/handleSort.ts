import { getFilteredProducts } from '../core-functions/filterProducts';
import { getSortedProducts } from '../core-functions/sortProducts';
import { StorageService } from '../core-functions/storage';
import { drawProducts } from '../view/drawProducts';
import { updateSort } from '../view/updateSort';

export function handleSort(e: Event) {
    const sortType = (e.target as HTMLElement).dataset.sortType!;
    const sortDirection = (e.target as HTMLElement).dataset.sortDirection!;
    const sortSettings = { type: sortType, direction: sortDirection }
    StorageService.setSortSettings(sortSettings);

    //Get existing sort settings. Get default by name asc if not exist yet.
    const filteredProducts = getFilteredProducts(); //function uses filters info from local storage
    const sortedPoducts = getSortedProducts(filteredProducts, sortSettings);
    drawProducts(sortedPoducts);
    updateSort();
}