// import App from './components/app/app';
import './global.css';
import './global2.scss';
import './nouislider/nouislider.css';
import { getProducts } from './data/getProducts'

import { drawProducts } from './view/drawProducts';
import { drawColorFilter, drawCategoriesFilter, drawCompanyFilter, drawFilters } from './view/drawFilters';
import { Filter, ProductRanges, Slider } from './interfaces/internal';
import { handleSearchFilter, handleCategoryFilter, handleCompanyFilter, handleColorFilter } from './handlers/handlers';
import { handleCountSliderChange, handlePriceSliderChange, handleYearSliderChange } from './handlers/handleSliders';
import { productList } from './data/products';
import { StorageService } from './core-functions/storage';
import { updateFilters } from './view/updateFilters';
import { Product } from './interfaces/api';
import { getFilteredProducts } from './core-functions/filterProducts';
import { getSortedProducts } from './core-functions/sortProducts';
import { handleSort } from './handlers/handleSort';
import { drawSliderFilters } from './view/drawSliderFilters';
import { handleProductsClick } from './handlers/handleProductsClick';
import { updateCartIcon } from './view/updateCartIcon';
import { handleResetFilters } from './handlers/handleResetFilters';
import { handleResetAll } from './handlers/handleResetAll';
import { updateSort } from './view/updateSort';
import { handlePopularFilter } from './handlers/handlePopularFilter';
import { handleShippingFilter } from './handlers/handleShippingFilter';


function findProductRanges(productList: Product[]) {
    const prices = productList.map(product => product.price);
    const counts = productList.map(product => product.count);
    const years = productList.map(product => product.year);
    let minPrice = Math.min(...prices);
    let maxPrice = Math.max(...prices);
    let minCount = Math.min(...counts);
    let maxCount = Math.max(...counts);
    let minYear = Math.min(...years);
    let maxYear = Math.max(...years);

    const colorsArr = productList.map(product => product.colors).flat();
    const colors = new Set(colorsArr);

    const categoriesArr = productList.map(product => product.category).flat();
    const categories = new Set(categoriesArr);

    const companiesArr = productList.map(product => product.company).flat();
    const companies = new Set(companiesArr);

    return {
        categories: Array.from(categories),
        companies: Array.from(companies),
        colors: Array.from(colors),
        prices: { minPrice, maxPrice },
        counts: { minCount, maxCount },
        years: { minYear, maxYear }
    }
}

function addFiltersListeners() {

    const searchContainer = document.querySelector('.filters__search') as HTMLElement;
    searchContainer.addEventListener('input', e => handleSearchFilter(e));

    let clearIcon = document.querySelector('.filters__search-clear');
    clearIcon?.addEventListener('click', e => handleSearchFilter(e));

    const categoryContainer = document.querySelector('.filters__category') as HTMLElement;
    categoryContainer.addEventListener('change', e => handleCategoryFilter(e));

    const companyContainer = document.querySelector('.filters__company') as HTMLElement;
    companyContainer.addEventListener('change', e => handleCompanyFilter(e));

    const colorContainer = document.querySelector('.filters__color') as HTMLElement;
    colorContainer.addEventListener('click', e => handleColorFilter(e));

    const priceSlider = document.querySelector('.filters__price-range') as Slider;
    priceSlider.noUiSlider.on('change', (values: [], handle: number) => handlePriceSliderChange(values, handle));

    const countSlider = document.querySelector('.filters__count-range') as Slider;
    countSlider.noUiSlider.on('change', (values: [], handle: number) => handleCountSliderChange(values, handle));

    const yearSlider = document.querySelector('.filters__year-range') as Slider;
    yearSlider.noUiSlider.on('change', (values: [], handle: number) => handleYearSliderChange(values, handle));

    const sortButtons = document.querySelectorAll('.sort__buttons');
    sortButtons.forEach(button => button.addEventListener('click', e => handleSort(e)));

    const products = document.querySelector('.products');
    products?.addEventListener('click', e => handleProductsClick(e));

    const resetFiltersButton = document.querySelector('.filters__filters-reset-button');
    resetFiltersButton?.addEventListener('click', () => handleResetFilters());

    const resetAllButton = document.querySelector('.filters__all-reset-button');
    resetAllButton?.addEventListener('click', () => handleResetAll());

    const popularInput = document.querySelector('.filters__popular-input');
    popularInput?.addEventListener('change', (e) => handlePopularFilter(e));

    const shippingInput = document.querySelector('.filters__shipping-input');
    shippingInput?.addEventListener('change', (e) => handleShippingFilter(e));
}

function saveAllProducts(productList: Product[]) {
    localStorage.setItem("productList", JSON.stringify(productList));
}

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
    StorageService.initSliderFilter(productRanges);
    // Init slider filters


    // Draw filters
    drawFilters(productRanges);
    const sliderFilter = StorageService.getSliderFilter();
    drawSliderFilters(productRanges, sliderFilter);
    // draw filters (sync view with filtered settings)
    updateSort();
    updateFilters();
    addFiltersListeners();


    // addResetListeners();

    // Save product list to storage for future use
    saveAllProducts(productList);

    const filteredPoducts = getFilteredProducts(); //function uses filters info from local storage
    const sortedPoducts = getSortedProducts(filteredPoducts, sortSettings);
    drawProducts(sortedPoducts);

    const cart = StorageService.getCart();
    updateCartIcon(cart);
}

window.addEventListener('DOMContentLoaded', e => start(e));

// const app = new App();
// app.start();
