export function drawCategoriesFilter(categories: Array<string>) {
    let categoriesContainer = document.querySelector('.filters__category') as HTMLElement;
    const categoryItemTemp = document.querySelector('#categoryTemp') as HTMLTemplateElement;
    const fragment = document.createDocumentFragment();
    categories.forEach((category) => {
        const categoryClone = categoryItemTemp.content.cloneNode(true) as HTMLInputElement;
        const input = categoryClone.querySelector('.filters__category-input') as HTMLInputElement;
        input.name = category;
        input.id = category;
        input.dataset.category = category;
        const label = categoryClone.querySelector('.filters__category-label') as HTMLLabelElement;
        label.setAttribute('for', category);
        label.textContent = category;
        // categoriesContainer.append(categoryClone);
        categoriesContainer.append(categoryClone);
    })

    // categoriesContainer.append(fragment);
}


    //draw first All companies
    // {
    //     const categoryClone1 = categoryItemTemp.content.cloneNode(true) as HTMLInputElement;
    //     const input1 = categoryClone1.querySelector('.filters__category-input') as HTMLInputElement;
    //     input1.name = 'all';
    //     input1.id = 'filters__category-input-all';
    //     input1.dataset.category = 'all';
    //     input1.classList.add('filters__category-input-all');
    //     const label1 = categoryClone1.querySelector('.filters__category-label') as HTMLLabelElement;
    //     label1.setAttribute('for', 'filters__category-input-all');
    //     label1.textContent = 'All';
    //     categoriesContainer!.append(categoryClone1);
    // }
