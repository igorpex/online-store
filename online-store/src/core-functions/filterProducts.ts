import { Product } from '../interfaces/api';
import { StorageService } from './storage';

export interface FilterParams {
    categories: string[];
    companies: string[];
    colors: string[];
    popular?: boolean[];
    shipping?: boolean[];
}

export interface SliderFilterParams {
    price: { '0'?: number, '1'?: number };
    year: { '0'?: number, '1'?: number };
    count: { '0'?: number, '1'?: number };
}

function filterProducts(productList: Product[], filter: FilterParams, sliderFilter: SliderFilterParams) {
    let categories: string[];
    let companies: string[];
    let colors: string[];
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
        //filter by color
        .filter(product => {
            if (!colors || colors.length === 0 || colors.includes('all')) return true;
            for (let productColor of product.colors) {
                if (colors.includes(productColor)) return true
            } return false
        })
        // filtter by price
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
        // filter by year
        .filter(product => {
            try {
                let min = Number(sliderFilter.year['0']);
                let max = Number(sliderFilter.year['1']);
                if (product.year >= min && product.year <= max) {
                    return true
                } else return false
            } catch {
                return true
            }
        })
        // filter by count
        .filter(product => {
            try {
                let min = Number(sliderFilter.count['0']);
                let max = Number(sliderFilter.count['1']);
                if (product.count >= min && product.count <= max) {
                    return true
                } else return false
            } catch {
                return true
            }
        })
        //filter popular
        .filter(product => {
            if (!filter['popular'] || filter['popular'][0] === false) {
                return true;
            } else {
                if (product['popular']) { return true } else { return false }
            }
        })
        //filter shipping
        .filter(product => {
            if (!filter['shipping'] || filter['shipping'][0] === false) {
                return true;
            } else {
                if (product['shipping']) { return true } else { return false }
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