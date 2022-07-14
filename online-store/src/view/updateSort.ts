import { StorageService } from '../core-functions/storage';

export function updateSort() {
    const sortButtons = document.querySelectorAll('.sort__buttons');
    const sortSettings = StorageService.getSortSettings();
    console.log('sortSettings:', sortSettings);
    sortButtons.forEach(button => {
        let buttonType = (button as HTMLElement).dataset.sortType;
        let buttonDirection = (button as HTMLElement).dataset.sortDirection;
        console.log('buttonDataset:', (button as HTMLElement).dataset);
        if (buttonType === sortSettings.type && buttonDirection === sortSettings.direction) {
            button.classList.add('sort__buttons_active')
        } else button.classList.remove('sort__buttons_active');
    })
}