import { handleSearchFilter, handleCategoryFilter, handleCompanyFilter, handleColorFilter } from '../handlers/handlers';
import { handlePriceSliderChange } from '../handlers/handleSliders';
let filters = [

    {
        name: 'search',
        type: 'text',
        containerSelectors: ['.filters__search'],
        elementClasses: ['.filters__search-input'],
        handler: handleSearchFilter,
    },
    {
        name: 'category',
        type: 'checkbox',
        containerSelectors: ['.filters__category'],
        elementClasses: ['.filters__category-input'],
        handler: handleCategoryFilter,
    },
    {
        name: 'company',
        type: 'checkbox',
        containerSelectors: ['.filters__company'],
        elementClasses: ['.filters__company-input'],
        // handler: handleCompanyFilter,
    },
    {
        name: 'color',
        type: 'button',
        containerSelectors: ['.filters__color'],
        elementClasses: ['.filters__colors-button'],
        handler: handleCategoryFilter,
    },

]

let filtersObj = {
    'search': {
        type: 'search',
        containerSelectors: ['.filters__search'],
        elementClasses: ['.filters__search-input'],
        handler: handleSearchFilter,
    },
    'category': {
        type: 'checkbox',
        containerSelectors: ['.filters__category'],
        elementClasses: ['.filters__category-input'],
        handler: handleCategoryFilter,
    },
    'color': {
        type: 'button',
        containerSelectors: ['.filters__color'],
        elementClasses: ['.filters__colors-button'],
        handler: handleCategoryFilter,
    },
}

const rangeFilters = [
    {
        name: 'price',
        type: 'range',
        containerSelectors: ['.filters__price-range'],
        elementClasses: ['.filters__price-range-input'],
        handler: handlePriceSliderChange,
    }
]
