export function updateSearchFilter(searchValue: string) {
    let clearIcon = document.querySelector('.filters__search-clear');
    let searchField = document.querySelector('.filters__search-input') as HTMLInputElement;
    if (!searchValue || searchValue.length === 0 || searchValue.trim() === '') {
        (clearIcon as HTMLElement).style.display = 'none';
        searchField.value = '';
    } else (clearIcon as HTMLElement).style.display = 'inline-block';
}