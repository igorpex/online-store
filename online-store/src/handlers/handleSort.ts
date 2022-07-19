import { HtmlTagObject } from 'html-webpack-plugin';
import { getFilteredProducts } from '../core-functions/filterProducts';
import { getSortedProducts } from '../core-functions/sortProducts';
import { StorageService } from '../core-functions/storage';
import { drawProducts } from '../view/drawProducts';
import { updateSort } from '../view/updateSort';

export function handleSort(e: Event) {
    if (!(e.target as HTMLElement).classList.contains('sort__button')) return;
    const sortType = (e.target as HTMLElement).dataset.sortType!;
    const sortDirection = (e.target as HTMLElement).dataset.sortDirection!;
    const sortSettings = { type: sortType, direction: sortDirection }
    StorageService.setSortSettings(sortSettings);

    //Get existing sort settings. Get default by name asc if not exist yet.
    const filteredProducts = getFilteredProducts(); //function uses filters info from local storage
    const sortedPoducts = getSortedProducts(filteredProducts, sortSettings);

    // Draw products
    drawProducts(sortedPoducts);
    // Update sort buttons view
    updateSort();
}