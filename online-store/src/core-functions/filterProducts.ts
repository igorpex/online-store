import { Product } from '../interfaces/api';
import { StorageService } from './storage';

export interface FilterParams {
    categories: string[];
    companies: string[];
    colors: string[];
}

export interface SliderFilterParams {
    price: { '0'?: number, '1'?: number };
}

function filterProducts(productList: Product[], filter: FilterParams, sliderFilter: SliderFilterParams) {
    let categories: any;
    let companies: any;
    let colors: any;
    if (filter === null || filter == undefined) { filter = { categories: [], companies: [], colors: [] } };
    if (Array.isArray(filter.categories)) { categories = filter.categories } else { categories = new Array() };
    if (Array.isArray(filter.companies)) { companies = filter.companies } else { companies = new Array() };
    if (Array.isArray(filter.colors)) { colors = filter.colors } else { colors = new Array() };
    // console.log('sliderFilter:', sliderFilter);
    let filtered = productList
        //search
        .filter(product => {
            try {
                const searchFilter = StorageService.getSearchFilter();
                const searchValue = searchFilter.trim().toLowerCase();
                const name = product.name.toLowerCase();
                console.log('searchFilter in filterProducts.ts:', searchFilter)
                if (searchFilter === '') { return true }
                // searchValue = searchValue.toLowerCase();
                console.log('name.search(searchValue)`):', name.search(searchValue));
                if (name.search(searchValue) >= 0) {
                    return true
                } else return false
            } catch (err) {
                console.log('Error in searcj:', err)
                return true
            }
        })
        //filer by category
        .filter(product => {
            if (categories.length === 0 || categories.includes('all')) return true;
            // console.log('Result for product: ', product.name);
            // console.log( categories.includes(product.category));
            return categories.includes(product.category);
        })
        //filer by company
        .filter(product => {
            if (companies.length === 0 || companies.includes('all')) return true;
            return companies.includes(product.company)
        })
        .filter(product => {
            if (!colors || colors.length === 0 || colors.includes('all')) return true;
            for (let productColor of product.colors) {
                if (colors.includes(productColor)) return true
            } return false
        })
        .filter(product => {
            try {
                let min = Number(sliderFilter.price['0']);
                let max = Number(sliderFilter.price['1']);
                if (product.price >= min && product.price <= max) {
                    return true
                } else return false
            } catch {
                return true
            }
        })
    return filtered;
}

export function getFilteredProducts() {
    const products = JSON.parse(localStorage.getItem('productList')!);
    let filter = JSON.parse(localStorage.getItem('filter')!);
    let sliderFilter = JSON.parse(localStorage.getItem('sliderFilter')!);
    // if (filter === null || filter == undefined) { filter = {} };
    let filteredProducts = filterProducts(products, filter, sliderFilter);
    return filteredProducts;
}