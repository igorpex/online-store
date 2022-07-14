import { drawProducts } from '../view/drawProducts';
import { getFilteredProducts } from '../core-functions/filterProducts';
import { StorageService } from '../core-functions/storage';
import { handleSearchFilter } from './handleSearch';
import { handleColorFilter } from './handleColor'

function handlePriceFilterNormal() {
    const sliders = document.querySelectorAll('.filters__price-range');

    sliders[0].addEventListener('input', (e) => {
        if (+((sliders[0] as HTMLInputElement).value) > +((sliders[1] as HTMLInputElement).value)) {
            (sliders[1] as HTMLInputElement).value = (sliders[0] as HTMLInputElement).value;
        }
    });

    sliders[1].addEventListener('input', (e) => {
        if (+((sliders[0] as HTMLInputElement).value) > +((sliders[1] as HTMLInputElement).value)) {
            (sliders[0] as HTMLInputElement).value = (sliders[1] as HTMLInputElement).value;
        }
    });

    sliders.forEach((slider) => {
        slider.addEventListener('change', () => {
            console.log(`from ${(sliders[0] as HTMLInputElement).value} to ${(sliders[1] as HTMLInputElement).value}`);
        })
    });
}

interface FilterChange {
    changedField: string;
    item: string;
    value: boolean;
}

function updateFilterState(changedField: string, item: string, value: boolean) {
    // check filter exists
    let filter = JSON.parse(localStorage.getItem('filter')!);
    if (filter === null || filter == undefined) { filter = {} };
    // check array for this filtering category exists
    if (!Array.isArray(filter[changedField])) {
        filter[changedField] = [];
    }
    // if element does not exist in filter - add it
    if (filter[changedField].length === 0 || !filter[changedField].includes(item) && value) {
        filter[changedField].push(item);
    } else if (filter[changedField].includes(item) && !value) {
        filter[changedField] = filter[changedField].filter((element: string) => element !== item);
        // filter[changedField] = filter[changedField].filter((element: string) => element !== value);
    }
    localStorage.setItem('filter', JSON.stringify(filter));
}

function handleFilterChange({ changedField, item, value }: FilterChange) {
    updateFilterState(changedField, item, value);
    const filteredProducts = getFilteredProducts();
    // drawFilters()
    console.log('filteredProducts Length:', filteredProducts.length);
    drawProducts(filteredProducts);
}

function handleCategoryFilter(e: Event) {
    console.log('handleCategoryFilter: event target: ', e.target);
    const checked = (e.target as HTMLInputElement).checked;
    let category = (e.target as HTMLButtonElement).dataset.category!;
    handleFilterChange({ changedField: 'categories', item: category, value: checked })
    console.log("is checked: ", checked);
}

function handleCompanyFilter(e: Event) {
    console.log('handleCompanyFilter: event target: ', e.target);
    const checked = (e.target as HTMLInputElement).checked;
    let company = (e.target as HTMLButtonElement).dataset.company!;
    handleFilterChange({ changedField: 'companies', item: company, value: checked })
    console.log("is checked: ", checked);
}

export {
    handleSearchFilter,
    handleCategoryFilter,
    handleCompanyFilter,
    handleColorFilter
}