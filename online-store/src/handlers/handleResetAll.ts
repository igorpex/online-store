import { StorageService } from '../core-functions/storage';
import { handleResetFilters } from './handleResetFilters';

export function handleResetAll() {
    StorageService.resetCart();
    StorageService.resetSortSettings();
    handleResetFilters()
}