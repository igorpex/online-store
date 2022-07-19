export function updateCategoryFilter(filteredCategories: string[] = []) {
    const companiesCheckboxes = document.querySelectorAll('.filters__category-input');
    companiesCheckboxes.forEach((element) => {
        const category = (element as HTMLInputElement).dataset.category;
        if (filteredCategories.includes(category!)) {
            (element as HTMLInputElement).checked = true
        } else {
            (element as HTMLInputElement).checked = false
        }
    })
}