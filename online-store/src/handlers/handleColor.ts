import { drawProducts } from '../view/drawProducts';
import { StorageService } from '../core-functions/storage';
import { getFilteredProducts } from '../core-functions/filterProducts';
import { getSortedProducts } from '../core-functions/sortProducts';
import { updateColorFilter } from '../view/filters/updateColorFilter';

export function handleColorFilter(e: Event) {
    if (!(e.target as HTMLElement).classList.contains('filters__colors-button')) return;
    // console.log('handleCategoryFilter: event target: ', e.target);
    const clickedColor = (e.target as HTMLButtonElement).dataset.color!;
    // console.log('clicked color: ', clickedColor);

    //update filter state
    const filter = StorageService.getFilter();
    let filteredColors = StorageService.getFilterByName('colors');
    filteredColors = filteredColors.filter((element: string) => element !== null);

    if (!filteredColors || filteredColors.length === 0 || !filteredColors.includes(clickedColor)) {
        filteredColors.push(clickedColor)
    } else if (filteredColors.includes(clickedColor)) {
        filteredColors = filteredColors.filter((element: string) => element !== clickedColor);
        // filter[changedField] = filter[changedField].filter((element: string) => element !== value);
    }

    filter.colors = filteredColors;
    StorageService.setFilter(filter);

    //update colors filter buttons
    updateColorFilter(filteredColors);

    //Get existing sort settings. Get default by name asc if not exist yet.
    const sortSettings = StorageService.getSortSettings();

    //get fltered products
    const filteredProducts = getFilteredProducts();
    const sortedPoducts = getSortedProducts(filteredProducts, sortSettings);

    // drawProducts()
    drawProducts(sortedPoducts);

}