import { StorageService } from '../core-functions/storage';

export function updateSort() {
    const sortButtons = document.querySelectorAll('.sort__button');
    const sortSettings = StorageService.getSortSettings();
    console.log('sortSettings:', sortSettings);
    sortButtons.forEach(button => {
        let buttonType = (button as HTMLElement).dataset.sortType;
        let buttonDirection = (button as HTMLElement).dataset.sortDirection;
        console.log('buttonDataset:', (button as HTMLElement).dataset);
        if (buttonType === sortSettings.type && buttonDirection === sortSettings.direction) {
            button.classList.add('sort__button_active')
        } else button.classList.remove('sort__button_active');
    })
}