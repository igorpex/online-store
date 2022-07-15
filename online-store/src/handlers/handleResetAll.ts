import { StorageService } from '../core-functions/storage';
import { updateSort } from '../view/updateSort';
import { handleResetFilters } from './handleResetFilters';

export function handleResetAll() {
    StorageService.resetCart();
    StorageService.resetSortSettings();
    updateSort();
    handleResetFilters()
}