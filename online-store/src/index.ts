// import App from './components/app/app';
import './global.css';
import './nouislider/nouislider.css';
import { getProducts } from './data/getProducts'
import { Product } from './interfaces/api';
import { drawProducts } from './view/drawProducts';
import { drawColorFilter, drawPriceFilter, drawCategoriesFilter, drawCompanyFilter } from './view/drawFilters';
import { Filter, Slider } from './interfaces/internal';
import { handlePriceSliderChange, handleSearchFilter, handleCategoryFilter, handleCompanyFilter, handleColorFilter } from './handlers/handlers';
import { productList } from './data/products';

function getProductRanges(productList: Product[]) {
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
        categories: categories,
        companies: companies,
        colors: colors,
        prices: { minPrice, maxPrice },
    }
}

function createAndDrawFilters(productList: Product[]) {
    let productRanges = getProductRanges(productList);

    const { minPrice, maxPrice } = productRanges.prices;
    const colors: Set<string> = productRanges.colors;
    const categories = productRanges.categories;
    const companies = productRanges.companies;

    localStorage.setItem('categories', JSON.stringify(Array.from(categories)));
    localStorage.setItem('companies', JSON.stringify(Array.from(companies)));
    localStorage.setItem('colors', JSON.stringify(Array.from(colors)));
    // localStorage.setItem('productRanges', JSON.stringify(productRanges));

    // drawSearchFilter();
    drawCategoriesFilter(categories);
    drawCompanyFilter(companies);
    drawColorFilter(colors);
    drawPriceFilter(minPrice, maxPrice);
}

function addFiltersLIsteners() {

    const searchContainer = document.querySelector('.filters__search') as HTMLElement;
    searchContainer.addEventListener('change', e => handleSearchFilter(e));

    const categoryContainer = document.querySelector('.filters__category') as HTMLElement;
    categoryContainer.addEventListener('change', e => handleCategoryFilter(e));

    const companyContainer = document.querySelector('.filters__company') as HTMLElement;
    companyContainer.addEventListener('change', e => handleCompanyFilter(e));

    const colorContainer = document.querySelector('.filters__color') as HTMLElement;
    colorContainer.addEventListener('click', e => handleColorFilter(e));

    // for (let filter of rangeFilters) {
    //     // console.log('filter in', filter);
    //     const slider = document.querySelector(filter.containerSelectors[0]) as Slider;
    //     slider.noUiSlider.on('change', (values: [], handle: number) => filter.handler(values, handle));
    // }

    const priceSlider = document.querySelector('.filters__price-range') as Slider;
    priceSlider.noUiSlider.on('change', (values: [], handle: number) => handlePriceSliderChange(values, handle));

    // const yearSlider = document.querySelector('.filters__price-range') as Slider;
    // yearSlider.noUiSlider.on('change', (values: [], handle: number) => handleYearSliderChange(values, handle));

}

function saveAllProducts(productList: Product[]) {
    localStorage.setItem("productList", JSON.stringify(productList));
}

interface FilterParams {
    categories: string[];
    companies: string[];
    colors: string[];
}

function filterProducts(productList: Product[], filter: FilterParams) {
    let categories: any;
    let companies: any;
    let colors: any;
    // console.log('categories from FilterParams: ', filter.categories);
    // console.log('companies from FilterParams: ', filter.categories);
    // console.log('Array is array:', Array.isArray(filter.categories));
    if (filter === null || filter == undefined) { filter = { categories: [], companies: [], colors: [] } };
    if (Array.isArray(filter.categories)) { categories = filter.categories } else { categories = new Array() };
    if (Array.isArray(filter.companies)) { companies = filter.companies } else { companies = new Array() };
    if (Array.isArray(filter.colors)) { colors = filter.colors } else { colors = new Array() };
    // const companies = Array.isArray(filter.companies) ? filter.companies : new Array();
    // const colors = Array.isArray(filter.colors) ? filter.colors : new Array();
    console.log('categories from filterProducts after if: ', categories);
    console.log('companies from filterProducts after if: ', companies);
    console.log('colors from filterProducts after if: ', colors);

    let filtered = productList
        .filter(product => {
            if (categories.length === 0 || categories.includes('all')) return true;
            // console.log('Result for product: ', product.name);
            // console.log( categories.includes(product.category));
            return categories.includes(product.category);
        })
        .filter(product => {
            if (companies.length === 0 || companies.includes('all')) return true;
            return companies.includes(product.company)
        })
        .filter(product => {
            if (colors.length === 0 || colors.includes('all')) return true;
            for (let productColor of product.colors) {
                if (colors.includes(productColor)) return true
            } return false
        })
    return filtered;
}

export function getFilteredProducts() {
    const products = JSON.parse(localStorage.getItem('productList')!);
    let filter = JSON.parse(localStorage.getItem('filter')!);
    // if (filter === null || filter == undefined) { filter = {} };
    let filteredProducts = filterProducts(products, filter);
    return filteredProducts;
}

async function start(e: Event) {
    const productList = await getProducts();
    createAndDrawFilters(productList);
    addFiltersLIsteners();
    saveAllProducts(productList);
    const filteredPoducts = getFilteredProducts();
    drawProducts(filteredPoducts);
}

window.addEventListener('DOMContentLoaded', e => start(e));

// const app = new App();
// app.start();
