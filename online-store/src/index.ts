// import App from './components/app/app';
import './global.css';
import './global2.scss';
import './nouislider/nouislider.css';
import { getProducts } from './data/getProducts'

import { drawProducts } from './view/drawProducts';
import { drawColorFilter, drawCategoriesFilter, drawCompanyFilter, drawFilters } from './view/drawFilters';
import { Filter, ProductRanges, Slider } from './interfaces/internal';
import { handleSearchFilter, handleCategoryFilter, handleCompanyFilter, handleColorFilter } from './handlers/handlers';
import { handlePriceSliderChange } from './handlers/handleSliders';
import { productList } from './data/products';
import { StorageService } from './core-functions/storage';
import { updateFilters } from './view/updateFilters';
import { Product } from './interfaces/api';
import { getFilteredProducts } from './core-functions/filterProducts';
import { getSortedProducts } from './core-functions/sortProducts';
import { handleSort } from './handlers/handleSort';
import { drawSliderFilters } from './view/drawSliderFilters';
import { handleProductsClick } from './handlers/handleProductsClick';


function findProductRanges(productList: Product[]) {
    const prices = productList.map(product => product.price);
    let minPrice = Math.min(...prices);
    let maxPrice = Math.max(...prices);
    console.log('minPrice: ', minPrice);
    console.log('maxPrice: ', maxPrice);

    const colorsArr = productList.map(product => product.colors).flat();
    const colors = new Set(colorsArr);
    console.log('###colors: ', colors);

    const categoriesArr = productList.map(product => product.category).flat();
    const categories = new Set(categoriesArr);

    const companiesArr = productList.map(product => product.company).flat();
    const companies = new Set(companiesArr);

    return {
        categories: Array.from(categories),
        companies: Array.from(companies),
        colors: Array.from(colors),
        prices: { minPrice, maxPrice },
    }
}

function addFiltersListeners() {

    const searchContainer = document.querySelector('.filters__search') as HTMLElement;
    searchContainer.addEventListener('input', e => handleSearchFilter(e));

    const categoryContainer = document.querySelector('.filters__category') as HTMLElement;
    categoryContainer.addEventListener('change', e => handleCategoryFilter(e));

    const companyContainer = document.querySelector('.filters__company') as HTMLElement;
    companyContainer.addEventListener('change', e => handleCompanyFilter(e));

    const colorContainer = document.querySelector('.filters__color') as HTMLElement;
    colorContainer.addEventListener('click', e => handleColorFilter(e));

    const priceSlider = document.querySelector('.filters__price-range') as Slider;
    priceSlider.noUiSlider.on('change', (values: [], handle: number) => handlePriceSliderChange(values, handle));

    let clearIcon = document.querySelector('.filters__search-clear');
    clearIcon?.addEventListener('click', e => handleSearchFilter(e));

    const sortButtons = document.querySelectorAll('.sort__buttons');
    sortButtons.forEach(button => button.addEventListener('click', e => handleSort(e)));

    const products = document.querySelector('.products');
    products?.addEventListener('click', e => handleProductsClick(e));

    // const yearSlider = document.querySelector('.filters__price-range') as Slider;
    // yearSlider.noUiSlider.on('change', (values: [], handle: number) => handleYearSliderChange(values, handle));

}

function saveAllProducts(productList: Product[]) {
    localStorage.setItem("productList", JSON.stringify(productList));
}

// function addStorageListener() {
//     window.addEventListener('storage', e => processStorageUpdates(e))
// };

// function processStorageUpdates(e: StorageEvent) {
//     console.log('storage event', e);
// }

// function initFilter(productRanges) {

// };

// function initFilter(productRanges: ProductRanges) {
// };

function initSliderFilter(productRanges: ProductRanges) {
    let previousPriceFilter = StorageService.getSliderFilterByName('price');
    if (!previousPriceFilter[0] || !previousPriceFilter[1]) {
        StorageService.setSliderFilterByName({ sliderName: 'price', values: [productRanges['prices']['minPrice'], productRanges['prices']['maxPrice']] });
    }
};

async function start(e: Event) {
    const productList = await getProducts();

    // find productRanges for filters from product list.
    const productRanges = findProductRanges(productList);
    // Save them to storage for future use
    StorageService.setProductRanges(productRanges);

    //Get existing sort settings. Get default by name asc if not exist yet.
    const sortSettings = StorageService.getSortSettings();
    // Save them to local storage
    StorageService.setSortSettings(sortSettings);

    // Init normal filters
    // initFilter(productRanges);
    initSliderFilter(productRanges);
    // Init slider filters


    // Draw filters
    drawFilters(productRanges);
    const sliderFilter = StorageService.getSliderFilter();
    drawSliderFilters(productRanges, sliderFilter);
    // draw filters (sync view with filtered settings)
    updateFilters();
    addFiltersListeners();

    // addResetListeners();

    // Save product list to storage for future use
    saveAllProducts(productList);

    const filteredPoducts = getFilteredProducts(); //function uses filters info from local storage
    const sortedPoducts = getSortedProducts(filteredPoducts, sortSettings);
    drawProducts(sortedPoducts);
}

window.addEventListener('DOMContentLoaded', e => start(e));

// const app = new App();
// app.start();
