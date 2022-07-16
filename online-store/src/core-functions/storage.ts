import { ProductRanges, SortSettings } from '../interfaces/internal';
import { SliderFilter } from '../handlers/handleSliders';


export class StorageService {

    static getFilter() {
        let filter;
        try {
            filter = JSON.parse(localStorage.getItem('filter')!);
            return filter ? filter : {}
        } catch {
            return {}
        }
    }

    static getFilterByName(filterName: string) {
        try {
            const filterByName = JSON.parse(localStorage.getItem('filter')!)[filterName];
            return filterByName ? filterByName : []
        } catch {
            const filterByName = new Array();
            return filterByName
        }
    }
    static setFilter(filter: Object) {
        localStorage.setItem('filter', JSON.stringify(filter));
    }

    static resetFilter() {
        localStorage.setItem("filter", JSON.stringify({}));
    }

    static getSliderFilter() {
        try {
            const sliderFilter = JSON.parse(localStorage.getItem('sliderFilter')!);
            return sliderFilter ? sliderFilter : new Object();
        } catch {
            const sliderFilter = new Object();
            return sliderFilter
        }
    }

    static getSliderFilterByName(filterName: string) {
        try {
            const sliderFilterByName = JSON.parse(localStorage.getItem('sliderFilter')!)[filterName];
            return sliderFilterByName ? sliderFilterByName : new Object();
        } catch {
            const sliderFilterByName = new Object();
            return sliderFilterByName
        }
    }

    static setSliderFilterByName({ sliderName, values }: SliderFilter) {
        let sliderFilter = this.getSliderFilter();
        sliderFilter[sliderName] = values;
        localStorage.setItem('sliderFilter', JSON.stringify(sliderFilter));
    }

    static resetSliderFilter() {
        localStorage.setItem("sliderFilter", JSON.stringify({}));
    }

    static initSliderFilter(productRanges: ProductRanges) {
        let previousPriceFilter = StorageService.getSliderFilterByName('price');
        if (!previousPriceFilter[0] || !previousPriceFilter[1]) {
            StorageService.setSliderFilterByName({ sliderName: 'price', values: [productRanges['prices']['minPrice'], productRanges['prices']['maxPrice']] });
        }

        let previousCountFilter = StorageService.getSliderFilterByName('count');
        if (!previousCountFilter[0] || !previousCountFilter[1]) {
            StorageService.setSliderFilterByName({ sliderName: 'count', values: [productRanges['counts']['minCount'], productRanges['counts']['maxCount']] });
        }

        let previousYearFilter = StorageService.getSliderFilterByName('year');
        if (!previousYearFilter[0] || !previousYearFilter[1]) {
            StorageService.setSliderFilterByName({ sliderName: 'year', values: [productRanges['years']['minYear'], productRanges['years']['maxYear']] });
        }
    };

    static getProductRanges() {
        try {
            let productRanges = JSON.parse(localStorage.getItem('productRanges')!);
            return productRanges ? productRanges : {}
        } catch {
            return {}
        }

    }

    static setProductRanges(productRanges: ProductRanges) {
        localStorage.setItem('productRanges', JSON.stringify(productRanges));
    }

    static getSearchFilter() {
        try {
            const searchFilter = JSON.parse(localStorage.getItem('searchFilter')!);
            return searchFilter ? searchFilter : '';
        } catch {
            const searchFilter = '';
            return searchFilter
        }
    }

    static setSearchFilter(value: string) {
        localStorage.setItem('searchFilter', JSON.stringify(value));
    }

    static getCart() {
        let cart;
        try {
            cart = JSON.parse(localStorage.getItem('cart')!);
            return cart ? cart : []
        } catch {
            return []
        }
    }

    static setCart(cart: string[]) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    static addToCart(productId: string) {
        let cart = this.getCart();
        let cartSet = new Set(cart);
        cartSet.add(productId);
        const newCart = Array.from(cartSet);
        localStorage.setItem('cart', JSON.stringify(newCart));
    }

    static deleteFromCart(productId: string) {
        let cart = this.getCart();
        cart = cart.filter((id: string) => id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    static resetCart() {
        localStorage.setItem('cart', JSON.stringify([]));
    }

    static getSortSettings() {
        try {
            const sortSettings = JSON.parse(localStorage.getItem('sortSettings')!);
            return sortSettings ? sortSettings : { type: 'name', direction: 'asc' };
        } catch {
            return { type: 'name', direction: 'asc' }
        }
    }
    static setSortSettings(sortSettings: SortSettings) {
        localStorage.setItem('sortSettings', JSON.stringify(sortSettings));
    }
    static resetSortSettings() {
        localStorage.setItem('sortSettings', JSON.stringify({ type: 'name', direction: 'asc' }));
    }
}
