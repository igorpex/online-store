import { drawProducts } from '../view/drawProducts';
import { getFilteredProducts } from '../index';

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

function handleSearchFilter(e: Event) {
    const sliders = document.querySelectorAll('.filters__price-range');
    console.log('handleSearchFilter: event: ', e);
}

function updateFilterState(changedField: string, item: string, value: boolean) {
    let filter = JSON.parse(localStorage.getItem('filter')!);
    if (filter === null || filter == undefined) { filter = {} };
    if (!Array.isArray(filter[changedField])) {
        filter[changedField] = [];
    }
    if (filter[changedField].length === 0 || !filter[changedField].includes(item) && value) {
        filter[changedField].push(item);
    } else if (filter[changedField].includes(item) && !value) {
        filter[changedField] = filter[changedField].filter((element: string) => element !== item);
        // filter[changedField] = filter[changedField].filter((element: string) => element !== value);
    }
    localStorage.setItem('filter', JSON.stringify(filter));
}

interface FilterChange {
    changedField: string;
    item: string;
    value: boolean;
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

function updateColorFilterView() {
    //update colors filter icons
    let filterColors = JSON.parse(localStorage.getItem('filter')!)['colors'];
    let allColorsBtn = document.querySelector('.filters__colors-button-all') as HTMLButtonElement
    if (filterColors.includes('all')) {
        allColorsBtn.textContent = "All V";
    } else { allColorsBtn.textContent = "All" };
    document.querySelectorAll('.filters__colors-button').forEach(element => {
        // filters__colors-button_active
        const elementColor = (element as HTMLButtonElement).dataset.color
        if (filterColors.includes(elementColor)) {
            element.classList.add('filters__colors-button_active');
        } else {
            element.classList.remove('filters__colors-button_active')
        }
    })
}

function handleColorFilter(e: Event) {
    console.log('handleCategoryFilter: event target: ', e.target);
    const clickedColor = (e.target as HTMLButtonElement).dataset.color!;
    console.log('clicked color: ', clickedColor);

    //update filter state
    let filter = JSON.parse(localStorage.getItem('filter')!);
    if (filter === null || filter == undefined) { filter = {} };
    if (!Array.isArray(filter['colors'])) {
        filter['colors'] = [];
    }
    if (filter['colors'].length === 0 || !filter['colors'].includes(clickedColor)) {
        filter['colors'].push(clickedColor);
    } else if (filter['colors'].includes(clickedColor)) {
        filter['colors'] = filter['colors'].filter((element: string) => element !== clickedColor);
        // filter[changedField] = filter[changedField].filter((element: string) => element !== value);
    }
    localStorage.setItem('filter', JSON.stringify(filter));

    //update colors filter buttons
    updateColorFilterView()

    //get fltered products
    const filteredProducts = getFilteredProducts();
    // drawFilters()
    console.log('filteredProducts Length:', filteredProducts.length);
    // drawProducts()
    drawProducts(filteredProducts);

}


interface SliderFilterChange {
    changedField: string;
    values: number[];
    handle: number;
}

function updateSliderFiltersState({ changedField, values, handle }: SliderFilterChange) {
    console.log('updateFilterState:changedField: ', changedField, 'values: ', values, 'handle: ', handle);
    let sliderfilter = JSON.parse(localStorage.getItem('sliderFilters')!);
    // Check filter exist in local storage, if not, make empty object.
    if (sliderfilter === null || sliderfilter === undefined) { sliderfilter = {} };
    console.log('sliderfilter after it is undefined:', sliderfilter);
    sliderfilter[changedField] = values;
    localStorage.setItem('sliderfilter', JSON.stringify(sliderfilter));
}

function handleSliderFiltersChange({ changedField, values, handle }: SliderFilterChange) {
    updateSliderFiltersState({ changedField, values, handle });
    const filteredProducts = getFilteredProducts();
    // drawFilters()
    console.log('filteredProducts Length:', filteredProducts.length);
    drawProducts(filteredProducts);
}

function handlePriceSliderChange(values: [], handle: number) {
    const valuesDivs = document.querySelectorAll('.filters__price-value');
    // console.log('values change:', values);
    // console.log('handle change:', handle);
    valuesDivs[handle].innerHTML = `${values[handle] / 100}`;
    handleSliderFiltersChange({ changedField: 'price', values, handle })
}

export {
    handlePriceSliderChange,
    handleSearchFilter,
    handleCategoryFilter,
    handleCompanyFilter,
    handleColorFilter
}