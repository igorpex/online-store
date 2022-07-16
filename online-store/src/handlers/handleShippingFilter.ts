import { getFilteredProducts } from '../core-functions/filterProducts';
import { StorageService } from '../core-functions/storage';
import { drawProducts } from '../view/drawProducts';

export function handleShippingFilter(e: Event) {
    const checked = (e.target as HTMLInputElement).checked;
    let filter = StorageService.getFilter();
    filter['shipping'] = [checked];
    StorageService.setFilter(filter);
    const filteredProducts = getFilteredProducts();
    drawProducts(filteredProducts);
}